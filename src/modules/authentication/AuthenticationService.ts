import jwt from "jsonwebtoken"
import { User } from "../users/UsersService"

class AuthenticationService {
  checkAuth(authHeader: string | undefined) {
    if (!authHeader) return

    const token = authHeader.split("Bearer")[1].trim()

    try {
      const user = jwt.verify(token, "the_secret_key") as User

      return user
    } catch (error) {
      return
    }
  }
}

export default AuthenticationService
