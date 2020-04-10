import React, {Fragment, useState, useEffect} from 'react';
import PlayerInputCard from './PlayerInputCard';

const PlayerInputCards = ({playersData, handleDataChange}) => {
  // Sanitize players data with UUID
  let playersInputData = [];
  if (playersData) {
    playersInputData = playersData.map((p, index) => {
      let uuid = new Date().getTime() + index;
      p.uuid = uuid;
      return {...p, uuid};
    })
  }
  const [players, setPlayers] = useState(playersInputData);
  const [isFormValid, setIsFormValid] = useState(false);


  const validateForm = (formsData) => {
    let isValid = true;
    for (const formData of formsData) {
      if (!formData.valid) {
        isValid = false;
        break;
      }
    }
    setIsFormValid(isValid);
  }

  const handleCardFormChange = (index, data) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = data;
    validateForm(updatedPlayers);
    setPlayers(updatedPlayers);
    handleDataChange(updatedPlayers);
  }

  const handleCardDelete = (index) => {
    players.splice(index, 1);
    const updatedPlayers = [...players];
    setPlayers(updatedPlayers);
  }

  const handlePlayerAdd = () => {
    const uuid = new Date().getTime();
    setPlayers([...players, {uuid}])
  }

  

  return (
    <Fragment>
      {
        players.map((player, index) => (<PlayerInputCard
          key={player.uuid}
          data={player}
          index={index}
          handleCardDelete={handleCardDelete}
          handleCardFormChange={handleCardFormChange}
          />)
        )
      }
      <button className="button is-primary is-outlined is-fullwidth" onClick={handlePlayerAdd}>
        <span>Add Player</span>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
      </button>
      
      <div className="buttons" style={{marginTop: '14px'}}>
        <button className={`button is-primary`} disabled={!isFormValid}>Submit</button>
      </div>
    </Fragment>
    
  )
}

export default PlayerInputCards;