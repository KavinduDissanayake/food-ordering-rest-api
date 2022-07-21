const express = require('express');
const { databaseConnection } = require('./database');
const { PORT } = require('./config');

const expressApp = require('./express-app');

const StartServer = async() => {
    const app = express();

    await databaseConnection();

    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}



//main file
StartServer();