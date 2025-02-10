import * as admin from "firebase-admin";
import { config } from ".";

export const app = admin.initializeApp({
    projectId: config.FIREBASE_PROJECT_ID,
});