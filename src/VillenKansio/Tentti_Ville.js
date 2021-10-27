import React from 'react'
import Data_Ville from "./Data_Ville.json"

function Tentti_Ville() {

    // Tässä pitäisi ottaa koppi datasta ja saada se sidottua tilaan eikä suoraan renderöidä.

    return (
        <div>
           {Data_Ville.map(item => 
           <div className="QuestionCardView">
               {item.kysymys}
               <div className="Container">
                   {item.väittämät.map(item => 
                   <div className="Question">
                       <input checked={item.CB} type="checkbox"></input>
                       <p>{item.väittämä}</p>
                       <button hidden={true}>Poista väittämä</button>
                    </div>)}
                    <button hidden={true}>Lisää väittämä</button>
                </div>
            </div>)}
            <input hidden={true} type="text" placeholder="Tähän annetaan kysymys"></input>
            <button hidden={true}>Lisää kysymys</button>
        </div>
    )
}

export default Tentti_Ville
