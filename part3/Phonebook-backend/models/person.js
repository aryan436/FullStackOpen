const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("connecting to ", url);
mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting :", error);
  });
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = (module.exports = mongoose.model("Person", personSchema));