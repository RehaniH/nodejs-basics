var fs = require('fs');
var data = require('./data.json');
console.log(data.name)

fs.readFile('./data.json', 'utf-8',(err, data) => {
    var data = JSON.parse(data);
    console.log('data: ', data.name)
})

fs.readdir('d:/', (err, data) => {
    console.log('directories: ', data);
})

