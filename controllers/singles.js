const Single = require('../models/single');

module.exports = {
  create,
};

async function create(req, res) {
  const single = new Single(req.body);
  console.log(single)
  try {
    await single.save();
    console.log(single)
    res.json(single);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}
