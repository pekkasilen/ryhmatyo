export let questions = [
    {   id:1,
        category: "javascript",
        question:"Mitä muuttujan näkyvyysalue tarkoittaa?",
        answer: [
        {id:1, answ:"Sitä, kuinka kaukaa muuttuja näkyy ilman kaukoputkea tai kiikareita"},
        {id:2, answ:"Sitä, missä kohtaa ohjelmaa muuttujaa voi käyttää"},
        {id:3, answ:"Sitä, miten helppo muuttujien käyttöä on synkronoida säikeiden kesken"},
        {id:4, answ:"Sitä, miten helppo muuttujia on käyttää eri ohjelman osista"},
        {id:5, answ:"Sitä, miten helppo muuttujien käyttöä on synkronoida säikeiden kesken"}
        ],
        correct: [2 ,4]
    },
    {   id:2,
        category: "javascript",
        question:"Luokkien hyvä puoli on, että",
        answer: [
            {id:1, answ:"niiden avulla koodia on helpompi moduloida"},
            {id:2, answ:"niden avulla on helppo uudelleenkäyttää ohjelmakoodia"},
            {id:3, answ:"niiden avulla on helppo kirjoittaa koodia, joka tukee hyvin kompositiota"},
            {id:4, answ:"ne tarjoavat hyvän abstraktion kaikkeen mahdolliseen"},
            {id:5, answ:"niiden avulla on helppo kirjoittaa monisäikeisiä sovelluksia"}
            ],
        correct: [2 ,5]
    }]

    // app:n alkuun
    // import { questions } from './questions-data';

