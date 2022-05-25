import FirebaseAdmin from "firebase-admin";
import path from "path";
import config from "./config";

const serviceAccount = path.resolve(__dirname, "../serviceAccountKey.json");

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
  storageBucket: `gs://${config.firebase.bucket}`,
});

export default FirebaseAdmin;
