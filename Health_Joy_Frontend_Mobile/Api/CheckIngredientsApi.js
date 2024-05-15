
const CheckIngredientsApi = async (uniqueWords, flag, navigation, productId, productName) => {
  try {
    const response = await fetch(
      'https://healthjoybackendmobile20240515195922.azurewebsites.net/api/Ingredient/CalculateAverageRiskLevel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(uniqueWords),
      },
    );

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Veri alınamadı');
    }
    
    if (flag) {//ingredients check screenden gelmiş demek
      if (responseData) {
        navigation.navigate('IngredientsDetails', {
          responseData: responseData,
        });
      } else {
        throw new Error('Geçersiz yanıt verisi');
      }
    } else {//BarcodeScannerScereenden gelmiş demek 
      if (responseData) {
        navigation.navigate('IngredientsDetails', {
          responseData: responseData,
          productId: productId,
          productName: productName,
          flag: flag
        });
      } else {
        navigation.navigate('ProductNotFound');
      }
    }

  } catch (error) {
    console.error('Endpointe eşsiz kelimeleri gönderirken hata oluştu:', error);
    //alert('Hata: Veri alınamadı');
  }
};

export default CheckIngredientsApi;
