import React, {useState} from 'react'
import Data_Ville from "./Data_Ville.json"
import { Box, Checkbox, Container} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';

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
        <Container className="ContainerMUI" maxWidth="sm">
            <Box sx={{  height: "auto" }}  >
            <button onClick={adminMode}>Admin mode</button>
           {tentti.map((itemX, indexX) => 
           <div className="QuestionCardView">
               <h3 className="InputKysymys">{itemX.kysymys}</h3>
               <div className="Container">
                   {itemX.väittämät.map((item, index) => 
                   <div className="Question">
                       <Checkbox onClick={() => checkBoxPainettu(item)} checked={item.CB} type="checkbox"></Checkbox>
                       <input className="Väittämät" onChange={(e) => setVäittämäTeksti(e.target.value, item)} disabled={lupa} type="text" placeholder={item.väittämä}></input>
                       {lupa === false && <IconButton onClick={() => muokkaaVäittämä(item)} aria-label="save"><SaveIcon /></IconButton>}
                       {lupa === false && <IconButton onClick={() => poistaVäittämä(itemX, index)} aria-label="delete"><DeleteIcon /></IconButton>}
                    </div>)}
                    {lupa === false && <IconButton onClick={() => lisääVäittämä(itemX)} aria-label="add"><AddCircleIcon /></IconButton>}
                    {lupa === false && <IconButton onClick={() => poistaKysymys(indexX)} aria-label="delete"><DeleteIcon /></IconButton>}
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
