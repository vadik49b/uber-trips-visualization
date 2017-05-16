const io = require('socket.io')()
const fs = require('fs')

const csvFile = fs.readFileSync('./uber-data.csv').toString().slice(1)
const pickups = csvFile
  .replace(/"/g, '')
  .split('\n')
  .map(line => line.split(','))

const getRandomPickup = () => pickups[Math.floor(Math.random() * pickups.length)]

io.on('connection', client => {
  console.log(`Client connected: ${Date.now()}`)
  setInterval(() => {
    client.emit('pickup', getRandomPickup())
  }, 100)
})

io.listen(3001)
