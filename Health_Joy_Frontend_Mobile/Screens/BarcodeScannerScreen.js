import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarkoderView, Barkoder } from 'barkoder-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';

const BarcodeScannerScreen = () => {
  const navigation = useNavigation();
  const [barkoder, setBarkoder] = useState(null);

  const onBarkoderViewCreated = barkoder => {
    barkoder.setBarcodeTypeEnabled(Barkoder.BarcodeType.qr, true);
    barkoder.setRegionOfInterestVisible(true);
    setBarkoder(barkoder);
  };

  const startScanning = () => {
    barkoder.startScanning((result) => {
      console.log('Tarama sonucu:', result);
    });
  };

  const handleLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        freeStyleCropEnabled: true,
      });

      // Seçilen fotoğrafı barkod okuma fonksiyonuna gönder
      readBarcodeFromImage(image.path);
    } catch (error) {
      console.error(error);
    }
  };

  const readBarcodeFromImage = async (imagePath) => {
    try {
      const barcode = await Barkoder.detectFromUri(imagePath);
      console.log('Fotoğraftan okunan barkod:', barcode);
    } catch (error) {
      console.error('Barkod okuma hatası:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarkoderView
        style={styles.barkoderView}
        licenseKey="PEmBIohr9EZXgCkySoetbwP4gvOfMcGzgxKPL2X6uqM2QB4LG7locYvP2kym_PkgaJYOZrt4Q3LW0WtDzO-C65efhSjQV2fDdEiX8NL3_tFYMXrCBz2NXz1WuFhx5qi-SccGvmDYbDTR6M1MnD2ySdXvN9Oh_M5nSom7GzzMej4VGeGLXDrIHGNNYmNvnQK1qX7w_GgQgB_KhCG-rSJrsg.."
        onBarkoderViewCreated={onBarkoderViewCreated}
      />
      <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
        <Text style={styles.scanButtonText}>Taramaya Başla</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.libraryButton} onPress={handleLibrary}>
        <Text style={styles.libraryButtonText}>Galeriden Fotoğraf Seç</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barkoderView: {
    flex: 1,
    width: '100%',
  },
  scanButton: {
    backgroundColor: '#54A75C',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  scanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  libraryButton: {
    backgroundColor: '#54A75C',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  libraryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BarcodeScannerScreen;
