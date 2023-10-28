
const mongoose = require("mongoose");
const uri="mongodb+srv://beingpisachh:a1b2c3d4e5@sprinter.zfxfldr.mongodb.net/";
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error; 
  }
}

module.exports = connectToDatabase;
