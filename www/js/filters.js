angular.module('main.filters', [])

.filter('removeHTMLTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
})

.filter('timestampToDate', function () {
    return function (timestamp) {
        var currDate = new Date();
        //var currDate = currDate.getDate() +'-'+ ('0' + (currDate.getMonth() + 1)).slice(-2) +'-'+ ('0' + currDate.getFullYear()).slice(-2);
        
        var date = new Date(timestamp * 1000);
        //var date = (date.getDate() + 1) +'-'+ ('0' + (date.getMonth() + 1)).slice(-2) +'-'+ ('0' + date.getFullYear()).slice(-2);
        var dayDifference = parseInt(Math.round((date - currDate) / (1000 * 60 * 60 * 24)));;
        
        return dayDifference - 1 ;
    };
})