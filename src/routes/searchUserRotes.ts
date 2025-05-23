import express, {Request, Response } from "express"
import admin from "../firebase/auth-firebase"
import { UserController } from "../controller/UserController"

const router = express.Router()

router.post("/", async (req:Request, res:Response) => {

    const token = req.headers.authorization?.split('Bearer ')[1]
    const tokenHeader = req.headers.authorization;
    console.log("Token recebido no header:", tokenHeader)
    //Acesso o cabeçalho com o token, como o retorno é um array, e eu quero somente o token
    // Eu acesso a posição 1, onde está o meu token

    if (!token) { // Verifico se existe algum token antes

        res.status(400).json({error: "Token não encontrado no cabeçalho"})
        return
    }

    try {

        const decodedToken = await admin.auth().verifyIdToken(token)

        console.log(decodedToken)

        const email = decodedToken.email

        console.log(email)

        if (!email) {
            res.status(400).json({error: "E-mail não encontrado"})  
            return
        }

        const user = await UserController.usercontroller(email)

        res.status(200).json({nome: user.name})

    } catch (error) {

        console.log("Error ao buscar usuário")

        res.status(401).json({error: "Error ao buscar usuario"})

    } finally {

        return true
    }

})

export default router