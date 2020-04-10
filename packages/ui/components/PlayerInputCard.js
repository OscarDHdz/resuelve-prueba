import React, { useState, useEffect } from 'react';

const styles = {
  card: {
    marginBottom: '14px',
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0
  }
}

const PlayerInputCard = ({index, data, handleCardFormChange, handleCardDelete}) => {

  const [uuid] = useState(data ? data.uuid : '');
  const [name, setName] = useState(data ? data.nombre : '');
  const [nameError, setNameError] = useState(null);
  const [nameDirty, setNameDirty] = useState(false);
  const [team, setTeam] = useState(data ? data.equipo : '');
  const [teamError, setTeamError] = useState(null);
  const [teamDirty, setTeamDirty] = useState(false);
  const [salary, setSalary] = useState(data ? data.sueldo : '');
  const [salaryError, setSalaryError] = useState(null);
  const [salaryDirty, setSalaryDirty] = useState(false);
  const [bonus, setBonus] = useState(data ? data.bono : '');
  const [bonusError, setBonusError] = useState(null);
  const [bonusDirty, setBonusDirty] = useState(false);
  const [level, setLevel] = useState(data ? data.nivel : '');
  const [levelError, setLevelError] = useState(null);
  const [levelDirty, setLevelDirty] = useState(false);
  const [goals, setGoals] = useState(data ? data.goles : '');
  const [goalsError, setGoalsError] = useState(null);
  const [goalsDirty, setGoalsDirty] = useState(false);

  const validateForm = () => {
    let isFormValid = true;

    if (!name) {
      setNameError(true);
      isFormValid = false;
    }
    else setNameError(null);
    
    if (!team) {
      setTeamError(true);
      isFormValid = false;
    }
    else setTeamError(null);

    if (!salary) { 
      setSalaryError(true);
      isFormValid = false;
    }
    else setSalaryError(null);

    if (!bonus) {
      setBonusError(true);
      isFormValid = false;
    }
    else setBonusError(null);

    if (!level) {
      setLevelError(true);
      isFormValid = false;
    }
    else setLevelError(null);
    
    if (!goals) {
      setGoalsError(true);
      isFormValid = false;
    }
    else setGoalsError(null);
    return isFormValid;
  }
  
  useEffect(() => {
    const valid = validateForm();
    const playerData = {
      nombre: name,
      nivel: level,
      goles: goals,
      sueldo: salary,
      bono: bonus,
      sueldo_completo: null,
      equipo: team,
      uuid,
      valid
    };
    handleCardFormChange(index, playerData);
  }, [name, team, salary, bonus, level, goals]);

  const handleOnChange = ($event) => {
    const inputName = $event.target.name;
    const val = $event.target.value;
    switch (inputName) {
      case 'name':
        setName(val);
        setNameDirty(true);
        break;
      case 'team':
        setTeam(val);
        setTeamDirty(true);
        break;
      case 'salary':
        setSalary(val);
        setSalaryDirty(true);
        break;
      case 'bonus':
        setBonus(val);
        setBonusDirty(true);
        break;
      case 'level':
        setLevel(val);
        setLevelDirty(true);
        break;
      case 'goals':
        setGoals(val);
        setGoalsDirty(true);
        break;
    }

  }

  return (
    <div className="card" style={styles.card}>
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column">
              {/* Player Name */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Name</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${nameError && nameDirty ? 'is-danger' : ''}`} 
                        name="name"
                        type="text" placeholder="Player name" 
                        value={name} onChange={handleOnChange}/>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <div className="column">
              {/* Team */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Team</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${teamError && teamDirty ? 'is-danger' : ''}`} 
                        name="team"
                        type="text" placeholder="Player's team" 
                        value={team} onChange={handleOnChange}/>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className="columns">

            <div className="column">
              {/* Base Salary */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Salary</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${salaryError & salaryDirty ? 'is-danger' : ''}`} 
                        name="salary"
                        type="number" placeholder="$0.00" 
                        value={salary} onChange={handleOnChange}/>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              {/* Bonus */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Bonus</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${bonusError && bonusDirty ? 'is-danger' : ''}`} 
                        name="bonus"
                        type="number" placeholder="$0.00" 
                        value={bonus} onChange={handleOnChange}/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              {/* Lvl */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Level</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${levelError && levelDirty ? 'is-danger' : ''}`} 
                        name="level"
                        type="text" placeholder="Player's level"
                        value={level} onChange={handleOnChange}/>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <div className="column">
              {/* Goals */}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Goals</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className={`input ${goalsError && goalsDirty ? 'is-danger' : ''}`}
                        name="goals"
                        type="number" placeholder="Player current goals"
                        value={goals} onChange={handleOnChange}/>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <button className="button is-danger is-outlined" 
            style={styles.deleteBtn}
            onClick={() => handleCardDelete(index)}
            >
            <span>Delete</span>
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>

        </div>



      </div>
    </div>
  )
}

export default PlayerInputCard;