const settings = require ("./settings"); //settings.json

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

var givenName = process.argv[2];

knex('famous_people')
  .select('first_name','last_name','birthdate')
  .from('famous_people')
  .where(function(){
    this.where('first_name','=',givenName)
    .orWhere('last_name','=',givenName)})
  .then(function(searchResult){
    allResults(searchResult);
  }).finally(function() {
    knex.destroy();
  })

function allResults (res){
  console.log(`Found ${res.length} person(s) by the name '${givenName}':`)
  res.forEach(function (searchResult, index){
    let rowIndex = index + 1;
    let birthday = searchResult.birthdate
    return console.log(`-${rowIndex}: ${searchResult.first_name} ${searchResult.last_name}, born ${dateMaker(birthday)}`)
  });
};
//helper function used in allResults
function dateMaker(birthday){
  let birthdayFormatted = birthday.toISOString().substr(0,10);
  return birthdayFormatted
};