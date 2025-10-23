import { useEffect, useState } from "react";

function FollowMouse() {
    const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); 

  useEffect(() => {
    console.log("effect: ", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled){
      window.addEventListener('pointermove', handleMove);
    }
    // Cleanup function se ejecuta cuando el componente se desmonta o antes de la siguiente ejecución del efecto
    return () => {
      window.removeEventListener('pointermove', handleMove);
    }
  }, [enabled]);

  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    }
  })

  return (
    <main>
      <div style={{ 
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: '0.8',
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)` }} />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar " : "Activar"} seguimiento del puntero
      </button>
    </main>
  );
}

function App() {
  return (
    FollowMouse()
  )
}

export default App;
