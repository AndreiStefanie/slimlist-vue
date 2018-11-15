const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '128MB'
};

exports.listCreatedAt = functions
  .runWith(runtimeOpts)
  .firestore.document('todo-lists/{id}')
  .onCreate(snap => {
    const docCreatedTimestamp = snap.createTime;
    try {
      return snap.ref.set(
        {
          createdAt: docCreatedTimestamp
        },
        { merge: true }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  });
