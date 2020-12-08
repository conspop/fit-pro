const moment = require('moment')
const dateHelpers = require('../expressutils/dateHelpers')

const Contract = require('../models/contract');
const User = require('../models/user');

module.exports = {
  create,
  index,
  changeStatus
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
  // pull current user's contracts
  await User.findById(req.user._id).populate('contracts').exec(function(err, {contracts}) {
    let contractsList = {};
    // create object with keys for each day of the week containing corresponding contracts
    contracts.forEach(contract => {
      dayOfWeek = contract.startDate.getDay();
      if (contractsList[dayOfWeek]) { 
        // when putting contract into day of week, place it in array based on start time
        const dayOfWeekArrayByTime = contractsList[dayOfWeek].map(contract => dateHelpers.getTime(contract.time))
        const indexForContract = dayOfWeekArrayByTime.findIndex(time => dateHelpers.getTime(contract.time).isBefore(time))
        if (indexForContract > 0) {
          contractsList[dayOfWeek].splice(indexForContract,0, contract)
        } else {
          contractsList[dayOfWeek].push(contract)
        }
      } else {
        contractsList[dayOfWeek] = [contract]
      }
    })
    // convert to array so it is easier to use in react
    contractsList=Object.entries(contractsList)
    res.json(contractsList)
  })
}

async function changeStatus() {
  pass
}
