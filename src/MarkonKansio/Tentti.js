import React, { useEffect, useState } from 'react';
import Kysymys from './Kysymys';

const Tentti = ({ dataService, tenttiValinta, setDataNoudettu, setValittuID, setValittuIndex, tenttiIndex, tenttiID, tentit, adminMode }) => {
    const [tentti, setTentti] = useState(tenttiValinta)
    const [valittu, setValittu] = useState(tenttiIndex)
    let classN = adminMode?"":"ui-input-text";

    // console.log("Tentti renderöitiin")

    useEffect(() => {
        setTentti(tenttiValinta)
    }, [tenttiValinta])

    useEffect(() => {
        setValittu(tenttiIndex)
    }, [tenttiIndex])

    const dispatch = (o) => {
        let tenttiKopio = (JSON.parse(JSON.stringify(tentit)))
        switch (o.type) {
            case "POISTA_TENTTI":
                dataService //> json-server --watch db.json --port 3001
                    .removeExam(o.data.tenttiID)
                    .then(response => {
                        console.log("tentti poistettiin", response);
                        setDataNoudettu(false)
                        setValittuID()
                        setValittuIndex()
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                    });
                break;
            case "MUUTA_TENTIN_NIMI":
                tenttiKopio[valittu].aihe = o.data.aihe;
                dataService //> json-server --watch db.json --port 3001
                    .changeExam(o.data.tenttiID, tenttiKopio[valittu])
                    .then(response => {
                        console.log("aihe muutettiin", response);
                        setDataNoudettu(false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                    });
                break;
            case "POISTA_VASTAUS":
                tenttiKopio[valittu].kysymykset[o.data.kysymysIndex].vastaukset.splice(o.data.vastausIndex, 1)
                dataService //> json-server --watch db.json --port 3001
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("vastaus poistettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
            break;
            case "LISÄÄ_VASTAUS":
                tenttiKopio[valittu].kysymykset[o.data.kysymysIndex].vastaukset.push({ teksti: "Uusi vastaus, vielä tyhjä", vastattu: false })
                dataService //> json-server --watch db.json --port 3001
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("aihe muutettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
            break;
            case "LISÄÄ_KYSYMYS":
                tenttiKopio[valittu].kysymykset.push({ tapaus: "Uusi kysymys, vielä tyhjä", vastaukset: [] })
                dataService //> json-server --watch db.json --port 3001
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("aihe muutettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
                break;
            case "POISTA_KYSYMYS":
                tenttiKopio[valittu].kysymykset.splice(o.data.kysymysIndex, 1)
                dataService //> json-server --watch db.json --port 3001
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("aihe muutettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
                break;
            case "KYSYMYKSEN_TAPAUS_MUUTTUI":
                tenttiKopio[valittu].kysymykset[o.data.kysymysIndex].tapaus = o.data.tapaus
                dataService //> json-server --watch db.json --port 3001 
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("aihe muutettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
                break;
            case "VASTAUKSEN_TEKSTI_MUUTTUI":
                tenttiKopio[valittu].kysymykset[o.data.kysymysIndex].vastaukset[o.data.vastausIndex].teksti = o.data.teksti
                dataService //> json-server --watch db.json --port 3001
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("aihe muutettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
                break;
            case "VASTAUKSEN_TILA_MUUTTUI":
                tenttiKopio[valittu].kysymykset[o.data.kysymysIndex].vastaukset[o.data.vastausIndex].vastattu = !tenttiKopio[valittu].kysymykset[o.data.kysymysIndex].vastaukset[o.data.vastausIndex].vastattu
                dataService //> json-server --watch db.json --port 3001
                .changeExam(tenttiID, tenttiKopio[valittu])
                .then(response => {
                    console.log("aihe muutettiin", response);
                    setDataNoudettu(false)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });
                break;
            default: throw new Error("Nyt on jokin vialla vastauksessa")
        }
        // setTentti(tenttiKopio) <-- OLI ISO BUGI POISTAA NÄMÄ KOMMENTIT
    }

    return (
        <div>
            <div style={{ fontWeight: "bold" }}>id: {tentti.id} index: {valittu}</div>
            <input type="text" className={classN} style={{ fontWeight: "bold" }} size="30" 
            onChange={e => setTentti({...tentti, aihe: e.target.value})}
            onBlur={
                (event) => dispatch({ type: "MUUTA_TENTIN_NIMI", data: { tenttiID: tenttiID, aihe: event.target.value } })}
                value={tentti.aihe} readOnly={!adminMode}
            ></input>
            {adminMode && <span><button onClick={() => dispatch({ type: "POISTA_TENTTI", data: { tenttiID: tenttiID } })}>Poista tentti</button></span>}
            {tentti.kysymykset.map((item, index) => <div key={index} style={{ fontWeight: "bold" }}><br />
            <Kysymys 
            tenttiValinta={tenttiValinta}
            setTentti={setTentti}
            tenttiID={tenttiID}
            kysymys={item} 
            kysymysIndex={index} 
            dispatch={dispatch} 
            adminMode={adminMode} 
            /></div>)}
            {adminMode && <span><button onClick={() => dispatch({ type: "LISÄÄ_KYSYMYS" })}>Lisää kysymys</button>
            </span>}
        </div>);
}
export default Tentti;