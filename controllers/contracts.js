const moment = require('moment')
const dateHelpers = require('../expressutils/dateHelpers')

const Contract = require('../models/contract');
const User = require('../models/user');

module.exports = {
  create,
  index,
  changeStatus,
  updateContract
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

async function changeStatus(req, res) {
  const contract = await Contract.findById(req.body.id)
  const {specificDates} = contract
  const index = specificDates.findIndex(specificDate => {
    return moment(req.body.date).isSame(moment(specificDate.date))
  })
  if (index >= 0) {
    specificDates[index].status = req.body.status
    if (req.body.heads) {
      specificDates[index].heads = req.body.heads
    }
  } else {
    specificDatesObj = {}
    specificDatesObj.date = req.body.date
    specificDatesObj.status = req.body.status
    if (req.body.heads) {
      specificDatesObj.heads = req.body.heads
    }
    specificDates.push(specificDatesObj) 
  }
  contract.save()
  res.json(specificDates)
}

async function updateContract(req, res) {
  const contract = await Contract.findById(req.body.contractId)
  console.log(req.body.type)
  if (req.body.type === 'confirm-end-date') {
    contract.endDate = req.body.value
  } else if (req.body.type === 'confirm-estimate') {
    console.log('got here!')
    contract.estimate = req.body.value
  } else {
    console.log('something went wrong!')
  }
  console.log(contract)
  contract.save()
  res.json(contract)
}
