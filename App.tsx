/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';
import Home from './src/Home';

// Create a client
const queryClient = new QueryClient();
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Home />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
