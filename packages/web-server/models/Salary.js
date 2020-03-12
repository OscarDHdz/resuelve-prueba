const v = require('../utils/Validators');
const TeamGoals = require('./TeamGoals');

const Salary = jugadores => {

  const getInfo = () => {

    const teamsData = getProcessedTeamsData();

    return {
      jugadores,
      nombreEquipos: teamsData.teamNames,
      equipos: teamsData.teamsHash
    }
  }

  const getProcessedTeamsData = () => {
    const teamNames = [];
    const teamsHash = {};
    for (const jugador of jugadores) {
      if (!teamNames.includes(jugador.equipo)) {
        teamNames.push(jugador.equipo);
        teamsHash[`${jugador.equipo}`] = [jugador];
      } else {
        teamsHash[`${jugador.equipo}`].push(jugador);
      }
    }
    return {teamNames, teamsHash};
  }

  const validate = () => {
    // Validate Data Type (Array)

    // Validate Member Attributes

    return v.SUCCESS;
  }

  const calculateSalaries = async () => {
    return getInfo();
  }


  return {
    getInfo,
    validate,
    calculateSalaries
  };

};


module.exports = Salary;