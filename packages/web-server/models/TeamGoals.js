const fs = require('fs');
const {ERROR_CODES} = require('../utils/ErrorHandler');
const v = require('../utils/Validators');

const TeamGoals = ({ equipo, metas }) => {

  const getInfo = () => ({
    equipo,
    metas
  });

  /**
   * Validates that data matches the expected model
   */
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

/**
 * Fetches all stored Team Goals
 */
const getAllTeamsGoals = () => {
  // Read local storage
  try {
    const teams_goals = fs.readFileSync(process.env.LOCAL_DB_FILE);
    return JSON.parse(teams_goals);
  }
  catch ( e ) { // If not found, return empty array
    return [];
  }
};

/**
 * Returns only the team goals for the given team
 * @param {string} team - team name that will be used to fetch goals
 */
TeamGoals.getByTeam = async (team) => {
  // Fetch all team goals
  const teamsGoals = getAllTeamsGoals();
  // Filter goals by team
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === team);

  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  return Promise.resolve(existingRecord);
}

/**
 * Returns aall stored Team Goalsll 
 */
TeamGoals.getAll = async () => {
  const teamsGoals = getAllTeamsGoals();
  return Promise.resolve(teamsGoals);
}

/**
 * Stores a team goals set
 * @param {{equipo: string, metas: [{nivel: string, goles_minimos: number}]}} data - Team Goals 
 */
TeamGoals.save = async (data) => {
  const teamGoals = TeamGoals(data);
  // Fetch all team gals
  const teamsGoals = getAllTeamsGoals();

  // Validate if record already exists
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === teamGoals.getInfo().equipo);
  if (existingRecord) {
    return Promise.reject(ERROR_CODES[409]);
  }

  // Save updated data
  teamsGoals.push(teamGoals.getInfo());
  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(teamsGoals), () => {
      resolve(teamGoals.getInfo());
    });
  });
}

/**
 * Deletes the given team goals from the stored data
 * @param {string} team - Team to be deleted
 */
TeamGoals.delete = async (team) => {
  // Fetch all team goals
  const teamsGoals = getAllTeamsGoals();

  // Validate if record exists
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === team);
  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  // Filter excluding the record to be deleted
  const filteredTeamsGoals = teamsGoals.filter(teamG => teamG.equipo !== team);
  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(filteredTeamsGoals), () => {
      resolve();
    });
  });

}

/**
 * Updates the 'metas' from the given team
 * @param {string} team - Team to be updated
 * @param {[{nivel: string, goles_minimos: number}]} newGoals - New goals data
 */
TeamGoals.update = async (team, newGoals) => {
  const newTeamGoals = TeamGoals({equipo: team, metas: newGoals});
  // Fetch al teams data
  const teamsGoals = getAllTeamsGoals();

  // Validate record exists
  const existingRecord = teamsGoals.find(teamG => teamG.equipo === newTeamGoals.getInfo().equipo);
  if (!existingRecord) {
    return Promise.reject(ERROR_CODES[404]);
  }

  // Replace new Goals data
  existingRecord.metas = newTeamGoals.getInfo().metas;
  return new Promise((resolve) => {
    fs.writeFile(process.env.LOCAL_DB_FILE, JSON.stringify(teamsGoals), () => {
      resolve(newTeamGoals.getInfo());
    });
  });
}

/**
 * Saves an array of team goals
 * @param {[TeamGoals]} teamsGoals - Array of team goals  
 * 
 * If all succed it resolves an empty response
 * else, it returns an array containing the faied inputs
 */
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