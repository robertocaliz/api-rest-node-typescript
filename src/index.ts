import { Knex } from './server/database/knex';
import { server } from './server/server';




const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`Server running in port ${process.env.PORT}`);
  });
};



const runMigrations = async () => {
  if (process.env.IS_LOCALHOST !== 'true') {
    await Knex.migrate.latest()
      .then(() => {
        startServer();
      })
      .catch(console.log);
    return;
  }
  startServer();
};

runMigrations();



