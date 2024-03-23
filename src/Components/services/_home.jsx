import axios from "axios";
export const homeServices = {
  getAllProducts,
  getAllCats,
  getProduct,
  getByCatName,
  getProductsByType,
  addReview,
  getProductReview,
  getSiteSettings,
  getProductsByMainCat,
  getProductsBySubCat,
  getProductsByType,
  
};


function getAllProducts() {
  return axios.get("http://localhost:8080/product/get-all");
}

function getProduct(nameEn) {
  return axios.post("http://localhost:8080/product/get-product", {
    nameEn: nameEn,
  });
}

function getAllCats() {
  return axios.get("http://localhost:8080/category/getAllCategories");
}

function getByCatName() {
  return axios.get("http://localhost:8080/product/getbycat");
}


function addReview(productID, userName, rating, reviewText, createdAt) {
  const token = localStorage.getItem("token");
  return axios({
    method: "POST",
    url: "http://localhost:8080/review/add",
    data: { productID, userName, rating, reviewText, createdAt },
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getProductReview(proID) {
  console.log("proId form Home Serves", proID);
  return axios.get(`http://localhost:8080/review/product-review/${proID}`);
}
function getSiteSettings() {
  return axios.get("http://localhost:8080/settings/get-settings");
}


// list page

function getProductsByMainCat(cat) {
  return axios.get(`http://localhost:8080/product/main/${cat}`);
}

function getProductsBySubCat(cat) {
  return axios.get(`http://localhost:8080/product/sub/${cat}`);
}

function getProductsByType(cat) {
  return axios.get(`http://localhost:8080/product/type/${cat}`);
}


