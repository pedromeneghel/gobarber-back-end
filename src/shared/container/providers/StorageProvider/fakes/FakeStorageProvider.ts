import IHistorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IHistorageProvider {
  private storage: string[] = [];

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );
    this.storage.splice(findIndex, 1);
  }

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }
}

export default FakeStorageProvider;
