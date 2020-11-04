import React from 'react';
import './App.css';
import Quarto from './features/quarto/Quarto';

function App() {
  const appStyle = {
    background: '#536B78'
  }

  return (
    <div className="App" style={appStyle}>
      <Quarto />
    </div>
  );
}

export default App;
