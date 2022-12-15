import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Button,
} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
// import { getApps, initializeApp } from 'firebase/app';
import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid';
import { Linking } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBSSWRVKWxyeH78Lpi2XuWKyuncgpJsO6U',
  authDomain: 'missing-24d33.firebaseapp.com',
  projectId: 'missing-24d33',
  storageBucket: 'missing-24d33.appspot.com',
  messagingSenderId: '712511424836',
  appId: '1:712511424836:web:b01965e9cbe5df57dc2f11',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function App() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [numero, setNumero] = useState('');
  const [nome, setNome] = useState('');
  const [uploading, setUploading] = useState(false);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [resImage, setResImage] = useState(null);
  const [start, setStart] = useState(false);
  const [interval, setInterval] = useState(0);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('A permissão para acessar a localização foi negada');
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      console.log(location);
      setLocation(location);
      getEndereco(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso negado!</Text>;
  }

  async function takePicture() {
    if (camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setOpen(true);
      setFoto(data.uri);
      uploadFile(data.uri);
      console.log('oi');
    }
  }

  function getEndereco(lat, long) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDI4GrWO-ydrvAstnY3WiZrF8IenO34tYE`;

    fetch(url)
      .then((resposta) => resposta.json())
      .then((res) => setAddress(res.results[0].formatted_address))
      .catch((error) => console.error(error));
  }

  const uploadFile = async (image) => {
    try {
      const uploadUrl = await uploadImageAsync(image);
      // console.log('url aq ' + uploadUrl);
      recognition(uploadUrl);
      setImage(uploadUrl);
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
    }
  };

  const recognition = (urlImg) => {
    fetch('http://192.168.68.107:5000/urlImg?img=' + urlImg)
      .then((resposta) => resposta.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          setUploading(false);
          setError(res.error);
        } else {
          setUploading(false);
          setError('');
          console.log(res);
          retirarIntervalo();
          result(res);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  };
  const result = (data) => {
    if (data.nome) {
      console.log(data.nome);
      let getNumero = data.nome;
      let numero = getNumero.replace(/\D/g, '');
      let getNome = getNumero.substr(11);
      console.log(location);
      console.log(numero);
      setNome(getNome);
      setNumero(numero);
      setResImage(data.img);
    }
  };
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  };

  const whatsApp = () => {
    let text = `Olá! Estamos entrando em contato, pois possivelmente encontramos ${nome}, aproximadamente no endereço ${address}`;
    Linking.openURL(`whatsapp://send?text=${text}&phone=${55 + numero}`);
  };
  const sms = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const status = await SMS.sendSMSAsync(
        numero,
        `Olá! Estamos entrando em contato, pois possivelmente encontramos ${nome}, aproximadamente no endereço ${address}`,
      );
    } else {
      // misfortune... there's no SMS available on this device
    }
  };

  const startReconhecimento = () => {
    setStart(true);
  };
  setTimeout(() => takePicture(), 1500);

  function retirarIntervalo() {
    clearInterval(interval);
  }
  function fecharCamera() {
    setStart(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      {start != true && (
        <View style={styles.inicio}>
          <Text style={styles.title}>Identificar Pessoas Desaparecidas</Text>
          <View style={styles.btnStart}>
            <Button
              onPress={startReconhecimento}
              title="Iniciar Reconhecimento"
            />
          </View>
        </View>
      )}
      {start == true && (
        <Camera style={{ flex: 1 }} type={type} ref={camRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                );
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff' }}>
                Trocar
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {/* <TouchableOpacity style={styles.button} onPress={takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF"></FontAwesome>
      </TouchableOpacity> */}
      {foto && resImage && start == true && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => setOpen(false)}
            >
              <FontAwesome
                name="window-close"
                size={50}
                color="#FF0000"
                style={{ textAlign: 'center' }}
                onPress={fecharCamera}
              />
              <Text style={styles.title}>Encontramos {nome}:</Text>
            </TouchableOpacity>
            <Image
              style={{ width: '100%', height: 300, borderRadius: 20 }}
              source={{ uri: foto }}
            />
            <Image
              style={{ width: '100%', height: 300, borderRadius: 20 }}
              source={{ uri: resImage }}
            />
            <View style={styles.groupButton}>
              <Button
                onPress={whatsApp}
                title="Entra em contato por Whatsapp"
              />
              <Button onPress={sms} title="Entra em contato por SMS" />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inicio: {
    maxWidth: 400,
    alignItems: 'center',
    fontSize: 24,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  btnStart: {
    padding: 20,
    fontSize: 'bold',
  },
  groupButton: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
