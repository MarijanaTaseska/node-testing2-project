// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './dev.sqlite3'
      },
      useNullAsDefault: true, // needed for sqlite
    },
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './test.sqlite3'
      },
      useNullAsDefault: true, // needed for sqlite
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    },
};
