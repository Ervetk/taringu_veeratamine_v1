let playerOneTotalScore = document.querySelector('.player-one__total-score');
let playerTwoTotalScore = document.querySelector('.player-two__total-score');
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


document.querySelector('.btn__roll-dice').addEventListener('click', function () {
  let randomNumber = Math.trunc(Math.random() * 6) + 1
  document.getElementById('die__random-number-img').src = `./img/dice-${randomNumber}.png`
  console.log(randomNumber)
  changeTextContent('.die__random-number', randomNumber)
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
    changeTextContent('.pop-up__title', `Võtja on ${winnerUser}`)

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
