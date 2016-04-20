/**
 * Patterns_into_tests.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id_test: {
      type: 'integer'
    },
    id_pattern: {
      type: 'integer'
    },
    answer: {
      type: 'string'
    },
    result: {
      type: 'integer'
    }

  }

};

