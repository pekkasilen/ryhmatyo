import React, { useEffect, useState } from 'react';
import Vastaus from './Vastaus';

function Kysymys({ tenttiID, tenttiValinta, setTentti, kysymys, kysymysIndex, dispatch, adminMode }) {
    // console.log("Kysymys renderöitiin")
    let classN = adminMode?"":"ui-input-text";
    const [kysTap,setKysTap] = useState(kysymys.tapaus)

    useEffect(() => {
        setKysTap(kysymys.tapaus)
    }, [kysymys.tapaus])

    return (<div>
        <input type="text" className={classN} size="70" 
        onChange={e => {setKysTap(e.target.value);
    }}
        onBlur={
            (event) => dispatch({ type: "KYSYMYKSEN_TAPAUS_MUUTTUI", data: { tenttiID: tenttiID, kysymysIndex: kysymysIndex, tapaus: event.target.value } })}
            value={kysTap} readOnly={!adminMode}>

            </input>
        {kysymys.vastaukset.map(
            (vastaus, index) =>
                <div key={index}>
                    <Vastaus 
                    vastaus={vastaus} 
                    dispatch={dispatch} 
                    kysymysIndex={kysymysIndex} 
                    vastausIndex={index} 
                    adminMode={adminMode} 
                    />
                </div>
        )}
        {adminMode && <span><button onClick={() => dispatch({ type: "POISTA_KYSYMYS", data: { kysymysIndex: kysymysIndex } })}>Poista kysymys</button>
            <button onClick={() => dispatch({ type: "LISÄÄ_VASTAUS", data: { kysymysIndex: kysymysIndex } })}>Lisää vastaus</button>
        </span>}
    </div>);
}
export default Kysymys;
