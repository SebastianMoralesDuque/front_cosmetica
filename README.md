# Proyecto front para Cosmetica

Este es un proyecto React diseñado para una clínica médica. A continuación, se presenta una guía para comprender la estructura de carpetas del proyecto y cómo ejecutarlo.

## Estructura de Carpetas

La estructura de carpetas del proyecto se organiza de la siguiente manera:

- `node_modules/`: Esta carpeta contiene las dependencias del proyecto y se genera automáticamente al ejecutar `npm install`.

- `public/`: Aquí se encuentran los archivos públicos, como `index.html`, y cualquier otro recurso estático.

- `src/`: El código fuente de la aplicación se encuentra en esta carpeta. Las subcarpetas principales son las siguientes:

  - `components/`: Contiene componentes reutilizables que forman parte de la interfaz de usuario.

  - `pages/`: Aquí se encuentran las vistas o páginas de la aplicación, cada una representando una ruta URL específica.

  - `services/`: Contiene funciones y lógica de servicios, como llamadas a API o interacciones con bases de datos.

  - `assets/`: Esta carpeta almacena archivos multimedia, como imágenes, videos, fuentes y otros recursos necesarios.

- `App.js`: Este archivo es el componente raíz de la aplicación y es donde se configuran las rutas y componentes principales.

- `index.js`: Punto de entrada de la aplicación, donde se conecta el componente raíz a la página HTML principal.

## Cómo Ejecutar el Proyecto

A continuación se describen los pasos para ejecutar el proyecto en tu entorno de desarrollo. Asegúrate de tener Node.js y npm instalados previamente.

### 1. Instalar Dependencias

En el directorio raíz del proyecto, ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install

Inicia el servidor de desarrollo con:

npm run dev

Accede a la aplicación en tu navegador:

Local:   http://localhost:5173/
# front_cosmetica
