// BANNER CAROUSEL

const prevBtnBanner = document.getElementById('prev-btn-banner')
const nextBtnBanner = document.getElementById('next-btn-banner')
const bannerWrapper = document.getElementById('banner-flex-container')
const slideWidth = bannerWrapper.offsetWidth
const bannerWrapperWidth = bannerWrapper.scrollWidth
const slideCount = bannerWrapper.childElementCount

const lastPosition = -bannerWrapperWidth + slideWidth
let currentPositionBanner = 0
let intervalID

function buttonStatesToggle() {
  if (
    currentPositionBanner < 0 &&
    prevBtnBanner.classList.contains('button-muted')
  ) {
    prevBtnBanner.classList.replace('button-muted', 'button-active')
  }

  if (
    currentPositionBanner === 0 &&
    prevBtnBanner.classList.contains('button-active')
  ) {
    prevBtnBanner.classList.replace('button-active', 'button-muted')
  }

  if (
    currentPositionBanner !== lastPosition &&
    nextBtnBanner.classList.contains('button-muted')
  ) {
    nextBtnBanner.classList.replace('button-muted', 'button-active')
  }

  if (currentPositionBanner === lastPosition) {
    nextBtnBanner.classList.replace('button-active', 'button-muted')
    currentPositionBanner = slideWidth
  }
}

function changeImg() {
  intervalID = setInterval(() => {
    currentPositionBanner -= slideWidth

    Object.assign(bannerWrapper.style, {
      left: `${currentPositionBanner}px`,
    })

    buttonStatesToggle()
  }, 7000)
}

nextBtnBanner.onclick = function () {
  if (this.classList.contains('button-active')) {
    clearInterval(intervalID)

    currentPositionBanner -= slideWidth

    Object.assign(bannerWrapper.style, {
      left: `${currentPositionBanner}px`,
    })

    buttonStatesToggle()

    changeImg()
  }
}

prevBtnBanner.onclick = function () {
  if (this.classList.contains('button-active')) {
    clearInterval(intervalID)

    if (currentPositionBanner === slideWidth) {
      currentPositionBanner -= slideWidth * (slideCount - 1)
    } else {
      currentPositionBanner += slideWidth
    }

    Object.assign(bannerWrapper.style, {
      left: `${currentPositionBanner}px`,
    })

    buttonStatesToggle()

    changeImg()
  }
}

window.onload = changeImg

// TABS

const trainingProgramsTab = document.getElementById('tab-1')
const loseWeightTab = document.getElementById('tab-2')
const gainMassTab = document.getElementById('tab-3')

const cancelFilter = document.getElementById('cancel-tab')
const tabsContent = document.getElementsByClassName('tabs-content')[0]
const categories = Array.from(tabsContent.getElementsByTagName('a'))

const makeCategoriesVisible = () => {
  categories.forEach((item) => {
    Object.assign(item.style, {
      'pointer-events': '',
      opacity: 1,
    })
  })
}

const makeCancelVisible = () => {
  Object.assign(cancelFilter.style, {
    display: 'block',
  })
}

trainingProgramsTab.onclick = () => {
  makeCategoriesVisible()

  categories.forEach((item) => {
    if (item.classList.contains('training-programs')) return
    Object.assign(item.style, {
      'pointer-events': 'none',
      opacity: 0.1,
    })
  })

  makeCancelVisible()
}

loseWeightTab.onclick = () => {
  makeCategoriesVisible()

  categories.forEach((item) => {
    if (item.classList.contains('lose-weight')) return
    Object.assign(item.style, {
      'pointer-events': 'none',
      opacity: 0.1,
    })
  })

  makeCancelVisible()
}

gainMassTab.onclick = () => {
  makeCategoriesVisible()

  categories.forEach((item) => {
    if (item.classList.contains('gain-mass')) return
    Object.assign(item.style, {
      'pointer-events': 'none',
      opacity: 0.1,
    })
  })

  makeCancelVisible()
}

cancelFilter.onclick = () => {
  makeCategoriesVisible()

  Object.assign(cancelFilter.style, {
    display: 'none',
  })
}

// PRICE CALCULATIONS

const items = Array.from(
  document.querySelectorAll('.hits [class^="item"]')
).concat(Array.from(document.querySelectorAll('.new [class^="item"]')))
const inputs = Array.from(document.querySelectorAll('[class^="item"] input'))
const selects = Array.from(document.querySelectorAll('[class^="item"] select'))
const prices = Array.from(document.querySelectorAll('[class^="item"] .number'))

const quanityPriceRatio = {
  '100% Ultra-Pure BCAA': {
    100: 200,
    150: 300,
    200: 400,
  },

  'Amino 1000 Gold': {
    150: 300,
    250: 420,
    350: 500,
  },

  'AAKG Xplode': {
    100: 120,
    250: 270,
  },

  'ANTIOXIDANT STRONG': {
    60: 340,
    120: 580,
  },

  '100% Ultra-Pure BCAA - 2': {
    120: 250,
    180: 350,
    300: 450,
  },

  'Amino 1000 Gold - 2': {
    120: 260,
    200: 380,
    320: 500,
  },

  'AAKG Xplode - 2': {
    150: 150,
    250: 300,
  },

  'ANTIOXIDANT STRONG - 2': {
    80: 400,
    160: 700,
  },
}

inputs.forEach((item) => {
  item.oninput = (event) => {
    const position = inputs.indexOf(item)
    const name = document.querySelector(
      `.${items[position].classList[0]} h3`
    ).innerText
    const itemQuantityPriceRatio = quanityPriceRatio[name]
    if (event.target.value) {
      prices[position].innerText =
        itemQuantityPriceRatio[selects[position].value] * event.target.value
    }
  }
})

selects.forEach((item) => {
  item.onchange = (event) => {
    const position = selects.indexOf(item)
    const name = document.querySelector(
      `.${items[position].classList[0]} h3`
    ).innerText
    const itemQuantityPriceRatio = quanityPriceRatio[name]
    prices[position].innerText =
      itemQuantityPriceRatio[event.target.value] * inputs[position].value
  }
})

// HITS AND NEW CAROUSELS

const hitsNextBtn = document.getElementById('next-btn-hits')
const hitsPrevBtn = document.getElementById('prev-btn-hits')
const newNextBtn = document.getElementById('next-btn-new')
const newPrevBtn = document.getElementById('prev-btn-new')
const containerHits = document.querySelector('.hits .flex-container')
const containerNew = document.querySelector('.new .flex-container')
const totalWidthHits = containerHits.scrollWidth
const totalWidthNew = containerNew.scrollWidth
const lastPositionHits = -(totalWidthHits - containerHits.offsetWidth)
const lastPositionNew = -(totalWidthNew - containerNew.offsetWidth)
const slidingDistance =
  containerHits.children[0].offsetWidth +
  parseInt(getComputedStyle(containerHits).columnGap)

let currentPositionHits = 0
let currentPositionNew = 0

hitsNextBtn.addEventListener('click', function () {
  if (currentPositionHits > lastPositionHits) {
    hitsPrevBtn.classList.contains('button-muted') &&
      hitsPrevBtn.classList.replace('button-muted', 'button-active')

    currentPositionHits -= slidingDistance
    Object.assign(containerHits.style, {
      left: `${currentPositionHits}px`,
    })
  }

  if (currentPositionHits === lastPositionHits) {
    this.classList.replace('button-active', 'button-muted')
  }
})

hitsPrevBtn.addEventListener('click', function () {
  if (currentPositionHits < 0) {
    hitsNextBtn.classList.contains('button-muted') &&
      hitsNextBtn.classList.replace('button-muted', 'button-active')

    currentPositionHits += slidingDistance
    Object.assign(containerHits.style, {
      left: `${currentPositionHits}px`,
    })
  }

  currentPositionHits === 0 &&
    this.classList.replace('button-active', 'button-muted')
})

newNextBtn.addEventListener('click', function () {
  if (currentPositionNew > lastPositionNew) {
    newPrevBtn.classList.contains('button-muted') &&
      newPrevBtn.classList.replace('button-muted', 'button-active')

    currentPositionNew -= slidingDistance
    Object.assign(containerNew.style, {
      left: `${currentPositionNew}px`,
    })
  }

  if (currentPositionNew === lastPositionNew) {
    this.classList.replace('button-active', 'button-muted')
  }
})

newPrevBtn.addEventListener('click', function () {
  if (currentPositionNew < 0) {
    newNextBtn.classList.contains('button-muted') &&
      newNextBtn.classList.replace('button-muted', 'button-active')

    currentPositionNew += slidingDistance
    Object.assign(containerNew.style, {
      left: `${currentPositionNew}px`,
    })
  }

  currentPositionNew === 0 &&
    this.classList.replace('button-active', 'button-muted')
})
