// 例子：将12306的CA证书，加入我们的信任列表里
var https = require('https');
var fs = require('fs');
var ca = fs.readFileSync('./srca.cer.pem');

var options = {	
	hostname: 'kyfw.12306.cn',
	path: '/otn/leftTicket/init',
	ca: [ ca ]
};

var req = https.get(options, function(res){	
	res.pipe(process.stdout);	
});

req.on('error', function(err){
	console.error(err.code);
});