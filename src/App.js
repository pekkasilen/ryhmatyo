import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { useEffect } from 'react';
import a from './data'

import TenttiKristian from './KristianinKansio/TenttiKristian';
import Tentti_Ville from "./VillenKansio/Tentti_Ville"

function App() {
  
  // TESTI: Kristian testailee

  return (
    <div>
      {/* <Tentti/> */}
      <TenttiKristian />
      <Tentti_Ville />
    </div>
  );
}

export default App;
