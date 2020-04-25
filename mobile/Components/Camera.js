import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { NetworkInfo } from 'react-native-network-info';

const CameraComponent = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(undefined);

  const camera = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const capturePhoto = async () => {
    const capturedPhoto = await camera.current.takePictureAsync();
    setPhoto({ photo: capturedPhoto });
  };

  const classifyPhoto = async () => {
    // const { data } = await axios.put(`/api/vision/${photo.photo.uri}`)
    const { data } = await axios({
      method: 'PUT',
      url: '/api/vision',
      baseURL: 'LOCAL_IP_ADDRESS',
      params: {
        uri: photo.photo.uri
      }
    });
    console.log(data);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log(photo);
  NetworkInfo.getIPAddress().then(ipAddress => {
    console.log(ipAddress);
  });
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={ref => {
          camera.current = ref;
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={capturePhoto}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={classifyPhoto}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Classify </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraComponent;
