import * as fs from "fs"; // Modulo do node, permite trabalhar com arquivos do meu computador
import * as path from "path";// Modulo nativo do node, ajuda a construir caminhos de forma compativel com diferentes sistemas operacionais 
import { cert } from "firebase-admin/app"; // Função do firebase, converte um objeto de servico em um objeto de credencial que o firebase pode usar para autenticação
import * as admin from "firebase-admin"; //Import todas as funções de admin do firebase sdk 

//Função para inicializar o firebase Admin
function inicializeFirebaseAdmin() {
  
  //Verifico se já foi inicializo
  if (admin.apps.length > 0) {
    return admin.apps[0]
  }

  try {

    //Carrego o arquivo com minhas credenciais
    const filePatch = path.resolve(__dirname, "../../firebaseServiceAccount.json")

    //Inicializo o firebase com as credenciais importadas
    const serviceAccount = JSON.parse(fs.readFileSync(filePatch, "utf-8"))//Faço a conversão string JSON em objetos javaScript

    //Inicializa o firebase admin
    admin.initializeApp({
      credential: cert(serviceAccount)
    })

    console.log("Firebase inicializado com sucesso")

  } catch (error) {

    console.log("Erro ao inicialzar o firebase admin") 
  } 
}

//Inicializa a função principal
inicializeFirebaseAdmin()

//Faço a exportação para outros componentes
export default admin
