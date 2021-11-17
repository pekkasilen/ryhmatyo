import React, { useEffect, useState } from 'react';

function Vastaus({ vastaus, dispatch, kysymysIndex, vastausIndex, adminMode }) {
    // console.log("Vastaus renderöitiin")
    let classN = adminMode?"":"ui-input-text";
    const [vasTek,setVasTek] = useState(vastaus.teksti)

    useEffect(() => {
        setVasTek(vastaus.teksti)
    }, [vastaus.teksti])

    return (
        <div>
            <input type="checkbox" onChange={
                () => dispatch({ type: "VASTAUKSEN_TILA_MUUTTUI", data: { kysymysIndex: kysymysIndex, vastausIndex: vastausIndex } })}
                checked={vastaus.vastattu}></input>
            <input type="text" className={classN} readOnly={!adminMode} size="70" 
            onChange={e => {setVasTek(e.target.value);}}
            onBlur={
                (event) => dispatch({ type: "VASTAUKSEN_TEKSTI_MUUTTUI", data: { kysymysIndex: kysymysIndex, vastausIndex: vastausIndex, teksti: event.target.value } })}
                value={vasTek}
                ></input>
             {adminMode && <span><button onClick={() => dispatch({ type: "POISTA_VASTAUS", data: { kysymysIndex: kysymysIndex, vastausIndex: vastausIndex } })}>Poista vastaus</button>
             </span>}
        </div>
    );
}

export default Vastaus;