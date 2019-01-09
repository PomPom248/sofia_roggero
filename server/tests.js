const axios = require("axios");

const axiosRoute = axios.create({
    baseURL: "http://localhost:9001"
});

sendMessage = payload => {
    return axiosRoute.post("/messages", payload);
};

missingKey = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log("Missing a key on the payload");
        });
};

wrongKeyName = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log("Wrong key name on payload");
        });
};
typeValue = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log("Wrong value type on payload");
        });
};
nullValue = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log('Value can\'t be "null" on payload');
        });
};
undefinedValue = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log('Value can\'t be "undefined" on payload');
        });
};
missingValue = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log("Missing value on payload");
        });
};
payloadTooLarge = payload => {
    sendMessage(payload)
        .then(resp => {
            console.log("Test passed");
        })
        .catch(resp => {
            console.log("Payload too large");
        });
};

let payloadText = "*";
for (let i = 0; i < 103000; i++) {
    payloadText += "*";
}
Promise.all([
    missingKey({ body: "here" }),
    wrongKeyName({ destination: "hey", boy: "hey" }),
    typeValue({ destination: "hey", body: 3 }),
    nullValue({ destination: "hey", body: null }),
    undefinedValue({ destination: "hey", body: undefined }),
    missingValue({ destination: "hey", body: {} }),
    payloadTooLarge({ destination: "hey", body: payloadText })
]);