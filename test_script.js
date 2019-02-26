const pg = require ("pg");
const settings = require ("./settings"); //settings.json

var givenName = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//input
client.connect((err) => {
  if(err){
    return console.error("Connection Error", err);
  };
  console.log("Searching...");
  client.query(`
    SELECT first_name, last_name, birthdate
      FROM famous_people
      WHERE first_name = $1::text
      OR last_name = $1::text`, [givenName], (err, result) =>{
    if(err){
      return console.error("error running query", err);
    };
    allResults(result);
    client.end();
  });
});

//output
function allResults (res){
  console.log(`Found ${result.rowCount} person(s) by the name '${givenName}':`);
  res.rows.forEach(function (searchResult, index){
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
