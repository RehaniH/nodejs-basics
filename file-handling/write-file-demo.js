var fs = require('fs');

var data = {
    name: 'Bob'
}

fs.writeFile('example.json', JSON.stringify(data),function(err){
    if(err){
        console.log('Error Information.');
        console.log(err);
    }
});
