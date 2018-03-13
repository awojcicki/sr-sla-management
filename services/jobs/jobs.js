

module.exports = new function() {
  this.getJobs = (user, offset, query) => {

      return new Promise(function(resolve, reject) {
            resolve([{
                "id": "sampleId",
                "name": "sampleName",
                "refNumber": "string",
                "postingStatus": "PUBLIC"

            }, {
                "id": "sampleId",
                "name": "sampleName",
                "refNumber": "string",
                "postingStatus": "PUBLIC"
            }])

       })
  }
};


