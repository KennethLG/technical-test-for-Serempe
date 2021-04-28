import * as functions from "firebase-functions";
import { db } from "../config/firebase";
import * as crypto from "crypto";
import { User } from "../interfaces";

export const deleteUser = functions.https.onRequest(async (req, res) => {
  const id = req.query.id as string;

  if (!id) {
    res.send("Please provide a valid id");
    return;
  }

  const user = await db.collection("users").doc(id);

  try {
    await user.delete();
  } catch (error) {
    throw new Error("An error occurred when deleting user");
  }

  res.send("User deleted successfully");
  return;
})

export const editUser = functions.https.onRequest(async (req, res) => {
  const id = req.query.id as string;
  const name = req.query.name as string;
  const email = req.query.email as string;
  let password = req.query.password as string;

  if (!id) {
    res.send("Please provide a valid id");
    return;
  }

  if (!name) {
    res.send("Please provide a valid username");
    return;
  }

  if (!email) {
    res.send("Please provide a valid email");
    return;
  }

  if (!password) {
    res.send("Please provide a valid password");
    return;
  }

  password = crypto.createHash("md5").update(password).digest("hex");
  const userDoc = db.collection("users").doc(id);
  const user: User = {
    id,
    name,
    email,
    password
  }

  try {
    await userDoc.update(user);
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred when updating user");
  }

  res.send(`user ${id} edited successfully`);
  return;
})

export const createUser = functions.https.onRequest(async (req, res) => {
  const id = req.query.id as string;
  const name = req.query.name as string;
  const email = req.query.email as string;
  let password = req.query.password as string;

  if (!id) {
    res.send("Please provide a valid id");
    return;
  }

  if (!name) {
    res.send("Please provide a valid username");
    return;
  }

  if (!email) {
    res.send("Please provide a valid email");
    return;
  }

  if (!password) {
    res.send("Please provide a valid password");
    return;
  }

  password = crypto.createHash("md5").update(password).digest("hex");
  const userDoc = db.collection("users").doc(id);
  const user: User = {
    id,
    name,
    email,
    password
  }
  
  try {
    await userDoc.create(user);
  } catch (error) {
    throw new Error("An error occurred when creating user");
  }

  res.send("User created successfully");
  return;
});
