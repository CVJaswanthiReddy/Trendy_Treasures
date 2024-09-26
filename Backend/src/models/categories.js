import mongoose from "mongoose";
import slugify from "slugify";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware to create a slug before saving
categoriesSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
