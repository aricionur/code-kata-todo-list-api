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

    const { password: rawPassword, email, username } = user
    const id = nextId++
    const token = jwt.sign({ id, email, username }, "the_secret_key", {
      expiresIn: 3600,
    })
    const password = await bcryptjs.hash(rawPassword, 10)

    const newuser: User = { id, token, email, username, password }

    this.users.push(newuser)

    const userWithoutPass: Partial<User> = newuser
    delete userWithoutPass.password

    // mock the server wait
    return new Promise((resolve) => {
      setTimeout(() => resolve(userWithoutPass), 1000)
    })
  }

  async login(input: Pick<User, "email" | "password">): Promise<User | null> {
    const { email, password } = input

    const user = this.users.find((user) => user.email === email)
    if (!user) return null

    if (await bcryptjs.compare(password, user.password)) {
      user.token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        "the_secret_key",
        { expiresIn: "2h" }
      )

      // mock the server wait
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
