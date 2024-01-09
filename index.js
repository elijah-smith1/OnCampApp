const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onFollowerCreate = functions.firestore
    .document("Users/{userId}/Followers/{followerId}")
    .onCreate(async (snapshot, context) => {
      const userId = context.params.userId;
      const followerId = context.params.followerId;

      const createdData = snapshot.data();

      const notificationData = {
        notiType: "NewFollower",
        senderId: followerId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      await admin.firestore().collection(`Users/${userId}/notifications`)
          .add(notificationData);

      // Perform actions based on the created data
      console.log(
          `Followers document created for user ${userId},
      new follower ${followerId}. Created data:`,
          createdData,
      );

      // You can add more logic here based on the created data

      // Instead of returning null, log a message
      console.log("Custom log message: Function execution complete.");
      // Log messages are automatically captured by Firebase Cloud Functions

      return null; // Cloud Functions should return a promise or a value
    });

exports.postLiked = functions.firestore
    .document("Posts/{postId}/likes/{likeId}")
    .onCreate(async (snapshot, context) => {
      const postId = context.params.postId;
      const likeId = context.params.likeId;
      const postSnapshot = await admin.firestore().doc(`Posts/${postId}`).get();
      const UserId = postSnapshot.get("postedBy");
      const createdData = snapshot.data();

      const notificationData = {
        notiType: "NewLike",
        senderId: likeId,
        post: postId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      await admin.firestore().collection(`Users/${UserId}/notifications`)
          .add(notificationData);

      // Perform actions based on the created data
      console.log(
          `post id: ${postId},
      liked by ${likeId}. Created data:`,
          createdData,
      );

      // You can add more logic here based on the created data

      // Instead of returning null, log a message
      console.log("Custom log message: Function execution complete.");
      // Log messages are automatically captured by Firebase Cloud Functions

      return null; // Cloud Functions should return a promise or a value
    });

exports.postReposted = functions.firestore
    .document("Posts/{postId}/reposts/{repostId}")
    .onCreate(async (snapshot, context) => {
      const postId = context.params.postId;
      const repostId = context.params.repostId;
      const postSnapshot = await admin.firestore().doc(`Posts/${postId}`).get();
      const UserId = postSnapshot.get("postedBy");

      const createdData = snapshot.data();

      const notificationData = {
        notiType: "NewRepost",
        senderId: repostId,
        post: postId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };

      await admin.firestore().collection(`Users/${UserId}/notifications`)
          .add(notificationData);

      // Perform actions based on the created data
      console.log(
          `repost id: ${postId},
      liked by ${repostId}. Created data:`,
          createdData,
      );

      // You can add more logic here based on the created data

      // Instead of returning null, log a message
      console.log("Custom log message: Function execution complete.");
      // Log messages are automatically captured by Firebase Cloud Functions

      return null; // Cloud Functions should return a promise or a value
    });
