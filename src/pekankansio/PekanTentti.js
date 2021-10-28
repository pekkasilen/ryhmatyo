import React, {useState} from "react";
import Grid from '@mui/material/Grid';
import kys from './data.json';
import List from '@mui/material/List';
import { ButtonGroup, Divider, ListItemText, Paper, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";

const CheckBoxes = (props) => {
    const [checked, setChecked] = useState(false);
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
            <CheckBoxes l={props.v.v}/>
        </div>
    )
}

const Kyssari = (props) => {
    console.log(props.kysymys);
    return (
        <ListItemText>
            <Paper sx={{padding:3}} elevation={12}>
                <Typography variant="h5">{props.in.kysymys}</Typography>
                {props.in.vastaukset.map((x,i)=> <Vastaus v={x} key={i}></Vastaus>)}
            </Paper>
                <Divider/>
        </ListItemText>
    )
}



export default function PekanTentti() {
    //console.log(kys);
    return(
        <div>
            <Typography variant="h5" color="primary">Kaikkien alojen erityisasiantuntijan tentti</Typography>
            <br/>
            <Grid container spacing={1}>
                </Grid>
                    <Grid item xs={12} key={1}>
                        {kys.map((x,i)=> <Kyssari in={x} key={i}></Kyssari>)}
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
