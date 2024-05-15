
const CreateProductApi = async (barcode, productName, productType, description, userId, ingredients) => {
    try {
      const response = await fetch('https://healthjoybackendmobile20240515195922.azurewebsites.net/api/Product/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barcodeNo: barcode,
          name: productName,
          description: description,
          productType: productType,
          userId: userId,
          ingredients: ingredients.map(ingredient => ({
            name: ingredient,
          })),
        }),
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return false;
    }
  };
  
  export default CreateProductApi;
  