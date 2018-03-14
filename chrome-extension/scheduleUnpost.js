var publishing = false;
var publishTabId = null;

chrome.webRequest.onBeforeRequest.addListener((data) => {
        chrome.tabs.query({active: true}, function(tabs) {
            publishTabId = tabs[0].id
        });
    },
    {urls: ["https://*.smartrecruiters.com/backoffice/web/posting-wizard/jobs*"]})


chrome.webRequest.onCompleted.addListener((data) => {
        publishing = true;
    },
    {urls: ["https://*.smartrecruiters.com/backoffice/web/posting-wizard/jobs*"]})

chrome.webRequest.onBeforeRequest.addListener((data) => {
    if (publishing) {
        publishing = false;
        var jobId = /.*\/backoffice\/web\/data\/jobs\/(.*)\/job-ads.*/.exec(data.url)[1]
        chrome.tabs.sendMessage(publishTabId, {jobId: jobId}, function(response) {});
    }
    },
    {urls: ["https://*.smartrecruiters.com/backoffice/web/data/jobs/*"]}
);


chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        //TODO: only first tab?
        console.log(tabId, changeInfo, tab);

        if (tab.url.includes("/app/jobs/ad") && tab.url.includes("publish")) {
            chrome.tabs.sendMessage(tabId, {wizardPublishTab: true}, function(response) {});

        }
    }
);

chrome.webRequest.onCompleted.addListener((data) => {
        chrome.tabs.query({active: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {myJobsList: true, url: data.url}, function(response) {});
        });
    },
    {urls: ["https://*.smartrecruiters.com/backoffice/web/data/jobs/my-jobs*"]})



chrome.webRequest.onCompleted.addListener((data) => {
        chrome.tabs.query({active: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {jobPage: true, url: data.url}, function(response) {});
        });
    },
    {urls: ["https://*.smartrecruiters.com/backoffice/web/data/jobs/*/actions"]})



