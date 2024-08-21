import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {type: Date, default: Date.now},
  isAdmin: {type: Boolean, default: false}
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  next();
})

userSchema.methods.checkPassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);

    return isMatch ? Promise.resolve() : Promise.reject({ status: 400 });

  } catch (error) {
    return Promise.reject({ status: 500 });
  }
}

const User = model("user", userSchema);

export default User;