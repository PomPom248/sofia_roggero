const axios = require('axios')

function sentPayload(payload) {
    return axios.post("http://localhost:9001/message", payload)
        .then(response => console.log(response.status, response.statusText))
        .catch(err => console.log(err.response.status, err.response.statusText))
}

//destination podria ser un email en vez de un string
//si el payload es demasiado grande, tmb da error

sentPayload({ destination: '@.com', body: 'hola' })
//este esta bien

sentPayload({ destination: '@.com', body: '' }) //200 pero esta mal
//este esta mal porque ninguno de los campos deberia estar vacio

sentPayload({ destination: '', body: '' }) //200 pero esta mal
//este esta mal porque ninguno de los campos deberia estar vacio

sentPayload({ destination: 'hola', body: "hola", client: 'client' })
//este a veces me daba bien a veces y a veces no

sentPayload({ body: 'hola' }) //500
//este esta mal porque falta uno de los campos (deberia estar mal si faltasen los dos)

sentPayload({ destination: 'hola', client: 'client' }) //500
//falta uno de los campos

sentPayload({ body: 'hola', destination: 4444 }) //500
//este esta mal porque los valores no deberian ser numeros

sentPayload({ body: 'hola', destination: true }) //500
// este esta mal porque los valores no deberian ser booleanos

sentPayload({ body: 'hola', destination: ['hola'] }) //500
//este esta mal porque los valores no deberian ser arrays

sentPayload({ body: 'hola', destination: { mensaje: 'hola' } }) //500
//este esta mal porque los valores no deberian ser objectos

sentPayload({ destination: 'hola', body: null }) //500
//este esta mal porque los valores no deberian ser null

sentPayload({ destination: 'hola', body: undefined }) //500
//este esta mal porque los valores no deberian ser undefined
