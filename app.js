
//////--TÖÖS--/////////////////////////////////////////////////


const playerOneName = document.getElementById('register-player__player-info--player-one-name')
const playerTwoName = document.getElementById('register-player__player-info--player-two-name')
const playerNames = []

document.querySelector('#btn__register-player').addEventListener('click', function (e) {
  e.preventDefault()
  if (playerOneName.value !== '' && playerTwoName.value !== '') {
    playerNames.push(playerOneName.value)
    playerNames.push(playerTwoName.value)
    console.log(playerNames)
    document.querySelector('.game__player-box--one h2').textContent = playerNames[0]
    document.querySelector('.game__player-box--two h2').textContent = playerNames[1]
    document.querySelector('.register-player__container').style.display = 'none'

  }
  else {
    console.log('error')
  }
})


////////////////////////////////////////////////////////////////

let playerOneTotalScore = document.querySelector('.player-one__total-score');
let playerTwoTotalScore = document.querySelector('.player-two__total-score');
const playerTotalScore = document.querySelectorAll('.player__total-score')
let playerOneCurrent = 0
let playerTwoCurrent = 0

let score = [0, 0]
let currentScore = 0
let activUser = 0
let user = ["one", "two"]

function changeTextContent(classInfo, contetInfo) {
  document.querySelector(classInfo).textContent = contetInfo
}


function userSwitcher(chanheClass) {
  document.querySelector(`#user-${user[activUser]}`).classList.remove(chanheClass)
  activUser = activUser === 0 ? 1 : 0;
  document.querySelector(`#user-${user[activUser]}`).classList.add(chanheClass)
  activUser = activUser === 0 ? 1 : 0;
}

const switcPlayer = function () {
  activUser = activUser === 0 ? 1 : 0;
}

const showElement = function (elementClass) {
  document.querySelector(elementClass).classList.add('pop-up__hide')
}

const hideElement = function (elementClass) {
  document.querySelector(elementClass).classList.remove('pop-up__hide')
}


// NEW GAME function
const newGame = function () {
  score = [0, 0];
  currentScore = 0
  document.querySelector(`.player-${user[activUser]}__current-score span`).textContent = currentScore;
  // ES6 loop
  for (const [key] of playerTotalScore.entries())
    playerTotalScore[key].textContent = 0
}

// NEW GAME BUTTON
document.querySelector('.btn_new-game').addEventListener('click', newGame)


document.querySelector('.btn__roll-dice').addEventListener('click', function () {
  let randomNumber = Math.trunc(Math.random() * 6) + 1
  document.getElementById('die__random-number-img').src = `./img/dice-${randomNumber}.png`
  console.log(randomNumber)
  changeTextContent('.die__random-number-img', randomNumber)
  // näita ja suurenda current score õigel useril
  if (randomNumber !== 1) {
    currentScore += randomNumber
    changeTextContent(`.player-${user[activUser]}__current-score span`, currentScore)
  }
  // kui random on 1 siis current null ja user vahetub
  else {
    currentScore = 0
    document.querySelector(`.player-${user[activUser]}__current-score span`).textContent = currentScore
    switcPlayer()
    userSwitcher('hiden')
  }
  console.log('Praegu aktiivne kasutaja:', activUser)
})

// Hold nupu vajutamine
document.querySelector('.btn__hold').addEventListener('click', function () {
  score[activUser] += currentScore

  if (score[activUser] >= 100) {
    const winnerUser = document.querySelector(`.game__player-box--${user[activUser]} h2`).textContent
    hideElement('.pop-up')
    hideElement('.pop-up__bg-overlay')
    changeTextContent('.pop-up__title', `Võitja on ${winnerUser}`)
    newGame()
  }

  currentScore = 0
  changeTextContent(`.player-${user[activUser]}__current-score span`, currentScore)
  switcPlayer()
  changeTextContent('.player-one__total-score', score[0])
  changeTextContent('.player-two__total-score', score[1])
  userSwitcher('hiden')

})


// Sulge pop-up kui X vajutada
document.querySelector('.pop-up__close').addEventListener('click', function () {
  showElement('.pop-up')
  showElement('.pop-up__bg-overlay')
})

// Sulge pop-up kui vajutada hiirega documendil
document.querySelector('.pop-up__bg-overlay').addEventListener('click', function () {
  showElement('.pop-up')
  showElement('.pop-up__bg-overlay')
})

// Sulge pop-up esc nupuga
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape')
    if (!document.querySelector('.pop-up').classList.contains('pop-up__hide')) {
      showElement('.pop-up')
      showElement('.pop-up__bg-overlay')
    }
})


