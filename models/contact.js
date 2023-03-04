const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "'Set name for contact'!"] },
    email: { type: String, required: [true, "'Set email for contact'!"] },
    phone: { type: String, required: [true, "'Set phone for contact'!"] },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

contactSchema.post("save", handleMongooseError);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
