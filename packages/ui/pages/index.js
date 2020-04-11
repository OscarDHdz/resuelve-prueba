import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import React, { useState, Fragment } from 'react';
import RawJsonInput from '../components/RawJsonInput';
import PlayerInputCards from '../components/PlayerInputCards';
import ErrorNotification from '../components/ErrorNotification';
import PlayerSalaries from '../components/PlayerSalaries';

const Home = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [playersData, setPlayersData] = useState([]); // Hooks for each input change
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
    const data = await response.json();
    if (response.ok) {
      setRequestError(null);
      setResponseData(data);
    } else {
      setRequestError(data);
      setResponseData(null);
    }
  }

  const handleSubmit = () => {
    getSalaries(playersData);
  }

  const tabs = [
    {label: 'Beauty', component: <PlayerInputCards  playersData={sharedPlayersData} handleDataChange={handleDataChange} handleSubmit={handleSubmit}/>},
    {label: 'Raw', component: <RawJsonInput playersData={sharedPlayersData} handleDataChange={handleDataChange} handleSubmit={handleSubmit}/>}
  ];


  return (
    <Fragment>
      <div className="container">

        <div className="columns">

          <div className="column">
            <h1 className="title">Salary Calculator</h1>
            <h2 className="subtitle">Fill players data and then click on submit to continue</h2>
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
            <span className="title">Salaries</span><br/>

            {
              (requestError === null && responseData === null) ? 
              <span className="subtitle">Response will show here...</span>
              : ''
            }
            {
              (requestError !== null) ? <ErrorNotification message={requestError.message}/> : ''
            }
            {
              (responseData !== null) ? <PlayerSalaries playersData={responseData}/> : ''
            }

          </div>

        </div>

      </div>
    </Fragment>
  )
}

export default Home;
