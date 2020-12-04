const Contract = require('../models/contract');

module.exports = {
  create,
};

async function create(req, res) {
  const contract = new Contract(req.body);
  console.log(contract)
  try {
    await contract.save();
    console.log(contract)
    res.json(contract);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}
