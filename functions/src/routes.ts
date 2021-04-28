import * as functions from "firebase-functions";
import { db } from "./config/firebase";
import * as crypto from "crypto";

export const editUser = functions.https.onRequest(async (req, res) => {
  const id = req.query.id as string;
  if (!id) {
    res.send("Please provide a valid id");
    return;
  }
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

  const userDoc = db.collection("users").doc();
  
  try {
    await userDoc.create({
      id,
      name,
      email,
      password
    });
  } catch (error) {
    throw new Error("An Error ocurred when create user");
  }

  res.send("User created successfully");
  return;
});
