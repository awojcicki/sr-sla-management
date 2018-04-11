# SmartRecruiters SLA Management

Chrome extension (and the backing implementation) for SmartRecruiters system that allows user to schedule unposting of job.

## Chrome Extension installation
Currently extension can be installed only in developer mode 

- contact your administrator and get `SmartRecruiters SLA Management KEY`
- download this repository as a Zip file
- extract it
- in chrome browser go to : More tools -> Extensions
- enable Developer mode
- load extension using `Load unpacked` button and select `chrome-extension` folder from already extracted file
- once installed click on the extension icon and select `Options`
- use `SmartRecruiters SLA Management KEY` received from your administrator

You are now ready to use schedule job unpublishing (new option on job posting wizard)


 ## SmartRecruiters SLA Management KEY
 In order to get `SmartRecruiters SLA Management KEY` and share it for other users in your company you have to perform following steps:
 - get SmartRecruiters Public API key
 - enter [https://sr-sla-management.herokuapp.com/](https://sr-sla-management.herokuapp.com/)
 - provide api key
 - If api key if correct you will be redirected to job list. Copy address of this page. Characters between `https://sr-sla-management.herokuapp.com/` and `/jobs`
 is your  `SmartRecruiters SLA Management KEY` that you can share with other employees of your company. 
 All scheduled unpostings will be performed using your key (you will be author of these changes)




    
