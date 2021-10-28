import React, {useState} from 'react'
import Data_Ville from "./Data_Ville.json"

function Tentti_Ville() {

    const [tentti,setTentti] = useState(Data_Ville)
    const [kysymysTeksti, setKysymysTeksti] = useState("")
    const [hidden1,setHidden1] = useState (true)
    const [hidden2,setHidden2] = useState (true)
    const [hidden3,setHidden3] = useState (true)
    const [hidden4,setHidden4] = useState (true)
    const [hidden5,setHidden5] = useState (true)

    const checkBoxPainettu = (item) => {
        item.CB = !item.CB
        setTentti([...tentti])
    }

    const muokkaaVäittämä = (item) => {
        console.log(item.väittämä);
        item.väittämä = "muutostesti1234" // tähän tietysti input
        setTentti([...tentti])
    }

    const poistaVäittämä = (itemX, index) => {
        itemX.väittämät.splice(index,1)
        setTentti([...tentti]);        
    }

    const lisääVäittämä = (item) => {
        item.väittämät.push({väittämä: 'lisäätesti1234', CB: false})
        setTentti([...tentti])
    }

    const poistaKysymys = (itemX, indexX) => {
        tentti.splice(indexX,1)
        setTentti([...tentti])
    }

    const lisääKysymys = () => {
        tentti.push({kysymys: kysymysTeksti, väittämät: []})
        setTentti([...tentti])
    }

    const tallennaTentti = () => {
        alert("Tällä hetkellä Tallenna tentti ei tee mitään")
        // ehkä joku osaa muokata tuota data filua?
    }

    const adminMode = () => {
        setHidden1(!hidden1)
        setHidden2(!hidden2)
        setHidden3(!hidden3)
        setHidden4(!hidden4)
        setHidden5(!hidden5)
    }

    return (
        <div>
        <button onClick={adminMode}>Admin mode</button>
           {tentti.map((itemX, indexX) => 
           <div className="QuestionCardView">
               {itemX.kysymys}
               <div className="Container">
                   {itemX.väittämät.map((item, index) => 
                   <div className="Question">
                       <input onClick={() => checkBoxPainettu(item)} checked={item.CB} type="checkbox"></input>
                       <p>{item.väittämä}</p>
                       <div hidden={hidden5}><button  onClick={() => muokkaaVäittämä(item)}>Muokkaa väittämä</button></div>
                       <div hidden={hidden1}><button  onClick={() => poistaVäittämä(itemX, index)}>Poista väittämä</button></div>
                    </div>)}
                    <button onClick={() => lisääVäittämä(itemX)} hidden={hidden2}>Lisää väittämä</button>
                    <button onClick={() => poistaKysymys(itemX, indexX)} hidden={hidden3}>Poista kysymys</button>
                </div>
            </div>)}
            <div hidden={hidden4}>
            <input value={kysymysTeksti} onChange={(e) => setKysymysTeksti(e.target.value)} hidden={false} type="text" placeholder="Tähän annetaan kysymys"></input>
            <button onClick={lisääKysymys}>Lisää kysymys</button>
            
            </div>
            <button onClick={tallennaTentti}>Tallenna tentti</button>
        </div>
    )
}

export default Tentti_Ville
