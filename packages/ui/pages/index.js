import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import React, { useState } from 'react';
import RawJsonInput from '../components/RawJsonInput';
import PlayerCards from '../components/PlayerCards';

const Home = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  }

  const getCurrentInputComponent = () => {
    return tabs[activeTab].component;
  }

  const handleDataChange = (playersData) => {
    console.log(playersData);
  }

  const tabs = [
    {label: 'Beauty', component: <PlayerCards/>},
    {label: 'Raw', component: <RawJsonInput handleDataChange={handleDataChange}/>}
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
