const srApi = require('../srApi')
const JOBS_LIMIT = 10

const pool = require('../db').pool

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

              let jobIds = list.map(elem => elem.id);
              if (jobIds.length > 0) {
                  pool.query("SELECT job_id, unposting_date from scheduled_unpostings where job_id = ANY ($1::varchar[])", [jobIds])
                      .then(res => {

                          var unpostingDates = {}
                          for (var i in res.rows) {
                              let row = res.rows[i];
                              unpostingDates[row.job_id] = row.unposting_date;
                          }
                          for (var i in list) {
                              var job = list[i]

                              if (unpostingDates[job.id]) {
                                  job.unpostingDate = unpostingDates[job.id];
                              }
                          }
                          resolve(list)
                  }).catch(e => { reject(e) })
              } else {
                  resolve(list)
              }



          }).catch(e => { reject(e) })
       })
  }

  this.cancelUnposting = (user, jobId) => {
      console.log("cancelling unposting for", user.id, jobId);
      return new Promise((resolve, reject) => {
          try {
              srApi.get(user, '/jobs/' + jobId).then((job => {
                  query = {
                      text: 'DELETE FROM scheduled_unpostings WHERE job_id = $1',
                      values: [jobId]
                  }

                  pool.query(query).then((resp) => {
                      resolve()
                  }).catch(e => {
                      reject(e)
                  })

              })).catch(e => {
                  reject(e)
              })
          } catch (e) {
              reject(e)
          }

      });

  }

  this.findSchedules = (user, jobIds) => {
        return new Promise((resolve, reject) => {
            console.log('searching for scheduled unposting for job', jobIds)
            pool.query("SELECT job_id, unposting_date from scheduled_unpostings where job_id = ANY ($1::varchar[])", [jobIds])
                .then(res => {
                    var unpostingDates = {}
                    for (var i in res.rows) {
                        let row = res.rows[i];
                        unpostingDates[row.job_id] = row.unposting_date;
                    }
                    resolve(unpostingDates)
                })
        })
    }

  this.scheduleUnposting = (user, jobId, date) => {

      return new Promise((resolve, reject) => {
          console.log("perofrming unposting for", user.id, jobId, date);
          if (date == null) {
              reject("null unposting")
          }
          try {
              srApi.get(user, '/jobs/' + jobId).then((job => {
                  pool.query('SELECT * FROM scheduled_unpostings WHERE job_id = $1', [jobId]).then(response => {

                      var query = {}
                      if (response.rowCount == 0) {
                          query = {
                              text: 'INSERT INTO scheduled_unpostings(job_id, user_id, unposting_date) VALUES($1, $2, $3)',
                              values: [jobId, user.id, date]
                          }
                      } else {
                          query = {
                              text: 'UPDATE scheduled_unpostings SET unposting_date = $3, user_id = $2 where job_id = $1',
                              values: [jobId, user.id, date]
                          }
                      }
                      console.log('scheduling', query)
                      pool.query(query).then((resp) => {
                          resolve()
                      }).catch(e => {
                          reject(e)
                      })

                  }).catch(e => {
                      reject(e)
                  })

              })).catch(e => {
                  reject(e)
              })
          } catch (e) {
              reject(e)
          }
      });
  }
};


