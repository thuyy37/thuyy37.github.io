addEventListener("load", () => {
   if (!isSessionValid()) {
      redirectLogin();
   }
});

document.querySelectorAll('.card .orders').forEach(el => {
   el.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
         el.parentElement.querySelector('.submit-button').click();
         event.preventDefault();
      }
   });
});
datetimeInput = document.getElementById('datetimeInput');

function isSessionValid() {
   return !!sessionStorage.getItem(sessionIdKey);
}

function parseInput(inputElementPath) {
   const parsedRows = document.querySelector(inputElementPath).value.trim()
      .split('\n').map(row => row.split('\t'));
   const maxCols = Math.max(0, ...parsedRows.map(row => row.length));
   const columns = Array.from({ length: maxCols }, (_, i) =>
      parsedRows.map(row => row[i] ?? '')
   );
   return columns.flat().filter(x => x);
}

function checkOrders() {
   const orders = parseInput('#do-checker .orders');
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

function getOrderDetails() {
   const orders = parseInput('#self-collection-checker .orders');
   console.log('orders', orders)
   if (!orders.length) {
      showError("Vui lòng nhập đơn hàng.");
      return;
   }
   showLoading();
   getDOsDetails(orders).then(res => {
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

function getDate() {
  const dateInput = document.getElementById("datepicker").value;
  document.getElementById("output").textContent = `Selected date is: ${dateInput}`;
}


