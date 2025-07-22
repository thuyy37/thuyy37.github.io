
class DateTimePicker {
   constructor(inputElement) {
         this.elements = {
            input: inputElement,
            picker: document.getElementById('pickerDropdown'),
            calendar: document.getElementById('calendar'),
            monthYear: document.getElementById('monthYear'),
            rangeToggle: document.getElementById('rangeToggle'),
            singleTime: document.getElementById('singleTime'),
            rangeTimes: document.getElementById('rangeTimes'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            startHours: document.getElementById('startHours'),
            startMinutes: document.getElementById('startMinutes'),
            endHours: document.getElementById('endHours'),
            endMinutes: document.getElementById('endMinutes'),
            calendarView: document.getElementById('calendarView'),
            monthYearView: document.getElementById('monthYearView'),
            yearGrid: document.getElementById('yearGrid'),
            monthGrid: document.getElementById('monthGrid'),
            yearGridHeader: document.getElementById('yearGridHeader'),
            rangeToggle: document.getElementById('rangeToggle'),
         };

         this.state = {
            currentDate: new Date(),
            viewDate: new Date(),
            yearSelectorPage: new Date().getFullYear(),
            selectedDate: null,
            rangeStart: null,
            rangeEnd: null,
            isRangeMode: false,
            isOpen: false,
            isMonthYearView: false,
         };

         this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

         this.init();
   }

   init() {
      this.toggleRangeMode();
      this.bindEvents();
      this.updateTimeDisplay();
      this.updatePlaceholder();
      this.renderCalendar();
   }

   containsElementRecursive(parent, child) {
      if (parent.isSameNode && parent.isSameNode(child)) {
         return true;
      }
      for (let i = 0; i < parent.children.length; i++) {
         if (this.containsElementRecursive(parent.children[i], child)) {
               return true;
         }
      }
      return false;
   }



   bindEvents() {
         // Open/close picker
         this.elements.input.addEventListener('click', () => this.toggle());
         document.addEventListener('click', (e) => {
            if (!this.containsElementRecursive(this.elements.input.parentElement, e.target) &&
                  !this.containsElementRecursive(this.elements.rangeToggle, e.target)) {
               this.close();
            }
         }, true);
         
         // Manual input handling
         this.elements.input.addEventListener('input', () => this.elements.input.classList.remove('invalid'));
         this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.parseManualInput();
            if (e.key === 'Escape') this.close();
         });

         // Picker controls
         this.elements.rangeToggle.addEventListener('click', () => this.toggleRangeMode());
         document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
         document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
         document.getElementById('confirmBtn').addEventListener('click', () => this.confirm());
         document.getElementById('todayBtn').addEventListener('click', () => this.goToToday());
         document.getElementById('clearBtn').addEventListener('click', () => this.clearSelection());

         // Year/Month selector
         this.elements.monthYear.addEventListener('click', () => this.toggleMonthYearView());
         document.getElementById('prevYearPage').addEventListener('click', () => this.changeYearSelectorPage(-12));
         document.getElementById('nextYearPage').addEventListener('click', () => this.changeYearSelectorPage(12));

         // Time inputs validation
         Object.values(this.elements).filter(el => el.classList && el.classList.contains('time-input')).forEach(input => {
            input.addEventListener('input', () => this.validateTimeInput(input));
         });
         
         // Keyboard navigation
         this.elements.calendar.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
   }

   // --- State & UI Management ---

   toggle() {
         this.state.isOpen ? this.close() : this.open();
   }

   open() {
         this.elements.picker.classList.add('active');
         this.elements.input.classList.add('focus');
         this.state.isOpen = true;
         this.state.viewDate = this.state.selectedDate || this.state.rangeStart || new Date();
         this.render();
         
         // Focus on the selected day or today
         setTimeout(() => {
            const focusTarget = this.elements.calendar.querySelector('.selected, .range-start, .today') || this.elements.calendar.querySelector('.day-cell:not(.other-month)');
            if (focusTarget) focusTarget.focus();
         }, 100);
   }

   close() {
         this.elements.picker.classList.remove('active');
         this.elements.input.classList.remove('focus');
         this.state.isOpen = false;
         this.state.isMonthYearView = false; // Always close month/year view with picker
   }
   
   toggleRangeMode() {
         this.state.isRangeMode = !this.state.isRangeMode;
         this.elements.rangeToggle.classList.toggle('active', this.state.isRangeMode);
         this.updateTimeDisplay();
         this.clearSelection(false);
         this.updatePlaceholder();
         this.render();
   }

   toggleMonthYearView() {
         this.state.isMonthYearView = !this.state.isMonthYearView;
         this.state.yearSelectorPage = this.state.viewDate.getFullYear();
         this.render();
   }

   updateTimeDisplay() {
         this.elements.singleTime.style.display = this.state.isRangeMode ? 'none' : 'flex';
         this.elements.rangeTimes.classList.toggle('active', this.state.isRangeMode);
   }

   updatePlaceholder() {
         this.elements.input.placeholder = this.state.isRangeMode
            ? 'Chọn ngày bắt đầu và ngày kết thúc'
            : 'Chọn ngày';
   }
   
   clearSelection(render = true) {
         this.state.selectedDate = null;
         this.state.rangeStart = null;
         this.state.rangeEnd = null;
         this.elements.input.value = '';
         this.elements.input.classList.remove('invalid');
         if (render) this.render();
   }
   
   goToToday() {
         this.state.viewDate = new Date();
         if (this.state.isMonthYearView) {
            this.state.isMonthYearView = false;
         }
         this.render();
   }

   // --- Rendering ---

   render() {
         this.elements.calendarView.style.display = this.state.isMonthYearView ? 'none' : 'block';
         this.elements.monthYearView.style.display = this.state.isMonthYearView ? 'block' : 'none';

         if(this.state.isMonthYearView) {
            this.renderYearMonthSelector();
         } else {
            this.renderCalendar();
         }
   }
   
   renderCalendar() {
         this.elements.monthYear.textContent = `${this.monthNames[this.state.viewDate.getMonth()]} ${this.state.viewDate.getFullYear()}`;
         this.elements.calendar.innerHTML = '';
         
         this.dayNames.forEach(day => {
            this.elements.calendar.innerHTML += `<div class="day-header" role="columnheader">${day}</div>`;
         });

         const firstDay = new Date(this.state.viewDate.getFullYear(), this.state.viewDate.getMonth(), 1);
         const lastDay = new Date(this.state.viewDate.getFullYear(), this.state.viewDate.getMonth() + 1, 0);
         const daysInMonth = lastDay.getDate();
         const startDayIndex = firstDay.getDay();

         const today = new Date();
         let dayCells = '';

         for (let i = 0; i < startDayIndex; i++) {
            dayCells += `<div class="day-cell other-month"></div>`;
         }

         for (let day = 1; day <= daysInMonth; day++) {
            const cellDate = new Date(this.state.viewDate.getFullYear(), this.state.viewDate.getMonth(), day);
            const classes = ['day-cell'];
            let isSelected = false;

            if (this.isSameDay(cellDate, today)) classes.push('today');
            
            if (this.state.isRangeMode) {
               if (this.state.rangeStart && this.isSameDay(cellDate, this.state.rangeStart)) {
                     classes.push('range-start');
                     isSelected = true;
               }
               if (this.state.rangeEnd && this.isSameDay(cellDate, this.state.rangeEnd)) {
                     classes.push('range-end');
                     isSelected = true;
               }
               if (this.state.rangeStart && this.state.rangeEnd && cellDate > this.state.rangeStart && cellDate < this.state.rangeEnd) {
                     classes.push('in-range');
               }
            } else {
               if (this.state.selectedDate && this.isSameDay(cellDate, this.state.selectedDate)) {
                     classes.push('selected');
                     isSelected = true;
               }
            }

            dayCells += `<div class="${classes.join(' ')}" role="gridcell" data-date="${cellDate.toISOString()}" tabindex="${isSelected ? 0 : -1}">${day}</div>`;
         }
         
         this.elements.calendar.innerHTML += dayCells;
         
         this.elements.calendar.querySelectorAll('.day-cell:not(.other-month)').forEach(cell => {
            cell.addEventListener('click', (e) => this.selectDate(new Date(e.currentTarget.dataset.date)));
         });
   }
   
   renderYearMonthSelector() {
         // Year Grid
         this.elements.yearGridHeader.textContent = `${this.state.yearSelectorPage} - ${this.state.yearSelectorPage + 11}`;
         this.elements.yearGrid.innerHTML = '';
         for(let i=0; i<12; i++) {
            const year = this.state.yearSelectorPage + i;
            const classes = ['year-cell'];
            if(year === this.state.viewDate.getFullYear()) classes.push('selected');
            const cell = document.createElement('div');
            cell.className = classes.join(' ');
            cell.textContent = year;
            cell.addEventListener('click', () => {
               this.state.viewDate.setFullYear(year);
               this.render();
            });
            this.elements.yearGrid.appendChild(cell);
         }

         // Month Grid
         this.elements.monthGrid.innerHTML = '';
         this.monthNames.forEach((name, index) => {
            const classes = ['month-cell'];
            if (index === this.state.viewDate.getMonth()) classes.push('selected');
            const cell = document.createElement('div');
            cell.className = classes.join(' ');
            cell.textContent = name.substring(0,3);
            cell.addEventListener('click', () => {
               this.state.viewDate.setMonth(index);
               this.state.isMonthYearView = false;
               this.render();
            });
            this.elements.monthGrid.appendChild(cell);
         });
   }

   // --- Event Handlers & Logic ---

   selectDate(date) {
         if (this.state.isRangeMode) {
            if (!this.state.rangeStart || (this.state.rangeStart && this.state.rangeEnd)) {
               this.state.rangeStart = date;
               this.state.rangeEnd = null;
            } else {
               this.state.rangeEnd = date;
               if (this.state.rangeEnd < this.state.rangeStart) {
                     [this.state.rangeStart, this.state.rangeEnd] = [this.state.rangeEnd, this.state.rangeStart];
               }
            }
         } else {
            this.state.selectedDate = date;
         }
         this.render();
   }
   
   confirm() {
         if (this.state.isRangeMode) {
            if (!this.state.rangeStart || !this.state.rangeEnd) {
               alert('Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.');
               return;
            }
            this.state.rangeStart.setHours(parseInt(this.elements.startHours.value), parseInt(this.elements.startMinutes.value), 0, 0);
            this.state.rangeEnd.setHours(parseInt(this.elements.endHours.value), parseInt(this.elements.endMinutes.value), 0, 0);
            
            const formattedStart = this.formatDateTime(this.state.rangeStart);
            const formattedEnd = this.formatDateTime(this.state.rangeEnd);
            const rangeString = `${formattedStart} - ${formattedEnd}`;
            
            this.elements.input.value = rangeString;
            this.elements.input.setAttribute('start', this.state.rangeStart);
            this.elements.input.setAttribute('end', this.state.rangeEnd);
            const duration = this.calculateDuration(this.state.rangeStart, this.state.rangeEnd);
         } else {
            if (!this.state.selectedDate) {
               alert('Please select a date.');
               return;
            }
            this.state.selectedDate.setHours(parseInt(this.elements.hours.value), parseInt(this.elements.minutes.value), 0, 0);
            const formattedDate = this.formatDateTime(this.state.selectedDate);
            this.elements.input.value = formattedDate;
            this.elements.input.setAttribute('date', this.state.selectedDate);
         }
         this.elements.input.classList.remove('invalid');
         this.close();
   }

   parseManualInput() {
         const value = this.elements.input.value.trim();
         if (!value) {
            this.clearSelection();
            return;
         }
         
         try {
            if (this.state.isRangeMode) {
               const separators = [' to ', ' - '];
               const separator = separators.find(s => value.includes(s));
               if (!separator) throw new Error("Invalid range format");

               const parts = value.split(separator);
               const startDate = new Date(parts[0]);
               const endDate = new Date(parts[1]);

               if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) throw new Error("Invalid date in range");

               this.state.rangeStart = startDate;
               this.state.rangeEnd = endDate;
               this.state.selectedDate = null;
            } else {
               const date = new Date(value);
               if (isNaN(date.getTime())) throw new Error("Invalid date format");
               this.state.selectedDate = date;
               this.state.rangeStart = this.state.rangeEnd = null;
               this.elements.hours.value = date.getHours().toString().padStart(2, '0');
               this.elements.minutes.value = date.getMinutes().toString().padStart(2, '0');
            }
            this.confirm(); // If parsing is successful, confirm the selection
         } catch (error) {
            this.elements.input.classList.add('invalid');
            console.error("Parsing Error:", error.message);
         }
   }
   
   handleKeyboardNav(e) {
         const currentFocused = document.activeElement;
         if (!currentFocused || !currentFocused.classList.contains('day-cell')) return;

         const currentDate = new Date(currentFocused.dataset.date);
         let nextDate;

         switch (e.key) {
            case 'ArrowRight':
               nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
               break;
            case 'ArrowLeft':
               nextDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
               break;
            case 'ArrowUp':
               nextDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
               break;
            case 'ArrowDown':
               nextDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
               break;
            case 'Enter':
               e.preventDefault();
               this.selectDate(currentDate);
               return;
            default:
               return;
         }
         e.preventDefault();
         
         if (nextDate.getMonth() !== this.state.viewDate.getMonth()) {
            this.state.viewDate = new Date(nextDate);
            this.render();
         }

         setTimeout(() => {
            const nextCell = this.elements.calendar.querySelector(`[data-date="${nextDate.toISOString()}"]`);
            if (nextCell) {
               nextCell.focus();
            }
         }, 0);
   }

   changeMonth(offset) {
         this.state.viewDate.setMonth(this.state.viewDate.getMonth() + offset, 1);
         this.renderCalendar();
   }
   
   changeYearSelectorPage(offset) {
         this.state.yearSelectorPage += offset;
         this.renderYearMonthSelector();
   }

   // --- Helpers ---

   isSameDay(d1, d2) {
         return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
   }

   formatDateTime(date) {
         return date.toLocaleString('vi-VI', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
         });
   }
   
   validateTimeInput(input) {
         const max = parseInt(input.max, 10);
         const min = parseInt(input.min, 10);
         if (parseInt(input.value, 10) > max) input.value = max;
         if (parseInt(input.value, 10) < min) input.value = min;
         // Defer padding to blur event or confirmation to allow typing '1' before '12'
   }
   
   calculateDuration(start, end) {
         const diffMs = end - start;
         if(diffMs < 0) return 'Invalid range';
         const days = Math.floor(diffMs / 86400000);
         const hours = Math.floor((diffMs % 86400000) / 3600000);
         const minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
         
         let result = [];
         if(days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
         if(hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
         if(minutes > 0) result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
         return result.join(', ') || '0 minutes';
   }
}

document.addEventListener('DOMContentLoaded', () => {
   const pickerInput = document.getElementById('datetimeInput');
   new DateTimePicker(pickerInput);
});
