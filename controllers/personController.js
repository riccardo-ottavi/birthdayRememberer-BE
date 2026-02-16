const { people } = require("../data/people");  

//  INDEX
function index(req, res) {
    res.json(people);
};


module.exports = { index }