angular.module('main.controllers', ['ngCordova', 'ngStorage'])

.controller('MainCtrl', function($scope, $translate, $state, BaseUrl, $localStorage) {
    $scope.$on('$ionicView.enter', function() {
        $localStorage.dir = 'ltr';
        $localStorage.lang = 'en';
        $scope.ChangeLanguage = function(lang) {
            $translate.use(lang);
            BaseUrl.url = 'http://rc-offers.com/' + lang + '/api';
            if (lang == 'ar') {
                $localStorage.dir = 'rtl';
                $localStorage.lang = 'ar';
                
            }
            $scope.dir = $localStorage.dir;
            $scope.lang = $localStorage.lang;
            $state.go('tab.offers');
        }

        //Loader
        $scope.show = function() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function() {
            $ionicLoading.hide();
        };

    });
})

.controller('OffersCtrl', function($scope, ResentFactory, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        $scope.items = [];

        ResentFactory.GetFeed().then(function(items) {
            $scope.items = items;
            $scope.loading = false;

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight();
            }, 300);
        });
    });
})

.controller('OffersPostCtrl', function($scope, SinglePost, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $localStorage, $translate) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        var query = SinglePost.getAll({ PostId: $stateParams.PostId });
        query.$promise.then(function(data) {
            $scope.item = data.post;
            $scope.loading = false;
            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 300);
        });


        //En 
        if (angular.isUndefined($localStorage.Enfavitoms)) {
            $localStorage.Enfavitoms = [];
        }
        //Ar 
        if (angular.isUndefined($localStorage.Arfavitoms)) {
            $localStorage.Arfavitoms = [];
        }

        //Add Fav Itoms
        $scope.addfav = function(itom) {

            if($translate.use() == 'en'){
                $scope.avelable = false;
                angular.forEach($localStorage.Enfavitoms, function(value, key) {
                    if (value.id == itom.id) {
                        $scope.avelable = true;
                    }
                });

                if ($scope.avelable == false) {
                    $localStorage.Enfavitoms.push(itom);
                    $scope.additom = true;
                    $timeout(function() {
                         $scope.additom = false;
                    }, 2000);
                }
            }

            if($translate.use() == 'ar'){
                $scope.avelable = false;
                angular.forEach($localStorage.Arfavitoms, function(value, key) {
                    if (value.id == itom.id) {
                        $scope.avelable = true;
                    }
                });

                if ($scope.avelable == false) {
                    $localStorage.Arfavitoms.push(itom);
                    $scope.additom = true;
                    $timeout(function() {
                         $scope.additom = false;
                    }, 2000);
                }
            }
        }


    });
})

.controller('CategoriesCtrl', function($scope, CateroryFactory, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        $scope.items = [];

        CateroryFactory.getData().then(function(items) {
            $scope.items = items;
            $scope.loading = false;

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight();
            }, 300);
        });
    });
})

.controller('PostListCtrl', function($scope, ListPost, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    //$scope.$on('$ionicView.enter', function() {
        $scope.showBtn = true;
        $scope.items = [];
        $scope.count = [];

        var query = ListPost.getAll({ listName: $stateParams.listName, CatName: 'offer_cat', offset: '0' });
        query.$promise.then(function(data) {
            $scope.items = data.posts;
            $scope.count = data.count_total;
            $scope.pageurl = $stateParams.listName;
            $scope.pageTitle = $stateParams.listTitle;

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight();
            }, 300);

        });

        var offset = 10;
        $scope.loadMore = function() {
            var query = ListPost.getAll({ listName: $stateParams.listName, CatName: 'offer_cat', offset: offset });
            query.$promise.then(function(data) {
                $scope.items = $scope.items.concat(data.posts);
                if ($scope.items.length != $scope.count) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.showBtn = false;
                }

                $timeout(function() {
                    ionicMaterialMotion.fadeSlideInRight();
                }, 300);

                offset += 10;
            });
        }
    //});
})

.controller('PostCtrl', function($scope, SinglePost, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $localStorage, $translate) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        var query = SinglePost.getAll({ PostId: $stateParams.PostId });
        query.$promise.then(function(data) {
            $scope.item = data.post;
            $scope.loading = false;
            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 300);

        //En 
        if (angular.isUndefined($localStorage.Enfavitoms)) {
            $localStorage.Enfavitoms = [];
        }
        //Ar 
        if (angular.isUndefined($localStorage.Arfavitoms)) {
            $localStorage.Arfavitoms = [];
        }

        //Add Fav Itoms
        $scope.addfav = function(itom) {

            if($translate.use() == 'en'){
                $scope.avelable = false;
                angular.forEach($localStorage.Enfavitoms, function(value, key) {
                    if (value.id == itom.id) {
                        $scope.avelable = true;
                    }
                });

                if ($scope.avelable == false) {
                    $localStorage.Enfavitoms.push(itom);
                    $scope.additom = true;
                    $timeout(function() {
                         $scope.additom = false;
                    }, 2000);
                }
            }

            if($translate.use() == 'ar'){
                $scope.avelable = false;
                angular.forEach($localStorage.Arfavitoms, function(value, key) {
                    if (value.id == itom.id) {
                        $scope.avelable = true;
                    }
                });

                if ($scope.avelable == false) {
                    $localStorage.Arfavitoms.push(itom);
                    $scope.additom = true;
                    $timeout(function() {
                         $scope.additom = false;
                    }, 2000);
                }
            }
        }
        });
    });
})

.controller('CitiesCtrl', function($scope, CityFactory, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        $scope.items = [];

        CityFactory.getData().then(function(items) {
            $scope.items = items;
            $scope.loading = false;

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight();
            }, 300);
        });
    });
})

.controller('CityPostListCtrl', function($scope, ListPost, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    //$scope.$on('$ionicView.enter', function() {
        $scope.showBtn = true;
        $scope.items = [];
        $scope.count = [];

        var query = ListPost.getAll({ listName: $stateParams.listName, CatName: 'location', offset: '0' });
        query.$promise.then(function(data) {
            $scope.items = data.posts;
            $scope.count = data.count_total;
            $scope.pageurl = $stateParams.listName;
            $scope.pageTitle = $stateParams.listTitle;

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight();
            }, 300);

        });

        var offset = 10;
        $scope.loadMore = function() {
            var query = ListPost.getAll({ listName: $stateParams.listName, CatName: 'location', offset: offset });
            query.$promise.then(function(data) {
                $scope.items = $scope.items.concat(data.posts);
                if ($scope.items.length != $scope.count) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.showBtn = false;
                }

                $timeout(function() {
                    ionicMaterialMotion.fadeSlideInRight();
                }, 300);

                offset += 10;
            });
        }
    //});
})

.controller('CityPostCtrl', function($scope, SinglePost, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $localStorage, $translate) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        var query = SinglePost.getAll({ PostId: $stateParams.PostId });
        query.$promise.then(function(data) {
            $scope.item = data.post;
            $scope.loading = false;
            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 300);

       //En 
        if (angular.isUndefined($localStorage.Enfavitoms)) {
            $localStorage.Enfavitoms = [];
        }
        //Ar 
        if (angular.isUndefined($localStorage.Arfavitoms)) {
            $localStorage.Arfavitoms = [];
        }

        //Add Fav Itoms
        $scope.addfav = function(itom) {

            if($translate.use() == 'en'){
                $scope.avelable = false;
                angular.forEach($localStorage.Enfavitoms, function(value, key) {
                    if (value.id == itom.id) {
                        $scope.avelable = true;
                    }
                });

                if ($scope.avelable == false) {
                    $localStorage.Enfavitoms.push(itom);
                    $scope.additom = true;
                    $timeout(function() {
                         $scope.additom = false;
                    }, 2000);
                }
            }

            if($translate.use() == 'ar'){
                $scope.avelable = false;
                angular.forEach($localStorage.Arfavitoms, function(value, key) {
                    if (value.id == itom.id) {
                        $scope.avelable = true;
                    }
                });

                if ($scope.avelable == false) {
                    $localStorage.Arfavitoms.push(itom);
                    $scope.additom = true;
                    $timeout(function() {
                         $scope.additom = false;
                    }, 2000);
                }
            }
        }

        });
    });
})

.controller('ParticipantsPostListCtrl', function($scope, ParticipantsFactory, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    //$scope.$on('$ionicView.enter', function() {

        $scope.showBtn = true;
        $scope.items = [];
        $scope.count = [];

        var offset = 0;

        $scope.loadMore = function() {

            var query = ParticipantsFactory.getAll({ CatName: 'store', offset: offset });
            query.$promise.then(function(data) {
               // console.log(data);
                $scope.count = data.count_total;
                $scope.pageurl = $stateParams.listName;
                $scope.pageTitle = $stateParams.listTitle;
                $scope.items = $scope.items.concat(data.posts);
                if ($scope.items.length != $scope.count) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.showBtn = false;
                }

                $timeout(function() {
                    ionicMaterialMotion.fadeSlideInRight();
                }, 300);

                offset += 10;
            });
        }
        // $scope.loadMore();
    //});
})

.controller('ParticipantsPostCtrl', function($scope, ParticipantsSinglePost, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
   // $scope.$on('$ionicView.enter', function() {
         $scope.showBtn = true;
         $scope.items = [];
         $scope.count = [];

        var offset = 0;

        $scope.loadMore = function() {
        var query = ParticipantsSinglePost.getAll({ PostId: $stateParams.PostId, offset: offset });
        query.$promise.then(function(data) {
            $scope.count = data.count_total;
            $scope.title = $stateParams.PostTitle;
            $scope.items = $scope.items.concat(data.posts);
                if ($scope.items.length != $scope.count) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.showBtn = false;
                }
            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 300);
            
            offset += 10;
        });
    }
    // $scope.loadMore();
    //});
})

.controller('AboutCtrl', function($scope, SinglePage, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$on('$ionicView.enter', function() {
        $scope.loading = true;
        var query = SinglePage.getAll({ Slug: $stateParams.slug });
        query.$promise.then(function(data) {
            $scope.item = data.page;

            $scope.loading = false;
            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 300);
        });
    });
})

.controller('FavCtrl', function($scope, CateroryFactory, $translate, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $localStorage) {
    $scope.$on('$ionicView.enter', function() {
        $scope.items = [];
        $scope.loading = true;

        if($translate.use() == 'en'){
          $scope.items = $localStorage.Enfavitoms;
        }
        if($translate.use() == 'ar'){
          $scope.items = $localStorage.Arfavitoms;
        }

        $scope.loading = false;
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight();
        }, 300);

        //Remove Fav Itoms
        $scope.refav = function(index) {

            if($translate.use() == 'en'){
               $localStorage.Enfavitoms.splice(index, 1);
               $scope.removeitom = true;
                    $timeout(function() {
                         $scope.removeitom = false;
                    }, 2000);
            }

            if($translate.use() == 'ar'){
                $localStorage.Arfavitoms.splice(index, 1);
                $scope.removeitom = true;
                    $timeout(function() {
                         $scope.removeitom = false;
                    }, 2000);
            }
        }

    });
})

.controller('ShareCtrl', function($scope, $cordovaSocialSharing, $filter, $sce) {
    $scope.$on('$ionicView.enter', function() {
        $scope.share = function(obj) {
           // console.log(obj);
            // $cordovaSocialSharing.share('This is my message', 'Subject', null, 'http://www.mylink.com');

            $scope.html = $filter('translate')(obj.excerpt);
            var message = $scope.html;
          //  console.log(message);
            var subject = $filter('translate')(obj.title);
            var file = obj.thumbnail;
            var link = "<br />" + $filter('translate')(obj.url);

            $cordovaSocialSharing
                .share(message, subject, file, link) // Share via native share sheet
                .then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
        }
    });
})
