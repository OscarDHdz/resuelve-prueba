import React, {Fragment} from 'react';

const PlayerSalaries = ({playersData}) => {
  console.log(playersData);

  return (
    <Fragment>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {
            playersData.map((p, index) => 
              <tr  key={index}>
                <td>{p.nombre}</td>
                <td>{p.sueldo_completo}</td>
              </tr>
            )
          }
        </tbody>
      </table>

    </Fragment>
  )
}

export default PlayerSalaries;