import { Router, Request, Response } from "express"
import UserService from "../modules/users/UsersService"

const router = Router()
const userService = new UserService()

router.post("/users/login", async (req: Request, res: Response) => {
  try {
    const user = await userService.login(req.body)

    if (user) res.json(user)
    else res.status(404).json(`Given email [${req.body.email}] does not exist!`)
  } catch (error: any) {
    res.status(401).json({})
  }
})

router.post("/users/register", async (req: Request, res: Response) => {
  try {
    const newUser = await userService.register(req.body)
    res.json(newUser)
  } catch (error: any) {
    res.status(409).json(error.message)
  }
})

router.get("/users", (req: Request, res: Response) => {
  res.json(userService.getUsers())
})

export default router
