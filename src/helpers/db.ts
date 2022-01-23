import { createConnection } from 'typeorm';
import config from '../../ormconfig';

export const tryDBConnect = async (callback: () => void ): Promise<void> => {
  try {
    await createConnection(config);
    callback();
    process.stdout.write('Successful connection to database\n');
  } catch (error) {
    throw new Error('Fail connection to database\n');
  }
};
