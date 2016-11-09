var juego = {
    filas: [
        [],
        [],
        []
    ],
    espacioVacio: {
        fila: 2,
        columna: 2
    },

    instalarPiezas: function(juegoEl) {
        var counter = 1;

        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {

                if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
                    this.filas[fila][columna] = null;
                } else {
                    var pieza = this.crearPieza(counter++, fila, columna);
                    juegoEl.append(pieza.el);
                    this.filas[fila][columna] = pieza;
                }
            }
        }
        return juegoEl;
    },

    crearPieza(numero, fila, columna) {
        var nuevoElemento = $('<div>');
        nuevoElemento.addClass('pieza');

        nuevoElemento.css({
            backgroundImage: 'url(images/' + numero + '.jpg)',
            top: fila * 200,
            left: columna * 200
        });

        return {
            el: nuevoElemento,
            numero: numero,
            filaInicial: fila,
            columnaInicial: columna,
        };

    },
    moverHaciaAbajo() {
        var filaOrigen = this.espacioVacio.fila - 1;
        var columnaOrigen = this.espacioVacio.columna;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);

    },

    moverHaciaArriba() {
        var filaOrigen = this.espacioVacio.fila + 1;
        var columnaOrigen = this.espacioVacio.columna;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaDerecha() {
        var columnaOrigen = this.espacioVacio.columna - 1;
        var filaOrigen = this.espacioVacio.fila;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaIzquierda() {
        var columnaOrigen = this.espacioVacio.columna + 1;
        var filaOrigen = this.espacioVacio.fila;

        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },

    capturarTeclas() {
        var that = this;
        $(document).keydown(function(evento) {
           switch (evento.which) {
                case 40:
                    that.moverHaciaAbajo();
                    break;
                case 38:
                    that.moverHaciaArriba();
                    break;
                case 37:
                    that.moverHaciaIzquierda();
                    break;
                case 39:
                    that.moverHaciaDerecha();
                    break;
                default:
                    return;
            }
          
          
          if(that.chequearSiGano()){
            alert("GANASTE");
          }
            
            evento.preventDefault();
        });

    },

    moverFichaFilaColumna(ficha, fila, columna) {
        ficha.el.css({
            top: fila * 200,
            left: columna * 200
        })
    },

    guardarEspacioVacio(fila, columna) {
        this.espacioVacio.fila = fila;
        this.espacioVacio.columna = columna;

        this.filas[fila][columna] = null;
    },

    intercambiarPosicionConEspacioVacio(fila, columna) {
        var ficha = this.filas[fila] && this.filas[fila][columna];
        if (ficha) {
            this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
            this.moverFichaFilaColumna(ficha, this.espacioVacio.fila, this.espacioVacio.columna);
            this.guardarEspacioVacio(fila, columna);
        }
    },
    chequearSiGano: function() {
        for (var f = 0; f < this.filas.length; f++) {
            for (var c = 0; c < this.filas.length; c++) {
                var ficha = this.filas[f][c];
                if (ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)) {
                    return false;
                }
                //console.log(ficha);
            }
        }
        return true;
    },
    mezclarFichas(veces) {
        if (veces <= 0) {
            return;
        };
        
        var that = this;
        var funciones = ['moverHaciaAbajo', 'moverHaciaArriba', 'moverHaciaIzquierda', 'moverHaciaDerecha'];
        var numeroRandom = Math.floor(Math.random() * 4);
        var nombreDeFuncion = funciones[numeroRandom];
        this[nombreDeFuncion]();
     

        setTimeout(function() {
            that.mezclarFichas(veces - 1);
        }, 10);
    },
    iniciar: function(juego) {
        console.log(juego);
        this.instalarPiezas(juego);
        this.mezclarFichas(200);
        this.capturarTeclas();

    }

}

$(document).ready(function() {

    juego.iniciar($("#juego"));

});