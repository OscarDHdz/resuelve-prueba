const v = require('../utils/Validators');
const TeamGoals = require('./TeamGoals');

const Salary = players => {

  /**
   * Returns the processed data for this model, providing:
   *  jugadores - Direct input of all palyers array,
   *  nombresEquipos - Array of team names,
   *  equipos - an object where key=team & value=players from that team
   */
  const getInfo = () => {
    const teamsData = getProcessedTeamsData();
    return {
      jugadores: players,
      nombresEquipos: teamsData.teamNames,
      equipos: teamsData.teamsHash
    }
  }

  /**
   * Parses all input data returning an object containing: 
   *  teamNames - an array of all the team names,
   *  teamsHash - an object where key=team & value=players from that team
   */
  const getProcessedTeamsData = () => {
    const teamNames = [];
    const teamsHash = {};
    // Loop players array
    for (const jugador of players) {
      // Push to hash {teamName: [...player]}
      if (!teamNames.includes(jugador.equipo)) {
        teamNames.push(jugador.equipo);
        teamsHash[`${jugador.equipo}`] = [jugador];
      } else {
        teamsHash[`${jugador.equipo}`].push(jugador);
      }
    }
    return {teamNames, teamsHash};
  }

  /**
   * Validates that data matches the expected model
   */
  const validate = () => {
    // Validate Data Type (Array)
    if (!Array.isArray(players)) return v.getIsNotArrayError('players');
    // Validate Player Attributes
    for (const player of players) {
      if (!v.isString(player.nombre)) return v.getIsNotArrayError('player.nombre');
      if (!v.isString(player.nivel)) return v.getIsNotArrayError('player.nivel');
      if (!v.isNumber(player.goles)) return v.getIsNotNumberError('player.goles');
      if (!v.isNumber(player.sueldo)) return v.getIsNotNumberError('player.sueldo');
      if (!v.isNumber(player.bono)) return v.getIsNotNumberError('player.bono');
      if (!v.isString(player.equipo)) return v.getIsNotArrayError('player.equipo');
    }

    return v.SUCCESS;
  }

  /**
   * Calculates a team salary for the given players
   * @param {string} team - team name
   * @param {array} players - players array
   */
  const calculateTeamSalary = async (team, players) => {
    // Fetch golas by team
    const teamGoals = await TeamGoals.getByTeam(team);
    const goals = teamGoals.metas;

    // Check Team Goals
    let teamScore = 0;
    let expectedTeamScore = 0;
    for (const player of players) {
      // Validate that the level exists in the stored team goals data
      const levelGoals = goals.find(g => g.nivel === player.nivel);
      if (!levelGoals) {
        return Promise.reject({
          code: 404,
          message: `Missing goals for level '${player.nivel}' from team '${team}' `
        })
      }
      // Keep adding goals
      teamScore += player.goles;
      expectedTeamScore += levelGoals.goles_minimos;
    }

    // Get Team Goals Percentage
    const teamGoalPercentage = teamScore / expectedTeamScore;

    // Calculate Each Player Salary
    for (const player of players) {
      const levelGoals = goals.find(g => g.nivel === player.nivel);

      // Calculate bonus
      const playerPercentage = player.goles / levelGoals.goles_minimos;
      
      // Calculate average from Team & Player percentages
      const avgPercentage = (teamGoalPercentage + playerPercentage) / 2;

      // Calculate player total salary
      player.sueldo_completo = player.sueldo + (player.bono * avgPercentage);
    }

    return players;
  }

  /**
   * Calculates salaries from all the given players.
   * Returns the same array with all the players initial data, but adding in each one its final salary
   * provided in the 'sueldo_completo' key
   */
  const calculateSalaries = async () => {
    // Valdate input data
    const validation = validate();
    if (!validation.valid) {
      return Promise.reject({code: 400, message: validation.message});
    }

    // Fetch All Team Goals
    const teamData =  getInfo();
    let allPlayers = [];
    for (const equipo of teamData.nombresEquipos) {
      // Get salaries from each team players
      const teamSalaries = await calculateTeamSalary(equipo, teamData.equipos[equipo]);
      // Push all players into single array (Expected Output)
      allPlayers = [...allPlayers, ...teamSalaries];
    }
    return teamData;
  }


  return {
    getInfo,
    validate,
    calculateSalaries
  };

};


module.exports = Salary;