module.exports =
{
    "development": {
        "dialect": "mysql",
        "username": "root",
        "password": "dekvn@123321",
        "database": "DCC2",
        "host": "192.168.122.20",
        "pool": {
            "max": 5,
            "min": 0,
            "idle": 10000
        },
        port: 3306,
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