const Routes = ($stateProvider, $urlRouterProvider) =>{
    const states = [
        {
            name: 'home',
            url: '',
            template: '<home></home>',
        }, {
            name: 'uploadPage',
            url: '/upload',
            template: '<upload-page></upload-page>',
        }
    ];
    states.forEach(state => {
        $stateProvider.state(state.name, state);
    });
    $urlRouterProvider.when('/', ['$state', '$match', ($state, $match) => {
        $state.go('home');
    }]);
}

export default Routes;

