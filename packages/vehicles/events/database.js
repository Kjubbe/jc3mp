// init default database

veh.mysql
  .createPool({
    connectionLimit: 100, //important
    host: veh.config.database.host,
    user: veh.config.database.user,
    password: veh.config.database.password,
    database: veh.config.database.name,
    debug: false,
  })
  .then(function (pool) {
    veh.pool = pool;

    const sql = `CREATE TABLE IF NOT EXISTS ${veh.config.default_tables[0].name} ${veh.config.default_tables[0].structure}`;

    veh.pool.query(sql).then(function (result) {
      //con.release();
    });
  });
