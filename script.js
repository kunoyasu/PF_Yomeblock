// 開始時のモーダル
const startDialog = document.getElementById('startModal')
const startButton = document.getElementById('start')
// 結果時のモーダル
const resultDialog = document.getElementById('resultModal')
const resultTitle = document.getElementById('resultModalLabel')
const resultBody = document.getElementById('resultBody')
const modalWrapper = document.getElementById('modal-wrapper')

const firstBlock = document.getElementById('blockAbove')
const secondBlock = document.getElementById('blockSecond')
const thirdBlock = document.getElementById('blockThird')
const fourthBlock = document.getElementById('blockFourth')

const fadeIn = document.getElementById('fade')

var count = 0

function move() {
  const ojiImg = document.getElementById('ojiImg')
  ojiImg.classList.add('ojiMove')
  const yomeImg = document.getElementById('yomeImg')
  yomeImg.classList.add('yomeMove')
}

// ロード時にモーダル表示
window.onload = () => {
  startDialog.ariaModal = 'true'
  startDialog.role = 'dialog'
  startDialog.style = 'display: block;'
  startDialog.classList.add('show')
}

// モーダルの表示の設定
const modal = function () {
  resultDialog.ariaModal = 'true'
  resultDialog.role = 'dialog'
  resultDialog.style = 'display: block;'
  resultDialog.classList.add('show')
  resultDialog.setAttribute('aria-hidden', 'true')
}

// スタート押下時
startButton.addEventListener('click', function () {
  startDialog.remove()
  move()
  modalWrapper.style.visibility = 'hidden'
  // body.addEventListener(eventType, shrinkAnim)
  body.addEventListener(eventType, addCount)
  shrinkAnim()
  setTimeout('gameResult()', 5000)
})
;('use strict')
const body = document.querySelector('body')
const background = document.querySelector('.background')
const countDisplay = document.querySelector('.countDisplay')
const result = document.querySelector('.result')

// パソコンかスマートフォンか判定
const eventType = window.ontouchstart !== null ? 'click' : 'touchstart'
const addCount = function (e) {
  // クリックをカウント・表示
  count++
  countDisplay.textContent = count
  // クリック時のアニメーション
  let x = e.pageX
  let y = e.pageY
  const mash = document.createElement('div')
  mash.style.top = y + 'px'
  mash.style.left = x + 'px'
  document.body.appendChild(mash)
  mash.className = 'mash'
  mash.addEventListener('animationend', () => {
    mash.parentNode.removeChild(mash)
  })

  if (count >= 5) {
    document.getElementById('blockAbove').style.visibility = 'hidden'
  }
  if (count >= 15) {
    document.getElementById('blockSecond').style.visibility = 'hidden'
  }
  if (count >= 20) {
    document.getElementById('blockThird').style.visibility = 'hidden'
  }
  if (count >= 31) {
    document.getElementById('blockFourth').style.visibility = 'hidden'
    document.getElementById('blockFifth').style.visibility = 'hidden'
    document.getElementById('blockSixth').style.visibility = 'hidden'
    document.getElementById('kaden').style.visibility = 'hidden'
  }
}

// START押下時
function gameResult() {
  // 結果の浮き出し文字制御
  fadeIn.classList.add('blur')
  modalWrapper.style.visibility = 'visible'

  const countDisplay = document.querySelector('.countDisplay')
  var num = Number(countDisplay.textContent)

  if (num <= 19) {
    fadeIn.innerText = '残念！！'
    resultTitle.innerText = '嫁めっちゃ怒ってるぞ！！'
    resultBody.innerHTML =
      'おい！！嫁から留守電だぞ！！「ファミチキ買ってこい。」だと！！ファミチキ美味しいもんね。わかったよ！今日は撤退だ！！またチャレンジしてくれよな！'
  }
  if (num >= 20) {
    fadeIn.innerText = '激突！！'
    resultTitle.innerText = '嫁ブロック突破失敗だ！！'
    resultBody.innerHTML =
      'あっ、嫁からLINEだぞ！！「牛乳買ってこい」だと！！カルシウム取ると優しくなるもんね。わかったよ！今日は撤退だ！！またチャレンジしてくれよな！'
  }
  if (num > 30) {
    fadeIn.innerText = '突破！！'
    resultTitle.innerText = '嫁ブロックを突破したぞ！！'
    resultBody.innerHTML =
      '嫁の包囲網を突破したぞ！強めのPC買ったから今日から君も強強エンジニアだ！！夫婦生活もその調子でな！！また遊んでくれよな！'
  }
  // 結果モーダル出力
  setTimeout(modal, 10)
}

// 背景を縮めるアニメーション
const shrinkAnim = function () {
  countDisplay.classList.remove('blink')
  body.removeEventListener(eventType, shrinkAnim)

  background
    .animate(
      {
        width: ['40vw', '0vw'],
        height: ['40vw', '0vw'],
        opacity: [1, 0.5, 1],
        offset: [0, 0.9],
      },
      { duration: 4700, fill: 'forwards' }
    )
    .finished // ゲーム終了後の処理
    .then(() => {
      body.removeEventListener(eventType, addCount)
      result.classList.add('blink')
      result.addEventListener('click', () => {
        location.reload()
      })
    })
}

function tweet() {
  var resultTitle = fadeIn.innerText
  const countDisplay = document.querySelector('.countDisplay').innerText
  const dataText = resultTitle + '\nきみの連打記録は' + countDisplay + '回だったぞ！また挑戦してくれよな！！'
  const dataUrl = 'https://infallible-chandrasekhar-86218b.netlify.app/'
  const dataVia = 'kunoyasu'
  const dataHashtags = '嫁ブロック' + '&hashtags=個人開発' + '&hashtags=クソアプリ'

  window.open(
    'https://twitter.com/intent/tweet?&text=' +
      dataText +
      '%0a&' +
      '%0a&' +
      '&url=' +
      dataUrl +
      '%0a&' +
      '&via=' +
      dataVia +
      '&hashtags=' +
      dataHashtags
  )
}
