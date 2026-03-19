// ===== BUBBLE SORT =====
let bubbleArr = [38, 27, 43, 15, 9, 31, 52, 20];
let bubbleSteps = [];
let bubbleCur = 0;
let bubblePlaying = false;

function buildBubbleSteps(a) {
  const steps = [];
  const arr = [...a];
  const n = arr.length;
  const sorted = new Set();

  steps.push({ arr: [...arr], comparing: [], swapping: [], sorted: [...sorted], info: 'Starting bubble sort...' });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        arr: [...arr], comparing: [j, j + 1], swapping: [], sorted: [...sorted],
        info: `Comparing arr[${j}]=${arr[j]} and arr[${j+1}]=${arr[j+1]}`
      });
      if (arr[j] > arr[j + 1]) {
        steps.push({
          arr: [...arr], comparing: [], swapping: [j, j + 1], sorted: [...sorted],
          info: `${arr[j]} > ${arr[j+1]}, swapping!`
        });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          arr: [...arr], comparing: [], swapping: [], sorted: [...sorted],
          info: `Swapped! Now arr[${j}]=${arr[j]}, arr[${j+1}]=${arr[j+1]}`
        });
      } else {
        steps.push({
          arr: [...arr], comparing: [], swapping: [], sorted: [...sorted],
          info: `${arr[j]} <= ${arr[j+1]}, no swap needed`
        });
      }
    }
    sorted.add(n - 1 - i);
    steps.push({
      arr: [...arr], comparing: [], swapping: [], sorted: [...sorted],
      info: `Pass ${i + 1} done — index ${n - 1 - i} (value ${arr[n - 1 - i]}) is in correct position`
    });
  }
  sorted.add(0);
  steps.push({ arr: [...arr], comparing: [], swapping: [], sorted: [...sorted], info: 'Array fully sorted!' });
  return steps;
}

function bubbleRender() {
  const s = bubbleSteps[bubbleCur];
  const maxVal = Math.max(...s.arr);
  const wrap = document.getElementById('bubble-bars');
  wrap.innerHTML = '';

  let comps = 0, swaps = 0;
  for (let i = 0; i <= bubbleCur; i++) {
    if (bubbleSteps[i].comparing.length === 2) comps++;
    if (bubbleSteps[i].swapping.length === 2) swaps++;
  }

  s.arr.forEach((val, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const h = Math.round((val / maxVal) * 180) + 20;
    bar.style.height = h + 'px';
    bar.textContent = val;

    if (s.sorted.includes(i)) bar.classList.add('sorted');
    else if (s.swapping.includes(i)) bar.classList.add('swapping');
    else if (s.comparing.includes(i)) bar.classList.add('comparing');
    else bar.classList.add('default');

    wrap.appendChild(bar);
  });

  document.getElementById('bubble-comps').textContent = comps;
  document.getElementById('bubble-swaps').textContent = swaps;
  document.getElementById('bubble-step').textContent = `${bubbleCur} / ${bubbleSteps.length - 1}`;
  document.getElementById('bubble-info').textContent = s.info;
}

function bubbleStepFwd() {
  if (bubbleCur < bubbleSteps.length - 1) {
    bubbleCur++;
    bubbleRender();
  } else {
    bubblePlaying = false;
    document.getElementById('bubble-play').textContent = '▶ Play';
  }
}

function bubbleTogglePlay() {
  bubblePlaying = !bubblePlaying;
  document.getElementById('bubble-play').textContent = bubblePlaying ? '⏸ Pause' : '▶ Play';
  if (bubblePlaying) bubbleTick();
}

function bubbleTick() {
  if (!bubblePlaying) return;
  bubbleStepFwd();
  if (bubbleCur < bubbleSteps.length - 1) {
    const spd = parseInt(document.getElementById('bubble-speed').value);
    setTimeout(bubbleTick, Math.round(1300 / spd));
  } else {
    bubblePlaying = false;
    document.getElementById('bubble-play').textContent = '▶ Play';
  }
}

function bubbleReset() {
  bubblePlaying = false;
  document.getElementById('bubble-play').textContent = '▶ Play';
  bubbleCur = 0;
  bubbleSteps = buildBubbleSteps(bubbleArr);
  bubbleRender();
}

function bubbleRandomize() {
  bubblePlaying = false;
  document.getElementById('bubble-play').textContent = '▶ Play';
  bubbleArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 60) + 5);
  bubbleCur = 0;
  bubbleSteps = buildBubbleSteps(bubbleArr);
  bubbleRender();
}

// init
bubbleSteps = buildBubbleSteps(bubbleArr);
