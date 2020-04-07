import Layout from '../components/Layout';
import Tabs from '../components/Tabs';
import React, { useState } from 'react';
import RawJsonInput from '../components/RawJsonInput';

const Home = () => {

  const [activeTab, setActiveTab] = useState(1);

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
    {label: 'Beauty', component: <h1>Hello Beauty!</h1>},
    {label: 'Raw', component: <RawJsonInput handleDataChange={handleDataChange}/>}
  ];

  return (
    <Layout>
      <div className="container" style={{marginTop: '21px'}}>
        <h1 className="title">Salary Calculator</h1>
        <h2 className="subtitle">Please fill players data and then click on submit to continue</h2>
        <Tabs
          onTabChange={handleTabChange}
          tabs={tabs}
          initialTab={1}
          />
        {/* Component From Tab */}
        {
          getCurrentInputComponent()
        }

      </div>
    </Layout>
  )
}

export default Home;
