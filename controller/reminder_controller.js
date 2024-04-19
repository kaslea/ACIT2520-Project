let database = require("../database");
// [req.user.username]



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
    const reminders = database.cindy.reminders;
    // Create assigns the lowest possible value to the id. Just using reminder.length can assign duplicate id values.
    let idList = [];
    let newId = 0;
    // Gets a list of all id values already taken up.
    reminders.forEach((reminder) =>{
      idList.push(reminder.id);
    });

    // Assigns the lowest value that isn't already an id to newId, which will be assigned to the new reminder object. 
    //If idList is [1,2,4], assigns 3 to newId
    for(let i = 1; i<= idList.length; i++){
      if(!idList.includes(i)){
        newId = i
        break //If idlist is [1,2,5], 3 is still assigned. 
      }
    }
    //Assigns newId a value if all of the lowest possible values are taken( if idList is [1,2,3])
    if(newId == 0){
      newId = reminders.length+1;
    }

    //Creates the reminder and adds it to the database. 
    let reminder = {
      id: newId,
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
    const reminderID = req.params.id
    const reminders = database.cindy.reminders;
    for(let i = 0; i< reminders.length; i++){
      if(reminders[i].id == reminderID)
      {
        delete database.cindy.reminders[i];
      }
    }
    database.cindy.reminders.sort();
    database.cindy.reminders.pop();
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
