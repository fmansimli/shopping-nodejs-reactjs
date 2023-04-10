import { Schema } from "@validify-js/react";

export const LoginSchema = new Schema({
  email: {
    type: String,
    email: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

export const registerSchema = new Schema({
  email: {
    type: String,
    email: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});
