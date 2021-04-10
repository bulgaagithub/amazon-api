const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

// Schema
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Номын нэрийг оруулна уу"],
    unique: true,
    trim: true,
    maxlength: [250, "Номын нэрийн урт дээд тал нь 250 тэмдэгт байх ёстой."],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  author: {
    type: String,
    required: [true, "Зохиогчийн нэрийг оруулна уу"],
    trim: true,
    maxlength: [50, "Зохиогчийн нэрийн урт дээд тал нь 50 тэмдэгт байх ёстой."],
  },
  rating: {
    type: Number,
    max: [10, "Please maximum value 10"],
    min: [1, "Please minimum value 1"],
  },
  price: {
    type: Number,
    required: [true, "Номын үнийг оруулна уу"],
    min: [500, "Номын үнэ хамгийн багадаа 500 төгрөг байх ёстой."],
  },
  balance: Number,
  content: {
    type: String,
    required: [true, "Номын тайлбарыг оруулна уу"],
    unique: true,
    trim: true,
    maxlength: [5000, "Номын тайлбарын урт дээд тал нь 5000 тэмдэгт байх ёстой."],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  available: [String],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  createUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  updateUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, 
{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookSchema.virtual("zohiogch").get(function() {
    let tokens = this.author.split(" ");
    if(tokens.length === 1) tokens = this.author.split(".");
    if(tokens.length === 2) return tokens[1];

    return tokens[0];
});

// new Mongoose model
module.exports = mongoose.model("Book", bookSchema); // Book object to read, // mongoose бүх функцуудыг гаргаад өгнө.
