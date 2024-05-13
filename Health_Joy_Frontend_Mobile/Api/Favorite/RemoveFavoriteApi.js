const RemoveFavoriteApi = async (productId, userId) => {
    try {
      const response = await fetch('https://healthjoybackendmobile20240311152807.azurewebsites.net/api/Favorite/Remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      });
      console.log(response);
      console.log(response.json());
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

  
  export default RemoveFavoriteApi;