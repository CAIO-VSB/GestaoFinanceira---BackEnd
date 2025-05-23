import express, {Request, Response } from "express";
import admin from "../firebase/auth-firebase";

const router = express.Router()

router.post("/validar-token", async (req:Request, res:Response) => {
    
    const token = req.headers.authorization?.split('Bearer ')[1]
    //Acesso o cabeçalho com o token, como o retorno é um array, e eu quero somente o token
    // Eu acesso a posição 1, onde está o meu token

    if (!token) { // Verifico se existe algum token antes
        return res.status(400).json({error: "Token não encontrado no cabeçalho"})
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token) // Verifico para saber se é válido

        res.status(200).json({autenticado: true, uid: decodedToken.uid}) // Retorno de sucesso

        console.log(decodedToken)

    } catch (error) {
        console.log("Error ao verificar token")
        res.status(401).json({error: "Token inválido ou expirado"})
    }
})


export default router