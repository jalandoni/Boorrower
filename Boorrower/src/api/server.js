const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//models
const Borrower = require('./Borrower');
const AdminAccnt = require('./AdminAccount')


//modules
const loginAdmin = require('./admin/login')
const updateAdmin = require('./admin/update')

//database - mongoose
mongoose.connect('mongodb://localhost:27017/Book_Borrower', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// Appointment
app.get('/api/borrower/list', (req, res) => {
    Borrower.find({}).exec((err, data) => {
        if (err) return res.status(404).send('Error while getting list of borrower!');
        return res.send({ data })
    })
})

app.post('/api/borrower/create', (req, res) => {
    console.log(req.body)
    const data = new Borrower({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bookId:req.body.bookId,
        title:req.body.title,
        dueDate:req.body.dueDate,
        borrowedDate:req.body.borrowedDate,
        status: req.body.status,
        action: req.body.action,
    
    });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.get('/api/borrower/getDone', (req, res) => {
    Borrower.find({ status: "Pass" }).exec((err, data) => {
        if (err) return res.status(404).send('Error while getting list of borrower!');
        return res.send({ data })
    })
})

app.post('/api/borrower/update/:id', (req, res) => {
    console.log(req.body)
    Borrower.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
    })
})


app.post('/api/borrower/delete/:id', (req, res) => {
    Borrower.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})


//Admin - Account
app.put('/admin/login', (req, res) => {
    loginAdmin.login(req, res);
})
app.put('/admin/update', (req, res) => {
    updateAdmin.update(req, res)
})

const PORT = 3000;

app.listen(PORT)
console.log('api running on port: ' + PORT)