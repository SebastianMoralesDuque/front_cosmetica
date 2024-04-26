const getToken = async () => {
    try {
      const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "api-token": "2XA6kP5Jis8AyQij3yf9lpe_dDT89bQp27Necv_XxUwlc5D8tdoMuW-75YSdmxUTQZ4",
          "user-email": "smoralesd@uqvirtual.edu.co"
        }
      });
  
      const data = await response.json();
      const authToken = data.auth_token;
      return authToken;
    } catch (error) {
      console.error("Error al obtener el token de autenticación:", error);
      throw error; // Propaga el error para que pueda ser manejado en otros lugares si es necesario.
    }
  };
  
  export default getToken;
  