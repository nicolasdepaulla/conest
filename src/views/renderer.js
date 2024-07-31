/**
 * processo de renderização do documento index.html
 *@author Nicolas de Paula Pacheco
 */

console.log("processo de renderização")

// vinculado ao preoload.js 
 console.log(`Electron: ${api.verElectron()}`)
 api.hello()

//  função que é executada quando o botão for clicado
function sobre() {
   api.openAbout()
}
function clientes() {
   api.openclientes()
}
function fornecedores() {
   api.openfornecedores()
}
function produto() {
   api.openprodutos()
}
function relatorios() {
   api.openrelatorios()
}
// alteração do icone do status do banco de dados
api.dbmessage((event, message) => {
   console.log(message)
   if (message === "conectado") {
      document.getElementById('status').src = "../public/img/dbon.png"
   } else {
      document.getElementById('status').src = "../public/img/dboff.png"
   }
})
