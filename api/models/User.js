/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    surname: {
      type: 'string'
    },
    typeof_user: {
      type: 'integer',
      defaultsTo : 2
    },
    age: {
      type: 'integer',
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    },
   /* categories: {
      collection: 'category',
      via: 'id_user2',
      dominant: true
    }*/
    /*,
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }*/

  }

};

