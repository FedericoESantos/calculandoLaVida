function dividirCuenta() {
    let total = parseFloat(document.getElementById("totalCuenta").value);
    let personas = parseInt(document.getElementById("personasCuenta").value);
    if (isNaN(total) || isNaN(personas) || personas === 0) {
        alert("Por favor ingrese valores válidos.");
        return;
    }
    let porPersona = total / personas;
    let resultado = "Cada persona paga: $" + porPersona.toFixed(2);
    document.getElementById("resultadoCuenta").innerHTML = resultado;
    guardarHistorial("Comida", resultado);
}

function calcularViaje() {
    let km = parseFloat(document.getElementById("km").value);
    let costoKm = parseFloat(document.getElementById("costoKm").value);
    let cantidadPeajes = parseInt(document.getElementById("cantidadPeajes").value);
    let costoPeaje = parseFloat(document.getElementById("costoPeaje").value);
    let personas = parseInt(document.getElementById("personasViaje").value);
    let idaVuelta = document.getElementById("idaVuelta").checked;

    if (isNaN(km) || isNaN(costoKm) || isNaN(cantidadPeajes) || isNaN(costoPeaje) || isNaN(personas) || personas === 0) {
        alert("Por favor complete todos los campos con valores válidos.");
        return;
    }

    // Si es ida y vuelta, duplicamos los km y peajes
    if (idaVuelta) {
        km *= 2;
        cantidadPeajes *= 2;
    }

    let totalNafta = km * costoKm;
    let totalPeajes = cantidadPeajes * costoPeaje;
    let totalViaje = totalNafta + totalPeajes;
    let porPersona = totalViaje / personas;

    let resultado =
        "Total kilómetros: " + km + " km<br>" +
        "Total nafta: $" + totalNafta.toFixed(2) + "<br>" +
        "Total peajes: $" + totalPeajes.toFixed(2) + "<br>" +
        "Total viaje: $" + totalViaje.toFixed(2) + "<br>" +
        "Cada persona paga: $" + porPersona.toFixed(2);

    document.getElementById("resultadoViaje").innerHTML = resultado;
    guardarHistorial("Viaje", resultado.replace(/<br>/g, " | "));
}

function calcularConsumoReal() {
    let km = parseFloat(document.getElementById("kmRecorridos").value);
    let litros = parseFloat(document.getElementById("litrosCargados").value);

    if (isNaN(km) || isNaN(litros) || litros === 0) {
        alert("Por favor ingrese valores válidos.");
        return;
    }

    let consumo = km / litros;
    let resultado = "Consumo real: " + consumo.toFixed(2) + " km/l";

    document.getElementById("resultadoConsumo").innerHTML = resultado;
    guardarHistorial("Consumo combustible", resultado);
}

function compararCombustibles() {
    let precioSuper = parseFloat(document.getElementById("precioSuper").value);
    let precioPremium = parseFloat(document.getElementById("precioPremium").value);
    let litros = parseFloat(document.getElementById("litrosCargar").value);

    if (isNaN(precioSuper) || isNaN(precioPremium)) {
        alert("Por favor ingrese los precios de ambos combustibles.");
        return;
    }

    let diferencia = precioPremium - precioSuper;
    let porcentaje = (diferencia / precioSuper) * 100;
    let resultado =
        "Diferencia por litro: $" + diferencia.toFixed(2) + "<br>" +
        "Premium es " + porcentaje.toFixed(2) + "% más cara.";

    if (!isNaN(litros) && litros > 0) {
        let gastoExtra = diferencia * litros;
        resultado += "<br> Cargar " + litros + " litros de Premium costará $" + gastoExtra.toFixed(2) + " extra.";
    }

    document.getElementById("resultadoCombustible").innerHTML = resultado;
    guardarHistorial("Comparación combustible", resultado.replace(/<br>/g, " | "));
}

function calcularCostoPorKm() {
    let totalGasto = parseFloat(document.getElementById("totalGastoViaje").value);
    let kmRecorridos = parseFloat(document.getElementById("kmRecorridos").value);

    if (isNaN(totalGasto) || isNaN(kmRecorridos) || kmRecorridos === 0) {
        alert("Por favor ingrese valores válidos.");
        return;
    }

    let costoPorKm = totalGasto / kmRecorridos;

    let resultado = "Costo promedio por kilómetro: $" + costoPorKm.toFixed(2);

    document.getElementById("resultadoCostoKm").innerHTML = resultado;
    guardarHistorial("Costo por km", resultado);
}

function calcularAhorroPorUnidad() {
    let nombre = document.getElementById("nombreUnidad").value;
    let precioUnidad = parseFloat(document.getElementById("precioUnidad").value);
    let cantidadMes = parseInt(document.getElementById("cantidadMes").value);
    let meses = parseInt(document.getElementById("cantidadMeses").value);

    if (nombre.trim() === "" || isNaN(precioUnidad) || isNaN(cantidadMes) || isNaN(meses) ||
        precioUnidad <= 0 || cantidadMes <= 0 || meses <= 0) {
        alert("Por favor complete todos los campos correctamente.");
        return;
    }

    let gastoMensual = precioUnidad * cantidadMes;
    let ahorroTotal = gastoMensual * meses;

    let resultado = "Gastás $" + gastoMensual.toFixed(2) + " mensuales en '" + nombre + "'. En " + meses + " meses ahorrarías $" + ahorroTotal.toFixed(2) + " si dejás de consumirlo.";

    document.getElementById("resultadoAhorroUnidad").innerHTML = resultado;
    guardarHistorial("Ahorro en " + nombre, resultado);
}

function calcularCuotas() {
    let monto = parseFloat(document.getElementById("montoTotal").value);
    let cuotas = parseInt(document.getElementById("cantidadCuotas").value);
    let interes = parseFloat(document.getElementById("interesMensual").value);

    if (isNaN(monto) || isNaN(cuotas) || cuotas <= 0 || isNaN(interes) || interes < 0) {
        alert("Por favor complete todos los campos correctamente.");
        return;
    }

    let cuotaBase = monto / cuotas;
    let totalConInteres = 0;
    let detalleCuotas = "";

    for (let i = 1; i <= cuotas; i++) {
        let interesCuota = cuotaBase * (interes / 100);
        let cuotaFinal = cuotaBase + interesCuota;
        totalConInteres += cuotaFinal;
        detalleCuotas += "Cuota " + i + ": $" + cuotaFinal.toFixed(2) + "<br>";
    }

    let totalIntereses = totalConInteres - monto;

    let resultado =
        "Monto total: $" + monto.toFixed(2) + "<br>" +
        "Interés mensual: " + interes.toFixed(2) + "%<br>" +
        "Total a pagar con intereses: $" + totalConInteres.toFixed(2) + "<br>" +
        "Interés total abonado: $" + totalIntereses.toFixed(2) + "<br><br>" +
        detalleCuotas;

    document.getElementById("resultadoCuotas").innerHTML = resultado;
    guardarHistorial("Plan de cuotas", resultado.replace(/<br>/g, " | "));
}
function calcularServicios() {
    let agua = parseFloat(document.getElementById("agua").value) || 0;
    let luz = parseFloat(document.getElementById("luz").value) || 0;
    let gas = parseFloat(document.getElementById("gas").value) || 0;
    let internet = parseFloat(document.getElementById("internet").value) || 0;

    let totalMensual = agua + luz + gas + internet;
    let totalAnual = totalMensual * 12;

    let resultado =
        "Costo mensual total: $" + totalMensual.toFixed(2) + "<br>" +
        "Costo anual total: $" + totalAnual.toFixed(2);

    document.getElementById("resultadoServicios").innerHTML = resultado;
    guardarHistorial("Servicios Públicos", resultado.replace(/<br>/g, " | "));
}
function convertirUnidad() {
    let cantidad = parseFloat(document.getElementById("cantidadConvertir").value);
    let tipo = document.getElementById("tipoConversion").value;

    if (isNaN(cantidad)) {
        alert("Por favor ingrese una cantidad válida.");
        return;
    }

    // Cotizaciones de ejemplo (ajustar según cotización real)
    const cotizacionUSD = 900;       // ARS a USD
    const cotizacionUYU = 40;        // UYU a USD
    const cotizacionARS_UYU = 0.39;  // ARS a UYU

    let resultado = "";

    switch (tipo) {
        case "kmMillas":
            resultado = (cantidad * 0.621371).toFixed(3) + " millas";
            break;

        case "pesosDolares":
            resultado = (cantidad / cotizacionUSD).toFixed(2) + " USD (cotiz: $" + cotizacionUSD + ")";
            break;

        case "uyuDolares":
            resultado = (cantidad / cotizacionUYU).toFixed(2) + " USD (cotiz: 1 USD = " + cotizacionUYU + " UYU)";
            break;

        case "pesosArgUyus":
            resultado = (cantidad * cotizacionARS_UYU).toFixed(2) + " UYU (cotiz: 1 ARS = " + cotizacionARS_UYU + " UYU)";
            break;

        default:
            resultado = "Tipo de conversión no soportado.";
    }

    document.getElementById("resultadoConversion").innerHTML = "Resultado: " + resultado;
    guardarHistorial("Conversión", "De " + cantidad + " → " + resultado);
}
function calcularDiferenciaFechas() {
    let fechaFutura = document.getElementById("fechaFutura").value;

    if (!fechaFutura) {
        alert("Por favor seleccioná una fecha.");
        return;
    }

    let hoy = new Date();
    let futura = new Date(fechaFutura);

    // Diferencia en milisegundos
    let diferenciaMs = futura - hoy;

    if (diferenciaMs < 0) {
        document.getElementById("resultadoFechas").innerHTML = "La fecha ya pasó.";
        return;
    }

    // Milisegundos a días
    let diferenciaDias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

    document.getElementById("resultadoFechas").innerHTML =
        "Faltan " + diferenciaDias + " día(s) para el " + futura.toLocaleDateString();

    guardarHistorial("Fechas", "Faltan " + diferenciaDias + " día(s) hasta " + futura.toLocaleDateString());
}

function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let alturaCm = parseFloat(document.getElementById("altura").value);

    if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0) {
        alert("Por favor ingresá valores válidos.");
        return;
    }

    let alturaM = alturaCm / 100;
    let imc = peso / (alturaM * alturaM);
    let clasificacion = "";

    if (imc < 18.5) clasificacion = "Bajo peso";
    else if (imc < 24.9) clasificacion = "Normal";
    else if (imc < 29.9) clasificacion = "Sobrepeso";
    else clasificacion = "Obesidad";

    let resultado =
        "Tu IMC es: " + imc.toFixed(2) + " (" + clasificacion + ")";

    document.getElementById("resultadoIMC").innerHTML = resultado;

    guardarHistorial("IMC", resultado);
}



function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    let historialDiv = document.getElementById("historial");
    if(historialDiv){
        historialDiv.innerHTML = "";
        historial.forEach(item => {
            historialDiv.innerHTML += "<p>" + item + "</p>";
        });
    }
}

function guardarHistorial(tipo, resultado) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.unshift(tipo + ": " + resultado);
    localStorage.setItem("historial", JSON.stringify(historial));
    mostrarHistorial();
}

function limpiarHistorial() {
    localStorage.removeItem("historial");
    mostrarHistorial();
}

function enviarMensaje() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        document.getElementById("respuestaContacto").innerText = "Completa todos los campos.";
        return;
    }

    fetch("/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("respuestaContacto").innerText = "Hubo un error al enviar.";
            } else {
                document.getElementById("respuestaContacto").innerText = "Mensaje enviado con éxito.";
                // limpiar campos
                document.getElementById("nombre").value = "";
                document.getElementById("email").value = "";
                document.getElementById("mensaje").value = "";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("respuestaContacto").innerText = "No se pudo enviar.";
        });
}

mostrarHistorial();
document.addEventListener("DOMContentLoaded", mostrarHistorial);