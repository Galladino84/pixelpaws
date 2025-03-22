import React from 'react';
import { Button } from 'react-bootstrap';

const ActionButtons = ({ onAction }) => {
  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap">
      <Button variant="warning" onClick={() => onAction("feed")}>🍼 Cibo</Button>
      <Button variant="primary" onClick={() => onAction("pet")}>🤗 Coccole</Button>
      <Button variant="success" onClick={() => onAction("play")}>🎾 Gioca</Button>
      <Button variant="secondary" onClick={() => onAction("sleep")}>😴 Dormi</Button>
    </div>
  );
};

export default ActionButtons;
