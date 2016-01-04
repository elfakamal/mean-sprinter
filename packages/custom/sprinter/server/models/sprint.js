'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  moment = require('moment');

/**
 * Sprint Schema
 */
var SprintSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  from: {
    type: Date,
    default: Date.now,
    required: true,
    validate: {
      validator: function(value) {
        var isFromValid = typeof value === typeof (new Date());
        isFromValid = isFromValid && (moment(value).isBefore(moment(this.until)) || typeof this.until === 'undefined');
        return isFromValid;
      },
      message: '{VALUE} is not a valid from date!'
    }
  },
  until: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        var isFromValid = typeof value === typeof (new Date());
        isFromValid = isFromValid && (moment(value).isAfter(moment(this.from)) || typeof this.from === 'undefined');
        return isFromValid;
      },
      message: '{VALUE} is not a valid until date!'
    }
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: false
  },
  project: {
    type: Schema.ObjectId,
    ref: 'Project',
    required: true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
SprintSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
SprintSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('author', 'name username').exec(cb);
};

mongoose.model('Sprint', SprintSchema);
