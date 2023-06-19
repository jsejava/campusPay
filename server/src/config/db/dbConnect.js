const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_PROD, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Db is Connected Successfully");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!!!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!!!");
});

module.exports = dbConnect;
