const settings = require ("./settings"); //settings.json

var givenFirstName = process.argv[2];
var givenLastName = process.argv[3];
var givenBirthdate = process.argv[4];

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port : settings.port,
    ssl: settings.ssl
  }
});

knex('famous_people')
  .insert({first_name: givenFirstName, last_name: givenLastName, birthdate: givenBirthdate })
  .finally(function() {
    knex.destroy();
    })
