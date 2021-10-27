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
                       <button>Roskapönttö</button>
                    </div>)}
                </div>
            </div>)}
        </div>
    )
}

export default Tentti_Ville
