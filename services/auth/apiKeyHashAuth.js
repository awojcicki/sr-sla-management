const pool = require('../db').pool

module.exports = new function() {
  this.authenticate = function(apiKeyHash) {

      return new Promise(function(resolve, reject) {
          pool.query('select * from users where api_key_hash = $1', [apiKeyHash]).then(result => {
              if (result.rowCount == 1) {
                  var rawUser = result.rows[0]
                  resolve({
                      id: rawUser.user_id,
                      apiKey: rawUser.api_key,
                      apiKeyHash: rawUser.api_key_hash,
                      config: rawUser.config
                  })
              } else {
                  reject ("user with hash" + apiKeyHash + " doesn't exist")
              }
          }).catch(error => {
              console.error("error getting user config", error)
              reject(error)
          })


       })
  }
};


