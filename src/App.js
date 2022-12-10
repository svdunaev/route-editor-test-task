import { YMaps, Map, Polyline } from '@pbe/react-yandex-maps';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [addresses, setAddresses] = useState([]);
  const [text, setText] = useState('');

  const addAddress = (evt) => {
    if (evt.key === 'Enter' && text.trim().length) {
      setAddresses([
        ...addresses,
        {
          text,
          id: nanoid(),
        }
      ])
    }
  }


  return (
    <>
      <label>
        <input value={text} onChange={(evt) => setText(evt.target.value)} onKeyDown={addAddress} ></input>
      </label>
      <ul>
        {
          addresses.map(a => <li key={a.id}>{a.text}</li>)
        }
      </ul>
      <YMaps>
        <div>my app with map</div>
        <Map defaultState={{center:[55.75, 37.57], zoom: 9}} >
          <Polyline geometry={[[55.8, 37.5], [55.8, 37.4], [55.7, 37.5], [55.7, 37.4], [55.757941, 37.607341]]} ></Polyline>
        </Map>
      </YMaps>
    </>    
  );
}

export default App;
