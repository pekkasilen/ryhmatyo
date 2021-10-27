/*  Kristian Asti
    27.10.2021
    Full Stack 2020-21

    Tenttisovellus-ryhmätyö, Kristianin toteutus
      Kysymyksen tulostamiseen komponentti
*/

import React, { useState, useEffect } from 'react';

const axios = require('axios');


function TulostaKysymykset(props) {

  let kysymykset = [...props.kysymykset];

  return (
    <div>
      {kysymykset.map((Q) => {
        <div>
        <p>{Q.kysymys}</p>
        <p>{Q.vastaus}</p>
        </div>
      })}
      {/*<p>{props.kysymys.kysymys}</p>
      <p>{props.kysymys.vastaus}</p>*/}
    </div>);
}

export default TulostaKysymykset;