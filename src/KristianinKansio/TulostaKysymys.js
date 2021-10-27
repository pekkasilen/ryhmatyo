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
      {props.kysymykset.map(Q =>
        <div>
          {Q.kysymys}
          <p>
            {Q.vaihtoehdot.map(V =>
              <div>
                {V}
              </div>)}
          </p>
        </div>
      )}
    </div>
  );
}

export default TulostaKysymys;