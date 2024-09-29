function handleGetData() {
  let promise = axios.get("https://shop.cyberlearn.vn/api/Product");
  promise
    .then((res) => {
      let data = res.data.content;
      let content = "";
      {
        data.map((item, index) => {
          content += `
            <div class="col-3 mb-4">
              <div class="top_product_item">
                <div class="top_product_img bg-body-tertiary">
                <a href="./../Detail.html?id=${item.id}">
                  <img src="${item.image}" alt="" />
                </a>
                </div>
                <div class="top_product_body">
                <a href="./../Detail.html?id=${item.id}">
                  <h3>
                    ${item.name}
                  </h3>
                </a>
                  <p class="fw-bold">$ ${item.price}</p>
                  <div class="d-flex justify-content-around mb-3">
                    <button class="navbar_button_2">Add To Cart</button>
                    <button class="navbar_button_1">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        });
      }
      document.getElementById("dataContent").innerHTML = content;
    })
    .catch((err) => {
      console.log(err);
    });
}

handleGetData();

function handleGetAllCategory() {
  let promise = axios.get(
    "https://shop.cyberlearn.vn/api/Product/getAllCategory"
  );
  promise
    .then((res) => {
      let data = res.data.content;
      console.log(data);
      let content = "";
      {
        data.map((item) => {
          content += `
                        <li>
                            <a class="dropdown-item py-2" href="./../categoryId.html?categoryId=${item.id}">${item.category}</a>
                        </li>
                    `;
        });
      }
      document.getElementById("dataAllCategory").innerHTML = content;
    })
    .catch((err) => {
      console.log(err);
    });
}

handleGetAllCategory();
