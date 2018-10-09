// parent.js
var cp = require('child_process')
var n = cp.for('./sub.js')
n.on('message', function (m) {
    console.log('PARENT got message: ' + m)
})
n.send({hello: 'workd'})