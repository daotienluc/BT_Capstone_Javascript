document
  .getElementById("formRegister")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("exampleInputUsername").value;
    const email = document.getElementById("exampleInputEmail").value;
    const password = document.getElementById("exampleInputPassword").value;
    const confirmPassword = document.getElementById(
      "exampleInputConfirmPassword"
    ).value;

    if (password !== confirmPassword) {
      toastr.error("Passwords do not match");
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
      },
      error: function (error) {
        const errorMessage =
          error.responseJSON?.message || "Registration failed";
        toastr.error(errorMessage);
        console.error(error);
      },
    });
  });
