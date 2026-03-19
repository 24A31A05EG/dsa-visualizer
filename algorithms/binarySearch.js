// ===== BINARY SEARCH =====
const binaryArr = [3, 8, 12, 17, 22, 27, 35, 41, 49, 56, 63, 70];
let binarySteps = [];
let binaryCur = 0;

function buildBinarySteps(arr, target) {
  const steps = [];
  let left = 0, right = arr.length - 1;

  steps.push({
    arr, target, left, right, mid: -1,
    eliminated: [],
    state: 'active',
    info: `Searching for ${target} in sorted array. Left=0, Right=${right}`
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const eliminated = [];
    for (let i = 0; i < left; i++) eliminated.push(i);
    for (let i = right + 1; i < arr.length; i++) eliminated.push(i);

    if (arr[mid] === target) {
      steps.push({ arr, target, left, right, mid, eliminated, state: 'found', info: `Found ${target} at index ${mid}!` });
      break;
    } else if (arr[mid] < target) {
      steps.push({
        arr, target, left, right, mid, eliminated, state: 'active',
        info: `arr[${mid}]=${arr[mid]} < ${target}, search RIGHT half. New Left=${mid + 1}`
      });
      left = mid + 1;
    } else {
      steps.push({
        arr, target, left, right, mid, eliminated, state: 'active',
        info: `arr[${mid}]=${arr[mid]} > ${target}, search LEFT half. New Right=${mid - 1}`
      });
      right = mid - 1;
    }
  }

  if (left > right) {
    const eliminated = Array.from({ length: arr.length }, (_, i) => i);
    steps.push({
      arr, target, left: -1, right: -1, mid: -1,
      eliminated, state: 'notfound',
      info: `${target} not found in the array`
    });
  }

  return steps;
}

function binaryRender() {
  const s = binarySteps[binaryCur];
  const boxWrap = document.getElementById('binary-boxes');
  const ptrWrap = document.getElementById('binary-pointers');
  boxWrap.innerHTML = '';
  ptrWrap.innerHTML = '';

  s.arr.forEach((val, i) => {
    const box = document.createElement('div');
    box.className = 'bin-box';
    const idx = document.createElement('div');
    idx.className = 'bin-idx';
    idx.textContent = `[${i}]`;
    const valEl = document.createElement('div');
    valEl.textContent = val;
    box.appendChild(idx);
    box.appendChild(valEl);

    if (s.state === 'found' && i === s.mid) box.classList.add('found');
    else if (s.state === 'notfound') box.classList.add('notfound');
    else if (i === s.mid) box.classList.add('mid');
    else if (s.eliminated.includes(i)) box.classList.add('eliminated');
    else box.classList.add('active');

    boxWrap.appendChild(box);
  });

  // pointer labels
  s.arr.forEach((_, i) => {
    const ptr = document.createElement('div');
    ptr.className = 'ptr-label';
    const labels = [];
    if (i === s.left) labels.push('L');
    if (i === s.mid && s.mid !== -1) labels.push('M');
    if (i === s.right) labels.push('R');
    if (labels.length) {
      ptr.textContent = labels.join('/');
      if (labels.includes('M')) ptr.classList.add('ptr-mid');
      else if (labels.includes('L')) ptr.classList.add('ptr-left');
      else ptr.classList.add('ptr-right');
    }
    ptrWrap.appendChild(ptr);
  });

  document.getElementById('binary-steps-count').textContent = binaryCur;
  document.getElementById('binary-left').textContent = s.left >= 0 ? s.left : '—';
  document.getElementById('binary-mid').textContent = s.mid >= 0 ? s.mid : '—';
  document.getElementById('binary-right').textContent = s.right >= 0 ? s.right : '—';
  document.getElementById('binary-info').textContent = s.info;
}

function binaryStart() {
  const target = parseInt(document.getElementById('binary-target').value);
  if (isNaN(target)) return;
  binarySteps = buildBinarySteps(binaryArr, target);
  binaryCur = 0;
  binaryRender();
}

function binaryStepFwd() {
  if (binarySteps.length === 0) { binaryStart(); return; }
  if (binaryCur < binarySteps.length - 1) {
    binaryCur++;
    binaryRender();
  }
}

function binaryReset() {
  binarySteps = [];
  binaryCur = 0;
  document.getElementById('binary-boxes').innerHTML = '';
  document.getElementById('binary-pointers').innerHTML = '';
  document.getElementById('binary-info').textContent = 'Enter a number and press Search';
  document.getElementById('binary-steps-count').textContent = '0';
  document.getElementById('binary-left').textContent = '—';
  document.getElementById('binary-mid').textContent = '—';
  document.getElementById('binary-right').textContent = '—';
}

// init display
binaryStart();
