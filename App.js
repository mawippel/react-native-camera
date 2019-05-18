import React, { Component } from 'react';
import { Image, View, StyleSheet, Button, CameraRoll } from 'react-native';
import { Permissions, Constants, ImagePicker } from 'expo';


export default class App extends Component {

  state = {
    chosenImage: null,
    takenImage: null
  }
  
  launchCameraRollAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.error('Camera not granted')
      return
    }
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      exif: true,
    })
    this.setState({ chosenImage: image })
  }

  launcCameraAsync = async () => {
    let { status } = Permissions.askAsync(Permissions.CAMERA)
    if (status !== 'granted') {
      console.log("Permissão à Camera não concedida")
    }
    let image = await ImagePicker.launchCameraAsync({
      format: 'png',
      result: 'file',
    })
    let saveResult = await CameraRoll.saveToCameraRoll(image.uri, 'photo')
    this.setState({ takenImage: saveResult })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Abrir Galeria" onPress={this.launchCameraRollAsync} />

        {this.state.chosenImage && (<Image
          source={{ uri: this.state.chosenImage.uri }}
          style={{
            height: 200,
            width: 200
          }} />)}
        <Button title="Camera" onPress={this.launcCameraAsync} />
        {this.state.takenImage && (
          <Image
            source={{ uri: this.state.takenImage.uri }}
            style={{
              height: 200,
              width: 200
              }} />)
        }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
