import { createConnection } from 'typeorm';
import config from '../../ormconfig';

export const tryDBConnect = async (cb: ()=>void):Promise<void> => {
  try {
    await createConnection(config);
    cb();
    process.stdout.write('Successful connection to database\n');
  } catch (error) {
    throw new Error('Fail connection to database\n');
  }
};
