const dbpool = require("../db/DB_PG");

const sendReminders = async () => {
  try {
    const result = await dbpool.query(
      `SELECT Users.email,Notification_preference.user_id,Notification_preference.notification_period,Notification_preference.custom_message,
      Notification_preference.last_sent FROM Notification_preference INNER JOIN Users ON Notification_preference.user_id = Users.id`
    );

    if (result.rowCount === 1) {
      const currentTime = Date.now();

      for (const pref of result.rows) {
        console.log(currentTime - (pref.last_sent || 0));
        console.log(
          (currentTime - (pref.last_sent || 0)) <
            pref.notification_period
        );
        if ((currentTime - (pref.last_sent || 0)) > pref.notification_period) {
          console.log("sending notification to " + pref.email);
          const updateResult = await dbpool.query(
            `UPDATE Notification_preference SET last_sent = $1
          WHERE user_id = $2`,
            [currentTime, pref.user_id]
          );
        }
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log("+++");
    console.log(err);
  }
  // Our register logic ends here
};

module.exports = sendReminders;
