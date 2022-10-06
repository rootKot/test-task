export default class FilesService {
    constructor() {
        this.uploadedFiles = [];
    }

    add(file) {
        this.uploadedFiles.push({
            fileName: file.name,
            size: file.size,
            date: Date.now()
        });
    }

    get() {
        return this.uploadedFiles;
    }
}
