const axios = require('axios');

class ApiResponseManager {
    constructor(baseUrl){
        this.baseUrl = baseUrl
        
    }

    async getResponse(endPoint){
        const service = `${this.baseUrl}/${endPoint}`
        try {
            const response = await axios.get(service)
            return response
        }
        catch(error) {
            console.error(`Error ${error} trying to execute GET request service ${service}`);
            return null;
        }

    }
}

async function runInParallel(...runningParallels) {
    const results =  await Promise.all(runningParallels.map(fn => fn()));
    return results
}


module.exports = {
    ApiResponseManager,
    runInParallel
};
