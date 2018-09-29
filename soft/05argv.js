var fs = require("fs");

var args = {
    "-h":displayHelp,
    "-r":readFile
};

function displayHelp(){
    console.log("argument processer:",args);
}

function readFile(file){
    console.log("reading:",file);
    fs.createReadStream(file).pipe(process.stdout);
}
//node 05argv.js -h
if(process.argv.length>2){
    args[process.argv[2]](process.argv[3]);
}