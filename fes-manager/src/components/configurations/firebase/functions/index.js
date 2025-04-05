const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.processPayment = functions.https.onCall(async (data, context) => {
  const { userId, projectId, amount } = data;

  const userRef = admin.firestore().collection("users").doc(userId);
  const projectRef = admin.firestore().collection("projects").doc(projectId);

  const userDoc = await userRef.get();
  const projectDoc = await projectRef.get();

  if (!userDoc.exists || !projectDoc.exists) {
    throw new functions.https.HttpsError("not-found", "User or Project not found.");
  }

  const userBalance = userDoc.data().balance;
  const remainingFunding = projectDoc.data().remainingFunding;

  if (userBalance < amount) {
    throw new functions.https.HttpsError("invalid-argument", "Insufficient funds.");
  }

  // Update user balance
  await userRef.update({ balance: userBalance - amount });

  // Update project funding
  await projectRef.update({ remainingFunding: remainingFunding - amount });

  // Log transaction
  await userRef.update({
    transactions: admin.firestore.FieldValue.arrayUnion({
      amount,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      projectId,
    }),
  });

  return { success: true };
});
