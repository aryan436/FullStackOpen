const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body ",
  ),
);
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> ${new Date()}`,
  );
});
app.get("/api/persons", (req, res) => {
  res.send(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
const getId = () => {
  return String(Math.floor(Math.random() * 10000000000));
};
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!(body.number && body.name)) {
    return res.status(400).json({ error: "Name or Number is missing" });
  }
  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: "person already exists" });
  }
  const person = {
    id: getId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.status(201).json(person);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});