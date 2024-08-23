import { Hono } from 'hono';
import mongoose from 'mongoose';

// Define a schema for the `User` model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the `User` model
const User = mongoose.model('User', userSchema);



// Create the Hono route
export const users = new Hono();
users.get('/', async (ctx) => {
  try {
    const users = await listUsers();
    return ctx.json(users);  // Return the list of users as JSON
  } catch (error) {
    return ctx.json({ error: 'Failed to fetch users' }, 500);
  }
});
// Handle POST requests to add a new user
users.post('/', async (ctx) => {
  try {
    const data = await ctx.req.json();  // Parse the request body
    const newUser = await addUser(data);  // Add the new user
    return ctx.json(newUser, 201);  // Return the newly added user with a 201 status code
  } catch (error) {
    return ctx.json({ error: 'Failed to add user' }, 500);
  }
});
// Function to list all users
async function listUsers() {
  try {
    const users = await User.find().exec();  // Fetch all users
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;  // Propagate the error
  }
}

// Function to add a new user
async function addUser(data: any) {
  try {
    const newUser = new User(data);
    await newUser.save();  // Save the new user
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;  // Propagate the error
  }
}