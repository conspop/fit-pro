import { Typography } from 'antd';
import tokenService from './tokenService'

const BASE_URL = '/api/'

async function addContract(contract) {
  console.log(contract)
  return fetch(BASE_URL + 'contracts', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(contract)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
}

async function addSingle(single) {
  return fetch(BASE_URL + 'singles', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(single)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
}

async function getContracts() {
  return fetch(BASE_URL + 'contracts', {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    })
  })
  .then(res => res.json())
  .then(data => data)
}

async function getSchedule(startDate, endDate) {
  return fetch(BASE_URL + 'schedules' + '?startDate=' + startDate.toISOString() + '&endDate=' + endDate.toISOString(), {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    return data
  })
}

const changeStatus = (status, type, id, date, sch) => {
  if (type === 'single') {
    try {
      fetch(BASE_URL + 'singles/changestatus', {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify({status, id})
      })
      .then(res => res.json())
      .then(data => {console.log(data)})
    } 
    catch {
      this.setState({schedule: sch})
    }
  } else {
    try {
      fetch(BASE_URL + 'contracts/changestatus', {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify({status, id, date})
      })
      .then(res => res.json())
      .then(data => {console.log(data)})
    } 
    catch {
      this.setState({schedule: sch})
    }
  }
}

export default {
  addContract,
  addSingle,
  getContracts,
  getSchedule,
  changeStatus
}