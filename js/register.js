document
  .getElementById("formRegister")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document
      .getElementById("exampleInputUsername")
      .value.trim();
    const email = document.getElementById("exampleInputEmail").value.trim();
    const password = document
      .getElementById("exampleInputPassword")
      .value.trim();
    const confirmPassword = document
      .getElementById("exampleInputConfirmPassword")
      .value.trim();

    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      toastr.error("Tên đầy đủ chỉ được chứa các chữ cái và dấu cách");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toastr.error("Định dạng Email không hợp lệ");
      return;
    }

    if (password.length < 8) {
      toastr.error("Mật khẩu phải ít nhất 8 ký tự");
      return;
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      toastr.error("Mật khẩu phải có cả chữ và số");
      return;
    }

    if (password !== confirmPassword) {
      toastr.error("Mật khẩu không khớp");
      return;
    }

    const user = {
      email: email,
      password: password,
      name: fullName,
    };

    $.ajax({
      url: "https://shop.cyberlearn.vn/api/Users/signup",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(user),
      success: function (response) {
        toastr.success("Registration successful");
        console.log(response);
        // setTimeout(() => {
        //   window.location.href = "index.html";
        // }, 2000);
      },
      error: function (error) {
        const errorMessage =
          error.responseJSON?.message || "Đăng ký không thành công";
        toastr.error(errorMessage);
        console.error(error);
      },
    });
  });
