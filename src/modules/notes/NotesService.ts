import { User } from "../users/UsersService";

let nextId = 1;

export interface Note {
  id: number;
  text: string;
  updatedAt: Date;
  userID: number;
}

class NotesService {
  notes: Note[] = [];

  getNotes(user: User, id?: Note["id"]) {
    if (id) return this.notes.find((note) => note.id === id);

    return this.notes.filter((note) => note.userID === user.id);
  }

  saveNote(user: User, text: Note["text"]) {
    const newNote: Note = {
      id: nextId,
      updatedAt: new Date(),
      userID: user.id,
      text,
    };

    this.notes.push(newNote);

    nextId++;

    return newNote;
  }

  udpateNote() {
    // pass
  }

  deleteNote() {}
}

export default NotesService;
