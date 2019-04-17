const express = reqiure('express')
const app = express()

// app.set('trust proxy', 'loopback') // specify a single subnet
// app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
// app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
// app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
/* 

Enabling trust proxy will have the following impact:

The value of req.hostname is derived from the value set in the X-Forwarded-Host header, which can be set by the client or by the proxy.

X-Forwarded-Proto can be set by the reverse proxy to tell the app whether it is https or  http or even an invalid name. This value is reflected by req.protocol.

The req.ip and req.ips values are populated with the list of addresses from X-Forwarded-For.

The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
FIXME: 所以配合NG 实现了获取外网IP
*/

// http://www.expressjs.com.cn/guide/behind-proxies.html