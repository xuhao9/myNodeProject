let express = require('express');
let app = express();

let server = app.listen(3000, () => {
    console.log(server.address().address);
    console.log(server.address().port);
    console.log('listen at 3000');
})