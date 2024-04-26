const BASE_URL = 'http://localhost:9009'; // Reemplaza con la URL base de tu servidor

const userRegisterService = {
  registerUser: async (data1, data2) => {
    try {
      const response1 = await fetch(`${BASE_URL}/usuarios/gestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
      });

      if (response1.ok) {
        const usuarioCreado = await response1.json();

        const response2 = await fetch(`${BASE_URL}/usuarios/gestion/pacientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data2),
        });

        if (response2.ok) {
          return await response2.json();
        } else {
          throw new Error('Error en la segunda petición');
        }
      } else {
        throw new Error('Error en la primera petición');
      }
    } catch (error) {
      throw new Error(`Error al registrar al usuario: ${error.message}`);
    }
  },

  uploadPhotoToCloudinary: async (photo, cedula) => {
    try {
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', photo);
      cloudinaryData.append('public_id', cedula);
      cloudinaryData.append('upload_preset', 'ml_default');
      cloudinaryData.append('cloud_name', 'dkm9g0zpt'); // Reemplaza con tu cloud_name
      cloudinaryData.append('api_key', '654495213436479'); // Reemplaza con tu api_key
      cloudinaryData.append('api_secret', 'PIJO3ukm6rEsZFGjOIK7gcVDV-g'); // Reemplaza con tu api_secret

      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload', {
        method: 'post',
        body: cloudinaryData,
      });

      if (cloudinaryResponse.ok) {
        const cloudinaryData = await cloudinaryResponse.json();
        return cloudinaryData.url;
      } else {
        throw new Error('Error al cargar la foto en Cloudinary');
      }
    } catch (error) {
      throw new Error(`Error al subir la foto a Cloudinary: ${error.message}`);
    }
  },
};

export default userRegisterService;
