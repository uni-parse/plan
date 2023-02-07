const
  tasksCtx = document.createElement('div'),
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

color.type = 'color'

summary.append(input)
detail.append(summary)
taskCtx.append(color, detailBtn, detail, trashBtn)
tasksCtx.append(addBtn)

addBtn.addEventListener('click', addTask)

function addTask() {
  tasksCtx.append(taskCtx.cloneNode(true))
}