import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { resolve } from "path"
import { resolveCaa } from "dns"

let nextId = 1

export interface User {
  id: number
  username: string
  email: string
  password: string
  token: string
}

class UserService {
  users: User[] = []

  async register(user: Pick<User, "email" | "password" | "username">) {
    if (this.users.find(({ email }) => email === user.email))
      throw new Error(`The given email [${user.email}] does already exist!`)

    const newUser = { ...user } as User
    newUser.id = nextId++

    newUser.password = await bcryptjs.hash(user.password, 10)

    newUser.token = jwt.sign(user, "the_secret_key", { expiresIn: 30 })

    this.users.push(newUser)

    // pretend the server wait
    return new Promise((resolve) => {
      setTimeout(() => resolve(newUser), 1000)
    })
  }

  async login(input: Pick<User, "email" | "password">) {
    const { email, password } = input

    const user = this.users.find((user) => user.email === email)
    if (!user) return null

    if (await bcryptjs.compare(password, user.password)) {
      user.token = jwt.sign(
        { id: user.id, email: user.email },
        "the_secret_key",
        { expiresIn: "2h" }
      )

      // pretend the server wait
      return new Promise((resolve) => {
        setTimeout(() => resolve(user), 1000)
      })
    } else throw new Error(`Incorect password.`)
  }

  getUsers() {
    return this.users
  }
}

export default UserService
