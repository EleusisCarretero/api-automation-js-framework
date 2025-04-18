const assert = require('assert');
const { ApiResponseManager, runInParallel } = require('./utils/apiResponse');
const {verifyResponse, verifyStatusCode, verifyHeaderDate} = require('./utils/resultManager');
const { expect } = require('chai');
const each = require('mocha-each');
const { config } = require('process');

const basicApiResStructure = {
    status:'',
    statusText:'',
    headers:'',
    config:'',
    request:'',
    data:'',
}
const headersStructure = {
    server: '',
    date: '',
    "content-type": '',
    "content-length": '',
    connection: '',
    "x-powered-by": '',
    etag: '',
}
const dataStructure = {
    books: [
      {
        isbn: "",
        title: "",
        subTitle: "",
        author: "",
        publish_date: "",
        publisher: "",
        pages: 0,
        description: "",
        website: "",
      }
    ]
  }

const statusCodes = {
    informationalRequest: '',
    RequestSuccessful: {
        ok: 200,
        created: 201,
        caching: 203
    },
    RequestRedirected: '',
    clientError:{
        badRequest: 400,
        unathorized: 401,
        paymentReq: 402,
        noAccess: 403,
        notFound: 404,
    },
    serverProblem: {
        internalError: 500,
        badGateway: 205
    }
}


describe("Get Book store Test-suite", function(){
    it("Test Case GET book store", async () => {
        const apiResponseManager = new ApiResponseManager("https://bookstore.toolsqa.com/BookStore")
        parallExecutions = [
            () => Promise.resolve(new Date()),
            () => apiResponseManager.getResponse("v1/Books"),
        ]
        const responses = await runInParallel(...parallExecutions);
        const now = responses[0];
        const response = responses[1];
        
        // Verify repsonse strucutre
        verifyResponse(response, basicApiResStructure);
        // verify status
        verifyStatusCode(response, statusCodes.RequestSuccessful.ok);
        // verify data strucuture
        verifyResponse(response.data, dataStructure);
        verifyResponse(response.data.books[0], dataStructure.books[0]);
        // Vefiy header
        verifyResponse(response.headers, headersStructure);
        verifyHeaderDate(response.headers, now);

    });
});
