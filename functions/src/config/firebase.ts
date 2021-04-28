import * as admin from "firebase-admin";
import * as serviceAccountCredentials from "../../serempre-80703-firebase-adminsdk-87gu3-336e459acc.json";

const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://serempre-80703.firebaseio.com"
})

const db = admin.firestore();

export { admin, db}