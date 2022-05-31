fs = require('fs');
function phoneNumber(err, data){
    console.log('data: ',data);
}

//phoneNumber is passed as a callback function
fs.readdir('d:/', phoneNumber);
console.log('this comes after');