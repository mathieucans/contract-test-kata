Simple message api documentation
=========

The simple message server offer the folowing features :
 - [Lists users](SimpleMessageApiDocumentation.md#lists-users)
 - [List messages](SimpleMessageApiDocumentation.md#list-messages)
 - [Send a message](SimpleMessageApiDocumentation.md#send-a-message)

## Lists users 
 
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

## List messages

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

## Send a message
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


