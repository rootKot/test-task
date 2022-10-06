class FileUploadController {
    constructor($scope) {
        this.vm = this;
        this.vm.$onInit = this.onInit;
        this.$scope = $scope;
        this.vm.file = null;
        this.vm.fileSizeError = false;
        this.vm.fileMaxSize = 1000000000;
    }

    onInit() {
        this.hiddenInput = document.getElementById('hiddenInput');
    }

    selectFile(elements) {
        const file = elements[0].files[0];
        if (this.isValid(file)) {
            this.vm.fileSizeError = false;
            this.vm.file = file;
            this.$scope.$emit('fileSelect', file)
        } else {
            this.vm.fileSizeError = true;
        }
        this.$scope.$apply();
    }

    isValid(file) {
        return (file.size < this.vm.fileMaxSize);
    }

    browseFile() {
        this.hiddenInput.click();
    }
}

const FileUploadComponent = {
    controller: FileUploadController,
    controllerAs: 'vm',
    templateUrl: 'shared/components/file-upload/file-upload.html'
}
export default FileUploadComponent;
