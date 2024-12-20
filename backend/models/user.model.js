import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    // User's email address
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Converts email to lowercase before saving
      trim: true, // Removes leading and trailing spaces
    },

    // User's password
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"], // Fixed typo
    },

    // User's cart items
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1, // Default quantity is 1
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // References the Product schema
        },
      },
    ],

    // User's role
    role: {
      type: String,
      enum: ["customer", "admin"], // Role must be either 'customer' or 'admin'
      default: "customer", // Default role is 'customer'
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


//Pre-save hook to hash password before saving to database.
userSchema.pre("save", async function (next) {
    // Proceed if the password field is not modified
    if (!this.isModified("password")) return next();  
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password using the generated salt
      this.password = await bcrypt.hash(this.password, salt);
  
      next(); // Proceed to the next middleware
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
});

userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password, this.password);
    
};

const User =  mongoose.model("User", userSchema);

export default User;
