//import './App.css';
// import { questions } from './questions-data';
import questions from './questions-data.json';
import React, { useState } from 'react';

function Markon() {
  const muistiTila = window.localStorage;
  const [checkedList, setCheckedList] = useState((muistiTila.getItem("c"))!==null?JSON.parse(muistiTila.getItem("c")):[]);
  const [oikein, setOikein] = useState(0);
  const [vaarin, setVaarin] = useState(0);
  const [nayta, setNayta] = useState(false);

  const muistiTilaCheck = (qid, aid) => {
    if((muistiTila.getItem("c"))===null) return false
    if (checkedList.includes(qid + aid)) { 
      return true; 
    }
    else { 
      return false; 
    }
  }

  const muistiTilaSet = (qid, aid) => {
    if (checkedList.includes(qid + aid)) { 
      setCheckedList(checkedList.filter(a => (a !== qid + aid))); 
      muistiTila.setItem("c",JSON.stringify(checkedList.filter(a => (a !== qid + aid))));
      return; 
    }
    else { 
      setCheckedList([...checkedList, qid + aid]) 
      muistiTila.setItem("c",JSON.stringify([...checkedList, [qid + aid]]));
    }
  }

  const check = () => {
    let correct = ([questions.map((q) => q.correct).join(',')]+ '').split(",") ;
    let oik = 0;
    let vaar = 0;
    checkedList.map(i=>correct.includes(i)?oik++:vaar++)
    setOikein(oik);
    setVaarin(vaar)
    setNayta(true)
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
                <input type="checkbox" checked={muistiTilaCheck(q.id, a.id)} onChange={()=>muistiTilaSet(q.id, a.id)} ></input>
                {a.answ}
              </td></tr>
            )}
          </tbody>
        </table>
      )}
      <button onClick={() => check()}>Testaa vastaukset</button>
      <button onClick={() => {muistiTila.removeItem("c"); setNayta(false); setCheckedList([]);}}>Tyhjää vastaukset</button>
      {nayta && <><div>Oikeat vastaukset: {oikein}</div><div>Väärät vastaukset: {vaarin}</div></> }
    </>
  )
}

export default Markon;