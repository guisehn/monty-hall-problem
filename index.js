'use strict'

const _ = require('lodash')

const possibleDoors = [1, 2, 3]

function montyHall (changeDoor) {
  const correctDoor = _.sample(possibleDoors)
  let selectedDoor = _.sample(possibleDoors)

  const doorOpenedByMontyHall = _.find(possibleDoors, n => n !== correctDoor && n !== selectedDoor)

  if (changeDoor) {
    selectedDoor = _.find(possibleDoors, n => n !== doorOpenedByMontyHall && n !== selectedDoor)
  }

  return {
    correctDoor,
    selectedDoor,
    doorOpenedByMontyHall,
    changeDoor,
    won: correctDoor === selectedDoor
  }
}

function test (changeDoor) {
  const totalTimes = 10 * 1000
  let timesWon = 0

  for (let i = 0; i < totalTimes; i++) {
    const { won } = montyHall(changeDoor)
    if (won) timesWon++
  }

  return {
    timesWon,
    totalTimes,
    ratio: timesWon / totalTimes
  }
}

function printTest (changeDoor) {
  const { timesWon, totalTimes, ratio } = test(changeDoor)

  console.log(changeDoor ? 'Changing doors' : 'Not changing doors')
  console.log(`Won ${timesWon} out of ${totalTimes} (${(ratio * 100).toFixed(2)}%)`)
}

function init () {
  printTest(false)
  console.log('--')
  printTest(true)
}

init()