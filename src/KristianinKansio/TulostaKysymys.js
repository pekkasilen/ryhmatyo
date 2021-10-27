/*  Kristian Asti
    27.10.2021
    Full Stack 2020-21

    Tenttisovellus-ryhmätyö, Kristianin toteutus
      Kysymyksen tulostamiseen komponentti
*/

import React, { useState, useEffect } from 'react';

const axios = require('axios');


function TulostaKysymys(props) {


  return (
    <div>
      <hr></hr>
      <p>KRISTIANIN TENTTIRENDERI</p>
      <p>{props.kysymys.kysymys}</p>
      <p>{props.kysymys.vastaus}</p>
      <hr></hr>
    </div>);
}

export default TulostaKysymys;