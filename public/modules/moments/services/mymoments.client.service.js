'use strict';

angular.module('moments').factory('Mymoments', ['$resource',
    function ($resource) {
        //return $resource('moments/mine');
        return $resource('mymoments/:momentId', {
            momentId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
