import React, { useState } from "react";
import "./App.css";
import TorontoData from "./Toronto.json";
import BramptonData from "./Brampton.json";
import MississaugaData from "./Mississauga.json";

const DATA_OBJECT = {
  Toronto: TorontoData,
  Brampton: BramptonData,
  Mississauga: MississaugaData
};

function CityData({ data, language }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Matched String</th>
          <th>Label</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(
            d =>
              !d.TEXT_NAME_NOM.includes("English") &&
              !d.TEXT_NAME_NOM.includes("French")
          )
          .filter(d => d.TEXT_NAME_NOM.toLowerCase().includes(language))
          .map(d => ({
            matchedStr: d.TEXT_NAME_NOM,
            label: data.find(obj => obj.HIER_ID === d.HIER_ID.slice(0, 5))
              .TEXT_NAME_NOM,
            total: d.T_DATA_DONNEE
          }))
          .sort((a, b) => a.matchedStr.localeCompare(b.matchedStr))
          .map((d, i) => (
            <tr key={i}>
              <td>{d.matchedStr}</td>
              <td>{d.label}</td>
              <td>{d.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function App() {
  const [selectedLanguage, setLanguage] = useState("");

  return (
    <div className="App">
      <h1>The # of speakers of a non-official (Eng/Fr) language in the GTA</h1>
      <input
        onChange={e => setLanguage(e.target.value.toLowerCase())}
        placeholder="type language"
      ></input>
      {selectedLanguage.length
        ? Object.keys(DATA_OBJECT).map(cityName => (
            <div>
              <h3> search results for: {cityName}</h3>
              <CityData
                data={DATA_OBJECT[cityName]}
                language={selectedLanguage}
              />
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
