import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BarkoderView, Barkoder } from 'barkoder-react-native';
import { useNavigation } from '@react-navigation/native';

const BarcodeScannerScreen = () => {
  const navigation = useNavigation();
  const [barkoder, setBarkoder] = useState(null); // Initialize barkoder as null

  const onBarkoderViewCreated = barkoder => {
    barkoder.setBarcodeTypeEnabled(Barkoder.BarcodeType.qr, true);
    barkoder.setRegionOfInterestVisible(true);
    setBarkoder(barkoder);
  };

  const startScanning = () => {
    if (barkoder) { // Check if barkoder is set
      barkoder.startScanning((result) => {
        console.log('Tarama sonucu:', result);
        //navigation.navigate('ProductNotFound');
        //barcode yollanacak eğer barcode a karşılık gelen product varsa ingredient sayfasına
        //eğer uygun barcodelu product yoksa product ekleme sayfasına
      });
    }
  };

  useEffect(() => {
    startScanning(); // Call startScanning when barkoder is updated
  }, [barkoder]);

  return (
    <SafeAreaView style={styles.container}>
      <BarkoderView
        style={styles.barkoderView}
        licenseKey="PEmBIohr9EZXgCkySoetbwP4gvOfMcGzgxKPL2X6uqM2QB4LG7locYvP2kym_PkgaJYOZrt4Q3LW0WtDzO-C65efhSjQV2fDdEiX8NL3_tFYMXrCBz2NXz1WuFhx5qi-SccGvmDYbDTR6M1MnD2ySdXvN9Oh_M5nSom7GzzMej4VGeGLXDrIHGNNYmNvnQK1qX7w_GgQgB_KhCG-rSJrsg.."
        onBarkoderViewCreated={onBarkoderViewCreated}
      />
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
});

export default BarcodeScannerScreen;
