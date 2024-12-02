const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY, itemId INTEGER, comment TEXT)');
});

function getReviews(callback) {
    db.all('SELECT * FROM reviews', callback);
}

function addReview(itemId, comment, callback) {
    db.run('INSERT INTO reviews (itemId, comment) VALUES (?, ?)', [itemId, comment], callback);
}

module.exports = { getReviews, addReview };