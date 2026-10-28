import UserModelModel from "../model/user.model.js";
import { registerschema } from "../schemas/auth.schema.js";
import { PasswordHelper } from "../utils/bcrypt.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class Authcontroller {
    static async register(req, res) {
        const result = registerschema.safeParse (req.body)

        if (!result.succes) {
            return apiResponseValidation({
                res,
                errors : result.error
            })
        }
        const {name, email, password} = result.data

        const newUser = await UserModel.create ({
            name,
            email,
            password : await PasswordHelper.hash(password)
        })
        return apiResponse({
            res,
            status: 200,
            massage: "Register Berhasil",
            data: null

        })
    }

    static async login (req, res) {

    }
}

export default Authcontroller