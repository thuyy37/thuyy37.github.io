addEventListener("load", () => {
   if (!isSessionValid()) {
      redirectLogin();
   }
});

document.getElementById('check-orders-btn').addEventListener('click', () => {
   checkOrders();
});
document.getElementById('orders').addEventListener('keydown', function (event) {
   if (event.key === 'Enter') {
      checkOrders();
      event.preventDefault();
   }
});
datetimeInput = document.getElementById('datetimeInput');

function isSessionValid() {
   return !!sessionStorage.getItem(sessionIdKey);
}

function redirectLogin() {
   window.location.href = 'login.html';
}

function parseInput() {
   const parsedRows = document.getElementById('orders').value.trim()
      .split('\n').map(row => row.split('\t'));
   const maxCols = Math.max(0, ...parsedRows.map(row => row.length));
   const columns = Array.from({ length: maxCols }, (_, i) =>
      parsedRows.map(row => row[i] ?? '')
   );
   return columns.flat().filter(x => x);
}

function checkOrders() {
   const orders = parseInput();
   if (!orders.length) {
      showError("Vui lòng nhập đơn hàng.");
      return;
   }
   const start = datetimeInput.getAttribute('start');
   const end = datetimeInput.getAttribute('end');
   showLoading();
   getDOs(orders, start, end).then(res => {
      console.log(res)
      const copyHolder = res?.result ? navigator.clipboard.writeText(res.result) : Promise.resolve();
      return copyHolder.then(() => Promise.resolve({
         failed: res.failed, 
         notFound: res.notFound
      }));
   })
   .then(res => {
      if (res.failed == 0 && res.notFound == 0) {
         showSuccess('Đã copy nội dung. Hãy dán nó vào sheet!');
      } else {
         const level = res.failed > 0 ? showError : showWarning;
         level(`${res.failed} mục thất bại, ${res.notFound} mục không tìm thấy.`);
      }
      stopLoading();
   })
   .catch(err => {
      showError(err.message);
      stopLoading();
      if (err.message == 'Session expired') {
         sessionStorage.removeItem(sessionIdKey);
         redirectLogin();
      }
   });
}

/*
Loading
*/
function showLoading() {
   loading = document.getElementById('loading');
   loading.classList.remove("hide");
}
function stopLoading() {
   loading = document.getElementById('loading');
   loading.classList.add("hide");
}

/*
Modal
*/
function openModal(id) {
   document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
   document.getElementById(id).style.display = "none";
}

function submitSessionIdModal() {
   const sessId = document.getElementById("sessionId").value.trim();
   if (!sessId) {
      showError("Vui lòng nhập vào");
      return;
   }
   sessionStorage.setItem(sessionIdKey, sessId);
   closeModal('sessionIdModal');
   showSuccess('Đã lưu session. 謝謝');
}

/*
Notification
*/
function showNotification(message, type) {
   const container = document.getElementById('notificationContainer');

   const notification = document.createElement('div');
   notification.classList.add('notification', type);
   notification.innerHTML = `
     <span>${message}</span>
     <button class="close-btn" onclick="closeNotification(this.parentElement)">x</button>
   `;

   container.appendChild(notification);

   setTimeout(() => {
     closeNotification(notification);
   }, 5000);
}

function showSuccess(message) {
   showNotification(message, 'success');
}

function showWarning(message) {
   showNotification(message, 'warning');
}

function showError(message) {
   showNotification(message, 'error');
}

function closeNotification(notificationElement) {
   notificationElement.style.opacity = '0';
   setTimeout(() => {
      notificationElement.remove();
   }, 300);
}


// Generate floating hearts
function createHeart() {
   const heart = document.createElement('div');
   heart.className = 'heart';
   heart.style.left = Math.random() * 100 + 'vw';
   heart.style.animationDuration = (3 + Math.random() * 3) + 's';
   document.body.appendChild(heart);

   setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 1000);


function getDate() {
  const dateInput = document.getElementById("datepicker").value;
  document.getElementById("output").textContent = `Selected date is: ${dateInput}`;
}


