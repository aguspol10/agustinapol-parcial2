const datosCuriosos = [
    "Rafael Lozano-Hemmer es un artista mexicano-canadiense especializado en instalaciones interactivas en espacios públicos.",
    "Su obra combina tecnología avanzada como sensores biométricos, robótica y datos en tiempo real.",
    "En su proyecto Vectorial Elevation, ciudadanos controlaban reflectores gigantes a través de internet.",
    "Pulse Room es una instalación que traduce los latidos cardíacos de los visitantes en pulsos de luz.",
    "Su trabajo explora la relación entre lo individual y lo colectivo, la tecnología y la vigilancia.",
    "Ha expuesto sus obras en más de 70 países alrededor del mundo.",
    "Lozano-Hemmer estudió química física antes de dedicarse al arte, lo que influye en su enfoque tecnológico.",
    "Sus instalaciones suelen exigir la participación activa del público para cobrar vida.",
    "Fue ganador del premio Ars Electronica por su innovador uso de tecnología en el arte.",
    "Utiliza la luz como lenguaje poético para explorar temas de identidad, memoria y presencia."
];

const botonCurioso = document.getElementById('btn-curioso');
const textoCurioso = document.getElementById('txt-curioso');

// Al hacer clic, se elige un indice al azar dentro del array y se muestra ese dato
botonCurioso.addEventListener('click', function () {
    let indiceAzar = Math.floor(Math.random() * datosCuriosos.length);
    textoCurioso.innerText = datosCuriosos[indiceAzar];
});
