/**
 * Processo de renderização
 * Fornecedores
 */
// mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus() // foco no campo de busca
    btnCreate.disabled = true // desativa o botão
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// função para manipular o evento enter
function teclaEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        // executar a função associada ao botão buscar
        buscarFornecedor()
    }
}

// adicionar a função de manipulação do evento da tecla Enter
document.getElementById('frmFornecedor').addEventListener('keydown',teclaEnter)

// função para remover o manipulador de eventos da tecla Enter
function removerTeclaEnter() {
    document.getElementById('frmFornecedor').removeEventListener('keydown',teclaEnter)
}

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos inputs do formulário (passo 1 - slides)
let formFornecedor = document.getElementById('frmFornecedor')
let idFornecedor = document.getElementById('inputId')
let nomeFornecedor = document.getElementById('inputname')
let cnpjFornecedor = document.getElementById('inputCnpj')
let foneFornecedor = document.getElementById('inputPhone')
let emailFornecedor = document.getElementById('inputAddress')
let cepFornecedor = document.getElementById('inputCep')
let logradouroFornecedor = document.getElementById('inputLogradouro')
let numeroFornecedor = document.getElementById('inputNumero')
let complementoFornecedor = document.getElementById('inputComplemento')
let bairroFornecedor = document.getElementById('inputBairro')
let cidadeFornecedor = document.getElementById('inputCidade')
let ufFornecedor = document.getElementById('uf')
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
// array (vetor) usado na renderização dos dados do fornecedor
let arrayFornecedor = []

// Função que vai enviar ao main um pedido de busca dos dados de um 
// fornecedor pelo nome (Passo 1 - slide)
function buscarFornecedor() {
    let nomeFornecedor = document.getElementById('inputSearch').value.trimStart().trimEnd()
    // validação (UX)
    if (nomeFornecedor === "") {
        // validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // enviar o pedido de busca junto com o nome do fornecedor
        api.searchFornecedor(nomeFornecedor)
    }
    // foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    // setar o nome do fornecedor e habilitar o cadastramento
    api.nameFornecedor((args) => {
        // restaurar o comportamento padrão da tecla Enter
        removerTeclaEnter()
        let setarNomeFornecedor = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputname').value = setarNomeFornecedor
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputSearch').blur()
        document.getElementById('inputname').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    // limpar a caixa de busca e setar o foco
    api.clearSearch((args) => {
        document.getElementById('inputname').value = ""
        document.getElementById('inputname').focus()
    })
    // receber do main js os dados do fornecedor (Passo 4)
    api.dataFornecedor((event, dadosFornecedor) => {
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(arrayFornecedor)
    
    // Passo 5 (Final) percorrer o array, extrair os dados e setar os campos de texto (caixa input) do formulário
    arrayFornecedor.forEach((c) => {
        document.getElementById('inputId').value = c._id,
        document.getElementById('inputname').value = c.nomeFornecedor,
        document.getElementById('inputCnpj').value = c.cnpjFornecedor,
        document.getElementById('inputPhone').value = c.foneFornecedor,
        document.getElementById('inputAddress').value = c.emailFornecedor,
        document.getElementById('inputCep').value = c.cepFornecedor,
        document.getElementById('inputLogradouro').value = c.logradouroFornecedor,
        document.getElementById('inputNumero').value = c.numeroFornecedor,
        document.getElementById('inputComplemento').value = c.complementoFornecedor,
        document.getElementById('inputBairro').value = c.bairroFornecedor,
        document.getElementById('inputCidade').value = c.cidadeFornecedor,
        document.getElementById('uf').value = c.ufFornecedor
        // limpar a caixa de busca (UX)
        document.getElementById('inputSearch').value = ""
        // remover o foco de desativar
        document.getElementById('inputSearch').disabled = true
        document.getElementById("inputSearch").blur()
        //desativar os botão adicionar e buscar
        document.getElementById("btnCreate").disabled = true
        document.getElementById("btnRead").disabled = true 
        // ativar os botões update e delete
        document.getElementById('btnUpdate').disabled = false
        document.getElementById('btnDelete').disabled = false
    })
})
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarFornecedor() {
    const fornecedor = {
        idForn: idFornecedor.value,
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
    console.log(fornecedor) // teste do passo 1
    // passo 2: Enviar o objeto fornecedor ao main.js
    api.updateFornecedor(fornecedor)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<