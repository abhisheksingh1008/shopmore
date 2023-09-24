import mongoose from "mongoose";

const productCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageData: {
      image_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: false,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model("Categories", productCategorySchema);

export default ProductCategory;
