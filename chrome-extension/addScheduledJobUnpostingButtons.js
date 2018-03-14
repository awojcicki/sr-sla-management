// const DELAYED_UNPUBLISH_TPL = "<div>Unpublish job on: </div>" +
//     "<input type='checkbox' id='delayedUnpublish' name='delayedUnpublish'/>" +
//     "<input type='date' id='delayedUnpostingDate' name='delayedUnpostingDate'/>" +
//     "";


var DELAYED_UNPUBLISH_TPL = `<ul class="list list--underline"><li></li><li class="padding--vertical--s">
   <span>Unpublish job on? </span>
  <input type='checkbox' id='delayedUnpublish' name='delayedUnpublish' class="margin--horizontal--s" />
  <input type='date' id='delayedUnpostingDate' name='delayedUnpostingDate' class='element--input display--inline-block margin--left--s'/></li></ul>
`;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.jobId) {
        let unpublishCheckbox = document.getElementById("delayedUnpublish");
        let delayedUnpostingDate = document.getElementById("delayedUnpostingDate");

        var unpostingDate = null

        if (delayedUnpostingDate.value) {
            unpostingDate = new Date(delayedUnpostingDate.value + "T"+ (("0" + new Date().getHours()).slice(-2)) + ":00:00")
        }

        chrome.storage.sync.get({
                hashKey: ""
            },
            function(items) {
                const key = items.hashKey;
                var url = 'https://sr-sla-management.herokuapp.com/' + key +'/api/jobs/schedule';
                var data = {
                    jobId: request.jobId,
                    unpost: unpublishCheckbox.checked,
                    unpostingDate: unpostingDate
                }
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: 'application/json'
                });
            });

    } else if (request.wizardPublishTab) {
        setTimeout(() => waitForPublishButton(), 500);
    } else if (request.myJobsList) {
        setTimeout(() => decorateJobs(request), 500);
    }
});

function waitForPublishButton() {
    let publishButton = document.getElementsByTagName("publish-button");

    if (publishButton.length == 0) {
        setTimeout(() => waitForPublishButton(), 500);
    } else {
        addDelayedUnpublishInputs();
    }
}

function addDelayedUnpublishInputs() {
    if (jQuery('#delayedUnpublish').length == 0) {
        jQuery('publish-button')
            .parent('div.column')
            .parent('.column')
            .append(DELAYED_UNPUBLISH_TPL)
    }
}


function decorateJobs(data) {
    var url = data.url;
    var pageNumber = parseInt(/.*my-jobs\?page\=(\d+).*/.exec(url)[1])
    var jobLimit = 30;
    var offset = pageNumber * jobLimit;
    const jobIds = jQuery('.job-item--mine .details-title').get().map(elem => /.*app\/jobs\/details\/([\da-f-]{16,}).*/.exec(elem.href)[1]);

    jobIds.splice(0, offset);

    var unpostingDates = {}

    for(var i=0; i<jobIds.length; i++) {
        if (i % 2 == 0) {
            unpostingDates[jobIds[i]] = new Date();
        }
    }

    chrome.storage.sync.get({
            hashKey: ""
        },
        function(items) {
            const key = items.hashKey;
            var url = 'https://sr-sla-management.herokuapp.com/' + key +'/api/jobs/find-schedules';
            var data = jobIds;
            jQuery.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json',
                success: (unpostingDates) => {
                    for (jobId in unpostingDates) {
                        var date = unpostingDates[jobId]
                        jQuery("#st-jobName[href*='" + jobId + "']").parent('.details').find('#st-postingStatus')
                            .append("<span>Will be unposted on</span><span>" + date + "</span>")
                    }

                }
            });
        });


}










