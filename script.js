// Formateador numérico según norma SI (coma decimal y espacio para miles)
const formatter = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 6
});

//const formatter = new Intl.NumberFormat("es-ES", {
//    minimumFractionDigits: 0,
//    maximumFractionDigits: 6
//});

function formatSI(number, decimals = 6) {
    // Redondea y separa parte entera y decimal
    let fixed = number.toFixed(decimals);
    let parts = fixed.split('.');

    let intPart = parts[0];
    let decPart = parts[1];

    // Espacio cada 3 cifras a la izquierda
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Espacio cada 3 cifras a la derecha
    decPart = decPart.replace(/(\d{3})(?=\d)/g, '$1 ');

    return `${intPart},${decPart}`;
}

function convertMetric() {
    const value = parseFloat(document.getElementById("metricValue").value);
    const from = document.getElementById("metricFrom").value;
    const to = document.getElementById("metricTo").value;

    if (isNaN(value)) {
        document.getElementById("metricResult").innerText =
            "Ingrese un valor válido";
        return;
    }

    const factors = {
        km: 1000,
        m: 1,
        cm: 0.01
    };

    const result = value * factors[from] / factors[to];

    document.getElementById("metricResult").innerText =
        `Resultado: ${formatter.format(result)} [${to}]`;
}

function convertImperial() {
    const value = parseFloat(document.getElementById("impValue").value);
    const from = document.getElementById("impFrom").value;
    const to = document.getElementById("impTo").value;

    if (isNaN(value)) {
        document.getElementById("impResult").innerText =
            "Ingrese un valor válido";
        return;
    }

    let result = null;

    if (from === "inch" && to === "cm") result = value * 2.54;
    if (from === "ft" && to === "m") result = value * 0.3048;
    if (from === "lb" && to === "kg") result = value * 0.453592;

    document.getElementById("impResult").innerText =
        result !== null
            ? `Resultado: ${formatter.format(result)} [${to}]`
            : "Conversión no válida";
}
