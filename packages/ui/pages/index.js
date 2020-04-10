import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import React, { useState } from 'react';
import RawJsonInput from '../components/RawJsonInput';
import PlayerCards from '../components/PlayerInputCards';

const demoPlayersData = [
  {
      "nombre": "Juan",
      "nivel": "A",
      "goles": 6,
      "sueldo": 25000,
      "bono": 10000,
      "sueldo_completo": 35800,
      "equipo": "rojo"
  },
  {
      "nombre": "Pedro",
      "nivel": "B",
      "goles": 7,
      "sueldo": 30000,
      "bono": 15000,
      "sueldo_completo": 42450,
      "equipo": "rojo"
  },
  {
      "nombre": "Martin",
      "nivel": "C",
      "goles": 16,
      "sueldo": 30000,
      "bono": 15000,
      "sueldo_completo": 45200,
      "equipo": "rojo"
  },
  {
      "nombre": "Luis",
      "nivel": "Cuauh",
      "goles": 19,
      "sueldo": 50000,
      "bono": 10000,
      "sueldo_completo": 59550,
      "equipo": "rojo"
  }
]

const Home = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [playersData, setPlayersData] = useState(demoPlayersData); // Hooks for each input change
  const [sharedPlayersData, setSharedPlayersData] = useState(null); // Hook to share data across inputs (Without infinite cycle)
  const [requestError, setRequestError] = useState(null);
  const [responseData, setResponseData] = useState(null);


  const handleTabChange = (tabIndex) => {
    setSharedPlayersData(playersData);
    setActiveTab(tabIndex);
  }

  const getCurrentInputComponent = () => {
    return tabs[activeTab].component;
  }

  const handleDataChange = (data) => {
    console.log('Final players Data:', data);
    setPlayersData(data);
  }

  const getSalaries = async (payload) => {
    const response = await fetch('http://localhost:3000/_api/v1/salary', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicHVibGljIiwiYWNjZXNzIjoiYXV0aCIsImlhdCI6MTU4NTYyMTE2OH0.E2VrMpdQQR2lwqFlm7pwPuwH0-MXOskElDXzZLmqAic'
      },
    });

    console.log(response);
    const data = await response.json();
    if (response.ok) {
      setRequestError(null);
      setResponseData(data);
    } else {
      setResponseData(null);
      setRequestError(data);
    }
  }

  const handleSubmit = () => {
    console.log('Submit!:', playersData);
    getSalaries(playersData);
  }

  const tabs = [
    {label: 'Beauty', component: <PlayerCards  playersData={sharedPlayersData} handleDataChange={handleDataChange} handleSubmit={handleSubmit}/>},
    {label: 'Raw', component: <RawJsonInput playersData={sharedPlayersData} handleDataChange={handleDataChange} handleSubmit={handleSubmit}/>}
  ];


  return (
    <Layout>
      <div className="container" style={{marginTop: '21px'}}>
        <h1 className="title">Salary Calculator</h1>
        <h2 className="subtitle">Please fill players data and then click on submit to continue</h2>

        <div className="columns">

          <div className="column">
            <Tabs
              onTabChange={handleTabChange}
              tabs={tabs}
              initialTab={activeTab}
              />
            {/* Component From Tab */}
            {
              getCurrentInputComponent()
            }
          </div>
          <div className="column">
            <span className="title">Salaries</span>

            <pre>{JSON.stringify(requestError, undefined, 2)}</pre>

            <pre>{JSON.stringify(responseData, undefined, 2)}</pre>

          </div>

        </div>

      </div>
    </Layout>
  )
}

export default Home;
