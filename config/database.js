const db = {
    host: process.env.DATABASE_HOST || 'localhost',
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT || '27017',
    password: process.env.DATABASE_PASSWORD
};

let url;
if (process.env.APP_ENV === 'development') {
    url = process.env.DATABASE_URL_LOCAL;
}

if (process.env.APP_ENV === 'production') {
    url = process.env.DATABASE_URL_PRODUCTION;
}

exports.database = {
    url
};
