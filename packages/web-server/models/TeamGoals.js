const fs = require('fs');
const {ERROR_CODES} = require('../utils/ErrorHandler');

const TeamGoals = ({ team, goals }) => {

  const getInfo = () => ({
    team,
    goals
  });

  const validate = () => {
    if (typeof team !== 'string' || team.length < 1) return false;
    if (!Array.isArray(goals)) return false;

    for (const goal of goals) {
      if (typeof goal.nivel !== 'string' || goal.nivel.length < 1) return false;
      if (typeof goal.goles_minimos !== 'number' ) return false;
    }
    return true;
  }

  return {
    getInfo,
    validate
  };

};

const getAllTeamsGoals = () => {
  try {
    const teams_goals = fs.readFileSync(process.env.LOCAL_DB_FILE);
    return JSON.parse(teams_goals);
  }
  catch ( e ) {
    return [];
  }
};

TeamGoals.save = (data) => {

  const teamGoals = TeamGoals(data);
  if (!teamGoals.validate()) {
    return Promise.reject(ERROR_CODES[400]);
  }

  const teamsGoals = getAllTeamsGoals();
  const existingRecord = teamsGoals.find(teamG => teamG.team === teamGoals.getInfo().team);

  if (existingRecord) {
    return Promise.reject(ERROR_CODES[409]);
  }

  teamsGoals.push(teamGoals.getInfo());


  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(teamsGoals), () => {
      resolve(teamGoals.getInfo());
    });
  });
}

TeamGoals.delete = (team) => {

  const teamsGoals = getAllTeamsGoals();

  const existingRecord = teamsGoals.find(teamG => teamG.team === team);
  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  const filteredTeamsGoals = teamsGoals.filter(teamG => teamG.team !== team);

  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(filteredTeamsGoals), () => {
      resolve();
    });
  });

}

TeamGoals.update = (team, newGoals) => {

  const newTeamGoals = TeamGoals({team, goals: newGoals});
  if (!newTeamGoals.validate()) {
    return Promise.reject(ERROR_CODES[400]);
  }

  const teamsGoals = getAllTeamsGoals();
  const existingRecord = teamsGoals.find(teamG => teamG.team === newTeamGoals.getInfo().team);

  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  existingRecord.goals = newTeamGoals.getInfo().goals;

  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(teamsGoals), () => {
      resolve(newTeamGoals.getInfo());
    });
  });
}

TeamGoals.getByTeam = (team) => {

  const teamsGoals = getAllTeamsGoals();
  const existingRecord = teamsGoals.find(teamG => teamG.team === team);

  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  return Promise.resolve(existingRecord);
}

TeamGoals.getAll = () => {
  const teamsGoals = getAllTeamsGoals();
  return Promise.resolve(teamsGoals);
}


module.exports = TeamGoals;