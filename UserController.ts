import { BuscarUser } from "./UserModel";

export class UserController {

    static async usercontroller(email: string) {
        try {

            const modelUser = new BuscarUser(email)

            return modelUser.buscarUser()

        } catch (error) {
            
            console.log("Erro no controller busar user")
            return {sucess: false, message: "Erro no controller buscar user" + error}
        }
    }
}


