const tasksCtx = document.createElement('div'),
  taskCtx = document.createElement('div'),
  color = document.createElement('input'),
  detail = document.createElement('detail'),
  summary = document.createElement('summary'),
  input = document.createElement('input'),
  taxtArea = document.createElement('taxt-area'),
  detailBtn = document.createElement('button'),
  editeBtn = document.createElement('button'),
  trashBtn = document.createElement('button'),
  addBtn = document.createElement('button');

color.setAttribute('type', 'color')


summary.appendChild(input)


detail.appendChild(summary)

taskCtx.appendChild(color)
taskCtx.appendChild(detailBtn)
taskCtx.appendChild(detail)
taskCtx.appendChild(trashBtn)


tasksCtx.appendChild(addBtn)

addBtn.addEventListener('click', addTask)

function addTask() {
  tasksCtx.appendChild(taskCtx.cloneNode(true))
}