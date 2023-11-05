const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
});
module.exports = mongoose.model("genre",genreSchema);