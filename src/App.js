import { YMaps, Map, Polyline, Placemark } from '@pbe/react-yandex-maps'
import { useCallback, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [addresses, setAddresses] = useState([])
  const [text, setText] = useState('')

  const fetchCoords = useCallback((text) => {
    return fetch(
      `http://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${text}&results=1`,
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data.response.GeoObjectCollection.featureMember[0].GeoObject
          .Point.pos
      })
      .then((coords) => {
        return coords.split(' ').reverse()
      })
  }, [])

  const addAddress = async (evt) => {
    if (evt.key === 'Enter' && text.trim().length) {
      const coords = await fetchCoords(text)
      setAddresses([
        ...addresses,
        {
          text,
          id: nanoid(),
          coords,
        },
      ])
    }
  }

  const getGeometry = (addresses) => {
    const geometry = []

    addresses.forEach((a) => geometry.push(a.coords))

    return geometry
  }

  return (
    <>
      <label>
        <input
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          onKeyDown={addAddress}
        ></input>
      </label>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>{address.text}</li>
        ))}
      </ul>
      <YMaps>
        <div>my app with map</div>
        <Map
          width={'50%'}
          height={'100vh'}
          state={{ center: [55.75, 37.61], zoom: 11 }}
        >
          <Polyline geometry={getGeometry(addresses)}></Polyline>
          {addresses.map((address) => (
            <Placemark
              key={address.id}
              modules={['geoObject.addon.balloon']}
              geometry={address.coords}
              options={{ draggable: true }}
              properties={{
                balloonContentBody: `${address.text}`,
              }}
              onDragEnd={(evt) => setAddresses(prev => prev.map(a => {
                if(a.id === address.id) {
                  return {
                    ...a,
                    coords: evt.get('target').geometry.getCoordinates(),
                  }
                }
                return a
              }))}
            />
          ))}
        </Map>
      </YMaps>
    </>
  )
}

export default App
