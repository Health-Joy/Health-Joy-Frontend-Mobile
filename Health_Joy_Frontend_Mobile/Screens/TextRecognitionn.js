/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import TextRecognition from 'react-native-text-recognition';
import {launchImageLibrary} from 'react-native-image-picker';
import Navbar from '../Components/Navbar';

const TextRecognitionn = () => {
  const [text, setText] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    launchImageLibrary({}, setImage);
  }, []);

  useEffect(() => {
    (async () => {
      if (image) {
        try {
          const result = await TextRecognition.recognize(image.assets[0].uri);

          console.log(result);

          setText(result);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [image]);

  return (
    <View>
      <Navbar />
      {image && (
        <Image source={{uri: image.uri}} style={{width: 200, height: 200}} />
      )}
      {text ? <Text>{text}</Text> : null}
    </View>
  );
};

export default TextRecognitionn;
