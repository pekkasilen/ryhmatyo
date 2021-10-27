/*  Kristian Asti
    27.10.2021
    Full Stack 2020-21

    Tenttisovellus-ryhmätyö, Kristianin toteutus
*/

import React, { useState, useEffect } from 'react';
import TulostaKysymys from './TulostaKysymys';

const axios = require('axios');


function Tentti_Kristian() {

  const [kysymykset, setKysymykset]
    = useState([
      {
        "kysymys": "Paljonko on 1 + 1?",
        "vastaus": "2."
      },
      {
        "kysymys": "Minä vuonna Suomi itsenäistyi?",
        "vastaus": "Vuonna 1917."
      }
    ]);



  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <hr></hr>
      <TulostaKysymys kysymykset={kysymykset}></TulostaKysymys>
      <hr></hr>
    </div>
  );
}

export default Tentti_Kristian;