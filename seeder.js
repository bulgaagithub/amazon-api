// Өгөгдлийн санг анхны хэлбэрт оруулах
const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Category = require("./models/category");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Бүх өгөгдлийг json Object to convert

const categories = JSON.parse(
  fs.readFileSync(__dirname + "/data/categories.json", "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    console.log("Өгөгдлийг импортоллоо...".green.inverse);
  } catch (err) {
    console.log(`${err}`.red.inverse);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    console.log("Өгөгдлийг бүгдийг устгалаа...".red.inverse);
  } catch (err) {
    console.log(`${err}`.red.inverse);
  }
};

// call seeder js with argument
// [0] node
// [1] script name
// [2] argumet
// [3] argument 2
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
