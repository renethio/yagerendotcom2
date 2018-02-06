'use strict';

/**
 * Module dependencies.
 */
var statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Liyu Schema
 */
var LiyuSchema = new Schema({
  skill: {
    type: String,
    default: '',
    required: 'Please fill Liyu name',
    trim: true
  },

  experience: {
    type: Number,
    required: "Please fill your experiance"
  },

  street: String,
  city: String,
  state: {
    type: String,
    uppercase: true,
    required: true,
    enum: statesArray
  },
  zip: Number,

  phone: {
    type: Number,
    required: "Please fill your phone number"

  },

  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Liyu', LiyuSchema);

