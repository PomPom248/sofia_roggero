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