let database = require("../database");
// [req.user.username]

let idNum = 1;

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    idNum += 1;
    let reminder = {
      id: idNum,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    console.log(req.params.id);
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminder = database.cindy.reminders[req.params.id-1]
    reminder.title = req.body.title
    reminder.description = req.body.description
    if(req.body.completed === "false"){
      reminder.completed = false
    }
    else reminder.completed = true
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    const url = req.originalUrl.split("/");
    const reminderID = url[3]
    delete database.cindy.reminders[reminderID-1];
    database.cindy.reminders.sort();
    database.cindy.reminders.pop();
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
