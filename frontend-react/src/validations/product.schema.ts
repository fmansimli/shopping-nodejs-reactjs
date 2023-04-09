import { Schema } from "@validify-js/react";

export const productSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 5,
  },
  sku: {
    type: Number,
    required: true,
    min: 0,
  },
});
