import { PORT } from './common/config';
import { app } from './app';
import { tryDBConnect } from './helpers/db';

tryDBConnect(()=> {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
