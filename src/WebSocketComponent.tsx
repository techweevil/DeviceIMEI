import React, { useEffect } from 'react';
import { View, Text, NativeEventEmitter, NativeModules } from 'react-native';

const WebSocketComponent = () => {
  useEffect(() => {
    const { WebSocketModule } = NativeModules;
    const eventEmitter = new NativeEventEmitter(WebSocketModule);

    const onOpenSubscription = eventEmitter.addListener('onOpen', () => {
      console.log('WebSocket opened');
    });

    const onMessageSubscription = eventEmitter.addListener('onMessage', (message) => {
      console.log('Received message:', message);
    });

    const onFailureSubscription = eventEmitter.addListener('onFailure', (error) => {
      console.error('WebSocket failure:', error);
    });

    const onClosingSubscription = eventEmitter.addListener('onClosing', (reason) => {
      console.log('WebSocket closing:', reason);
    });

    const onClosedSubscription = eventEmitter.addListener('onClosed', (reason) => {
      console.log('WebSocket closed:', reason);
    });

    // Connect to the WebSocket
    WebSocketModule.connectWebSocket('ws://localhost:3000');

    return () => {
      // Clean up subscriptions when the component unmounts
      onOpenSubscription.remove();
      onMessageSubscription.remove();
      onFailureSubscription.remove();
      onClosingSubscription.remove();
      onClosedSubscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>WebSocket Component</Text>
      {/* Your component UI goes here */}
    </View>
  );
};

export default WebSocketComponent;
