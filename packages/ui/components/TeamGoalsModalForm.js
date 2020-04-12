/**
 * Team Goals Modal Form 
 * Can be used as Add or Edit form, depending if 'data' propType is passed
 * 
 * This component is meant to be rendered by a parent variable. 
 * This helps with the state clean up (Each time it is shown, all states init again)
 * but if needed to preserve the modal state, you can use it's own 'isVisible" hook
 */
import React, { useState, useEffect } from 'react';
import ErrorNotification from './ErrorNotification';
import TeamGoalInputRow from './TeamGoalInputRow';

const TeamGoalsModalForm = ({data, isActive, handleModalToggle, handleSubmitSuccess}) => {

  const [mode] = useState(data ? 'edit' : 'add');
  const [isVisible] = useState(isActive === undefined ? true : isActive); // Visible by default
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  // Form hooks
  const [teamName, setTeamName] = useState(data ? data.equipo : '');
  const [teamGoals, setTeamGoals] = useState(data ? data.metas : []);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    let payload, method, resource;
    if (mode === 'add') {
      method = 'POST';
      resource = '';
      payload = {
        equipo: teamName,
        metas: teamGoals
      };
    } else {
      method = 'PUT';
      resource = `/${data.equipo}`;
      payload = teamGoals
    }

    const response = await fetch(`http://localhost:3000/_api/v1/team-goals${resource}`, {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1NjIxMTc2fQ.wiQHd1hlU7w0ygVy3WqxkUoUu5vBCtCX82porP4hqxg'
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      setRequestError(null);
      handleSubmitSuccess();
    } else {
      setRequestError(responseData);
    }
    // Turn off loading state
    setIsLoading(false);

  }

  const handleAddTeamGoal = () => {
    const updatedTeamGoals = [...teamGoals];
    const uuid = new Date().getTime();
    updatedTeamGoals.push({nivel: '', goles_minimos: '', uuid});
    setTeamGoals(updatedTeamGoals);
  }

  const handleDeleteTeamGoal = (index) => {
    teamGoals.splice(index, 1);
    const updatedTeamGoals = [...teamGoals];
    setTeamGoals(updatedTeamGoals);
  }

  const handleOnTeamGoalChange = (index, teamGoalData) => {
    const updatedTeamGoals = [...teamGoals];
    updatedTeamGoals[index] = {...teamGoalData};
    setTeamGoals(updatedTeamGoals);
  }

  const validateForm = () => {
    let isFormValid = true;
    if (!teamName) isFormValid = false;
    if (!teamGoals || teamGoals.length === 0) isFormValid = false
    return isFormValid;
  }

  useEffect(() => {
    const isFormValid = validateForm();    
    setIsValid(isFormValid);
  }, [teamName, teamGoals]);

  return (
    <div className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{mode === 'add' ? 'Add' : 'Edit'} Team Goals</p>
          <button className="delete" aria-label="close" onClick={() => handleModalToggle(false)}></button>
        </header>
        <section className="modal-card-body">

        <div className="columns">
            <div className="column">
              {/* Team Name */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Team Name</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${false && true ? 'is-danger' : ''}`} 
                        name="teamName"
                        value={teamName} onChange={($event) => setTeamName($event.target.value)}
                        type="text" placeholder="Team's name"/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            teamGoals.map((tg, index) => 
              <TeamGoalInputRow
                key={tg.uuid}
                index={index}
                data={tg}
                handleDelete={handleDeleteTeamGoal}
                handleOnChange={handleOnTeamGoalChange}
              />
            )
          }

          <button className="button is-primary is-outlined is-fullwidth"
            onClick={handleAddTeamGoal}>
            <span>Add Level Goal</span>
            <span className="icon is-small">
              <i className="fas fa-plus"></i>
            </span>
          </button>

          {
            requestError ? <ErrorNotification message={requestError.message}/> : ''
          }
          
          

        </section>
        <footer className="modal-card-foot">
          <button 
            className={`button is-primary ${isLoading ? 'is-loading':''}`}
            onClick={handleSubmit}
            disabled={!isValid}
            >
              Save changes
          </button>
          <button className="button" onClick={() => handleModalToggle(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default TeamGoalsModalForm;