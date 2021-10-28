import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { useEffect } from 'react';
import a from './data'

import TenttiKristian from './KristianinKansio/TenttiKristian';
import Marko from './MarkonKansio/Markon'
import PekanTentti from './pekankansio/PekanTentti'
import Tentti_Ville from "./VillenKansio/Tentti_Ville"

function App() {

  const [sovellus, setSovellus] = useState("")
  
  const funktio = () => {
    switch (sovellus) {
      case "Kristian": return <TenttiKristian/>
      case "Marko": return <Marko/>
      case "Pekka": return <PekanTentti/>
      case "Ville": return <Tentti_Ville/>
      default: return <h1 className="QuestionCardView">Valitse yllä olevasta valikosta haluamasi demo</h1>
    }
  }
  
  return (
    <div>
          <select onChange={e => setSovellus(e.target.value)}>
            <optgroup label="Sovellus">
              <option value="Default">Nothing</option>
              <option value="Kristian">Kristian</option>
              <option value="Marko">Marko</option>
              <option value="Pekka">Pekka</option>
              <option value="Ville">Ville</option>
            </optgroup>
          </select>
              {funktio()}   
    </div>
  );
}

export default App;
