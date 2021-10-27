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
        vastaukset: [false, false, true, false],
        CB: [false, false, false, false]
        /*
        vaihtoehdot: [
          ["0", false, false],
          ["1", false, false],
          ["2", true, false],
          ["3", false, false]
        ]
        */
      },
      {
        kysymys: "Minä vuonna Suomi itsenäistyi?",
        vaihtoehdot: ["1917", "1918", "1919", "1995"],
        vastaukset: [true, false, false, false],
        CB: [false, false, false, false]
        /*
        vaihtoehdot: [
          ["1917", true, false],
          ["1918", false, false],
          ["1919", false, false],
          ["1995", false, false]
        ]
        */
      }
    ]);


  const checkBox = (kysymysIndeksi, vastausIndeksi) => {
    console.log(kysymysIndeksi, vastausIndeksi);
    let uusiVastaus = [...Kysymykset];
    console.log(uusiVastaus[0].CB)
    
  };


  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <hr></hr>
      {Kysymykset.map((Q, Qind) =>
        <div key={Qind}>
          {Q.kysymys}
          {Q.vaihtoehdot.map((V, Vind) =>
            <div key={Vind}>
              <p>
                <input type="checkbox" id={V}
                  onChange={() => checkBox(Qind, Vind)}></input>
                <label for={V}>{V}</label>
              </p>
            </div>)}
        </div>
      )}
      <hr></hr>
    </div>
  );

  /*
  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <hr></hr>
      <TulostaKysymys kysymykset={Kysymykset}
        setKysymykset={setKysymykset}></TulostaKysymys>
      <hr></hr>
    </div>
  );
  */
}

export default Tentti_Kristian;