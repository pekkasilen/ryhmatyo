//import './App.css';
// import { questions } from './questions-data';
import questions from './questions-data.json';
import React, { useState } from 'react';

function Markon() {

  const [clickedList, setClickedList] = useState([]);
  const clickedStorage = window.localStorage;

  const isOnList = (qid, aid) => {
    if(clickedStorage.getItem(1)===null) return false
    if (clickedStorage.getItem(1).includes(qid + "-" + aid)) { 
      return true; 
    }
    else { 
      return false; 
    }
  }

  const clicked = (qid, aid) => {
    if (clickedList.includes(qid + "-" + aid)) { 
      setClickedList(clickedList.filter(a => (a !== qid + "-" + aid))); 
      clickedStorage.setItem(1,clickedList.filter(a => (a !== qid + "-" + aid)));
      return; 
    }
    else { 
      setClickedList([...clickedList, qid + "-" + aid]) 
      clickedStorage.setItem(1,[...clickedList, qid + "-" + aid]);
    }
  }

  const check = () => {
    let correct = [questions.map((q) => q.correct).join(',')];
    console.log("correctAnswersList: " + correct);
    console.log("clickedList: " + clickedList);
    if(clickedStorage.getItem(1)===null) return
    console.log("localStorage: " + clickedStorage.getItem(1));
  }

  const empty = () => {
  clickedStorage.setItem(1,[]);
  }

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
                <input type="checkbox" checked={isOnList(q.id, a.id)} onClick={() => clicked(q.id, a.id)} id={q.id + "-" + a.id} readOnly></input>{a.answ}
              </td></tr>
            )}
          </tbody>
        </table>
      )}
      <button onClick={() => check()}>Testaa vastaukset</button>
      <button onClick={() => empty()}>Tyhjää vastaukset</button>
    </>
  )
}

export default Markon;