
class HomeController {
    constructor($scope, filesService) {
        this.vm = this;
        this.vm.$onInit = this.onInit;
        this.vm.filesService = filesService;
        this.vm.uploadedFiles = [];
        this.$scope = $scope;
    }

    onInit() {
        this.vm.uploadedFiles = this.vm.filesService.get();
    }
}

const HomeComponent = {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'home/home.html'
}
export default HomeComponent;
