const OnFileSelectDirective = function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            const onChangeHandler = scope.$eval(attrs.onFileSelect);
            element.on('change', onChangeHandler.bind(scope.vm, element));
            element.on('$destroy', function() {
                element.off();
            });

        }
    }
}

const OnFileSelectDirectiveConfig = {
    name: 'onFileSelect',
    fn: OnFileSelectDirective
}

export default OnFileSelectDirectiveConfig;
