
const mongoose = require("mongoose");
const uri="mongodb+srv://sprinterApi:asdfghjkl123456@sprinter.2s3nkqi.mongodb.net/?retryWrites=true&w=majority";
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


//asdfghjkl123456