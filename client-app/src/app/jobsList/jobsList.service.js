(function () {
    angular
        .module('srSlaManagement')
        .service('jobListDataService', jobListDataService);

    jobListDataService.$inject = ['$resource'];

    function jobListDataService($resource) {

        var jobsListResource = $resource('api/jobs', {}, {
            fetch: {
                method: 'GET',
                isArray: true
            }
        });


        var jobScheduleUnpostingResource = $resource('api/job/scheduleUnposting', {}, {
            get: {
                method: 'GET',
                isArray: false
            }
        });

        return {
            getJobsList: _getJobList,
            unPostJob: _unPostJob
        };

        function _getJobList(){
            return jobsListResource.fetch().$promise;
        }

        function _unPostJob(job){
            return jobScheduleUnpostingResource.get({job: job}).$promise;
        }
    }
})();