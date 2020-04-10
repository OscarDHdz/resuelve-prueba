import React, {Fragment, useState} from 'react';
import PlayerInputCard from './PlayerInputCard';

const PlayerCards = () => {

  const [players, setPlayers] = useState([]);

  const handleCardFormChange = (index, data) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = data;
    setPlayers(updatedPlayers);
  }

  const handleCardDelete = (index) => {
    players.splice(index, 1);
    const updatedPlayers = [...players];
    setPlayers(updatedPlayers);
  }

  const handlePlayerAdd = () => {
    // TODO: Change UUID to something different than time
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
    </Fragment>
    
  )
}

export default PlayerCards;