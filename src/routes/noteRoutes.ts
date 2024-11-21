import { Router } from "express"
import NotesService from "../modules/notes/NotesService"
import AuthenticationService from "../modules/authentication/AuthenticationService"

const noteService = new NotesService()
const router = Router()
const authService = new AuthenticationService()

router.get("/notes", (req, res) => {
  const user = authService.checkAuth(req.headers.authorization)

  if (user) res.json(noteService.getNotes(user))
  else res.status(403).json("Invalid or Expired Token")
})

router.post("/notes", (req, res) => {
  const user = authService.checkAuth(req.headers.authorization)

  const { text } = req.body

  if (user) res.json(noteService.saveNote(user, text))
  else res.status(403).json("Invalid or Expired Token")
})

export default router
