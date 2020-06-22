module.exports = {
    /*  The actual mongo database class that you will most likely use */
    MongoDatabase: require('./lib/db/database/Database.js'),
    /*  The version of the package. Remember to use the version accordingly */
    Version: require('./package.json').version,
    /* Our util class for the database */
    DatabaseUtil: require('./lib/db/utils/Database.js'),
    /* Regular utils */
    Utils: require('./lib/db/utils/Util.js')
}

//This is going to import everything so that you can use it to your liking!
