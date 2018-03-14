angular
    .module('srSlaManagement')
    .controller('jobsListController', jobsListController)

    jobsListController.$inject = ['jobListDataService']

    function jobsListController(jobListDataService){
        var ctrl = this;

        ctrl.data = {
            jobs : []
        };
        
        ctrl.actions = {
            unPost: _unPostJob
        }

        ctrl.$onInit = function(){
            _getJobList()
        };

        function _getJobList(){
            jobListDataService.getJobsList()
                .then(function(result){
                    ctrl.data.jobs = result;
                }).catch(function(error){
                    console.log('error : ', error);
                })
        }
        
        function _unPostJob(job){
            job.isChange = true;

            jobListDataService.unPostJob(job)
                .then(function(result){

                }).catch(function(error){
                    console.log('error : ', error);
                }).finally(function(){
                    job.isChange = false;
                })
            
        }
    }