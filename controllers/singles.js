const Single = require('../models/single');
const User = require('../models/user')

module.exports = {
  create,
  changeStatus
};

async function create(req, res) {
  const single = new Single(req.body);
  try {
    await single.save();
    await User.findById(req.user._id, function(err, user){
      user.singles.push(single._id); 
      user.save();
    })
    res.json(single);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function changeStatus(req, res) {
  const single = await Single.findById(req.body.id)
  if (req.body.status === 'taught') {
    single.status = 'taught'
    single.save()
    res.json(single)
  } else if (req.body.status === 'cancel') {
    single.status = 'cancel'
    single.save()
    res.json(single)
  } else {
    res.json('something went wrong!')
  }
}