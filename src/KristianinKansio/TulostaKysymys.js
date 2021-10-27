/*  Kristian Asti
    27.10.2021
    Full Stack 2020-21

    Tenttisovellus-ryhmätyö, Kristianin toteutus
      Kysymyksen tulostamiseen komponentti
*/

import { CheckRounded } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const axios = require('axios');


function TulostaKysymys(props) {

  return (
    <div>
      {props.kysymykset.map(Q =>
        <div key={Q.id}>
          {Q.kysymys}
          {Q.vaihtoehdot.map(V =>
            <div key={V.id}>
              <p>
                <input type="checkbox" id={V} checked={false}
                  onClick={null}></input>
                <label for={V}>{V}</label>
              </p>
            </div>)}
        </div>
      )}
    </div>
  );
}

export default TulostaKysymys;