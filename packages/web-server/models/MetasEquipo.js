const fs = require('fs');

const MetasEquipo = ({ equipo, metas }) => {

  const getInfo = () => ({
    equipo,
    metas
  });

  const validate = () => {
    return true;
  }

  return {
    getInfo,
    validate
  };

};

const getMetasPorEquipos = () => {
  try {
    const metas_equipos = fs.readFileSync('db/metas_equipos.json');
    return JSON.parse(metas_equipos);
  }
  catch ( e ) {
    return [];
  }
};

MetasEquipo.guardar = (data) => {

  const metas_equipo = MetasEquipo(data);
  if (!metas_equipo.validate()) {
    return Promise.reject('Invalid input!');
  }

  const metas_equipos = getMetasPorEquipos();
  const metas_existentes = metas_equipos.find(met_equ => met_equ.equipo === metas_equipo.getInfo().equipo);

  if (metas_existentes) {
    return Promise.reject('Metas del equipo ya existen!');
  }

  metas_equipos.push(metas_equipo.getInfo());


  return new Promise((resolve) => {
    fs.writeFile('db/metas_equipos.json', JSON.stringify(metas_equipos), () => {
      resolve(metas_equipo.getInfo());
    });
  });
}

MetasEquipo.eliminar = (equipo) => {

  const metas_equipos = getMetasPorEquipos();

  const metas_existentes = metas_equipos.find(met_equ => met_equ.equipo === equipo);
  if (!metas_existentes) {
    return Promise.reject('Not found!');
  }

  const metas_equipos_filtradas = metas_equipos.filter(met_equ => met_equ.equipo !== equipo);

  return new Promise((resolve) => {
    fs.writeFile('db/metas_equipos.json', JSON.stringify(metas_equipos_filtradas), () => {
      resolve();
    });
  });
}

MetasEquipo.actualizar = (equipo, metasNuevas) => {

  const nuevas_metas_equipo = MetasEquipo({equipo, metas: metasNuevas});
  if (!nuevas_metas_equipo.validate()) {
    return Promise.reject('Invalid input!');
  }

  const metas_equipos = getMetasPorEquipos();
  const metas_existentes = metas_equipos.find(met_equ => met_equ.equipo === nuevas_metas_equipo.getInfo().equipo);

  if (!metas_existentes) {
    return Promise.reject('Not found!');
  }

  metas_existentes.metas = nuevas_metas_equipo.getInfo().metas;

  return new Promise((resolve) => {
    fs.writeFile('db/metas_equipos.json', JSON.stringify(metas_equipos), () => {
      resolve(nuevas_metas_equipo.getInfo());
    });
  });
}

MetasEquipo.obtenerPorEquipo = (equipo) => {

  const metas_equipos = getMetasPorEquipos();
  const metas_existentes = metas_equipos.find(met_equ => met_equ.equipo === equipo);

  if (!metas_existentes) {
    return Promise.reject('Not found!');
  }

  return Promise.resolve(metas_existentes);
}

MetasEquipo.obtenerTodas = (equipo) => {
  const metas_equipos = getMetasPorEquipos();
  return Promise.resolve(metas_equipos);
}


module.exports = MetasEquipo;