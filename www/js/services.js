angular.module('main.services', ['ngResource'])

//ResentFactory
.factory('ResentFactory', function($http, BaseUrl){

    var items = [];
    
    return {
        GetFeed: function(){
            return $http.get(BaseUrl.url + '/core/get_posts/?post_type=offer').then(function(response){
                items = response.data.posts;
                return items;
            });
        }
    }

})

//CateroryFactory
.factory('CateroryFactory', function($http, BaseUrl){

    var items = [];
    return {
        getData: function(){
            return $http.get(BaseUrl.url + '/get_offer_cat_index').then(function(response){
                items = response.data.categories;
                return items;
            });
        }
    }
})

//CityFactory
.factory('CityFactory', function($http, BaseUrl){

    var items = [];
    return {
        getData: function(){
            return $http.get(BaseUrl.url + '/get_offer_location_index').then(function(response){
                items = response.data.categories;
                return items;
            });
        }
    }
})

//ParticipantsFactory
.factory('ParticipantsFactory', function($resource, BaseUrl){

    var url = $resource(BaseUrl.url + '/core/get_posts/?post_type=:CatName&offset=:offset',{CatName: '@CatName', offset: '@offset'},{
        getAll : {
          method : 'get'
        }
    });

     return {

        getAll : function(_params) {

          return url.getAll(_params);             
        }
    }
})

//Listpost
.factory('ListPost', function ($resource, BaseUrl) {

    var url = $resource(BaseUrl.url + '/core/get_posts/?post_type=offer&:CatName=:listName&offset=:offset',{CatName: '@CatName', listName: '@listName', offset: '@offset'},{
        getAll : {
          method : 'get'
        }
    });

     return {

        getAll : function(_params) {

          return url.getAll(_params);             
        }
    }

})

//SinglePost
.factory('SinglePost', function ($resource, BaseUrl) {

    var url = $resource(BaseUrl.url + '/core/get_post/?post_type=offer&post_id=:PostId',{PostId: '@PostId'},{
        getAll : {
          method : 'get'
        }
    });

     return {

        getAll : function(_params) {

          return url.getAll(_params);             
        }
    }

})

//Participants SinglePost
.factory('ParticipantsSinglePost', function ($resource, BaseUrl) {

    var url = $resource(BaseUrl.url + '/core/get_posts/?post_type=offer&meta_key=offer_store&meta_value=:PostId&offset=:offset',{PostId: '@PostId', offset: '@offset'},{
        getAll : {
          method : 'get'
        }
    });

     return {

        getAll : function(_params) {

          return url.getAll(_params);             
        }
    }

})

//Single Page
.factory('SinglePage', function ($resource, BaseUrl) {

    var url = $resource(BaseUrl.url + '/get_page/?page_slug=:Slug',{Slug: '@Slug'},{
        getAll : {
          method : 'get'
        }
    });

     return {

        getAll : function(_params) {

          return url.getAll(_params);             
        }
    }

})