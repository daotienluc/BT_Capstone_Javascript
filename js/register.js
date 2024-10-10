document
  .getElementById("formRegister")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Lấy các phần tử input từ form
    let inputElements = [
      document.getElementById("exampleInputEmail"),
      document.getElementById("exampleInputUsername"),
      document.getElementById("exampleInputPassword"),
      document.getElementById("exampleInputConfirmPassword"),
    ];

    let isValid = true;

    inputElements.forEach((inputElement) => {
      let inputValue = inputElement.value;
      let errorSpan = inputElement.nextElementSibling;
      if (!checkEmptyValue(errorSpan, inputValue)) {
        isValid = false;
      } else {
        let dataValue = inputElement.getAttribute("data-validation");
        console.log(dataValue);
        if (dataValue === "email" && !checkEmailValue(errorSpan, inputValue)) {
          isValid = false;
        } else if (
          (dataValue === "minMax" &&
            !checkPassWordValue(errorSpan, inputValue)) ||
          (dataValue === "minMax" &&
            !checkMinMaxValue(errorSpan, inputValue, 6, 10))
        ) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      const user = {
        email: document.getElementById("exampleInputEmail").value,
        password: document.getElementById("exampleInputPassword").value,
        name: document.getElementById("exampleInputUsername").value,
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

        toastr.success("Đăng ký tài khoản thành công !");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Đang có lỗi xảy ra, vui lòng thử lại";
        toastr.error(errorMessage);
        console.error(error);
      }
    }
  });
