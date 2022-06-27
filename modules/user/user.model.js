const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { roles } = require("../../config/roles");

const providerList = ["email", "phone_number", "google", "facebook"];
const transformFields = [
  "role",
  "createdAt",
  "blocked",
  "active",
  "confirmed",
  "phone_number",
];

const UserSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      maxlength: 12,
      minlength: 12,
    },
    role: {
      type: String,
      default: roles[0],
      enum: roles,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    confirmed: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    otp: Number,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc) {
        const transformed = {};

        transformFields.forEach((field) => {
          transformed[field] = doc[field];
        });

        return transformed;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods = {
  transform() {
    const transformed = {};

    transformFields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

module.exports = mongoose.model("User", UserSchema);
