const fs = require('fs');
const {ERROR_CODES} = require('../utils/ErrorHandler');
const v = require('../utils/Validators');

const TeamGoals = ({ equipo, metas }) => {

  const getInfo = () => ({
    equipo,
    metas
  });

  const validate = () => {
    if (!v.isDefined(equipo)) return v.getIsNotDefinedError('equipo');
    if (!v.isString(equipo)) return v.getIsNotStringError('equipo');
    if (!v.hasMinLength(1, equipo)) return v.getHasNotMinLengthError('equipo', 1);

    
    if (!v.isDefined(metas)) return v.getIsNotDefinedError('metas');
    if (!Array.isArray(metas)) return v.getIsNotArrayError('metas');
    for (const meta of metas) {
      
      if (!v.isDefined(meta.nivel)) return v.getIsNotDefinedError('meta.nivel');
      if (!v.isString(meta.nivel)) return v.getIsNotStringError('meta.nivel');

      if (!v.isDefined(meta.goles_minimos)) return v.getIsNotDefinedError('meta.goles_minimos');
      if (!v.isNumber(meta.goles_minimos)) return v.getIsNotNumberError('meta.goles_minimos');
    }
    return v.SUCCESS;
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
  // Validate that every team goals input is correct
  for (const tGoals of teamsGoals) {
    const validation = TeamGoals(tGoals).validate();
    if (!validation.valid) {
      return Promise.reject({code: 400, message: validation.message});
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