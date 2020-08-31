import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import PlanetDescription from "./PlanetDescription";

function App() {

    const [character, setCharacter] = useState(null)
    const [planet, setPlanet] = useState(null)
    const [characterId, setCharacterId] = useState("")

    function handleChangeCharacterId(event) {
        setCharacterId(event.target.value)
    }

    function loadCharacter() {
        Axios.get("https://swapi.dev/api/people/"+characterId)
            .then(function (response){
                setCharacter(response.data)
                loadHomeworld(response.data)
            })
    }

    function loadHomeworld(characterData) {
        Axios.get(characterData.homeworld)
            .then(
                ({data}) => setPlanet(data) // response => setPlanet(response.data)
            )
    }
    return (
        <div className="App">
            <input type="number" value={characterId} onChange={handleChangeCharacterId}/>
            <button onClick={loadCharacter}>Chercher</button>
            {character?<h1>{character.name}</h1>:""}
            {/*div>{JSON.stringify(planet)}</div>*/}
            {/*planet?<div>{planet.name}</div>:""*/}
            {planet?<PlanetDescription planetToDisplay={planet}/>:""}
        </div>
    );
}

export default App;
