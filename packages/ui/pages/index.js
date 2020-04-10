import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import React, { useState } from 'react';
import RawJsonInput from '../components/RawJsonInput';
import PlayerCards from '../components/PlayerInputCards';

const Home = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [playersData, setPlayersData] = useState(null); // Hooks for each input change
  const [sharedPlayersData, setSharedPlayersData] = useState(null); // Hook to share data across inputs (Without infinite cycle)

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

  const tabs = [
    {label: 'Beauty', component: <PlayerCards  playersData={sharedPlayersData} handleDataChange={handleDataChange}/>},
    {label: 'Raw', component: <RawJsonInput playersData={sharedPlayersData} handleDataChange={handleDataChange}/>}
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
            <span className="title">Outout will show here...</span>
          </div>

        </div>

      </div>
    </Layout>
  )
}

export default Home;
