// Lấy id từ query string của URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const productId = getProductIdFromUrl();

// Sử dụng id để gọi API
function handleGetData() {
  let promise = axios.get(
    `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`
  );
  promise
    .then((res) => {
      let product = res.data.content;

      let category = product.categories.map(
        (categorie) => `<span>${categorie.category}</span>`
      );

      let sizeOptions = product.size.map(
        (size) => `<option value="${size}">${size}</option>`
      );

      let dataRelatedProducts = product.relatedProducts.map(
        (item) =>
          `
            <div class="col-3">
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
                <p class="fw-bold">$${item.price}</p>
                  <div class="d-flex justify-content-around mb-3">
                    <button class="navbar_button_2">Add To Cart</button>
                    <button class="navbar_button_1">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
        `
      );
      document.getElementById("renderDataRelatedProducts").innerHTML =
        dataRelatedProducts;
      let content = "";
      content += `
          <div class="row">
              <div class="col-4">
                <div class="detail_left p-3 bg-body-tertiary rounded-4">
                  <div class="detail_img">
                    <img src="${product.image}" alt="" />
                  </div>
                </div>
              </div>
              <div class="col-8">
                <div class="detail_right px-3 pb-3">
                  <h2>
                  ${product.shortDescription}
                  </h2>
                  <p>Brand: ${category}</p>
                  <div class="d-flex justify-content-between col-6">
                    <p>Condition: <span>New</span></p>
                    <p>Quantity: <span>${product.quantity}</span></p>
                  </div>
                  <div class="d-flex justify-content-between col-6">
                    <p>Category: ${category}</p>
                    <p>
                      Size:
                      <select name="" id="">
                          ${sizeOptions}
                      </select>
                     </p>
                  </div>
                  <p class="fw-bold text-black">$${product.price}</p>
                  <div class="col-4">
                    <button class="navbar_button_1 w-100">Pay Now</button>
                  </div>
                </div>
      
                <div class="detail_description px-3">
                  <h2 class="py-3 fw-bold">Description</h2>
                  <p>
                    ${product.description}
                  </p>
                </div>
              </div>
            </div>
        `;
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
