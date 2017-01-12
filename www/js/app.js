// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('main', ['ionic', 'ionic-material', 'ngSanitize', 'pascalprecht.translate','main.controllers', 'main.services', 'main.directives', 'main.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
})

.constant('BaseUrl', { 
    url: 'http://rc-offers.com/en/api',
    dir: 'ltr',
    lang: 'en'
  })

.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    ENGLISH: 'English',
    ARABIC: 'عربي',
    OFFER: 'Offer',
    CATEGORIES: 'Categories',
    CITIES: 'Cities',
    PARTICIPANTS: 'Participants',
    ABOUT: 'About',
    FAVOURIT: 'Favourit',
    EXPIRES: 'Expires in',
    OFFERCLICK: 'Offer Clicks',
    DISCOUNT: 'Discount',
    SHARE: 'Share',
    LOADING: 'Loading...',
    NODATA: 'No Data Found'
  });
  $translateProvider.translations('ar', {
    ENGLISH: 'English',
    ARABIC: 'عربي',
    OFFER: 'عرض',
    CATEGORIES: 'الفئات',
    CITIES: 'مدن',
    PARTICIPANTS: 'مشتركين',
    ABOUT: 'حول',
    FAVOURIT: 'المحظوظين',
    EXPIRES: 'ينتهي في',
    OFFERCLICK: 'الزيارات العرض',
    DISCOUNT: 'خصم',
    LOADING: 'جار التحميل...',
    SHARE: 'شارك',
    NODATA: 'لاتوجد بيانات'
  });
  $translateProvider.preferredLanguage('ar');
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('language', {
    url: '/language',
    templateUrl: 'templates/language.html'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.offers', {
    url: '/offers',
    views: {
      'tab-offers': {
        templateUrl: 'templates/tab-offers-list.html',
        controller: 'OffersCtrl'
      }
    }
  })
  .state('tab.tab-offers-single-post', {
      url: '/offers/:PostId',
      views: {
        'tab-offers': {
          templateUrl: 'templates/tab-single-post.html',
          controller: 'OffersPostCtrl'
        }
      }
    })

  .state('tab.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })
  .state('tab.tab-categories-list', {
      url: '/categories/:listName/:listTitle',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories-list.html',
          controller: 'PostListCtrl'
        }
      }
    })
  .state('tab.tab-single-post', {
      url: '/categories/:PostId',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-single-post.html',
          controller: 'PostCtrl'
        }
      }
    })

  .state('tab.cities', {
    url: '/cities',
    views: {
      'tab-cities': {
        templateUrl: 'templates/tab-cities.html',
        controller: 'CitiesCtrl'
      }
    }
  })
  .state('tab.tab-cities-list', {
      url: '/cities/:listName/:listTitle',
      views: {
        'tab-cities': {
          templateUrl: 'templates/tab-cities-list.html',
          controller: 'CityPostListCtrl'
        }
      }
    })
  .state('tab.tab-cities-single-post', {
      url: '/cities/:PostId',
      views: {
        'tab-cities': {
          templateUrl: 'templates/tab-single-post.html',
          controller: 'CityPostCtrl'
        }
      }
    })

  .state('tab.participants', {
    url: '/participants',
    views: {
      'tab-participants': {
        templateUrl: 'templates/tab-participants-list.html',
        controller: 'ParticipantsPostListCtrl'
      }
    }
  })
  .state('tab.tab-participants-single-offer', {
      url: '/participants/:PostId/:PostTitle',
      views: {
        'tab-participants': {
          templateUrl: 'templates/tab-single-offer.html',
          controller: 'ParticipantsPostCtrl'
        }
      }
    })

  .state('tab.about', {
    url: '/page/:slug',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })
  .state('tab.fav', {
    url: '/fav',
    views: {
      'tab-fav': {
        templateUrl: 'templates/fav-list.html',
        controller: 'FavCtrl'
      }
    }
  })
  .state('tab.tab-fav-single-post', {
    url: '/fav/:PostId',
    views: {
      'tab-fav': {
        templateUrl: 'templates/tab-single-post.html',
        controller: 'CityPostCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/language');

});