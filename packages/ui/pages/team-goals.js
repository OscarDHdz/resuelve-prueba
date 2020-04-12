import React, { useState, useEffect, Fragment } from 'react';
import RawJsonInput from '../components/RawJsonInput';
import Tabs from '../components/Tabs';
import TeamGoalsCard from '../components/TeamGoalsCard';
import TeamGoalsModalForm from '../components/TeamGoalsModalForm';

const TeamGoals = () => {
  const [goalsData, setGoalsData] = useState([]);
  const [dataReload, setDataReload] = useState(true);
  const [showModal, setShowModal] = useState(true);

  // Get Teams Goals from service
  useEffect(() => {
    const getTeamsGoals = async () => {
      const response = await fetch('http://localhost:3000/_api/v1/team-goals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1NjIxMTc2fQ.wiQHd1hlU7w0ygVy3WqxkUoUu5vBCtCX82porP4hqxg'
        },
      });
      const data = await response.json();
      if (response.ok) {
        setGoalsData(data);
      } else {
        setGoalsData(null);
      }
      setDataReload(false);
    }

    if (dataReload) {
      getTeamsGoals();
    }
  }, [dataReload])

  const handleModalToggle = (openModal) => {
    setShowModal(openModal);
  }

  // After success, modal gets closed & data refreshed
  const handleSubmitSuccess = () => {
    setShowModal(false);
    setDataReload(true);
  }

  return (
    <Fragment>
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">Team Goals</h1>
          </div>
          <div className="level-right">
            <button className="button is-primary is-right" onClick={() => handleModalToggle(true)}>
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
        <hr/>
  
        <div className="columns">
          {
            goalsData.map((tg) => 
            <div className="column is-half">
              <TeamGoalsCard
                key={tg.equipo}
                data={tg}
              />
            </div>
            )
          }
        </div>
      </div>
  
      {
        showModal ?
        <TeamGoalsModalForm
          handleModalToggle={handleModalToggle}
          handleSubmitSuccess={handleSubmitSuccess}
        /> : ''
      }
      
    </Fragment>
  )
}

export default TeamGoals;