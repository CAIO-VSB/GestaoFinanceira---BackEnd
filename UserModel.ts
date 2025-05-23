import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class BuscarUser {

    private email: string

    constructor(email: string) {
        this.email = email
    }

    public async buscarUser(): Promise<object | undefined> {

        try {

            if (!this.email.trim()) {
                console.log("Erro na classe buscarUser. E-mail não respeita as diretrizes")
                return {error: "E-mail não encontrado (objeto)"}
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: this.email
                }, 
                select: {
                    name: true
                }
            })

            if (!user) {
                console.log("Usuário não encontrado")
                return {error: "User não encontrado (objeto)"}
            }

            return user

        } catch (error) {

            console.log("Erro na classe UserModel back-end", error)
        }
    }
}

