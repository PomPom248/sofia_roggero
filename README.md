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
1) This function is called create and it receives two parameters, destination and body. Its goal is to create new messages
If everything goes well then a 200 status is sent
If something goes wrong the a 500 status is sent 
2) This function is called sendMessage and it receives two parameters, destination and body. Its goal is to make the request to axios.
If nothing goes wrong then a 200 status and a 'Message created' message is sent
If something goes wrong then a 400 status and a 'Error while creating the message' message is sent

## GET - :9001/messages
This route finds all the messages created and it uses a function called find
If everything goes right then a 200 status and all the created messages are sent. 
If something goes wrong then a 500 status and an error message is sent.