
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


function redirect(page) {
   window.location.href = page;
}

function redirectLogin() {
   redirect('login.html');
}

function redirectHome() {
   redirect('index.html');
}
