import React, {useState} from 'react'
import Data_Ville from "./Data_Ville.json"
import Vastaukset from "./Vastaukset.json"
import { Box, Checkbox, Container} from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FactCheckIcon from '@mui/icons-material/FactCheck';

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
        if (kysymysTeksti === "") {
            alert("Tyhjä kysymys!")
        } else {
        tentti.push({kysymys: kysymysTeksti, väittämät: [{väittämä: "haluamasi väittämä",CB: false}]})
        setTentti([...tentti])
        setKysymysTeksti("")}
    }

    const tallennaTentti = () => {
        alert("Tallennettiin localStorageen")
        localStorage.setItem("Villen",JSON.stringify(tentti))
        // ehkä joku osaa muokata tuota data filua?
    }

    const testaaTentti = () => {
        (JSON.stringify(tentti) === JSON.stringify(Vastaukset))?alert("KAIKKI OIKEIN!!"):alert("VÄÄRIN MENI!")
    }

    const näytäVastaukset = () => {
        setTentti(Vastaukset)
    }

    return (
        <Container className="ContainerMUI" maxWidth="sm">
            <Box sx={{  height: "auto" }}  >
            <Tooltip title="Admin moodi"><IconButton onClick={() => setLupa(!lupa)} aria-label="admin"><AdminPanelSettingsIcon /></IconButton></Tooltip>
           {tentti.map((itemX, indexX) => 
           <div className="QuestionCardView">
               {lupa === false && <Tooltip title="Poista kysymys"><IconButton onClick={() => poistaKysymys(indexX)} aria-label="delete"><DeleteIcon className="PoistaKysymys" /></IconButton></Tooltip>}
               <h3 className="InputKysymys">{itemX.kysymys}</h3>
               
               <div className="Container">
                   {itemX.väittämät.map((item, index) => 
                   <div className="Question">
                       <Checkbox onClick={() => checkBoxPainettu(item)} checked={item.CB} type="checkbox"></Checkbox>
                       <input className="Väittämät" onChange={(e) => setVäittämäTeksti(e.target.value, item)} disabled={lupa} type="text" placeholder={item.väittämä}></input>
                       {lupa === false && <Tooltip title="Tallenna väittämä"><IconButton onClick={() => muokkaaVäittämä(item)} aria-label="save"><SaveIcon className="TallennaVäittämä" /></IconButton></Tooltip>}
                       {lupa === false && <Tooltip title="Poista väittämä"><IconButton onClick={() => poistaVäittämä(itemX, index)} aria-label="delete"><DeleteIcon className="TallennaVäittämä" /></IconButton></Tooltip>}
                    </div>)}
                    {lupa === false && <Tooltip title="Lisää väittämä"><IconButton onClick={() => lisääVäittämä(itemX)} aria-label="add"><AddCircleIcon /></IconButton></Tooltip>}
                    
                </div>
            </div>)}
            <div className="QuestionCardView">
            {lupa === false && <input value={kysymysTeksti} onChange={(e) => setKysymysTeksti(e.target.value)} type="text" placeholder="haluamasi kysymys"></input>}
            {lupa === false && <Tooltip title="Lisää kysymys"><IconButton onClick={lisääKysymys} aria-label="add"><AddCircleIcon /></IconButton></Tooltip>}
            
            </div>
            <Tooltip title="Tallenna localStorageen"><IconButton onClick={tallennaTentti} aria-label="save"><SaveIcon /></IconButton></Tooltip>
            <Tooltip title="Testaa osuitko oikeaan"><IconButton onClick={testaaTentti} aria-label="testaa"><AssignmentTurnedInIcon /></IconButton></Tooltip>
            {lupa === false && <Tooltip title="Katso oikeat vastaukset"><IconButton onClick={näytäVastaukset} aria-label="vastaukset"><FactCheckIcon /></IconButton></Tooltip>}
            
            
        </Box>
      
        </Container>
    )
}

export default Tentti_Ville
