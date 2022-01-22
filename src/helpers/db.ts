import { createConnection } from 'typeorm';
import config from '../../ormconfig';
import { insert } from '../resources/users/user.repository';
import  User from '../entities/user.model';

export const insertAdmin = async (): Promise<void> => {
  await insert(
    new User({
      name: 'natein',
      login: 'admin',
      password: 'admin',
    })
  );
};

export const tryDBConnect = async (callback: () => void ): Promise<void> => {
  try {
    await createConnection(config);
    await insertAdmin();
    callback();
    process.stdout.write('Successful connection to database\n');
  } catch (error) {
    throw new Error('Fail connection to database\n');
  }
};
