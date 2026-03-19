// ===== STACK =====
let stackData = [];

function stackRender(highlightIdx = -1, removing = false) {
  const wrap = document.getElementById('stack-visual');
  wrap.innerHTML = '';

  if (stackData.length === 0) {
    wrap.innerHTML = '<div class="stack-empty-label">Stack is empty</div>';
  } else {
    // render bottom to top — since flex-direction is column-reverse, first appended = bottom
    stackData.forEach((val, i) => {
      const node = document.createElement('div');
      node.className = 'stack-node';
      const isTop = i === stackData.length - 1;
      if (isTop && highlightIdx !== -1) node.classList.add('highlight');
      if (isTop && removing) node.classList.add('remove');
      node.textContent = isTop ? `${val}  ← top` : val;
      wrap.appendChild(node);
    });
  }

  document.getElementById('stack-size').textContent = stackData.length;
  document.getElementById('stack-top').textContent = stackData.length > 0 ? stackData[stackData.length - 1] : '—';
}

function stackPush() {
  const input = document.getElementById('stack-input');
  const val = input.value.trim();
  if (!val) return;
  stackData.push(val);
  input.value = '';
  stackRender(stackData.length - 1);
  document.getElementById('stack-info').textContent = `Pushed "${val}" onto the stack (top)`;
}

function stackPop() {
  if (stackData.length === 0) {
    document.getElementById('stack-info').textContent = 'Stack is empty — nothing to pop!';
    return;
  }
  const popped = stackData[stackData.length - 1];
  stackRender(-1, true);
  document.getElementById('stack-info').textContent = `Popped "${popped}" from top of stack`;
  setTimeout(() => {
    stackData.pop();
    stackRender();
  }, 220);
}

function stackClear() {
  stackData = [];
  stackRender();
  document.getElementById('stack-info').textContent = 'Stack cleared';
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
  const si = document.getElementById('stack-input');
  if (si) si.addEventListener('keydown', e => { if (e.key === 'Enter') stackPush(); });
});


// ===== QUEUE =====
let queueData = [];

function queueRender(highlightIdx = -1) {
  const wrap = document.getElementById('queue-visual');
  wrap.innerHTML = '';

  if (queueData.length === 0) {
    wrap.innerHTML = '<div class="stack-empty-label">Queue is empty</div>';
  } else {
    queueData.forEach((val, i) => {
      const node = document.createElement('div');
      node.className = 'queue-node';
      const isFront = i === 0;
      const isRear = i === queueData.length - 1;
      if (isFront) node.classList.add('front-node');
      if (i === highlightIdx) node.classList.add('highlight');

      let label = val;
      if (isFront && isRear) label = `${val} ← front/rear`;
      else if (isFront) label = `${val} ← front`;
      else if (isRear) label = `${val} ← rear`;
      node.textContent = label;

      wrap.appendChild(node);
    });
  }

  document.getElementById('queue-size').textContent = queueData.length;
  document.getElementById('queue-front').textContent = queueData.length > 0 ? queueData[0] : '—';
  document.getElementById('queue-rear').textContent = queueData.length > 0 ? queueData[queueData.length - 1] : '—';
}

function queueEnqueue() {
  const input = document.getElementById('queue-input');
  const val = input.value.trim();
  if (!val) return;
  queueData.push(val);
  input.value = '';
  queueRender(queueData.length - 1);
  document.getElementById('queue-info').textContent = `Enqueued "${val}" at rear of queue`;
}

function queueDequeue() {
  if (queueData.length === 0) {
    document.getElementById('queue-info').textContent = 'Queue is empty — nothing to dequeue!';
    return;
  }
  const removed = queueData[0];
  document.getElementById('queue-info').textContent = `Dequeued "${removed}" from front of queue`;
  queueData.shift();
  queueRender();
}

function queueClear() {
  queueData = [];
  queueRender();
  document.getElementById('queue-info').textContent = 'Queue cleared';
}

document.addEventListener('DOMContentLoaded', () => {
  const qi = document.getElementById('queue-input');
  if (qi) qi.addEventListener('keydown', e => { if (e.key === 'Enter') queueEnqueue(); });
});
