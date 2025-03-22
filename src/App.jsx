import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PixelPaws from './components/PixelPaws';
import StatusBar from './components/StatusBar';
import ActionButtons from './components/ActionButtons';

function App() {
  const defaultStats = {
    hunger: 80,
    happiness: 70,
    energy: 90,
    lastUpdated: Date.now()
  };

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("pixelpaws-stats");
    return saved ? JSON.parse(saved) : defaultStats;
  });

  const [abandoned, setAbandoned] = useState(false);


  // Aggiorna stati ogni tot secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const updated = {
          ...prev,
          hunger: Math.max(prev.hunger - 1, 0),
          happiness: Math.max(prev.happiness - 1, 0),
          energy: Math.max(prev.energy - 1, 0),
        };
        localStorage.setItem("pixelpaws-stats", JSON.stringify(updated));
        return updated;
      });
    }, 60000); // ogni 60 secondi

    return () => clearInterval(interval);
  }, []);

  // Pulsanti azione
  const handleAction = (type) => {
    setStats((prev) => {
      let updated = { ...prev };
      if (type === "feed") updated.hunger = Math.min(prev.hunger + 20, 100);
      if (type === "pet") updated.happiness = Math.min(prev.happiness + 15, 100);
      if (type === "play") {
        updated.happiness = Math.min(prev.happiness + 10, 100);
        updated.energy = Math.max(prev.energy - 10, 0);
      }
      if (type === "sleep") updated.energy = Math.min(prev.energy + 25, 100);
      if (updated.hunger === 0 && updated.energy === 0 && updated.happiness === 0) {
        setAbandoned(true);
      }
      

      localStorage.setItem("pixelpaws-stats", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="container text-center py-4">
      <h1 className="mb-4">🐾 PixelPaws</h1>
  
      {abandoned ? (
        <>
          <div className="mb-4">
            <img
              src="/assets/sprites/ciaone.png"
              alt="Abbandono"
              style={{ width: "200px", imageRendering: "pixelated" }}
            />
            <p className="mt-3 fs-4">Torno mai più! Ciaone! 🪧</p>
          </div>
          <button className="btn btn-danger" onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
            Adotta un nuovo PixelPaws
          </button>
        </>
      ) : (
        <>
          <StatusBar stats={stats} />
          <PixelPaws stats={stats} />
          <ActionButtons onAction={handleAction} />
        </>
      )}
    </div>
  );
  
}

export default App;
