import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import okhttp3.*
import okio.ByteString
import java.util.concurrent.TimeUnit



class WebSocketModuleN(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var webSocket: WebSocket? = null

    override fun getName(): String {
        return "WebSocketModule"
    }

    @ReactMethod
    fun connectWebSocket(url: String) {
        val client = OkHttpClient.Builder()
            .readTimeout(0, TimeUnit.MILLISECONDS)
            .build()

        val request = Request.Builder()
            .url(url)
            .build()

        webSocket = client.newWebSocket(request, MyWebSocketListener())

        // You can also send a sample message after connection
        // webSocket?.send("Hello, WebSocket!")
    }

    private inner class MyWebSocketListener : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response) {
            // WebSocket connection is established
            sendEvent("onOpen", null)
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            // Handle incoming text messages
            sendEvent("onMessage", text)
        }

        override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
            // Handle incoming binary messages
            sendEvent("onMessage", bytes.hex())
        }

        override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
            // Handle connection failure
            sendEvent("onFailure", t.message)
        }

        override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
            // Handle WebSocket closing
            sendEvent("onClosing", reason)
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
            // Handle WebSocket closed
            sendEvent("onClosed", reason)
        }
    }

    private fun sendEvent(eventName: String, message: String?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, message)
    }
}
