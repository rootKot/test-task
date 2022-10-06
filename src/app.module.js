import angular from 'angular';
import HomeComponent from "./app/home/home.controller";
import 'angular-ui-router';
import './generated-templates/app.templates'
import Routes from './app.routes';
import UploadPageComponent from "./app/upload-page/upload-page.controller";
import FileUploadComponent from "./app/shared/components/file-upload/file-upload.controller";
import OnFileSelectDirectiveConfig from './app/shared/components/file-upload/on-file-select.directive'
import FilesService from "./app/shared/services/files.service";
import ngSanitize from "angular-sanitize"

angular.module('app', [
    'ui.router',
    'templates',
    ngSanitize
])
    .service('filesService', FilesService)
    .component('home', HomeComponent)
    .directive(OnFileSelectDirectiveConfig.name, OnFileSelectDirectiveConfig.fn)
    .component('uploadPage', UploadPageComponent)
    .component('fileUpload', FileUploadComponent)
    .config(Routes)
    .run(
        ['$rootScope', '$state', '$stateParams',
            ($rootScope, $state, $stateParams) => {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    );
