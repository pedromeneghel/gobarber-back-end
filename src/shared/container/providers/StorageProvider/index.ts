import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers.S3);
