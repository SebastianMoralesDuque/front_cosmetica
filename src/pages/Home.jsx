import React, { useState } from 'react';

function Home() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const products = [
    { id: 1, name: 'Shampoo', price: 10 },
    { id: 2, name: 'Acondicionador', price: 8 },
    { id: 3, name: 'Crema facial', price: 15 },
    { id: 4, name: 'Loción corporal', price: 12 },
    { id: 5, name: 'Protector solar', price: 20 },
    { id: 6, name: 'Mascarilla', price: 25 },
    { id: 7, name: 'Exfoliante', price: 18 },
    { id: 8, name: 'Aceite de coco', price: 22 },
    { id: 9, name: 'Jabón', price: 5 },
    { id: 10, name: 'Perfume', price: 30 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-6xl">
        <h1 className="text-4xl font-semibold mb-8 text-center">Bienvenido a la Cosmética Coco Pink</h1>
        <p className="text-gray-600 text-center">
          En nuestra Cosmética, nos dedicamos a brindar servicios de Cosmética de alta calidad. Nuestro equipo de profesionales está aquí para ti.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios</h2>
          <ul className="list-disc pl-6">
            <li>Consultas</li>
            <li>Análisis</li>
            <li>Atención Especializada</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Nuestros Productos</h2>
          <div className="grid grid-cols-2 gap-4">
  {products.map(product => (
    <div key={product.id} className="bg-gray-200 p-4 rounded-md">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <img src="shampoo-svgrepo-com.svg" alt={product.name} className="w-16 h-auto mt-2" /> {/* Redimensioné la imagen */}
      <p className="text-gray-600">${product.price}</p>
      <div className="mt-2">
        <button onClick={() => addToCart(product)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
          Agregar al Carrito
        </button>
      </div>
    </div>
  ))}
</div>

        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tu Carrito de Compras</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default Home;
