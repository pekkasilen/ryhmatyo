import React, {useState} from 'react'
import Data_Ville from "./Data_Ville.json"
import { Box, Divider, ListItemText, Paper, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";

function Tentti_Ville() {

    const [tentti,setTentti] = useState(localStorage.getItem("Villen") !== null?JSON.parse(localStorage.getItem("Villen")):Data_Ville)
    const [kysymysTeksti, setKysymysTeksti] = useState("")
    const [väittämäTeksti,setVäittämäTeksti] = useState("")
    const [lupa,setLupa] = useState (true)

    const checkBoxPainettu = (item) => {
        item.CB = !item.CB
        setTentti([...tentti])
    }

    const muokkaaVäittämä = (item) => {
        item.väittämä = väittämäTeksti
        setTentti([...tentti])
        setVäittämäTeksti("")
    }

    const poistaVäittämä = (itemX, index) => {
        itemX.väittämät.splice(index,1)
        setTentti([...tentti]);        
    }

    const lisääVäittämä = (item) => {
        item.väittämät.push({väittämä: "lisää väittämä", CB: false})
        setTentti([...tentti])
    }

    const poistaKysymys = (indexX) => {
        tentti.splice(indexX,1)
        setTentti([...tentti])
    }

    const lisääKysymys = () => {
        tentti.push({kysymys: kysymysTeksti, väittämät: []})
        setTentti([...tentti])
    }

    const tallennaTentti = () => {
        alert("Tallennettiin localStorageen")
        localStorage.setItem("Villen",JSON.stringify(tentti))
        // ehkä joku osaa muokata tuota data filua?
    }

    const adminMode = () => {
        setLupa(!lupa)
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: "auto" }}  >
            <button onClick={adminMode}>Admin mode</button>
           {tentti.map((itemX, indexX) => 
           <div className="QuestionCardView">
               <input disabled={lupa} type="text" placeholder={itemX.kysymys}></input>
               <div>
                   {itemX.väittämät.map((item, index) => 
                   <div className="Question">
                       <Checkbox onClick={() => checkBoxPainettu(item)} checked={item.CB} type="checkbox"></Checkbox>
                       <input onChange={(e) => setVäittämäTeksti(e.target.value, item)} disabled={lupa} type="text" placeholder={item.väittämä}></input>
                       <div hidden={lupa}><button onClick={() => muokkaaVäittämä(item)}>Tallenna muutokset</button></div>
                       <div hidden={lupa}><button onClick={() => poistaVäittämä(itemX, index)}>Poista väittämä</button></div>
                    </div>)}
                    <button onClick={() => lisääVäittämä(itemX)} hidden={lupa}>Lisää väittämä</button>
                    <button onClick={() => poistaKysymys(indexX)} hidden={lupa}>Poista kysymys</button>
                </div>
            </div>)}
            <div hidden={lupa}>
            <input value={kysymysTeksti} onChange={(e) => setKysymysTeksti(e.target.value)} type="text" placeholder="Tähän annetaan kysymys"></input>
            <button onClick={lisääKysymys}>Lisää kysymys</button>
            
            </div>
            <button onClick={tallennaTentti}>Tallenna tentti</button>
            
        </Box>
      
        </Container>
    )
}

export default Tentti_Ville
