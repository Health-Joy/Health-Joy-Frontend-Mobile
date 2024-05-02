
const CheckProduct = async (barkod) => {

  try {
    const response = await fetch(`https://healthjoybackendmobile20240311152807.azurewebsites.net/api/Product?productBarcode=${barkod}`, {
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
    return responseData;

  } catch (error) {
    console.error('Hata:', error);
    //alert('Hata: Veri alınamadı');
    throw error;
  }
};

export default CheckProduct;
