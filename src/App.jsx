import { useState } from 'react';
import './App.css';
import { Clock } from './layout/Clock';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <div className="App">
        <Clock />
        <Analytics />
      </div>
    </>
  );
}

export default App;
