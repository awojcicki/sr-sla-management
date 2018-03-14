#!/usr/bin/env node

const pool = require('../services/db').pool
const srAPi = require('../services/srApi')
pool.query('select job_id, users.user_id, api_key, unposting_date from scheduled_unpostings, users where scheduled_unpostings.user_id = users.user_id and unposting_date < now()', (err, res) => {
  console.log('jobs to unpublish: ', res.rows.length)
  for (var i=0; i < res.rows.length; i++) {
      const row = res.rows[i];

      const publicationUrl = "/jobs/" + row.job_id + "/publication";

      const user = {apiKey: row.api_key};
      srAPi.get(user, publicationUrl).then((resp) => {
        if (resp.content.length > 0) {
          console.log("unpublishing job", publicationUrl, row.user_id, row.unposting_date);

          srAPi.delete(user, publicationUrl).then((removalResp) => {
            console.log("removed job")
            removeSchedule(row.job_id)
          }).catch((e) => {
            console.error("Error occured")
          })
        } else {
          console.log('job is already unpublished ', row.job_id)
          removeSchedule(row.job_id)

        }
      }).catch((e) => {
        console.error("error while unpublishing", e)
      })
  }
})

function removeSchedule(jobId) {
    pool.query("DELETE FROM scheduled_unpostings WHERE job_id = $1 ", [jobId]).then((e) => {
        console.log('removed record', jobId)
    }).catch((e)=> {
        console.log("error while removing schedule", jobId, e)
    })
}



