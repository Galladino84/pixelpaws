import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const StatusBar = ({ stats }) => {
  return (
    <div className="mb-4">
      <h5>Stato del tuo PixelPaws</h5>

      <div className="mb-1">Felicità</div>
      <ProgressBar now={stats.happiness} variant="success" className="mb-2" label={`${stats.happiness}%`} />

      <div className="mb-1">Fame</div>
      <ProgressBar now={stats.hunger} variant="warning" className="mb-2" label={`${stats.hunger}%`} />

      <div className="mb-1">Energia</div>
      <ProgressBar now={stats.energy} variant="info" label={`${stats.energy}%`} />
    </div>
  );
};

export default StatusBar;
