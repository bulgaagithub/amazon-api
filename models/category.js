const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");
// Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    unique: true,
    trim: true,
    maxlength: [50, "Please maximum value 50"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Категорийн тайлбарыг заавал оруулах ёстой."],
    maxlength: [
      500,
      "Категорийн тайлбарыг урт дээд тал нь 500 тэмдэгт байх ёстой.",
    ],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  averageRating: {
    type: Number,
    max: [10, "Please maximum value 10"],
    min: [1, "Please minimum value 10"],
  },
  averagePrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'category',
    justOne: false,
});

categorySchema.pre("remove", async function (next) {
    await this.model('Book').deleteMany({category: this._id});
    next();
});
  
categorySchema.pre("save", function (next) {
    this.slug = slugify(this.name); // name convert
    this.averageRating = Math.floor(Math.random() * 10) + 1;
    this.averagePrice = Math.floor(Math.random() * 100000) + 3000;
    next();
});

// new Mongoose model
module.exports = mongoose.model("Category", categorySchema); // Category object to read, // mongoose бүх функцуудыг гаргаад өгнө.

// Schema
// Schema-тэй болж байгаа юм уу үгүй.
// MongoDB бол цаанаа өөрөө schema гүй
// Өгөгдлийн сан дээр schema -тэй ажиллахыг болиод
/**
 * Developer-ууд руу шилжүүлсэн гэсэн үг.
 * Mongoose schema -тай ажиллах ажиллыг хялбарчилж өгч байгаа
 */
