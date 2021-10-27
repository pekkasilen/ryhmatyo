/*  Kristian Asti
    27.10.2021
    Full Stack 2020-21

    Tenttisovellus-ryhmätyö, Kristianin toteutus
*/

import React, { useState, useEffect } from 'react';
import TulostaKysymys from './TulostaKysymys';

const axios = require('axios');


function Tentti_Kristian() {

  const [Kysymykset, setKysymykset]
    = useState([
      {
        kysymys: "Paljonko on 1 + 1?",
        vaihtoehdot: ["0", "1", "2", "3"],
        vastaus: "2."
      },
      {
        kysymys: "Minä vuonna Suomi itsenäistyi?",
        vaihtoehdot: ["1917", "1918", "1919", "1995"],
        vastaus: "Vuonna 1917."
      }
    ]);

  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <hr></hr>
      <TulostaKysymys kysymykset={Kysymykset}></TulostaKysymys>
    </div>
  );



  /*
  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <hr></hr>
      {Kysymykset.map(Q => 
        <div>
          <p>{Q.kysymys}</p>
          <p>{Q.vastaus}</p>
        </div>
      )}
      <hr></hr>
    </div>
  );
  */
}

export default Tentti_Kristian;