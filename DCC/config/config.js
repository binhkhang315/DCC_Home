module.exports =
{
    "development": {
        "dialect": "mysql",
        "username": "root",
        "password": "root",
        "database": "new_schema",
        "host": "127.0.0.1",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        },
        port: 3311,
        "logging": false
    },
    "test": {
       "dialect": "sqlite",
       "storage": "./databaseTest/db.test.sqlite",
       "logging": false
   },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
