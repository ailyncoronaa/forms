const express = require('express');
const router = express.Router();

const users = [{ firstName: "Kyle" }, { firstName: "Sally" }];

router.get('/', (req, res) => {
    res.send('User List');
});

router.get('/new', (req, res) => {
    res.render('users/new');
});

router.post('/', (req, res) => {
    users.push({ firstName: req.body.firstName });
    res.send(req.body.firstName);
});

module.exports = router;