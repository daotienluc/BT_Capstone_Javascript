document
  .getElementById("formRegister")
  .addEventListener("submit", async function (event) {
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

    // Validate fullName: Không được rỗng và chỉ chứa chữ cái và khoảng trắng
    if (!fullName || !/^[a-zA-Z\s]+$/.test(fullName)) {
      toastr.error("Tên không được để trống và chỉ chứa chữ cái");
      return;
    }

    // Validate email: Không được rỗng và phải đúng định dạng email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toastr.error("Email không được để trống và phải đúng định dạng");
      return;
    }

    // Validate password: Không được rỗng, ít nhất 8 ký tự, có cả chữ cái và số
    if (!password || password.length < 8) {
      toastr.error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toastr.error("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa");
      return;
    }

    if (!/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      toastr.error("Mật khẩu phải chứa cả chữ cái viết thường và số");
      return;
    }

    // Validate confirmPassword: Phải trùng với password
    if (password !== confirmPassword) {
      toastr.error("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    // Tạo object user
    const user = {
      email: email,
      password: password,
      name: fullName,
    };

    try {
    
      const response = await axios.post(
        "https://shop.cyberlearn.vn/api/Users/signup",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toastr.success("Registration successful");
      console.log(response.data);

       
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } catch (error) {
   
      const errorMessage =
        error.response?.data?.message || "Đang có lỗi xảy ra, vui lòng thử lại";
      toastr.error(errorMessage);
      console.error(error);
    }
  });
