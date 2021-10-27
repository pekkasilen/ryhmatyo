import React from 'react'
import Data_Ville from "./Data_Ville.json"

function Tentti_Ville() {
    return (
        <div>
           {Data_Ville.map(item => 
           <div className="QuestionCardView">
               {item.kysymys}
               <div className="Container">
                   {item.väittämät.map(item => 
                   <div className="Question">
                       <input checked={item.CB} type="checkbox"></input>
                       {item.väittämä}
                    </div>)}
                </div>
            </div>)}
        </div>
    )
}

export default Tentti_Ville
