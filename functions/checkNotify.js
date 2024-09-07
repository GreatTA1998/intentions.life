const { logger } = require('firebase-functions');
const { db } = require('./firestoreConnection');
const { collection, query, where, getDocs } = require('firebase/firestore');

async function checkNotify() {
  logger.info('checkNotify');
  const usersRef = collection(db, 'users');
  const usersSnapshot = await getDocs(usersRef);

  for (const userDoc of usersSnapshot.docs) {
    const tasksRef = collection(userDoc.ref, 'tasks');
    const tasksQuery = query(tasksRef, where('notify', '!=', ''));
    const tasksSnapshot = await getDocs(tasksQuery);
    if (!tasksSnapshot.empty) {
      logger.info(
        `User ${userDoc.id} has tasks to notify:`,
        tasksSnapshot.docs.map((doc) => doc.id),
      );
      // Add your notification logic here
    }
  }
}

module.exports = { checkNotify };