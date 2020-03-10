class Meta {

  constructor( data ) {
    this.nivel = '';
    this.goles_minimos = -1;

    if ( data ) {
      this.nivel = data.nivel;
      this.goles_minimos = data.goles_minimos;
    }

  }

}

module.exports = {Meta};