/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    public: {
      type: 'integer'
    },
    id_user: {
      type: 'integer'
    }
    /*,
    id_user2: {
      collection: 'user',
      via: 'categories'
    }*/

  }

};

