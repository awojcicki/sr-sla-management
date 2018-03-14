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
                console.log(response.statusCode, url)
                if (response && response.statusCode == 200) {
                    resolve(body)
                } else {
                    reject(body)
                }
            })
        })
    }

    this.delete = (user, url) => {
        var fullUrl = ENV + url;

        var options = {
            url: fullUrl,
            method: "DELETE",
            json: true,
            headers: {
                'X-SmartToken': user.apiKey
            }
        }

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                console.log(response.statusCode, url)
                if (response && (response.statusCode == 200 || response.statusCode == 204)) {
                    resolve(body)
                } else {
                    reject(body)
                }
            })
        })
    }
};