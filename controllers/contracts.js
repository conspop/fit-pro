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
      // const {startDate, studio, style, time, rate, base, perHead, estimate, classLength} = contract
      // dayOfWeek = startDate.getDay()
      // const formattedContractInfo = {
      //   studio,
      //   style,
      //   time: moment(time).format('h:ma'),
      //   classLength: `${classLength} min`,
      //   rateType: `${rate ? 'Flat Rate' : 'Per Head'}`,
      //   rate: `$${rate ? rate : (base + perHead * estimate)}`,
      //   id: 
      // }
      // if (contractsList[dayOfWeek]) {
      //   contractsList[dayOfWeek].push(formattedContractInfo)
      // } else {
      //   contractsList[dayOfWeek] = [formattedContractInfo]
      // }
      dayOfWeek = contract.startDate.getDay();
      if (contractsList[dayOfWeek]) { 
        const dayOfWeekArrayByTime = contractsList[dayOfWeek].map(contract => moment(contract.time,'h:ma'))
        const indexForContract = dayOfWeekArrayByTime.findIndex(time => moment(contract.time,'h:ma').isBefore(time))
        if (indexForContract > 0) {
          contractsList[dayOfWeek].splice(indexForContract, contract)
        } else {
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
