import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nume: {
      type: String,
      required: false,
      trim: true,
    },
    telefon: {
      type: String,
      required: false,
      trim: true,
    },
    adresa: {
      type: String,
      required: false,
      trim: true,
    },
    tempPassword: {
      type: String,
      required: false,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      required: true,
      enum: ["admin", "client", "freetier"],
      default: "freetier",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);
export default User;
