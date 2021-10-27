import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { useEffect } from 'react';
import a from './data'

import Tentti_Kristian from './KristianinKansio/Tentti_Kristian';
import Tentti_Ville from "./VillenKansio/Tentti_Ville"

function App() {
  
  // TESTI: Kristian testailee

  return (
    <div>
      {/* <Tentti/> */}
      <Tentti_Kristian />
      <Tentti_Ville />
    </div>
  );
}

export default App;
