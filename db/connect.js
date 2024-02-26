const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ishaangaba97:Ishaan%40123@democluster.vskb5pg.mongodb.net/blinkit').then(() => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));
