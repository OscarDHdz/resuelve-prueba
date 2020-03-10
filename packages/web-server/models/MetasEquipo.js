const {Meta} = require('./Meta');

class MetasEquipo {

  constructor( data ) {
    this.equipo = '';
    this.metas = [];

    if ( data ) {
      this.equipo = data.equipo;
      this.metas = data.metas.map(meta => new Meta(meta));
    }

  }

}

module.exports = {MetasEquipo};