import React, { useState, useEffect } from 'react';

const TeamGoalInputRow = ({index, data, handleDelete, handleOnChange}) => {

  const [uuid] = useState(data ? data.uuid : new Date().getTime());
  const [level, setLevel] = useState(data ? data.nivel : '');
  const [minGoals, setMinGoals] = useState(data ? data.goles_minimos : '');
  const [didMount, setDidMount] = useState(false);

  console.log('Input Row Data:', data);

  useEffect(() => setDidMount(true), []);

  useEffect(() => {
    // Only toggle change when component has mounted (avoid loop)
    if (didMount) {
      const inputData = {
        nivel: level,
        goles_minimos: minGoals,
        uuid: uuid
      };
  
      handleOnChange(index, inputData);
    }

  }, [level, minGoals]);


  return (
    <div className="columns">
      {/* Level */}
      <div className="column is-two-fifths">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Level</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className={`input ${false && true ? 'is-danger' : ''}`} 
                  name="level"
                  value={level} onChange={($event) => setLevel($event.target.value)}
                  type="text" placeholder="Level"/>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Min Goals */}
      <div className="column is-two-fifths">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Min. Goals</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input className={`input ${false && true ? 'is-danger' : ''}`} 
                  name="minimun_goals"
                  value={minGoals} onChange={($event) => setMinGoals(+$event.target.value)}
                  type="number" placeholder="Level"/>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Delete */}
      <div className="column is-one-fifth">
        <div className="buttons is-centered">
          <button className="button is-danger" onClick={() => handleDelete(index)}>
            <span className="icon is-small">
              <i className="fas fa-trash"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamGoalInputRow;