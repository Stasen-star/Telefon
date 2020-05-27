// routes/note_routes.js
module.exports = function(app, db) {
    app.post('/addemploy', (req, res) => {
        const note = { name: req.body.name, oper: req.body.oper, phone: req.body.phone };
        db.collection('employs').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send({ 'status': 'true' });
            }
        });
    });
    app.post('/getbyphone', (req, res) => {
        const note = { oper: req.body.oper, phone: req.body.phone };

        db.collection('employs').findOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log(result)
                res.send(result);
            }
        });
    });
    app.post('/getbyname', (req, res) => {
        const note = { name: req.body.name };

        db.collection('employs').findOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log(result)
                res.send(result);
            }
        });
    });
    app.post('/getbyoper', (req, res) => {
        const note = { oper: req.body.oper };

        db.collection('employs').find(note).toArray((err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log(result)
                res.send(result);
            }
        });
    });
};