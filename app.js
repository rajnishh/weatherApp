const request = require('request');
const yargs = require('yargs');

// const yarg = yargs.command('address', 'Address', {
//   address: {
//     describe: 'Address',
//     demand: true,
//     alias: 'a'
//   }
//
// }).help('h')
// .yarg;
const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Addresss to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;
var encodedAddress = encodeURIComponent(argv.address);
console.log(argv);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
}
)
