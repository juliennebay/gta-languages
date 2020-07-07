import React, { useState } from "react";
import "./App.css";
import TorontoData from "./Toronto.json";

//0: mother tongue
//1: spoken at home
//2: total speakers of this language (including those not included in 0 & 1)

function App() {
  const [selectedLanguage, setLanguage] = useState("");
  return (
    <div className="App">
      <h1>The # of speakers of a non-official (Eng/Fr) language in Toronto</h1>
      <input
        onChange={e => setLanguage(e.target.value.toLowerCase())}
        placeholder="type language"
      ></input>
      <div>
        search results :{" "}
        {TorontoData.filter(
          d =>
            !d.TEXT_NAME_NOM.includes("English") &&
            !d.TEXT_NAME_NOM.includes("French")
        )
          .filter(d => d.TEXT_NAME_NOM.toLowerCase().includes(selectedLanguage))
          .map(d =>
            JSON.stringify({
              total: d.T_DATA_DONNEE,
              ID: d.HIER_ID,
              text_name_nom: d.TEXT_NAME_NOM,
              label: TorontoData.find(
                obj => obj.HIER_ID === d.HIER_ID.slice(0, 5)
              ).TEXT_NAME_NOM
            })
          )
          .map((d, i) => (
            <div key={i}>{d}</div>
          ))}
      </div>
    </div>
  );
}

export default App;
