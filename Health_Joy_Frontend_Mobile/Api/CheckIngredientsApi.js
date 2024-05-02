
const CheckIngredientsApi = async (uniqueWords, flag, navigation) => {
  try {
    const response = await fetch(
      'https://healthjoybackendmobile20240311152807.azurewebsites.net/api/Ingredient/CalculateAverageRiskLevel',
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
    console.log("api response data: ", responseData);
    if (!response.ok) {
      throw new Error('Veri alınamadı');
    }
    console.log("flag:   ", flag);
    if (flag) {//ingredients check screenden gelmiş demek
      console.log("flag:   ", flag);
      if (responseData) {
        navigation.navigate('IngredientsDetails', {
          responseData: responseData,
        });
      } else {
        throw new Error('Geçersiz yanıt verisi');
      }
    } else {
      //BarcodeScannerScereenden gelmiş demek 
      //Burada özel bir işlem yapılacaksa ekleme yapılabilir.
    }

  } catch (error) {
    console.error('Endpointe eşsiz kelimeleri gönderirken hata oluştu:', error);
    //alert('Hata: Veri alınamadı');
  }
};

export default CheckIngredientsApi;
