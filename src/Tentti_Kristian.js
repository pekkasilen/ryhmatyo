/*  Kristian Asti
    27.10.2021
    Full Stack 2020-21

    Tenttisovellus-ryhmätyö, Kristianin toteutus
*/

import React, { useState, useEffect } from 'react';

const axios = require('axios');


function Tentti_Kristian() {

  const [kysymys, setKysymys]
    = useState({
      "kysymys": "Paljonko on 1 + 1",
      "vastaus": "2."
    });

}



return(
  <div>
    <p>{kysymys.kysymys}</p>
    <p>{kysymys.vastaus}</p>
  </div>
);

export default Tentti_Kristian;