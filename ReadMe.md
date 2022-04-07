Contract test kata
===================

# Goals

The goal of this kata is to practice 3rd party service integration guided by test.

You have to write a simple application that auto-reply to the sender that you are out of office.

To do that you have to run simplemessage server and write the application in the language of your choice in the simplemessage-client folder.

# Build and run simplemessage server

To build and run simple message server :

```shell
cd simplemessage
npm run build
npm run package 
# NOTE behind proxy use npm run package-proxy
npm run  run-in-docker
```

Now you have server running on http://localhost:8080 that simulate a instant messaging service.

# Simple message api

## lists users on the server

```shell
curl -X GET http://localhost:8080/users
```
```json
{
"users": [
  {
    "id": 1,
    "email": "douglas.hofstadter"
  },
  {
    "id": 2,
    "email": "billy.thekid"
  },
  {
    "id": 3,
    "email": "magic.jordan"
  }
]
}
```

## GET /:userid/messages : lists messages for a user
```shell
curl -X GET http://localhost:8080/:userid/messages
```
```json
{
  "messages": [
    {
      "id": "1",
      "from": "someone",
      "to": "douglas.hofstadter",
      "message": "hello doug from LA!"
    }
  ]
}
```

## send a message from user (userid) to another user
```shell
curl -vvv -X POST http://localhost:8080/1/messages/send -H 'Content-Type: application/json' -d '{"to":"billy.thekid","message":"tyty"}'
```
Example of json body
```json
{
 "to": "another.user",
 "message" : "a message to another message"
}
```


