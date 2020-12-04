const Single = require('../models/single');

module.exports = {
  create,
};

async function create(req, res) {
  const single = new Single(req.body);
  try {
    await single.save();
    await User.findById(req.user._id, function(err, user){
      user.singles = single._id
      user.save()
    })
    res.json(single);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}