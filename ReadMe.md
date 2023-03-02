Contract test kata
===================

## Goals

The goal of this kata is to practice 3rd party service integration guided by test.

A second goal can be practice Domain Driven Design and hexagonal architecture to build a simple application. 

You have to write a simple application that auto-reply to the sender that you are out of office.

To do that you have to run simplemessage server and write the application in the language of your choice in the simplemessage-client folder.

## Get started

There's two way to run the server on your own machine : 
 - Use the docker hub's image (needs docker)
 - Build and run simple-message server (needs node)

### Use the docker hub's image

```
docker run --rm -d -p8080:80 --name simple-message mathieucans/simple-message:1.0
```

### Build and run simple-message server

```shell
cd simplemessage
npm install
npm run build
npm run package 
# NOTE behind proxy use npm run package-proxy
npm run  run-in-docker
```

Now you have server running on http://localhost:8080 that simulate a instant messaging service.

## Tips to run this kata
As proposed in the [presentation slides](./doc/IntegrationThirdPartyPresentation.pdf):
1. Discover how the simplemessage server works by writing contract test
2. Extract a simple SDK from this test and write additional unit test with example extract from contact test execution
3. Build an "in memory" implementation of this SDK. Use same contract test to check both real & in memory version of the sdk.   
4. Use "in memory" SDK to write a simple auto-reply application in TDD. Eventually explore DDD and/or hexagonal architecture.

## See also
 - [Simple message api documentation](SimpleMessageApiDocumentation.md)
 - [Testing Without Mocks: A Pattern Language (article from James Shore)](https://www.jamesshore.com/v2/projects/nullables/testing-without-mocks)