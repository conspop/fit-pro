const BASE_URL = '/api/'

async function addContract(contract) {
  console.log(contract)
  return fetch(BASE_URL + 'contracts', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
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
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(single)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
}

export default {
  addContract,
  addSingle
}