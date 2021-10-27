//import './App.css';
import { questions } from './questions-data';
import React from 'react';

function Markon() {

  return (
    <>
      {questions.map((q) =>
        <table key={q.id}>
          <thead>
            <tr><th>{q.question}</th></tr>
          </thead>
          <tbody>
            {q.answer.map(a =>
              <tr key={a.id}><td >
                <input type="checkbox" id={a.id} ></input>{a.answ}
              </td></tr>
            )}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Markon;