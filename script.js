// script.js
// 📋 ملف JavaScript لإدارة قائمة المهام
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progressText');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = input.value.trim();
   if(list.children.length >= 15) {
    alert('You can only add up to 15 tasks at a time.');
    return;
  }
  if (task === '') return;

  // إنشاء عناصر المهمة
  const li = document.createElement('li');
  li.className = 'todo-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'delete-button';

  // ✅ عند الضغط على التشيك
  checkbox.addEventListener('change', function () {
  taskSpan.classList.toggle('done', checkbox.checked);
    updateProgress();
  });

  // ✅ عند الضغط على حذف
  deleteButton.addEventListener('click', function () {
    li.remove();
    updateProgress();
  });

  // ترتيب العناصر داخل المهمة
  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(deleteButton);

  // إضافة المهمة للقائمة
  list.appendChild(li);

  input.value = ''; // تنظيف حقل الإدخال
  updateProgress(); // تحديث البار
});

function updateProgress() {
  const items = document.querySelectorAll('.todo-item');
  const total = items.length;
  const completed = document.querySelectorAll('.todo-item input[type="checkbox"]:checked').length;

  if (total === 0) {
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    return;
  }

  const percentage = Math.round((completed / total) * 100);
  progressBar.style.width = percentage + '%';
  progressText.textContent = percentage + '% done';
  progressText.style.color = percentage === 100 ? '#D72188' : '#BBF892';
  progressBar.style.backgroundColor = percentage === 100 ? '#87f140ff' : '#D72188';


  function showLimitAlert(message = "تم الوصول للحد الأقصى من المهام.") {
  const alertBox = document.getElementById('limitAlert');
  const alertMessage = document.getElementById('alertMessage');
  const closeBtn = document.getElementById('closeAlert');

  alertMessage.textContent = message;
  alertBox.classList.remove('hidden');

  // إغلاق يدوي
  closeBtn.onclick = () => {
    alertBox.classList.add('hidden');
  };

  // إغلاق تلقائي بعد 4 ثواني
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 4000);
}
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('✅ Service Worker registered'))
    .catch(err => console.log('❌ Service Worker failed', err));
}