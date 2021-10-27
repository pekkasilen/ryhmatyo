//import './App.css';
import { questions } from './questions-data';
import React from 'react';

function Markon() {

  return (
    <>
    {questions.map((q) => <div> {q.question} </div>)}
    </>
  )
}

export default Markon;