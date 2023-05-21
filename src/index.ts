import { Knex } from './server/database/knex';
import { server } from './server/server';



const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`Server running in port ${process.env.PORT}`);
  });
};


const runMigrations = async () => {
  return await Knex.migrate.latest();
};


const runSeeds = () => {
  Knex.seed.run();
};


const beforeStartServer = async () => {
  if (process.env.IS_LOCALHOST !== 'true') {
    await runMigrations()
      .then(() => {
        runSeeds();
      })
      .catch(console.log);
  }
};


beforeStartServer()
  .then(() => {
    startServer();
  });

