import express, {Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import admin from "../firebase/auth-firebase"


const prisma = new PrismaClient()

const router = express.Router()


router.post("/", async (req:Request, res:Response) => {

    
    const token = req.headers.authorization?.split('Bearer ')[1]
    const {name} = req.body
    //Acesso o cabeçalho com o token, como o retorno é um array, e eu quero somente o token
    // Eu acesso a posição 1, onde está o meu token

    if (!token) { // Verifico se existe algum token antes
        return res.status(400).json({error: "Token não encontrado no cabeçalho"})
    }

    if (!name) {
        return res.status(400).json({error: "Nome do usuário não fornecido"})
    }

    try {

        const decodedToken = await admin.auth().verifyIdToken(token)
        const email = decodedToken.email

        if (!email) {
            return res.status(400).json({error: "E-mail não encontrado"})  
        }

        await prisma.user.create({
            data: {
                email: email ,
                name: name
            }
        })
        
        res.status(200).json({autenticado: true, message: "Usuário criado com sucesso"}) // Retorno de sucesso

    } catch (error) {
        console.log("Error ao verificar token")
        res.status(401).json({error: "Token inválido ou expirado"})
    }
})

export default router