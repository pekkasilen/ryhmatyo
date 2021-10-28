/*  Kristian Asti
    27.10.2021
    Full Stack 2021-22

    Tenttisovellus-ryhmätyö, Kristianin toteutus
*/

import React, { useState, useEffect } from 'react';
import { kysymykset } from './KristianData.js';

const axios = require('axios');


function TenttiKristian() {

  const [Kysymykset, setKysymykset] = useState(kysymykset);

  /*
  const [Kysymykset, setKysymykset]
    = useState([
      {
        kysymys: "Paljonko on 1 + 1?",
        vaihtoehdot: ["0", "1", "2", "3"],
        vastaukset: [false, false, true, false],
        CB: [false, false, false, false]
      }
    ]);
  */


  // Muutetaan CB:n arvoa käsitellyn kysymyksen kohdalla.
  const checkBox = (kysymysIndeksi, vastausIndeksi) => {
    let uusiVastaus = [...Kysymykset];
    let uusiCB = uusiVastaus[kysymysIndeksi].CB;
    uusiCB[vastausIndeksi] = !uusiCB[vastausIndeksi];

    setKysymykset(uusiVastaus);
    console.log(Kysymykset[kysymysIndeksi].CB);
  };

  const onkoOikein = (kysymysIndeksi) => {
    let oikeatVastaukset = Kysymykset[kysymysIndeksi].vastaukset;
    let annetutVastaukset = Kysymykset[kysymysIndeksi].CB;

    if (oikeatVastaukset.every((e, i) => e === annetutVastaukset[i])) {
      return "Nappiin meni!";
    } else {
      return "Valitettavasti pieleen..."
    }
  }


  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <hr></hr>
      {Kysymykset.map((Q, Qind) =>
        <div key={Qind}>
          <p>{Q.kysymys}</p>
          {Q.vaihtoehdot.map((V, Vind) =>
            <div key={Vind}>
              <input type="checkbox" id={V}
                onChange={() => checkBox(Qind, Vind)}></input>
              <label htmlFor={V}>{V}</label>
            </div>)}
          <p>{onkoOikein(Qind)}</p>
          <p>
            <br></br>
          </p>
        </div>
      )}
      <hr></hr>
    </div>
  );
}

export default TenttiKristian;