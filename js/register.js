document.getElementById('formRegister').addEventListener('submit', function (event) {
  event.preventDefault();

  const fullName = document.getElementById('exampleInputUsername').value.trim();
  const email = document.getElementById('exampleInputEmail').value.trim();
  const password = document.getElementById('exampleInputPassword').value.trim();
  const confirmPassword = document.getElementById('exampleInputConfirmPassword').value.trim();

   if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    toastr.error('Full Name should contain only letters and spaces');
    return;
  }

   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toastr.error('Invalid email format');
    return;
  }

   if (password.length < 8) {
    toastr.error('Password should be at least 8 characters long');
    return;
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    toastr.error('Password should contain both letters and numbers');
    return;
  }

   if (password !== confirmPassword) {
    toastr.error('Passwords do not match');
    return;
  }

  const user = {
    email: email,
    password: password,
    name: fullName,
  };

  $.ajax({
    url: 'https://shop.cyberlearn.vn/api/Users/signup',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(user),
    success: function (response) {
      toastr.success('Registration successful');
      console.log(response);
      setTimeout(() => {
        window.location.href = 'index.html';  
      }, 2000);  
    },
    error: function (error) {
      const errorMessage = error.responseJSON?.message || 'Registration failed';
      toastr.error(errorMessage);
      console.error(error);
    }
  });
});