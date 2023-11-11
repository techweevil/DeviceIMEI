package com.deviceimei

import io.ktor.application.*
import io.ktor.http.cio.websocket.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import kotlinx.coroutines.channels.consumeEach

class WebSocketModule {

    private var server: NettyApplicationEngine? = null

    fun startWebSocketServer(port: Int) {
        server = embeddedServer(Netty, port = port) {
            install(io.ktor.websocket.WebSockets)
            routing {
                webSocket("/echo") {
                    incoming.consumeEach { frame ->
                        if (frame is Frame.Text) {
                            send(Frame.Text("You said: ${frame.readText()}"))
                        }
                    }
                }
            }
        }
        server?.start(wait = false)
    }

    fun stopWebSocketServer() {
        server?.stop(1000, 5000)
    }
}
