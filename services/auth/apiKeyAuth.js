var crypto = require('crypto');


var request = require('request')
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString: connectionString,
    ssl: true
})
module.exports = new function() {
  this.authenticate = function(apiKey) {

      return new Promise(function(resolve, reject) {
          try {
              var options = {
                  url: 'https://api.smartrecruiters.com/users/me',
                  json: true,
                  headers: {
                      'X-SmartToken': apiKey
                  }
              }
              request(options, (error, response, body) => {
                console.log('/users/me status code', response.statusCode)

                  if (response && response.statusCode == 200) {
                      var user = {
                          id: body.id,
                          apiKey: apiKey,
                          apiKeyHash: sha256(apiKey),
                          config: {}
                      };
                      pool.query('select * from users where api_key = $1', [apiKey]).then((result => {
                          if (result.rows && result.rows.length > 0) {
                                console.log('user is already configured, reusing it', user.id)
                              //TODO: there probably need to update this but for now we will don't do this
                              resolve(user)
                          } else {
                                console.log('inserting new user to db', user.id)
                              pool.query('INSERT INTO users(user_id, api_key, api_key_hash, config) VALUES($1, $2, $3, $4)',
                                  [user.id, user.apiKey, user.apiKeyHash, user.config]
                                  , (err, res) => {
                                      pool.end()
                                      if (err == null) {
                                          console.log('user created', user.id)
                                          resolve(user)
                                      } else {
                                          console.log('query error', err)
                                          reject(err.error)
                                      }
                                  })
                          }

                      }));

                  } else {
                      console.log('error occured', error)
                      reject(error)
                  }

              })
          } catch (e) {
              reject(e)
          }


       })
  }
};


function sha256(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
}