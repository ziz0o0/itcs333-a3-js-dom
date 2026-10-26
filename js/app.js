(function () {
  let form = document.getElementById('todo-form');
  let input = document.getElementById('todo-input');
  let list = document.getElementById('todo-list');
  let errorMsg = document.getElementById('error-msg');
  let counter = document.getElementById('counter');
  let filterAll = document.getElementById('filter-all');
  let filterActive = document.getElementById('filter-active');
  let filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    let done = list.querySelectorAll('.completed').length;
    let left = list.children.length - done;
    counter.textContent = left + ' item(s) left';
  }

  function applyFilter() {
    for (let li of list.children) {
      let done = li.className == 'completed';
      if (currentFilter === 'all') {
        li.style.display = '';
      } else if (currentFilter === 'active') {
        if (done) {
          li.style.display = 'none';
        } else {
          li.style.display = '';
        }
      } else {
        if (done) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    }
  }

  function refresh() {
    applyFilter();
    updateCounter();
  }

  function addItem(e) {
    e.preventDefault();
    let text = input.value.trim();
    if (text == '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');

    let li = document.createElement('li');
    let span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;
    let del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = 'Delete';
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);

    input.value = '';
    refresh();
  }

  function handleKey(e) {
    if (e.key === 'Enter') {
      addItem(e);
    }
  }

  function handleListClick(e) {
    let t = e.target;
    if (t.className == 'delete-btn') {
      list.removeChild(t.parentNode);
    } else if (t.className == 'todo-text') {
      t.parentNode.classList.toggle('completed');
    } else if (t.parentNode == list) {
      t.classList.toggle('completed');
    }
    refresh();
  }

  function showAll() {
    currentFilter = 'all';
    refresh();
  }

  function showActive() {
    currentFilter = 'active';
    refresh();
  }

  function showDone() {
    currentFilter = 'done';
    refresh();
  }

  form.addEventListener('submit', addItem);
  input.addEventListener('keydown', handleKey);
  list.addEventListener('click', handleListClick);
  filterAll.addEventListener('click', showAll);
  filterActive.addEventListener('click', showActive);
  filterDone.addEventListener('click', showDone);

  errorMsg.classList.add('hidden');
  refresh();
})();