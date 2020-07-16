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

//what ChartTest data (props.data) must look like:

//[{
//label: "City name"
//data: [{x: label (mother tongue, etc.), y: total # of speakers}]
//},]

function ChartTest(props) {
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left", stacked: true }
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
        width: "900px",
        height: "900px"
      }}
    >
      <Chart data={props.data} axes={axes} series={series} tooltip />
    </div>
  );
}
//keep in mind: data = an array of objects
//the output of the first filter (after tbody) is an array of length x (ex. 3 different categories under Korean - Mother tongue, language spoken at home, etc.)
function CityData({ data, language }) {
  return (
    <div>
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
    </div>
  );
}

function App() {
  const [selectedLanguage, setLanguage] = useState("");

  return (
    <div className="App">
      <h1>The # of speakers of a language in the GTA</h1>
      <input
        onChange={e => setLanguage(e.target.value.toLowerCase())}
        placeholder="search language"
      ></input>
      {selectedLanguage.length ? (
        <ChartTest
          data={Object.keys(DATA_OBJECT).map(cityName => {
            return {
              label: cityName,
              data: DATA_OBJECT[cityName]
                .filter(d =>
                  d.TEXT_NAME_NOM.toLowerCase().includes(selectedLanguage)
                )
                .map(d => ({
                  x: DATA_OBJECT[cityName].find(
                    obj => obj.HIER_ID === d.HIER_ID.slice(0, 5)
                  ).TEXT_NAME_NOM,
                  y: d.T_DATA_DONNEE
                }))
            };
          })}
        />
      ) : null}
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
