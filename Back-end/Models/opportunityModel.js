const mongoose = require('mongoose');

// create schema
const opportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    certificate: [{ type: String }],
    duration: {
        type: Number,
        required: [true, 'Duration in days required']
    },
    time: {
        start: { type: Date }, end: { type: Date }
    },
    location: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Location required']
    },
    getHired: {
        type: Boolean,
        default: false
    },
    paid: {
        isPaid: { type: Boolean, default: false },
        amount: { type: Number, default: 0 },
        currency: { type: String, default: "EGP" }
    },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    expOutcome: [{ type: String }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    progress: {
        type: String,
        default: "open",
        enum: ["open", "in progress", "close"],
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
}, { timestamp: true }
);

opportunitySchema.methods.checkIsClosed = function (opp) {
    if (new Date(opp.time.end) < new Date()) {
        console.log('closing opportunity ', opp.title)
        opp.progress = 'close';
        opp.save();
    }
}
// create model
const Opportunity = mongoose.model('opportunity', opportunitySchema);
module.exports = Opportunity;