const ENV = 'https://api.smartrecruiters.com';
var request = require('request')

module.exports = new function() {
    this.get = (user, url) => {
        var fullUrl = ENV + url;

        var options = {
            url: fullUrl,
            json: true,
            headers: {
                'X-SmartToken': user.apiKey
            }
        }

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (response && response.statusCode == 200) {
                    resolve(body)
                } else {
                    reject(body)
                }
            })
        })



    }
};