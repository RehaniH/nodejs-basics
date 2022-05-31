fs = require('fs');

data = fs.readdirSync('d:/');
console.log('files: ', data);
console.log('this comes after');