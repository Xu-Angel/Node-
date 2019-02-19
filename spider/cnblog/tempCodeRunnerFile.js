function sleep(m) {
  var now = new Date()
  var exitTime = now.getTime + m
  while (true) {
    now = new Date()
    if (now.getTime() > exitTime) {
      return
    }
  }
}

console.log('ooo');
sleep(5000)
console.log(7777);