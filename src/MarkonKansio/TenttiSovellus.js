import './App.css';
import React, { useState, useEffect } from 'react';
import Tentti from './Tentti';
import uudet from './uudet.json';
import dataService from './services/dataService';
// const axios = require('axios').default;

function Markon() {
  const [dataNoudettu, setDataNoudettu] = useState(false)
  const [tentit, setTentit] = useState()
  const [valittuIndex, setValittuIndex] = useState()
  const [valittuID, setValittuID] = useState()
  const [adminMode, setAdminMode] = useState(true)
  const [numero, setNumero] = useState(0)
  const uudetKys = uudet

  const [errorMessage, setErrorMessage] = useState("");

  const handleError = () => {
    if (errorMessage !== "") {
      const timer = setTimeout(() => { lisaaAihe(); setErrorMessage(""); }, 2000);
      return () => clearTimeout(timer);
    }
  }
  useEffect(handleError, [errorMessage]) //eslint-disable-line

  useEffect(() => {
    if (!dataNoudettu) {
      dataService //> json-server --watch db.json --port 3001
        .getExams()
        .then(response => {
          console.log("promise fulfilled", response);
          if (!Object.keys(response).length) {
            setErrorMessage("tietokanta palautti tyhjää")
            setValittuID()
          } else {
            setTentit(response)
          }
          setDataNoudettu(true)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, [dataNoudettu])

  const poistaKysymys = (id) => {
    dataService //> json-server --watch db.json --port 3001
      .removeExam(id)
      .then(response => {
        console.log("aihe poistettiin", response);
        setDataNoudettu(false)
        setValittuID()
        setValittuIndex()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  const lisaaAihe = (uudetKys) => {
    let exam = { aihe: "Uusi Aihe", kysymykset: [] }
    if (uudetKys !== undefined) {
      exam = uudetKys;
      if (numero === (uudet.length-1)) { setNumero(0) } else { setNumero(numero + 1) }
    }
    dataService //> json-server --watch db.json --port 3001
      .addExam(exam)
      .then(response => {
        console.log("aihe lisättiin", response);
        setDataNoudettu(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
      });
  }

  const tekstiOrNot = () => {
    try { return tentit[valittuIndex].aihe }
    catch (e) { return "-ei valittu-" }
  }

  if (errorMessage !== "") return (<> <p>{errorMessage}</p></>)
  return (
    <div>
      {(dataNoudettu === true) && <div>{tentit.map((item, index) => <button key={index} onClick={() => 
        { setValittuIndex(index); setValittuID(item.id); }}>{item.aihe} </button>)}
        &nbsp;&nbsp;
        <button onClick={() => setAdminMode(!adminMode)} value="Editointi">Editointi <span style={{ fontWeight: "bold" }}>{adminMode ? " ON" : " OFF"}</span></button>
        <br />
        {(valittuID !== undefined) && <button onClick={() => poistaKysymys(valittuID)}>Poista {tekstiOrNot()} (DELETE)</button>}
        <button onClick={() => lisaaAihe()}>Lisää Aihe (POST)</button>
        <button onClick={() => lisaaAihe(uudetKys[numero])}>Lisää Tentti (POST FROM JSON)</button>
        <br />
        {(valittuIndex !== undefined) && <Tentti 
        dataService={dataService} 
        tenttiValinta={tentit[valittuIndex]} 
        setDataNoudettu={setDataNoudettu} 
        setValittuID={setValittuID}
        setValittuIndex={setValittuIndex}
        tenttiID={valittuID} 
        tenttiIndex={valittuIndex} 
        tentit={tentit} 
        adminMode={adminMode} 
        />}
      </div>}
    </div>
  );
}

export default Markon;