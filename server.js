//Added  modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers')
const sequelize = require('./config/connection');
const handlbar = exphbs.create({ helpers });


//Need access to the module sql session store 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;




//Create a session cookie so a session cannot be hijacked
const sess = {
    secret: 'super secret',
    cookie: {maxAge: 3000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
//Use all the added modules for the server
app.use(session(sess));
//render webpages to the client side
app.engine('handlebars', handlbar.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
})
