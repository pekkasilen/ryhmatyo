import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import kys from './data.json';
import { TextField, ButtonGroup, Divider, ListItemText, Paper, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControlLabel, FormControl, RadioGroup, Radio, FormLabel} from "@mui/material";
import { Box, Button, Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CheckBoxes = (props) => {
    //tarvitsee lisäehdon kolmannelle kierrokselle, koska tokalla alustetaan jo falseksi.
    /*const [checked, setChecked] = useState((localStorage.getItem((props.k.toString()+props.v.toString())))!=null
                                           ?eval(localStorage.getItem((props.k.toString()+props.v.toString())))
                                           :false);*/
    const [initialized, setInitialized] = useState(false);
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        if(initialized){
            console.log("called useEffect for "+props.k+" "+props.v)
            props.dispatch({"type":"handleChange", "qid":props.k,"vid":props.v});
        }else{
            setInitialized(true);
        }
    },[checked]);

    return(
      <FormControlLabel
        control={<Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          color="secondary"
          inputProps={{'aria-label': 'secondary checkbox'}}
          />
        }
        label={props.lab}
    />     
    )
  }

const Vastaus = (props) => {
    return (
        <div>
            <CheckBoxes lab={props.v.v} dispatch={props.dispatch} k={props.k} v={props.v.id}/>
        </div>
    )
}

const Kyssari = (props) => {

    //Tarvitsee myöhemmin autorisoinnin ja autentikaation, mutta ny vain truella
    return (
        <ListItemText>
            <Paper sx={{padding:3}} elevation={12}>
                {true && <Button variant="h5" onClick={()=> props.dispatch({"type": "editQuestion","qid":props.in.id, "k":props.in.kysymys,"v":props.in.vastaukset})}>{props.in.kysymys}</Button>}
                {false && <Typography variant="h5">{props.in.kysymys}</Typography>}

                {props.in.vastaukset.map((x,i)=> <Vastaus k={props.in.id} dispatch={props.dispatch} v={x} key={i}></Vastaus>)}
            </Paper>
                <Divider/>
        </ListItemText>
    )
}



export default function PekanTentti() {
    const m = 10; //max nr of Questions. 
    const n = 10; //max nr of Answer options.
    const [checks, setChecks] = useState(Array.from({length: m},()=> Array.from({length: n}, () => false)));
    const [open, setOpen] = useState(false);
    const [tempKyssari, setTempKyssari] = useState("");
    const [tempVastaukset, setTempVastaukset] = useState([]);
    const [tempIsCorrect, setTempIsCorrect] = useState([]);
    const [tempID, setTempID] = useState("");
    const [tempCorrects, setTempCorrects] = useState([]);
    const handleOpen = () =>{
        setOpen(true);
    }
    
    const handleClose = () =>{
        setTempKyssari("");
        setTempVastaukset([]);
        setTempID("");
        setTempCorrects([]);
        setOpen(false);
    }

    const dispatch = (props) => {
        console.log(props.d);
        switch(props.type){
            case "editQuestion":
                console.log("Editing q "+props.qid)
                setTempID(props.qid);
                setTempKyssari(props.k);
                setTempVastaukset(props.v.map((x)=> x.v));
                handleOpen();
                break;
            case "handleChange":
                var updateChecks = [...checks];
                updateChecks[props.qid-1][props.vid-1]=!checks[props.qid-1][props.vid-1] //manuaalinen deep-copy tarvitaan?
                setChecks(updateChecks);
                console.log(checks);
                localStorage.setItem(props.qid.toString()+props.vid.toString(),(!checks[props.qid-1][props.vid-1]).toString());
                break;
            case "handleSavingQuestion":
                var tallennettavaVastaus = tempVastaukset.map((x,i)=>{
                    const q = new Object();
                    q.id=(i+1);
                    q.v=x;
                    return q;
                })
                if(Number.isInteger(eval(tempID))){
                    var tid = eval(tempID);
                } else tid = kys.length+1;
                var valmisKyssari = {"id":tid,"kysymys":tempKyssari,"vastaukset":tallennettavaVastaus,"oikeat":tempCorrects};
                kys[tid-1] = valmisKyssari;
                handleClose();
                break;
        }

    }
        
    
    
    return(
        <div>
            <Typography variant="h5" color="primary">Kaikkien alojen erityisasiantuntijan tentti</Typography>
            <br/>
            
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Kysymys
                        </Typography>
                        <TextField id="uusikysymys"fullWidth={true} defaultValue={tempKyssari}></TextField>
                        <Button onClick={()=>{
                            var tk = document.getElementById("uusikysymys").value;
                            {/*var dobj = document.getElementById("tkys");
                        dobj.value=tk;*/}
                            setTempKyssari(tk);
                        }}>Tallenna kysymys</Button>
                        <br/>
                        
                        <Paper color="secondary" sx={{padding:3}} elevation={12}>
                            {/*<TextField id="tkys" fullWidth={true} variant="standard" size="small" defaultValue={tempKyssari}/>*/}
                            {tempVastaukset.map((x,i)=><TextField fullWidth={true} variant="standard" size="small" key={i} defaultValue={x}/>)}
                            <br/>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lisää uusi vastausvaihtoehto
                            </Typography>
                            <TextField id="tempv" fullWidth={true}>
                                
                            </TextField>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Vastaus</FormLabel>
                                <RadioGroup
                                    onChange={(e)=>setTempIsCorrect(e.target.value)}
                                    row aria-label="Kysymys"
                                    defaultValue="Väärin"
                                    name="radio-buttons-group">
                                    <FormControlLabel value="t" control={<Radio id="corValue"/>} label="Oikein"/>
                                    <FormControlLabel value="v" control={<Radio/>} label="Väärin"/>
                                </RadioGroup>
                            </FormControl>
                            <Button onClick={()=>{
                                var tv = [].concat(tempVastaukset);
                                tv.push(document.getElementById("tempv").value);
                                setTempVastaukset(tv);
                                var tc = [].concat(tempCorrects);
                                tc.push(tempIsCorrect);
                                setTempCorrects(tc);
                            }}>Tallenna uusi vaihtoehto</Button>
                        </Paper>
                        <br/>
                        <ButtonGroup variant="contained">
                            <Button color="secondary" onClick={()=> handleClose()}>Poistu tallentamatta</Button>
                            <Button color="primary" onClick={()=> dispatch({"type":"handleSavingQuestion"})}>Tallenna kysymys</Button>
                        </ButtonGroup>
                    </Box>
                </Modal>
            
            <Grid container spacing={1}>
                </Grid>
                    <Grid item xs={12} key={1}>
                        {kys.map((x,i)=> <Kyssari in={x} key={i} dispatch={dispatch}></Kyssari>)}
                    </Grid>
                <Grid>
            </Grid>
            <br/>
            
            <ButtonGroup orientation="horizontal" size="large">
                <Button variant="outlined" onClick={()=> handleOpen()}>Lisää uusi kysymys</Button>
                <Button color="secondary">Peru koko shaisse</Button>
                <Button color="primary">Lähetä tentti</Button>
            </ButtonGroup>
        </div>
    );

    //Palataan 12.35
}

