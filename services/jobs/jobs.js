const srApi = require('../srApi')
const JOBS_LIMIT = 10

module.exports = new function() {
  this.getJobs = (user, offset, query) => {
      if (!offset) {
          offset = 0
      }
      return new Promise(function(resolve, reject) {
          srApi.get(user, '/jobs?limit='+ JOBS_LIMIT + '&offset=' + offset).then((response) => {
              let list = response.content.map(elem => {
                  return {
                      "id": elem.id,
                      "name": elem.title,
                      "refNumber": elem.refNumber,
                      "postingStatus": elem.postingStatus
                  }
              });
              resolve(list)
          }).catch(e => { reject(e) })
       })
  }
};


