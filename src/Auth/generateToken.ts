import * as jwt from 'jsonwebtoken'
import {jwtConstants} from './user.constants'
require("dotenv").config();

const generateToken = (email) => {
    console.log("JWT HERE")
    return  jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '60d'
    })
}

export default generateToken