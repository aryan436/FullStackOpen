require("dotenv").config();
const express = require('express')
const Note = require("./models/note");

const app = express()
app.use(express.json());
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
      res.json(notes)
    })
})
app.get("/api/notes/:id", (request, response) => {
  Note.findById(req.params.id).then(note => {
    res.json(note)
  })
});
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const note = new Note({
    content: body.content,
    important:  body.important||false,
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
});
console.log();
const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})