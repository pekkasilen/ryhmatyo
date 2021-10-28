import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import kys from './data.json';
import List from '@mui/material/List';
import { ButtonGroup, Divider, ListItemText, Paper, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";

const CheckBoxes = (props) => {

    const [checked, setChecked] = useState((localStorage.getItem((props.k.toString()+props.v.toString())))!=null
                                           ?eval(localStorage.getItem((props.k.toString()+props.v.toString())))
                                           : false);
    useEffect(()=>{
        props.hc(props.k,props.v);
    },[checked]);
    return(
      <FormControlLabel
        control={<Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          color="secondary"
          inputProps={{
          'aria-label': 'secondary checkbox'}}
          />
        }
        label={props.l}
    />     
    )
  }

const Vastaus = (props) => {
    return (
        <div>
            <CheckBoxes l={props.v.v} hc={props.hc} k={props.k} v={props.v.id}/>
        </div>
    )
}

const Kyssari = (props) => {
    return (
        <ListItemText>
            <Paper sx={{padding:3}} elevation={12}>
                <Typography variant="h5">{props.in.kysymys}</Typography>
                {props.in.vastaukset.map((x,i)=> <Vastaus k={props.in.id} hc={props.hc} v={x} key={i}></Vastaus>)}
            </Paper>
                <Divider/>
        </ListItemText>
    )
}



export default function PekanTentti() {
    const m = 10; //max nr of Questions
    const n = 10; //max nr of Answer options;
    const [checks, setChecks] = useState(Array.from({length: m},()=> Array.from({length: n}, () => false)));
    
    const handleChange = (k,v) => {
        var updateChecks = [...checks];
        updateChecks[k-1][v-1]=!checks[k-1][v-1]
        setChecks(updateChecks);
        localStorage.setItem(k.toString()+v.toString(),(!checks[k-1][v-1]).toString());
    }
    

    return(
        <div>
            <Typography variant="h5" color="primary">Kaikkien alojen erityisasiantuntijan tentti</Typography>
            <br/>
            <Grid container spacing={1}>
                </Grid>
                    <Grid item xs={12} key={1}>
                        {kys.map((x,i)=> <Kyssari in={x} key={i} hc={handleChange}></Kyssari>)}
                    </Grid>
                <Grid>
            </Grid>
            <br/>
            <ButtonGroup orientation="vertical" size="large" variant="contained">
                <Button color="secondary">Peru koko shaisse</Button>
                <Button color="primary">Lähetä tentti</Button>
            </ButtonGroup>
        </div>
    );
}

