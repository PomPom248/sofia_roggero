#Documentación sobre el servicio

## GET - :9001/
Sends a message, "Hola Mundo"

## POST - :9001/messages
Creates a payload with two parameters, destination and body. 
It has to follow some rules:
*These parameters must be present
*Their values must be strings 
*Destination has to be an email
*Their lengths have to be shorter than 100 

To avoid theses mistskaes I created if clauses such as:
*If destination or body misspelled or forgotten then a 400 status and a 'Missing key' message is sent
*If destination or body's values are missing then a 400 status and a 'Missing value' message is sent
*If destination or body's values aren't strings then a 400 status and a 'Values must be strings' message is sent
*If destination is not an email then a 400 status and a 'Destination needs to ba an email' message is sent00).json("Missing value")
*If destination or body's length is larger or equal to 100 then a 400 status and a 'Message is too long' message is sent

If none of these things go wrong, then the payload is created.
If nothing goes wrong then a 200 status and a 'Message created' message is sent
If something goes wrong then a 400 status and a 'Error while creating the message' message is sent

Two functions are used in this route:
1) This function is called sendMessage and it receives two parameters, destination and body. There's an established timeout of 3seconds to limit the amout of time the function can dwell in the request. Its goal is to make the request to axios
If the timeout is not exceeded, then the function enter into the then, a 200 status and a 'Message created' message is sent, and a message is created
If the timeout is exceeded, then a 400 status and a 'Error while creating the message' message is sent and a message is created
2) This function is called create and it three receives parameters, destination, body and status. Its goal is to create new messages
If this function is invoked while in the then, then a message is created with a 'OK - 200' status
If this function in invoked in the catch and the error response is undefined, then a message is created with a 'TIMEOUT - 400' status. Else, the message's status is 'NOT SENT - 500'.

## GET - :9001/messages
This route finds all the messages created and it uses a function called find
If everything goes right then a 200 status and all the created messages are sent. 
If something goes wrong then a 500 status and an error message is sent.