const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL

module.exports = new function() {
    this.pool = new Pool({
        connectionString: connectionString,
        ssl: true
    })
};