const moment = require('moment')

const Contract = require('../models/contract');
const User = require('../models/user');

module.exports = {
  create,
  index
};

async function create(req, res) {
  const contract = new Contract(req.body);
  try {
    await contract.save();
    await User.findById(req.user._id, function(err, user){
      user.contracts = contract._id
      user.save()
    })
    
    res.json(contract);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function index(req, res) {
  User.findById(req.user._id).populate('contracts').exec(function(err, {contracts}) {
    const contractsList = {};
    contracts.forEach(contract => {
      const {startDate, studio, style, time, rate, base, perHead, estimate, classLength} = contract
      dayOfWeek = moment(startDate).format('dddd')
      const formattedContractInfo = {
        studio,
        style,
        time: moment(time).format('h:ma'),
        classLength: `${classLength} min`,
        rateType: `${rate ? 'Flat Rate' : 'Per Head'}`,
        rate: `$${rate ? rate : (base + perHead * estimate)}`
      }
      if (contractsList[dayOfWeek]) {
        contractsList[dayOfWeek].push(formattedContractInfo)
      } else {
        contractsList[dayOfWeek] = [formattedContractInfo]
      }
    })
    res.json(contractsList)
  })
}
