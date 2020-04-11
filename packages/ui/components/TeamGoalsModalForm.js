/**
 * Team Goals Modal Form 
 * Can be used as Add or Edit form, depending if 'data' propType is passed
 * 
 * This component is meant to be rendered by a parent variable. 
 * This helps with the state clean up (Each time it is shown, all states init again)
 * but if needed to preserve the modal state, you can use it's own 'isVisible" hook
 */
import React, { useState } from 'react';
import ErrorNotification from './ErrorNotification';

const TeamGoalsModalForm = ({data, isActive, handleModalToggle, handleSubmitSuccess}) => {

  const [mode] = useState(data ? 'edit' : 'add');
  const [isVisible] = useState(isActive === undefined ? true : isActive); // Visible by default
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {};

    const method = mode === 'add' ? 'POST' : 'PUT';
    const resource = mode === 'add' ? '' : `/${data.equipo}`;

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

  return (
    <div className={`modal ${isVisible ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{mode === 'add' ? 'Add' : 'Edit'} Team Goals</p>
          <button className="delete" aria-label="close" onClick={() => handleModalToggle(false)}></button>
        </header>
        <section className="modal-card-body">

          {
            requestError ? <ErrorNotification message={requestError.message}/> : ''
          }
          

        </section>
        <footer className="modal-card-foot">
          <button 
            className={`button is-primary ${isLoading ? 'is-loading':''}`}
            onClick={handleSubmit}>
              Save changes
          </button>
          <button className="button" onClick={() => handleModalToggle(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default TeamGoalsModalForm;