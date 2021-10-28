/*  Kristian Asti
    28.10.2021
    Full Stack 2021-22

    Tenttisovellus-ryhmätyö, Kristianin toteutus
*/

import React, { useState } from 'react';
import { kysymykset } from './KristianData.js';


function TenttiKristian() {

  const [Tentti, setTentti] = useState(kysymykset);

  // Muutetaan CB:n arvoa käsitellyn kysymyksen kohdalla.
  const checkBox = (kysymysIndeksi, vastausIndeksi) => {
    let uusiTentti = [...Tentti];
    let uusiCB = uusiTentti[kysymysIndeksi].CB;
    uusiCB[vastausIndeksi] = !uusiCB[vastausIndeksi];
    setTentti(uusiTentti);
    console.log(Tentti[kysymysIndeksi].CB);
  };

  const onkoOikein = (kysymysIndeksi) => {
    let oikeatVastaukset = Tentti[kysymysIndeksi].vastaukset;
    let annetutVastaukset = Tentti[kysymysIndeksi].CB;

    if (oikeatVastaukset.every((e, i) => e === annetutVastaukset[i])) {
      return "Nappiin meni!";
    } else {
      return "Valitettavasti pieleen..."
    };
  };

  const poistaTentti = () => {
    localStorage.clear();
    alert("Tallennettu tentti poistettu.");
  };

  const tallenaTentti = () => {
    localStorage.setItem("Kristian", JSON.stringify(Tentti));
    alert("Tentti tallennettu!");
  };

  const lataaTentti = () => {
    let setti = localStorage.getItem("Kristian");
    if (setti === null) {
      alert("Ei tallennettua tenttiä!")
    } else {
      setTentti([...JSON.parse(setti)]);
    };
  };

  const tyhjennaTentti = () => {
    let tyhjaTentti = [...Tentti];
    tyhjaTentti.forEach(Q => {
      Q.CB.forEach((_, cbInd, cbArray) => cbArray[cbInd] = false);
    });
    setTentti(tyhjaTentti);
  };


  return (
    <div>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <button onClick={tallenaTentti}>Tallenna tentti</button>
      <button onClick={lataaTentti}>Lataa tentti</button>
      <button onClick={tyhjennaTentti}>Tyhjennä tentti</button>
      <button onClick={poistaTentti}>Poista tallennettu tentti</button>
      <hr></hr>
      {Tentti.map((Q, Qind) =>
        <div key={Qind}>
          <p>{Q.kysymys}</p>
          {Q.vaihtoehdot.map((V, Vind) =>
            <div key={Vind}>
              <input type="checkbox" id={V} checked={Q.CB[Vind]}
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
};

export default TenttiKristian;