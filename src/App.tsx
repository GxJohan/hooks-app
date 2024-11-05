// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';

// Definimos una interfaz para el tipo de datos que recibiremos de la API
interface PhraseData {
  phrase: string;
  author: string;
}

const App: React.FC = () => {
  const [phraseData, setPhraseData] = useState<PhraseData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Función para obtener la frase del día
    const fetchPhrase = async () => {
      try {
        const response = await fetch('/api/phrase'); // Usar el proxy
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data: PhraseData = await response.json();
        setPhraseData(data);
      } catch (err) {
        console.error('Error:', err);
        setError('No se pudo cargar la frase del día.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhrase();
  }, []); // El arreglo vacío [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Frase del Día</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {phraseData && (
        <div>
          <label htmlFor="phrase">Frase:</label>
          <input
            type="text"
            id="phrase"
            value={phraseData.phrase}
            readOnly
            style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
          />
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            value={phraseData.author}
            readOnly
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
