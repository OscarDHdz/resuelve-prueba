const fs = require('fs');
const {ERROR_CODES} = require('../utils/ErrorHandler');

const TeamGoals = ({ equipo, metas }) => {

  const getInfo = () => ({
    equipo,
    metas
  });

  const validate = () => {
    if (typeof equipo !== 'string' || equipo.length < 1) return false;
    if (!Array.isArray(metas)) return false;

    for (const meta of metas) {
      if (typeof meta.nivel !== 'string' || meta.nivel.length < 1) return false;
      if (typeof meta.goles_minimos !== 'number' ) return false;
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

TeamGoals.getByTeam = async (team) => {

  const teamsGoals = getAllTeamsGoals();
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === team);

  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  return Promise.resolve(existingRecord);
}

TeamGoals.getAll = async () => {
  const teamsGoals = getAllTeamsGoals();
  return Promise.resolve(teamsGoals);
}

TeamGoals.save = async (data) => {

  const teamGoals = TeamGoals(data);
  if (!teamGoals.validate()) {
    return Promise.reject(ERROR_CODES[400]);
  }

  const teamsGoals = getAllTeamsGoals();
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === teamGoals.getInfo().equipo);

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

TeamGoals.delete = async (team) => {

  const teamsGoals = getAllTeamsGoals();

  const existingRecord = teamsGoals.find(teamG => teamG.equipo === team);
  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  const filteredTeamsGoals = teamsGoals.filter(teamG => teamG.equipo !== team);

  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(filteredTeamsGoals), () => {
      resolve();
    });
  });

}

TeamGoals.update = async (team, newGoals) => {

  const newTeamGoals = TeamGoals({equipo: team, metas: newGoals});
  if (!newTeamGoals.validate()) {
    return Promise.reject(ERROR_CODES[400]);
  }

  const teamsGoals = getAllTeamsGoals();
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === newTeamGoals.getInfo().equipo);

  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  existingRecord.metas = newTeamGoals.getInfo().metas;

  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(teamsGoals), () => {
      resolve(newTeamGoals.getInfo());
    });
  });
}

TeamGoals.saveBatch = async (teamsGoals) => {
  if (!Array.isArray(teamsGoals)) {
    return Promise.reject(ERROR_CODES[400]);
  }

  // Validate that every team goals input is correct
  for (const tGoals of teamsGoals) {
    if (!TeamGoals(tGoals).validate()) {
      return Promise.reject(ERROR_CODES[400]);
    }
  }
  // Start adding each team goals. If one of them has a conflict, skip and save a reference
  const failedToAdd = [];
  for (const tGoals of teamsGoals) {
    try {
      await TeamGoals.save(tGoals);
    } catch(e) {
      failedToAdd.push({data: tGoals, error: e});
    }
  }

  // If any add failed, return to the user which elements failed
  if (failedToAdd.length === 0) {
    return Promise.resolve();
  } else {
    return Promise.resolve({failedToAdd})
  }

}


module.exports = TeamGoals;