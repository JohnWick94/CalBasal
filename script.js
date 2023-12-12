const CALCULAR = document.getElementById('calcular');
const HISTORIAL = document.getElementById('historial');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const DETALLE = document.getElementById('detalle');
const CONTENEDOR = document.getElementById('contenedor');
let DATO; // Variable para almacenar el peso

CALCULAR.addEventListener('click', () => {
    DATO = document.getElementById('peso').value;
    
    if (DATO > 0){
        ERROR.style.display = 'none';
        let flujo, mantenimiento, mensaje, metodoCalculo;

        if (DATO <= 30) {
            flujo = calcFlujoHollidaySegar(DATO);
            mantenimiento = flujo * 1.5;
            mensaje = 'Calculado con el método de Holliday-Segar';
            metodoCalculo = 'holliday-segar';
        } else {
            // Lógica para calcular con el método de superficie corporal (pendiente de implementación)
            flujo = 0; // Debes implementar la lógica para el método de superficie corporal aquí
            mantenimiento = 0; // Debes implementar la lógica para el método de superficie corporal aquí
            mensaje = 'Calculado con el método de Superficie Corporal';
            metodoCalculo = 'superficie-basal';
        }

        FLU.innerHTML = flujo + ' cc/hr';
        MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
        FLU.style.display = 'block';
        MAN.style.display = 'block';

        // Mostrar mensaje en la sección de detalles
        DETALLE.innerHTML = '<h1>¿Cómo se calcula?</h1>' +
                            '<p>De 0kg a 10kg, se calcula 100cc por cada kilo.</p>' +
                            '<p>Se suman 50cc por cada kilo de peso por arriba de 10kg, hasta 20kg</p>' +
                            '<p>De 20kg para arriba, se suman 20cc por cada kilo adicional</p>' +
                            `<p>${mensaje}</p>`;

        // Limpiar y aplicar clases según el método de cálculo
        DETALLE.classList.remove('holliday-segar', 'superficie-basal');
        DETALLE.classList.add(metodoCalculo);
        CONTENEDOR.classList.remove('holliday-segar', 'superficie-basal');
        CONTENEDOR.classList.add(metodoCalculo);
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
});

// Evento para mostrar la ventana flotante de historial
HISTORIAL.addEventListener('click', () => {
    document.getElementById('historialModal').style.display = 'block';
    document.getElementById('historialInfo').innerHTML = `Peso: ${DATO} kg, Flujo: ${FLU.innerHTML}, Mantenimiento: ${MAN.innerHTML}`;
});

// Evento para cerrar la ventana flotante de historial
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    document.getElementById('historialModal').style.display = 'none';
});

function calcFlujoHollidaySegar(peso){
    let resto = peso;
    let flujo = 0;
    if (resto > 20){
        let aux = resto - 20;
        flujo += aux * 1;
        resto -= aux;
    } 
    if (resto > 10){
        let aux = resto - 10;
        flujo += aux * 2;
        resto -= aux;
    }
    flujo += resto * 4;
    return flujo;
}

// Necesitarás implementar la función para el método de Superficie Corporal aquí
// function calcFlujoSuperficieCorporal(peso) {
//     // Lógica para el cálculo con el método de superficie corporal
// }
CALCULAR.addEventListener('click', () => {
    DATO = document.getElementById('peso').value;
    
    if (DATO > 0){
        ERROR.style.display = 'none';
        let flujo, mantenimiento, mensaje, metodoCalculo;

        if (DATO <= 30) {
            flujo = calcFlujoHollidaySegar(DATO);
            mantenimiento = flujo * 1.5;
            mensaje = 'Calculado con el método de Holliday-Segar';
            metodoCalculo = 'holliday-segar';
        } else {
            // Corrección: Calcular con el método de Superficie Corporal
            flujo = calcFlujoSuperficieCorporal(DATO);
            mantenimiento = flujo * 1.5;
            mensaje = 'Calculado con el método de Superficie Corporal';
            metodoCalculo = 'superficie-basal';
        }

        FLU.innerHTML = flujo + ' cc/hr';
        MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
        FLU.style.display = 'block';
        MAN.style.display = 'block';

        // Mostrar mensaje de aviso en la sección de detalles
        DETALLE.innerHTML += `<p style="color: red; text-align: center;">${mensaje}</p>`;

        // Limpiar y aplicar clases según el método de cálculo
        DETALLE.classList.remove('holliday-segar', 'superficie-basal');
        DETALLE.classList.add(metodoCalculo);
        CONTENEDOR.classList.remove('holliday-segar', 'superficie-basal');
        CONTENEDOR.classList.add(metodoCalculo);
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
});
// Agrega esta función para calcular la superficie corporal
function calcFlujoSuperficieCorporal(peso) {
    const superficieCorporal = Math.sqrt((peso * 1000) / 0.007184);
    return Math.round(superficieCorporal);
}









