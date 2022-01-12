import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const AppUrl = "https://learning-dgraph-with-react.web.app/";

const addUserIdToClaimHandler = async (
  data: any,
  context: functions.https.CallableContext
) => {
  const userId = context.auth?.uid;

  if (!userId) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  }

  try {
    await admin.auth().setCustomUserClaims(userId, {
      [AppUrl]: {
        ID: userId,
      },
    });

    return "success";
  } catch (error) {
    throw new functions.https.HttpsError(
      "unknown",
      "Error while setting custom claims",
      error
    );
  }
};

export const addUserIdToClaim = functions.https.onCall(addUserIdToClaimHandler);
