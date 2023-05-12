document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submitButton');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
  
      if (validateForm(name, email, subject, message)) {
        submitButton.disabled = true;
  
        try {
          await sendFormDataToWordPress(name.value, email.value, subject.value, message.value);
          alert('Your message has been sent successfully.');
        } catch (error) {
          alert('An error occurred while sending your message. Please try again later.');
        }
  
        submitButton.disabled = false;
        form.reset();
      }
    });
  
    function validateForm(name, email, subject, message) {
      let isValid = true;
  
      if (name.value.length < 5) {
        showError(name, 'Name must be at least 5 characters long');
        isValid = false;
      } else {
        removeError(name);
      }
  
      if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      } else {
        removeError(email);
      }
  
      if (subject.value.length < 15) {
        showError(subject, 'Subject must be at least 15 characters long');
        isValid = false;
      } else {
        removeError(subject);
      }
  
      if (message.value.length < 25) {
        showError(message, 'Message must be at least 25 characters long');
        isValid = false;
      } else {
        removeError(message);
      }
  
      return isValid;
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    function showError(input, message) {
      const errorMessage = input.nextElementSibling;
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  
    function removeError(input) {
      const errorMessage = input.nextElementSibling;
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';
    }
  
    async function sendFormDataToWordPress(name, email, subject, message) {
        const formId = '46';
        const formData = new FormData();
        formData.append('your-name', name);
        formData.append('your-email', email);
        formData.append('your-subject', subject);
        formData.append('your-message', message);
      
        const response = await fetch(`https://emilhalvorsen.no/wordpress-blog/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
          method: 'POST',
          body: formData,
        });
      
        const result = await response.json();
      
        if (result.status !== 'mail_sent') {
          throw new Error('Form submission was not successful');
        }
      }
      
  });
  