const assert = require('assert');
const { expect } = require('chai');


function verifyResponse(actualApiResponse, expectedExtructure){
    
    const actualKeys = Object.keys(actualApiResponse);
    const expecteKeys = Object.keys(expectedExtructure);
    console.log(`The actual structure of response is ${actualKeys}`)
    console.log(`The expected structure of response is ${expecteKeys}`)
    expect(actualKeys).to.have.members(expecteKeys)

}

function verifyStatusCode(response, expectedStatusCode){
    const actualStatusCode = response.status;
    console.log(`The actual status code is ${actualStatusCode}`)
    console.log(`The expected status code is ${expectedStatusCode}`)
    expect(actualStatusCode).to.equal(expectedStatusCode)
}
function verifyHeaderDate(headers, expectedDate){
    const actualDate = headers.date;
    const expectedFormatted = expectedDate.toUTCString();
    console.log(`The actual date from header is ${actualDate}`)
    console.log(`The expected date is ${expectedFormatted}`)
    expect(actualDate).to.equal(expectedFormatted)


}



module.exports = {
    verifyResponse,
    verifyStatusCode,
    verifyHeaderDate
};