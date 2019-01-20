require('dotenv').config();

const mongoose = require('mongoose')

function datebaseConnection(name, dbURL) {
    return {
        name,
        primary: false,
        connected: true,
        conenectionURL: mongoose.createConnection(dbURL, {
            useNewUrlParser: true,
            autoReconnect: true
        })
    }
}

function setupConnection(connection, backup) {
    connection.conenectionURL.on('disconnected', () => {
        console.log('db down', connection.name)
        connection.primary = false;
        if (connection.primary) {
            connection.primary = false;
            backup.primary = backup.connected
        }
    })
    connection.conenectionURL.on('reconnected', () => {
        console.log('db up', connection.name)
        connection.connected = true;
        connection.primary = !backup.isPrimary;
    })
}
const connections = [
    datebaseConnection('Primary', process.env.MONGO_LOCAL),
    datebaseConnection('Replica', process.env.MONGO_TWO)
]

connections[0].primary = true
setupConnection(connections[0], connections[1])
setupConnection(connections[1], connections[0])

module.exports = {
    get(key) {
        let conn;
        if (key == undefined || key == 'primary') {
            conn = connections.find(connection => connection.primary == true)
        } else if (key == 'replica') {
            conn = connections.find(connection => connection.primary == false)
        }
        if (conn) {
            console.log("Requested connection:", key);
            console.log("Found:", conn.name);
        }
        debugger;
        return conn.conenectionURL;
    },
    isReplicaOn() {
        replicaOn = connections[0].connected && connections[1].connected;
        console.log(`Replica is ${replicaOn ? "ON" : "OFF"}`);
        return replicaOn;
    }
}

