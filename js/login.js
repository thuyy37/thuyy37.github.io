
// Rate limiting class
class RateLimiter {
   constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
         this.maxAttempts = maxAttempts;
         this.windowMs = windowMs;
         this.attempts = {};
   }
   
   canAttempt(identifier) {
         const now = Date.now();
         const userAttempts = this.attempts[identifier] || [];
         
         const recentAttempts = userAttempts.filter(
            attempt => now - attempt < this.windowMs
         );
         
         this.attempts[identifier] = recentAttempts;
         return recentAttempts.length < this.maxAttempts;
   }
   
   recordAttempt(identifier) {
         if (!this.attempts[identifier]) {
            this.attempts[identifier] = [];
         }
         this.attempts[identifier].push(Date.now());
   }
}

const rateLimiter = new RateLimiter();

function validateUsername(username) {
   const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
   return usernameRegex.test(username);
}

function sanitizeInput(input) {
   return input.trim().replace(/[<>]/g, '');
}

function getClientIdentifier() {
   return btoa(navigator.userAgent + navigator.language);
}

function showMessage(message, level=0) {
   const existingMessage = document.querySelector('.message');
   if (existingMessage) {
         existingMessage.remove();
   }

   const messageDiv = document.createElement('div');
   messageDiv.className = 'message';
   const colors = {
         0: {
            background: '#e3f2fd',
            color: '#1565c0',
            border: '1px solid #bbdefb'
         },
         1: {
            background: '#fee',
            color: '#c33',
            border: '1px solid #fcc'
         }
   };
   messageDiv.style.cssText = `
         background: ${colors[level].background};
         color: ${colors[level].color};
         padding: 10px;
         border-radius: 8px;
         margin-bottom: 20px;
         border: 1px solid ${colors[level].border};
         font-size: 14px;
         animation: fadeInUp 0.3s ease;
   `;
   messageDiv.textContent = message;
   
   const form = document.querySelector('#login-container');
   form.insertBefore(messageDiv, document.querySelector('.input-group'));
}

function showInfo(message) {
   const existingMessage = document.querySelector('.message');
   if (existingMessage) {
         existingMessage.remove();
   }

   const messageDiv = document.createElement('div');
   messageDiv.className = 'message';
   messageDiv.style.cssText = `
         background: #fee;
         color: #c33;
         padding: 10px;
         border-radius: 8px;
         margin-bottom: 20px;
         border: 1px solid #fcc;
         font-size: 14px;
         animation: fadeInUp 0.3s ease;
   `;
   messageDiv.textContent = message;
   
   const form = document.querySelector('#login-container');
   form.insertBefore(messageDiv, document.querySelector('.input-group'));
}

async function handleLogin() {
   const userInput = document.querySelector('input#username');
   const passwordInput = document.querySelector('input#password');
   let username = userInput.value;
   let password = passwordInput.value;
   
   try {
         // Rate limiting check
         const clientId = getClientIdentifier();
         if (!rateLimiter.canAttempt(clientId)) {
            throw new Error('Too many login attempts. Please try again in 15 minutes.');
         }

         // Input validation
         if (!username || !password) {
            throw new Error('Please fill in all fields');
         }

         if (!validateUsername(username)) {
            throw new Error('Please enter a valid user name');
         }

         // Sanitize inputs
         username = sanitizeInput(username);

         // Record attempt
         rateLimiter.recordAttempt(clientId);

         // Add loading state
         const button = document.querySelector('.login-button');
         const originalText = button.textContent;
         button.textContent = 'Signing In...';
         button.style.opacity = '0.7';
         button.disabled = true;

         // Clear any existing error messages
         const existingMessage = document.querySelector('.message');
         if (existingMessage) {
            existingMessage.remove();
         }

         // Simulate secure API call
         const response = await login({ user: username, pw: password });
         console.log('1111111111', response);

         // Clear password from memory immediately
         password = null;
         passwordInput.value = '';

         if (!response.success) {
            throw new Error('Invalid credentials');
         }

         sessionStorage.setItem(sessionIdKey, response.data.sessionId);
         
         // Reset button
         button.textContent = originalText;
         button.style.opacity = '1';
         button.disabled = false;

         // redirect
         redirectHome()

   } catch (error) {
         // Clear password from memory on error
         password = null;
         passwordInput.value = '';
         
         // Reset button
         const button = document.querySelector('.login-button');
         button.textContent = 'Sign In';
         button.style.opacity = '1';
         button.disabled = false;
         
         // Show error message
         showMessage(error.message, 1);
   }
}

function handleForgotPassword() {
   showMessage('Nothing here. Chill!');
}

function handleSignup() {
   showMessage('Nothing here. Chill!');
}

// Add floating label animation
document.querySelectorAll('.input-field').forEach(input => {
   input.addEventListener('blur', function() {
         if (this.value === '') {
            this.classList.remove('has-value');
         } else {
            this.classList.add('has-value');
         }
   });
});


function handleSetSession() {
   openModal('sessionIdModal');
   document.getElementById('sessionId').addEventListener('keydown', function (event) {
      console.log('444444')
      if (event.key === 'Enter') {
         submitSessionIdModal();
         event.preventDefault();
      }
   });
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
   redirectHome()
}
