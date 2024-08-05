/**
 * Processo de renderização
 * Fornecedores
 */
// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos inputs do formulário (passo 1 - slides)
let formFornecedor = document.getElementById('frmFornecedor')
let nomeFornecedor = document.getElementById('inputnameFornecedor')
let cnpjFornecedor = document.getElementById('inputCnpjFornecedor')
let foneFornecedor = document.getElementById('inputPhoneFornecedor')
let emailFornecedor = document.getElementById('inputAddressFornecedor')
let cepFornecedor = document.getElementById('inputCepFornecedor')
let logradouroFornecedor = document.getElementById('inputLogradouroFornecedor')
let numeroFornecedor = document.getElementById('inputNumeroFornecedor')
let complementoFornecedor = document.getElementById('inputComplementoFornecedor')
let bairroFornecedor = document.getElementById('inputBairroFornecedor')
let cidadeFornecedor = document.getElementById('inputCidadeFornecedor')
let ufFornecedor = document.getElementById('ufFornecedor')
// evento relacionado ao botão adicionar (ainda passo 1 - slide)
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeFornecedor.value, cnpjFornecedor.value, emailFornecedor.value, foneFornecedor.value, cepFornecedor.value, logradouroFornecedor.value, numeroFornecedor.value, complementoFornecedor.value, bairroFornecedor.value, cidadeFornecedor.value, ufFornecedor.value)
// Empacotar os dados em um objeto e enviar ao main.js
    const fornecedor = {
        nomeFor: nomeFornecedor.value,
        cnpjFor: cnpjFornecedor.value,
        foneFor: foneFornecedor.value,
        emailFor: emailFornecedor.value,
        cepFor: cepFornecedor.value,
        logFor: logradouroFornecedor.value,
        numFor: numeroFornecedor.value,
        compFor: complementoFornecedor.value,
        bairroFor: bairroFornecedor.value,
        cidFor: cidadeFornecedor.value,
        ufFor: ufFornecedor.value
    }
    api.newFornecedor(fornecedor)
// limpar os dados do form após envio
    formFornecedor.reset()
})
//

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<