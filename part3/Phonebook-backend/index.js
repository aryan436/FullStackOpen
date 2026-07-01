require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body ",
  ),
);
let persons = [];
app.get("/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    res.send(
      `<p>Phonebook has info for ${count} people</p> ${new Date()}`,
    );
  })
  
});
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
  res.send(persons);
  })
});
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.send(person)
  })
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!(body.number && body.name)) {
    return res.status(400).json({ error: "Name or Number is missing" });
  }
  const person =new Person ({
    name: body.name,
    number: body.number,
  });
  person.save().then(()=>
    res.status(201).json(person)
  )
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
