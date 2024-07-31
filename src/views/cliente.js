/**
 * Processo de renderização
 * Clientes
 */
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<