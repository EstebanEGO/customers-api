const ApiRest = (url, callback, body = null, method = 'GET') => {
    fetch(url, {
        method,
        headers:{'Content-type': 'application/json'},
        body
    })
    .then(response => response.json())
    .then(callback)
    .catch(console.log)
}

export default ApiRest