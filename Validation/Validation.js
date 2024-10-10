// kiểm tra dữ liệu rỗng, kiểm tra định dạng email,
// kiểm tra giới hạn ký tự, kiểm tra xem giá trị nhập vào có trong khoảng hay không,
// kiểm tra nhập vào chữ không cho phép

function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    // Thông báo lỗi
    theThongBao.innerHTML = "Vui lòng không được bỏ trống";
    return false;
  } else {
    // Xóa thông báo khi không còn lỗi
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkMinMaxValue(theThongBao, value, min, max) {
  let length = value.length;
  if (length < min || length > max) {
    theThongBao.innerHTML = `Vui lòng nhập từ ${min} đến ${max}`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value);
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng Email";
    return false;
  }
}

function checkPassWordValue(theThongBao, value) {
  let regexPassWord = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  let checkPassWord = regexPassWord.test(value);
  if (checkPassWord) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu có ít nhất 1 ký tự viết hoa và ký tự đặc biệt";
    return false;
  }
}
