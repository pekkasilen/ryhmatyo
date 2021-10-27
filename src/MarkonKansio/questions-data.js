export let questions = [
    {   id:1,
        category: javascript,
        question:"Mitä muuttujan näkyvyysalue tarkoittaa?",
        answer: [
        {1:"Sitä, kuinka kaukaa muuttuja näkyy ilman kaukoputkea tai kiikareita"},
        {2:"Sitä, missä kohtaa ohjelmaa muuttujaa voi käyttää"},
        {3:"Sitä, miten helppo muuttujien käyttöä on synkronoida säikeiden kesken"},
        {4:"Sitä, miten helppo muuttujia on käyttää eri ohjelman osista"},
        {5:"Sitä, miten helppo muuttujien käyttöä on synkronoida säikeiden kesken"}
        ],
        correct1:1,
        // if multiple?
        correct2:null
    },
    {   id:2,
        category: javascript,
        question:"Luokkien hyvä puoli on, että",
        answer: [
            {1:"niiden avulla koodia on helpompi moduloida"},
            {2:"niden avulla on helppo uudelleenkäyttää ohjelmakoodia"},
            {3:"niiden avulla on helppo kirjoittaa koodia, joka tukee hyvin kompositiota"},
            {4:"ne tarjoavat hyvän abstraktion kaikkeen mahdolliseen"},
            {5:"niiden avulla on helppo kirjoittaa monisäikeisiä sovelluksia"}
            ],
        correct1:4,
        // if multiple?
        correct2:null
    }]

    // app:n alkuun
    // import { questions } from './questions-data';

