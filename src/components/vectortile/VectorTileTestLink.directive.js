goog.provide('ga_vector_tile_test_link');

goog.require('ga_translation_service');
goog.require('ga_permalink_service');
goog.require('ga_urlutils_service');

(function() {

  angular.module('ga_vector_tile_test_link', [
    'ga_translation_service',
    'ga_permalink_service',
    'ga_urlutils_service'
  ]).

      directive('gaVectorTileTestLink', function($window, gaLang, gaPermalink,
          gaUrlUtils, gaGlobalOptions) {

        function generateTestLinkUrl() {
          var params = gaUrlUtils.toKeyValue(gaPermalink.getParams()) || '';
          var baseUrl = '//'
          if (!gaGlobalOptions.hostIsRusty) {
            baseUrl += 'test.'
          }
          baseUrl += 'map.geo.admin.ch?lang='
          return baseUrl + gaLang.get() +
          (params.length > 0 ? '&' + params : '');
        }

        return {
          restrict: 'A',
          transclude: true,
          templateUrl: 'components/vectortile/partials/testlink.html',
          link: function(scope, element, attrs) {
            if (gaGlobalOptions.hostIsRusty) {
              scope.linkText = 'try_non_rusty_viewer'
            } else {
              scope.linkText = 'try_test_viewer'
            }
            scope.openTestViewerWithSamePermalink = function(e) {
              $window.open(generateTestLinkUrl(), '_blank');
              e.preventDefault();
            };
          }
        };
      })
})();
