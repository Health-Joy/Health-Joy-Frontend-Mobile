
const CheckProduct = async (barcode, navigation) => {
    try {
      const response = await fetch(`https://healthjoybackendmobile20240311152807.azurewebsites.net/api/Product?productBarcode=${barcode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Ürün bilgilerini alırken bir hata oluştu');
      }
  
      const responseData = await response.json();
      console.log('responseData:', responseData);
      if(responseData){
        //navigate ingredients screen
      }
      else{
        //navigate product not found screen
      }

    } catch (error) {
      console.error('Hata:', error);
      alert('Hata: Veri alınamadı');
    }
  };
  
  export default CheckProduct;
  
  
  