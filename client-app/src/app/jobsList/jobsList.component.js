angular
    .module('srSlaManagement')
    .component('jobsList', {
        template: require('./jobsList.template.pug')(),
        controller: 'jobsListController',
        bindings: {
            user: '='
        }
    });