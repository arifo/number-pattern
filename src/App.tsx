import React, { ChangeEvent, useState } from 'react';

import './App.css';
import { parseId } from './parseId';

const isValid = (str: string) => {
  if (!str) {
    return false;
  }
  if (str.length !== 6) {
    return false;
  }
  const hasNonDigit = /\D/.test(str);
  if (hasNonDigit) {
    return false;
  }
  return true;
};

function App() {
  const [val, setVal] = useState('');
  const [info, setInfo] = useState<{
    pattern: string;
    price: string;
    tier: string;
    example: string;
  }>();
  return (
    <div className="App">
      <div>Enter ID</div>
      <input
        maxLength={6}
        type="text"
        placeholder="check id"
        value={val}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInfo(undefined);
          setVal(e.target.value);
        }}
      />
      <p>{val ? (isValid(val) ? '' : 'Invalid ID string') : ''}</p>
      <div>
        <button
          onClick={() => {
            if (isValid(val)) {
              setInfo(parseId(val));
            }
          }}
        >
          get pattern
        </button>
        <button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            setInfo(undefined);
            setVal('');
          }}
        >
          clear
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15px',
          minWidth: '250px',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'block', textAlign: 'right', marginRight: '5px' }}>
          <div>pattern: </div>
          <div>tier: </div>
          <div>price: </div>
          <div>example: </div>
        </div>
        <div style={{ display: 'block' }}>
          <div>{info?.pattern}</div>
          <div>{info?.tier}</div>
          <div>{info?.price}</div>
          <div>{info?.example}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
