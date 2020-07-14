import React, { useState } from "react";
import "./App.css";
import { Chart } from "react-charts";
import TorontoData from "./Toronto.json";
import BramptonData from "./Brampton.json";
import MississaugaData from "./Mississauga.json";
import OakvilleData from "./Oakville.json";

const DATA_OBJECT = {
  Toronto: TorontoData,
  Brampton: BramptonData,
  Mississauga: MississaugaData,
  Oakville: OakvilleData
};

function ChartTest() {
  const data = React.useMemo(() => [
    {
      label: "Series 1",
      data: [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }]
    }
  ]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "right" }
    ],
    []
  );
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  return (
    <div
      style={{
        width: "400px",
        height: "300px"
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
}

function CityData({ data, language }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Matched string</th>
          <th>Label</th>
          <th>Total # of speakers</th>
          <th>Total # of single responses</th>
          <th>% of the total single responses</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(d => d.TEXT_NAME_NOM.toLowerCase().includes(language))
          .map(d => ({
            matchedStr: d.TEXT_NAME_NOM,
            label: data.find(obj => obj.HIER_ID === d.HIER_ID.slice(0, 5))
              .TEXT_NAME_NOM,
            total: d.T_DATA_DONNEE,
            singleResponses: data.find(
              obj => obj.HIER_ID === d.HIER_ID.slice(0, 7)
            ).T_DATA_DONNEE,
            percentage:
              d.T_DATA_DONNEE /
              data.find(obj => obj.HIER_ID === d.HIER_ID.slice(0, 7))
                .T_DATA_DONNEE
          }))
          .sort((a, b) => a.matchedStr.localeCompare(b.matchedStr))
          .map((d, i) => (
            <tr key={i}>
              <td>{d.matchedStr}</td>
              <td>{d.label}</td>
              <td>{d.total}</td>
              <td>{d.singleResponses}</td>
              <td>{(d.percentage * 100).toFixed(2)}%</td>
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
      <ChartTest />
      <h1>The # of speakers of a language in the GTA</h1>
      <input
        onChange={e => setLanguage(e.target.value.toLowerCase())}
        placeholder="search language"
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
