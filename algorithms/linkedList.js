// ===== LINKED LIST =====
let llData = [];

function llRender(highlightIdx = -1, highlightType = 'new') {
  const wrap = document.getElementById('ll-visual');
  wrap.innerHTML = '';

  if (llData.length === 0) {
    wrap.innerHTML = '<div class="stack-empty-label">List is empty — insert a node!</div>';
    document.getElementById('ll-size').textContent = '0';
    document.getElementById('ll-head').textContent = '—';
    document.getElementById('ll-tail').textContent = '—';
    return;
  }

  llData.forEach((val, i) => {
    const wrap2 = document.createElement('div');
    wrap2.className = 'll-node-wrap';

    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'll-node';
    if (i === highlightIdx) {
      nodeDiv.classList.add(highlightType === 'new' ? 'new-node' : 'highlight');
    }

    const box = document.createElement('div');
    box.className = 'll-box';

    const dataDiv = document.createElement('div');
    dataDiv.className = 'll-data';
    dataDiv.textContent = val;

    const nextDiv = document.createElement('div');
    nextDiv.className = 'll-next';
    nextDiv.textContent = i < llData.length - 1 ? 'next' : 'null';

    box.appendChild(dataDiv);
    box.appendChild(nextDiv);

    const label = document.createElement('div');
    label.className = 'll-label';
    if (i === 0 && i === llData.length - 1) label.textContent = 'head/tail';
    else if (i === 0) label.textContent = 'head';
    else if (i === llData.length - 1) label.textContent = 'tail';

    nodeDiv.appendChild(box);
    nodeDiv.appendChild(label);
    wrap2.appendChild(nodeDiv);

    // arrow between nodes
    if (i < llData.length - 1) {
      const arrow = document.createElement('div');
      arrow.className = 'll-arrow';
      arrow.textContent = '→';
      wrap2.appendChild(arrow);
    } else {
      const nullEl = document.createElement('div');
      nullEl.className = 'll-null';
      nullEl.textContent = '→ null';
      wrap2.appendChild(nullEl);
    }

    wrap.appendChild(wrap2);
  });

  document.getElementById('ll-size').textContent = llData.length;
  document.getElementById('ll-head').textContent = llData[0];
  document.getElementById('ll-tail').textContent = llData[llData.length - 1];
}

function llInsertHead() {
  const input = document.getElementById('ll-input');
  const val = input.value.trim();
  if (!val) return;
  llData.unshift(val);
  input.value = '';
  llRender(0, 'new');
  document.getElementById('ll-info').textContent = `Inserted "${val}" at HEAD — new node points to old head`;
}

function llInsertTail() {
  const input = document.getElementById('ll-input');
  const val = input.value.trim();
  if (!val) return;
  llData.push(val);
  input.value = '';
  llRender(llData.length - 1, 'new');
  document.getElementById('ll-info').textContent = `Inserted "${val}" at TAIL — traversed to end, added new node`;
}

function llDeleteHead() {
  if (llData.length === 0) {
    document.getElementById('ll-info').textContent = 'List is empty — nothing to delete!';
    return;
  }
  const removed = llData[0];
  llData.shift();
  llRender();
  document.getElementById('ll-info').textContent = `Deleted head node "${removed}" — head now points to next node`;
}

function llDeleteTail() {
  if (llData.length === 0) {
    document.getElementById('ll-info').textContent = 'List is empty — nothing to delete!';
    return;
  }
  const removed = llData[llData.length - 1];
  llData.pop();
  llRender();
  document.getElementById('ll-info').textContent = `Deleted tail node "${removed}" — traversed to second-last, set next = null`;
}

function llClear() {
  llData = [];
  llRender();
  document.getElementById('ll-info').textContent = 'Linked list cleared';
}

document.addEventListener('DOMContentLoaded', () => {
  const li = document.getElementById('ll-input');
  if (li) li.addEventListener('keydown', e => { if (e.key === 'Enter') llInsertTail(); });
});
