// ==========================================================================
// SECCION 1: GALERIA DE OBRAS (array de objetos + flexbox)
// ==========================================================================

const listaObrasGaleria = [
    { nombre: "Pulse Room", anio: 2006, imagen: "img/obra1.jpg" },
    { nombre: "Vectorial Elevation", anio: 1999, imagen: "img/obra2.jpg" },
    { nombre: "33 Questions per Minute", anio: 2000, imagen: "img/obra3.jpg" },
    { nombre: "Body Movies", anio: 2001, imagen: "img/obra4.jpg" },
    { nombre: "Biometric Labyrinth", anio: 2019, imagen: "img/obra5.jpg" },
    { nombre: "The Year's Midnight", anio: 2011, imagen: "img/obra6.jpg" }
];

const contenedorGaleria = document.getElementById('contenedor-galeria');
const btnCambiarDiseno = document.getElementById('btn-cambiar-diseno');

// Recorre el array de objetos y arma una tarjeta HTML por cada obra
function generarGaleria() {
    let contenidoHtml = "";

    for (let i = 0; i < listaObrasGaleria.length; i++) {
        contenidoHtml += '<article class="tarjeta-obra">';
        contenidoHtml += '  <img src="' + listaObrasGaleria[i].imagen + '" alt="' + listaObrasGaleria[i].nombre + '">';
        contenidoHtml += '  <h4>' + listaObrasGaleria[i].nombre + '</h4>';
        contenidoHtml += '  <p>Año de creación: ' + listaObrasGaleria[i].anio + '</p>';
        contenidoHtml += '</article>';
    }

    contenedorGaleria.innerHTML = contenidoHtml;
}

generarGaleria();

// Alterna entre los dos diseños de galeria cambiando la clase del contenedor
btnCambiarDiseno.addEventListener('click', function () {
    if (contenedorGaleria.classList.contains('galeria-estilo-original')) {
        contenedorGaleria.classList.remove('galeria-estilo-original');
        contenedorGaleria.classList.add('galeria-estilo-alternativo');
    } else {
        contenedorGaleria.classList.remove('galeria-estilo-alternativo');
        contenedorGaleria.classList.add('galeria-estilo-original');
    }
});


// ==========================================================================
// SECCION 2: EJERCICIO - SISTEMA DE CONTROL DE LUCES MOVILES
// ==========================================================================

let cantidadObrasTotales = 0;
let consumoPorLuzH = 0;
let costoKWh = 0;
let listaObrasCargadas = [];

const divInicial = document.getElementById('paso-inicial');
const divCarga = document.getElementById('paso-carga');
const divResultados = document.getElementById('resultados');

const inputCantObras = document.getElementById('cant-obras');
const inputConsumoLuz = document.getElementById('consumo-luz');
const inputCostoKWh = document.getElementById('costo-kwh');
const btnConfigurar = document.getElementById('configurar');

const spanNumActual = document.getElementById('num-obra-actual');
const spanTotalCarga = document.getElementById('total-obras-carga');
const formObra = document.getElementById('form-obra');
const inputNombreObra = document.getElementById('nombre-obra');
const inputLucesObra = document.getElementById('luces-obra');
const inputHorasObra = document.getElementById('horas-obra');
const btnGuardarObra = document.getElementById('guardar-obra');

const divResultadosTexto = document.getElementById('resultados-texto');
const btnReiniciar = document.getElementById('reiniciar');

// se validan los datos generales y se pasa a la carga de obras
btnConfigurar.addEventListener('click', function () {
    cantidadObrasTotales = parseInt(inputCantObras.value);
    consumoPorLuzH = parseFloat(inputConsumoLuz.value);
    costoKWh = parseFloat(inputCostoKWh.value);

    if (isNaN(cantidadObrasTotales) || cantidadObrasTotales <= 0) {
        alert('Ingrese una cantidad válida de obras.');
        return;
    }
    if (isNaN(consumoPorLuzH) || consumoPorLuzH <= 0) {
        alert('Ingrese un valor de consumo correcto.');
        return;
    }
    if (isNaN(costoKWh) || costoKWh < 0) {
        alert('Ingrese un costo por kWh válido.');
        return;
    }

    divInicial.classList.add('oculto');
    divCarga.classList.remove('oculto');

    spanNumActual.innerText = 1;
    spanTotalCarga.innerText = cantidadObrasTotales;
});

//se valida y se guarda cada obra, una por una, hasta completar el total
btnGuardarObra.addEventListener('click', function () {
    let nombre = inputNombreObra.value.trim();
    let luces = parseInt(inputLucesObra.value);
    let horas = parseFloat(inputHorasObra.value);

    if (nombre === "") {
        alert('El nombre no puede estar vacío.');
        return;
    }
    if (isNaN(luces) || luces <= 0) {
        alert('La cantidad de luces debe ser mayor a 0.');
        return;
    }
    if (isNaN(horas) || horas <= 0 || horas > 24) {
        alert('Las horas de funcionamiento diario deben estar entre 1 y 24.');
        return;
    }

    let nuevaObra = {
        nombre: nombre,
        luces: luces,
        horas: horas
    };

    listaObrasCargadas.push(nuevaObra);
    formObra.reset();

    if (listaObrasCargadas.length < cantidadObrasTotales) {
        spanNumActual.innerText = listaObrasCargadas.length + 1;
    } else {
        divCarga.classList.add('oculto');
        divResultados.classList.remove('oculto');
        procesarCalculos();
    }
});

// Paso 3: se recorre el array de obras cargadas y se calculan los resultados
function procesarCalculos() {
    let consumoDiarioTotal = 0;
    let obraMayorTiempo = listaObrasCargadas[0];
    let contadorMasDe20Luces = 0;

    for (let i = 0; i < listaObrasCargadas.length; i++) {
        let obra = listaObrasCargadas[i];

        let consumoObra = obra.luces * obra.horas * consumoPorLuzH;
        consumoDiarioTotal += consumoObra;

        if (obra.horas > obraMayorTiempo.horas) {
            obraMayorTiempo = obra;
        }

        if (obra.luces > 20) {
            contadorMasDe20Luces++;
        }
    }

    let consumoPromedio = consumoDiarioTotal / cantidadObrasTotales;
    let consumoEspecificoMayor = obraMayorTiempo.luces * obraMayorTiempo.horas * consumoPorLuzH;
    let costoMayorObra = consumoEspecificoMayor * costoKWh;
    let porcentajeMasDe20 = (contadorMasDe20Luces / cantidadObrasTotales) * 100;

    divResultadosTexto.innerHTML =
        '<p><strong>1. Consumo Eléctrico:</strong></p>' +
        '<ul>' +
        '  <li>Consumo diario total entre todas las obras: ' + consumoDiarioTotal.toFixed(2) + ' kWh</li>' +
        '  <li>Consumo diario promedio por obra: ' + consumoPromedio.toFixed(2) + ' kWh</li>' +
        '</ul>' +
        '<p><strong>2. Mayor uso registrado:</strong></p>' +
        '<ul>' +
        '  <li>Obra con más tiempo activa: "' + obraMayorTiempo.nombre + '" (' + obraMayorTiempo.horas + ' hs/día)</li>' +
        '  <li>Costo de operación por día: $' + costoMayorObra.toFixed(2) + '</li>' +
        '</ul>' +
        '<p><strong>3. Infraestructura de luces:</strong></p>' +
        '<ul>' +
        '  <li>Porcentaje de obras que usan más de 20 luces: ' + porcentajeMasDe20.toFixed(1) + '%</li>' +
        '</ul>';
}

// Vuelve todo al estado inicial
btnReiniciar.addEventListener('click', function () {
    listaObrasCargadas = [];
    cantidadObrasTotales = 0;
    consumoPorLuzH = 0;
    costoKWh = 0;

    inputCantObras.value = '';
    inputConsumoLuz.value = '';
    inputCostoKWh.value = '';

    divResultados.classList.add('oculto');
    divInicial.classList.remove('oculto');
    divResultadosTexto.innerHTML = '';
});
