function fecharModalResultado() {
    document.getElementById('modalResultado').style.display = 'none';
}

function calcularPercentuais() {
    const inputIntegral = document.getElementById('valorIntegral').value.replace(',', '.');
    const inputOferta = document.getElementById('valorOferta').value.replace(',', '.');
    
    const valorIntegral = parseFloat(inputIntegral);
    const valorOferta = parseFloat(inputOferta);
    const avisoErro = document.getElementById('avisoErro');

    avisoErro.innerText = "";
    document.getElementById('resultadoTotal').innerText = "-";
    document.getElementById('resultadoIncondicional').innerText = "-";
    document.getElementById('resultadoCondicional').innerText = "-";

    if (isNaN(valorIntegral) || isNaN(valorOferta)) {
        avisoErro.innerText = "Por favor, preencha os campos com valores válidos.";
        return;
    }

    if (valorIntegral === 0) {
        avisoErro.innerText = "O valor integral não pode ser zero para efetuar o cálculo de desconto.";
        return;
    }

    if (valorOferta > valorIntegral) {
        avisoErro.innerText = "Atenção: O valor da oferta não pode ultrapassar o valor integral do curso.";
        return;
    }

    const descontoTotalDecimal = 1 - (valorOferta / valorIntegral);
    const percentualTotal = descontoTotalDecimal * 100;

    let incondicionalDecimal = descontoTotalDecimal - 0.10;
    
    if (incondicionalDecimal < 0) {
        incondicionalDecimal = 0; 
    }
    const percentualIncondicional = incondicionalDecimal * 100;

    const condicionalDecimal = 1 - ((100 * (1 - descontoTotalDecimal)) / (100 * (1 - incondicionalDecimal)));
    const percentualCondicional = condicionalDecimal * 100;

    document.getElementById('resultadoTotal').innerText = percentualTotal.toFixed(2) + "%";
    document.getElementById('resultadoIncondicional').innerText = percentualIncondicional.toFixed(2) + "%";
    document.getElementById('resultadoCondicional').innerText = percentualCondicional.toFixed(2) + "%";

    document.getElementById('modalResultado').style.display = 'flex';
}

function limparTudo() {
    document.getElementById('valorIntegral').value = "";
    document.getElementById('valorOferta').value = "";
    
    document.getElementById('avisoErro').innerText = "";
    fecharModalResultado();
}

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const modal = document.getElementById('modalResultado');
        
        if (modal.style.display === 'flex') {
            fecharModalResultado();
        } 

        else {
            calcularPercentuais();
        }
    }
});
