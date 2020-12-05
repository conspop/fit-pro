const moment = require('moment')
const dateHelpers = require('../expressutils/dateHelpers')

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
      user.contracts.push(contract._id) 
      user.save()
    })
    
    res.json(contract);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function index(req, res) {
  await User.findById(req.user._id).populate('contracts').exec(function(err, {contracts}) {
    let contractsList = {};
    contracts.forEach(contract => {
      dayOfWeek = contract.startDate.getDay();
      console.log(contract.studio)
      console.log(dateHelpers.getTime(contract.time))
      if (contractsList[dayOfWeek]) { 
        const dayOfWeekArrayByTime = contractsList[dayOfWeek].map(contract => dateHelpers.getTime(contract.time))
        const indexForContract = dayOfWeekArrayByTime.findIndex(time => dateHelpers.getTime(contract.time).isBefore(time))
        console.log(indexForContract)
        if (indexForContract > 0) {
          console.log('splice')
          console.log(contract)
          contractsList[dayOfWeek].splice(indexForContract,0, contract)
          console.log(contractsList[dayOfWeek])
        } else {
          console.log('push')
          contractsList[dayOfWeek].push(contract)
        }
      } else {
        contractsList[dayOfWeek] = [contract]
      }
    })
    contractsList=Object.entries(contractsList)
    res.json(contractsList)
  })
}
