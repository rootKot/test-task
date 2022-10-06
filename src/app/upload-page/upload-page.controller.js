class UploadPageController {
    constructor($scope, filesService) {
        this.vm = this;
        this.$scope = $scope;
        this.filesService = filesService;
        this.vm.$onInit = this.onInit;
        this.vm.file = null;
        this.vm.fileContent = ''
        this.vm.isLoading = false;
        this.allowedFileSize = 10000000;
    }

    handleFileSelect(e, file) {
        e.stopPropagation();
        this.vm.isLoading = true;
        this.vm.file = file;
        this.filesService.add(file);
        if (file.size < this.allowedFileSize) {
            this.loadContent(file)
        } else {
            this.vm.isLoading = false;
        }
    }

    loadContent(file) {
        const Reader = new FileReader();
        Reader.readAsText(file, "UTF-8");
        Reader.onload = (evt) => {
            this.vm.fileContent = Reader.result;
            this.vm.isLoading = false;
            this.$scope.$apply();
        }
    }

    onInit() {
        this.$scope.$on('fileSelect', this.handleFileSelect.bind(this))
    }
}

const UploadPageComponent = {
    controller: UploadPageController,
    controllerAs: 'vm',
    templateUrl: 'upload-page/upload-page.html'
}
export default UploadPageComponent;
