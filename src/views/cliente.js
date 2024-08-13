/**
 * Processo de renderização
 * Clientes
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
        buscarCliente()
    }
}


// adicionar a função de manipulação do evento da tecla Enter
document.getElementById('frmCliente').addEventListener('keydown',teclaEnter)


// função para remover o manipulador de eventos da tecla Enter
function removerTeclaEnter() {
    document.getElementById('frmCliente').removeEventListener('keydown',teclaEnter)
}
// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// captura dos inputs do formulário (passo 1 - slides)
let formCliente = document.getElementById('frmCliente')
let nomeCliente = document.getElementById('inputnameCliente')
let foneCliente = document.getElementById('inputphoneCliente')
let emailCliente = document.getElementById('inputAddressCliente')
// evento relacionado ao botão adicionar (ainda passo 1 - slide)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    // Empacotar os dados em um objeto e enviar ao main.js
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    // limpar os dados do form após envio
    formCliente.reset()
})
//

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// array (vetor) usado na renderização dos dados do cliente
let arrayCliente = []
// Função que vai enviar ao main um pedido de busca dos dados de um 
// cliente pelo nome (Passo 1 - slide)
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value.trimStart().trimEnd()
    // validação (UX)
    if (nomeCliente === "") {
        // validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // enviar o pedido de busca junto com o nome do cliente
        api.searchClient(nomeCliente)
    }
    // foco no campo de busca (UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    // setar o nome do cliente e habilitar o cadastramento
    api.nameClient((args) => {
        // restaurar o comportamento padrão da tecla Enter
        removerTeclaEnter()
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputnameCliente').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputnameCliente').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    // limpar a caixa de busca e setar o foco
    api.clearSearch((args) => {
        document.getElementById('inputnameSearch').value = ""
        document.getElementById('inputnameSearch').focus()
    })
    // receber do main js os dados do cliente (Passo 4)
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)
    
    // Passo 5 (Final) percorrer o array, extrair os dados e setar os campos de texto (caixa input) do formulário
    arrayCliente.forEach((c) => {
        document.getElementById('inputId').value = c._id,
        document.getElementById('inputnameCliente').value = c.nomeCliente,
        document.getElementById('inputphoneCliente').value = c.foneCliente,
        document.getElementById('inputAddressCliente').value = c.emailCliente
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Reset do formulário
api.resetForm((args) => {
    resetForm()   
})


function resetForm() {
    document.getElementById('inputSearch').disabled = false
    document.getElementById('inputSearch').focus() // foco no campo de busca
    btnCreate.disabled = true // desativa o botão
    btnRead.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
    document.getElementById("frmCliente").addEventListener("keydown", teclaEnter)
}