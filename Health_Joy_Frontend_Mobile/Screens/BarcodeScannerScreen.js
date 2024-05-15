import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BarkoderView, Barkoder } from 'barkoder-react-native';
import { useNavigation } from '@react-navigation/native';
import CheckProduct from '../Api/CheckProduct';
import CheckIngredientsApi from '../Api/CheckIngredientsApi';

const BarcodeScannerScreen = () => {
  const navigation = useNavigation();
  const [barkoder, setBarkoder] = useState(null); 

  const onBarkoderViewCreated = barkoder => {
    barkoder.setBarcodeTypeEnabled(Barkoder.BarcodeType.qr, true);
    barkoder.setRegionOfInterestVisible(true);
    setBarkoder(barkoder);
  };

  const startScanning = () => {
    if (barkoder) {
      barkoder.startScanning(async (result) => {
      try {
        //result.textualData barcode değerine karşılık geliyor
        const barcode = result.textualData;
        const responseData = await CheckProduct(barcode);

        if(responseData.response == null){//eğer not found dönerse product bizde kayıtlı bir product değildir.
          navigation.navigate('ProductNotFound', { barcode});
        }
        else if(responseData){//responsedata döndüyse kayıtlı bir üründür.
          const productId = responseData.response.productId;
        const productName = responseData.response.name;
          const ingredientsArray = responseData.response.ingredients.map(item => item.name);
          await CheckIngredientsApi(ingredientsArray, false, navigation, productId, productName);
        }
      } catch (error) {
        console.error('Hata:', error);
        //alert('Hata: Veri alınamadı');
      }
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
        licenseKey="PEmBIohr9EZXgCkySoetbwP4gvOfMcGzgxKPL2X6uqOUacPedGgHghu91cK3k8gqo7gKhuJlgj-HDBKVHn0dm0v4Dv6Ruz2eXQCpaBsLFD0r_9Fk1YZAm1YGhtlnzv3Bzsii7Nuar_Ojx2o_qlSv9sSwdT91Xq0gHkWZtHrhzYcTqrA-AbYToMwQLqM_MU-3ZvhMB-C9khP5pLx9X63Ibb-yX16UKsHkMmKHdKLBgBf51z7SFF6dSy5cri2qxtKmqkMR4tHZ6w81JFxhXY18KosKsouV2ax8YnfZQiI7uw8."
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
