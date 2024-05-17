const GetAllFavoriteApi = async (userId) => {
    try {
      const response = await fetch(`https://healthjoybackendmobile20240515195922.azurewebsites.net/api/Favorite/${userId}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      const data = await response.json(); 
      console.log("ceren: " + data);
      if (response.ok) {
        return data; 
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return false;
    }
    
  };
  
  export default GetAllFavoriteApi;
  