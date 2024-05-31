import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

let storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
console.log(storedIds)
const storedPlaces = storedIds.map((id) => {
  return AVAILABLE_PLACES.find(place => place.id == id)
})

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [avaiblePlaces, setAvaiblePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvaiblePlaces(sortedPlaces)
    })
  }, [])

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    let storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    let updatedStoredIds;
    if(storedIds.indexOf(id) === -1){
      updatedStoredIds = [id, ...storedIds]
      localStorage.setItem('selectedPlaces', JSON.stringify(updatedStoredIds))
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)

    // removing the selected place's id from 
    // selectedPlaces in local storage 
    let storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    const updatedStoredIds = storedIds.filter((id) => id !== selectedPlace.current)
    localStorage.setItem('selectedPlaces', JSON.stringify(updatedStoredIds))
    console.log("storedIds updated\n", updatedStoredIds)
  }

  return (
    <>
      <Modal open = {modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={avaiblePlaces}
          fallbackText="Sorting places by distance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
