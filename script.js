const KEY = 'kristelComment'
const ta = document.getElementById('comment')
const saveBtn = document.getElementById('save')
const clearBtn = document.getElementById('clear')
const status = document.getElementById('status')

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
