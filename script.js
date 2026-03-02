const KEY = 'kristelComment'
const ta = document.getElementById('comment')
const saveBtn = document.getElementById('save')
const clearBtn = document.getElementById('clear')
const status = document.getElementById('status')

// sound that plays when a block is clicked
const clickSound = new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
clickSound.volume = 0.5; // not too loud

function playClickSound(){
  // restart if already playing
  clickSound.currentTime = 0;
  clickSound.play().catch(_=>{}); // ignore play promise rejections
}

function load(){
  const v = localStorage.getItem(KEY)
  if(v) ta.value = v
}

function save(){
  localStorage.setItem(KEY, ta.value)
  status.textContent = 'Salvato'
  setTimeout(()=>status.textContent='',1500)
}

function clearComment(){
  ta.value = ''
  localStorage.removeItem(KEY)
  status.textContent = 'Cancellato'
  setTimeout(()=>status.textContent='',1500)
}

saveBtn.addEventListener('click', save)
clearBtn.addEventListener('click', clearComment)
window.addEventListener('load', load)

// show a big blue heart centered over the clicked block
function spawnHeartAt(x, y){
  const el = document.createElement('div')
  el.className = 'big-heart'
  el.textContent = '💙'
  // position the heart exactly at the click coordinates (viewport coordinates)
  el.style.left = (x || window.innerWidth/2) + 'px'
  el.style.top = (y || window.innerHeight/2) + 'px'
  document.body.appendChild(el)
  // remove after animation finishes
  setTimeout(()=>{ if(el && el.parentNode) el.parentNode.removeChild(el) }, 900)
}

function attachHeartHandlers(){
  const blocks = document.querySelectorAll('.content-block')
  blocks.forEach(b => {
    b.addEventListener('click', () => {
      const r = b.getBoundingClientRect()
      // optionally position relative to element center; we currently use centered fixed heart
      spawnHeartAt(r.left + r.width/2, r.top + r.height/2)
      playClickSound()
    })
    b.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click() }
    })
  })
}

window.addEventListener('load', attachHeartHandlers)
