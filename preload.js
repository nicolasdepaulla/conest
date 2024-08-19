const { ipcRenderer, contextBridge } = require('electron')




// status de conexão (verificar se o banco de dados está conectado)

ipcRenderer.send('send-message', "status do banco de dados:")
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    hello: () => ipcRenderer.send('send-message', "oi!"),
    openAbout: () => ipcRenderer.send('open-about'),
    openclientes: () => ipcRenderer.send('open-clientes'),
    openfornecedores: () => ipcRenderer.send('open-fornecedores'),
    openprodutos: () => ipcRenderer.send('open-produtos'),
    openrelatorios: () => ipcRenderer.send('open-relatorios'),
    dbmessage: (message) => ipcRenderer.on('db-message',message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newFornecedor: (fornecedor) => ipcRenderer.send('new-fornecedor', fornecedor),
    infoSearchDialog: () => ipcRenderer.send('dialog-infoSearchDialog'), // permitir um pedido ao main
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
    nameClient: (args) => ipcRenderer.on('name-client', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client',dadosCliente),
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    searchFornecedor: (nomeFornecedor) => ipcRenderer.send('search-fornecedor', nomeFornecedor),
    nameFornecedor: (args) => ipcRenderer.on('name-fornecedor', args),
    dataFornecedor: (dadosFornecedor) => ipcRenderer.on('data-fornecedor',dadosFornecedor),
    infoSearchDialogForn: () => ipcRenderer.send('dialog-infoSearchDialogForn'), // permitir um pedido ao main
    focusSearchForn: (args) => ipcRenderer.on('focus-searchForn', args),
    updateFornecedor: (fornecedor) => ipcRenderer.send('update-fornecedor', fornecedor),
    deleteFornecedor: (idForn) => ipcRenderer.send('delete-fornecedor', idForn),
    resetForm:(args) => ipcRenderer.on('reset-form' ,args)
})

// Inserir data na página
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-br', options)
}

// interagir diretamente no doom do documento html (index.html)
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('data').innerHTML = 
    obterData()
})
