import React from 'react';

const TeamGoalsCard = ({data}) => {

  return (
    <div className="card">
      <div className="card-content">
        <p className="subtitle" style={{marginBottom: 0}}>
          Team: {data.equipo}
        </p>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Level</th>
              <th>Minimun Goals</th>
            </tr>
          </thead>
          <tbody>
            {
              data.metas.map((m, index) => 
                <tr key={index}>
                  <td>{m.nivel}</td>
                  <td>{m.goles_minimos}</td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
        <button className="button is-white card-delete-btn">
          <span>DELETE</span>
          <span className="icon is-small">
            <i className="fas fa-trash"></i>
          </span>
          </button>
        </p>
        <p className="card-footer-item">
          <button className="button is-white">
          <span>EDIT</span>
          <span className="icon is-small">
            <i className="fas fa-wrench"></i>
          </span>
          </button>
        </p>
      </footer>
    </div>
  );
}

export default TeamGoalsCard;