const express = require('express');




const StartServer = async() => {
    const app = express();
    // await expressApp(app);
    app.listen(3022, function() {
        console.log("Server started on port 3000");
    });
}



//main file
StartServer();