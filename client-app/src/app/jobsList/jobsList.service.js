(function () {
    angular
        .module('srSlaManagement')
        .service('jobListDataService', jobListDataService);

    jobListDataService.$inject = ['$resource'];

    function jobListDataService($resource) {

        var jobsListResource = $resource('/api/jobs', {}, {
            fetch: {
                method: 'GET',
                isArray: false
            }
        });

        return {
            getJobsList: _getJobList
        };

        function _getJobList(){
            
            console.log('GET JOSBS');
            
            return jobsListResource.fetch().$promise;
        }
    }
})();