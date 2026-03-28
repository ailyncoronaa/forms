const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.render('users/list', { users });
}).post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = req.body.age;
    const isValid = firstName !== "";

    if (isValid) {
        console.log(`Adding user: ${firstName} ${lastName} ${gender} ${age}`);
        users.push({ firstName, lastName, gender, age });
        res.render('users/list', { users });
    } else {
        console.log("Error adding user!");
        res.render("users/new", { firstName, lastName, gender, age });
    }
});
router.get("/list", (req, res) =>{
    res.render("users/list", {users});
});
router.get('/new', (req, res) => {
    res.render('users/new', { firstName: "", lastName: "", gender: "", age: "" });
});
// router.get("/:id", (req, res) =>{ 
//     res.send('Getting User data : ${req.params.id}');
// });
router.route("/:id").get((req, res) =>{
     const user = req.user;
res.send(`
    <h1>User Details</h1>
    <p>First Name: ${user.firstName}</p>
    <p>Last Name: ${user.lastName}</p>
    <p>Gender: ${user.gender}</p>
    <p>Age: ${user.age}</p>
    <a href="/users">Back to List</a>
`);
}).delete((req, res) => {
    users.splice(req.params.id, 1);
    res.redirect('/users');
}).put((req, res) => {
    res.send(`Updating User data for id : ${req.params.id}`);
});

const users = [
    { firstName: "Mia", lastName: "Rivera", gender: "Female", age: 21 },
    { firstName: "Lucas", lastName: "Gomez", gender: "Male", age: 23 }
];
router.param("id", (req, res, next, id) => {
    if (!users[id]) {
        return res.status(404).send('Unknown User');
    }
    req.user = users[id];
    next();
});
module.exports = router;