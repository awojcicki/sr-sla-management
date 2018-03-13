angular
    .module('srSlaManagement')
    .controller('jobsListController', jobsListController)

    jobsListController.$inject = ['jobListDataService']

    function jobsListController(jobListDataService){
        var ctrl = this;

        ctrl.$onInit = function(){
            console.log('INIT JOB LIST ');

            _getJobList(ctrl.user)

        }

        function _getJobList(){
            jobListDataService.getJobsList().then(function(result){

            }).catch(function(error){
                console.log('error');
            })
        }
    }