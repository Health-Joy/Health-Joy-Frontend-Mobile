
const LoginApi = (email, password) => {
    return fetch(`https://healthjoybackendmobile20240515195922.azurewebsites.net/api/User/Login?email=${email}&password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        throw new Error('There was an error with the fetch operation:', error);
      });
  };
  
  export default LoginApi;
  