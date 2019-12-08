const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowerSchema = Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        bookId:{type: String, required: true},
        title:{type: String, required: true},
        dueDate:{type: String, required: true},
        borrowedDate:{type: String, required: true},
        status: {type: String, required: true},
        action: {type: String, required: true},
    }, 
);

const Borrower = mongoose.model("Borrower", BorrowerSchema);

module.exports = Borrower;