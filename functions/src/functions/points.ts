import * as functions from "firebase-functions";
import { db } from "../config/firebase";

export const deletePoints = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId as string;
  const id = req.query.id as string;

  if (!userId) {
    res.send("Please provide a valid user id");
    return;
  }

  if (!id) {
    res.send("Please provide a valid id");
    return;
  }

  const pointsDoc = db.collection("users").doc(userId).collection("points").doc(id);

  try {
    await pointsDoc.delete();
  } catch (error) {
    throw new Error("An error occurred when deleting points");
  }

  res.send(`Points ${id} of user ${userId} deleted successfully`);
  return;
})

export const editPoints = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId as string;
  const id = req.query.id as string;
  const quantity = req.query.quantity ? parseInt(req.query.quantity as string) : 0;
  const reason = req.query.reason as string;

  if (!userId) {
    res.send("Please provide a valid user id");
    return;
  }

  if (!id) {
    res.send("Please provide a valid id");
    return;
  }

  if (!quantity) {
    res.send("Please provide a valid quantity");
    return;
  }

  if (!reason) {
    res.send("Please provide a valid reason");
    return;
  }

  const pointsDoc = db.collection("users").doc(userId).collection("points").doc(id);
  try {
    await pointsDoc.update({
      quantity,
      reason
    });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred when updating points");
  }

  res.send(`Points ${id} of user ${userId} edited successfully`);
  return;
})

export const createPoints = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId as string;
  const id = req.query.id as string;
  const quantity = req.query.quantity ? parseInt(req.query.quantity as string) : 0;
  const reason = req.query.reason as string;

  if (!userId) {
    res.send("Please provide a valid user id");
    return;
  }

  if (!id) {
    res.send("Please provide a valid id");
    return;
  }

  if (!quantity) {
    res.send("Please provide a valid quantity");
    return;
  }

  if (!reason) {
    res.send("Please provide a valid reason");
    return;
  }

  const pointsDoc = db.collection("users").doc(userId).collection("points").doc(id);

  try {
    await pointsDoc.create({
      id,
      quantity,
      reason
    });
  } catch (error) {
    throw new Error("An error occurred when creating points");
  }

  res.send("Points created successfully");
  return;
});
