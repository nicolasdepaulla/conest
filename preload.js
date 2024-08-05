const { ipcRenderer, contextBridge } = require('electron')
const Fornecedor = require('./src/models/Fornecedor')



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
    newFornecedor: (Fornecedor) => ipcRenderer.send('new-fornecedor', Fornecedor)

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
