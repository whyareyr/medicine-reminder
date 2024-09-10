// cron/reminderCron.js
const cron = require("node-cron");
const Medicine = require("../models/Medicine.js");
const User = require("../models/User.js");
const { sendEmailReminder } = require("../utils/emailSender.js");

// Daily reminder at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("Running daily reminder job...");
  const medicines = await Medicine.find({ reminderTime: { $lte: new Date() } });

  medicines.forEach(async (medicine) => {
    const user = await User.findById(medicine.user);
    sendEmailReminder(
      user.email,
      "Medicine Reminder",
      `Take ${medicine.dosage} of ${medicine.name}`
    );
  });
});

// Monthly purchase reminder on 1st of every month at 9 AM
cron.schedule("0 9 1 * *", async () => {
  console.log("Running monthly purchase reminder job...");
  const users = await User.find();

  users.forEach((user) => {
    sendEmailReminder(
      user.email,
      "Medicine Purchase Reminder",
      "Time to purchase your medicines for the month."
    );
  });
});
