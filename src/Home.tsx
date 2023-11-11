import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, NativeModules} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import InfoCard from './InfoCard';
import instance from './api/axios';
import { useQuery } from 'react-query';

export default function Home(): JSX.Element {
  const [deviceInfo, setDeviceInfo] = useState({
    uniqueID: '',
    deviceID: '',
  });

  async function getDevices() {
    instance
      .get('/devices.json')
      .then(response => {
          console.log('Response:', response.data.devices);
        return response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // const {isLoading, error, data} = useQuery(['devices'], getDevices);


  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:8080');
  
  //   // Connection opened
  //   socket.addEventListener('open', (event) => {
  //     socket.send('Hello Server!');
  //   });
  
  //   // Listen for messages
  //   socket.addEventListener('message', (event) => {
  //     console.log('Message from server:', event.data);
  //   });
  
  //   // Clean up on component unmount
  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  

  function getDeviceUniqueID(infoType: string) {
    switch (infoType) {
      case 'uniqueID':
        DeviceInfo.getUniqueId().then(uniqueID => {
          // Create a new object based on the existing state
          const updatedDeviceInfo = {...deviceInfo, uniqueID};
          setDeviceInfo(updatedDeviceInfo);
        });
        break;
      case 'deviceID':
        const deviceID = DeviceInfo.getDeviceId();
        const updatedDeviceInfo = {...deviceInfo, deviceID};
        setDeviceInfo(updatedDeviceInfo);
    }
  }

  const {CalendarModule} = NativeModules;
  
  console.log('CalendarModule', CalendarModule);
  

  return (
    <View style={styles.container}>
      <InfoCard
        info={deviceInfo.uniqueID}
        onPress={() => getDeviceUniqueID('uniqueID')}
        title="Get Device Unique ID"
      />
      <InfoCard
        info={deviceInfo.deviceID}
        onPress={() => {
          CalendarModule.createCalendarEvent('testName', 'testLocation');
          // getDeviceUniqueID('deviceID');
          // sendMsg('Hello from React Native!');
        }}
        title="Get Device ID"
      />
    </View>
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
