// ===== TAB SWITCHING =====
function showTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');

  const btns = document.querySelectorAll('.nav-btn');
  const map = { bubble: 0, binary: 1, stack: 2, linked: 3 };
  btns[map[name]].classList.add('active');
}

// ===== INIT on page load =====
window.addEventListener('DOMContentLoaded', () => {
  // Bubble sort
  bubbleSteps = buildBubbleSteps(bubbleArr);
  bubbleRender();

  // Binary search default view
  binaryStart();

  // Stack & Queue default render
  stackRender();
  queueRender();

  // Linked List — add some default nodes
  llData = ['10', '25', '37', '42'];
  llRender();
});
