const url = 'https://vue3-course-api.hexschool.io';
const api_path = 'wei123';

import pagination from "./pagination.js";
import modal from "./modal.js";
import delProductModal from "./delProductModal.js";

const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      allProducts: [],
      isNew: false, 
      tempProduct: {
        imageUrl: [],
        imagesUrl: [],
      },
      pages: {},
    };
  },

  methods: {
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.pModal.openModal();
      }

      else if (status === 'edit') {
        this.tempProduct = { ...product };
        this.new = false;
        this.$refs.pModal.openModal();
      }

      else if (status === 'delete') {
        this.tempProduct = { ...product };
        this.$refs.dModal.openDelProductModal();
      }
    },

    getProducts(pages = 1) {
      axios.get(`${url}/v2/api/${api_path}/admin/products?page=${pages}`)
        .then(res => {
          this.allProducts = res.data.products;
          this.pages = res.data.pagination
        })

        .catch(err => {
          console.log(err);
        });
    },

    delProduct() {
      axios.delete(`${url}/v2/api/${api_path}/admin/product/${this.tempProduct.id}`)
        .then(res => {
          this.$refs.dModal.closeDelProductModal()
          this.getProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },

    updateProduct() {
      if (this.isNew == true) {
        axios.post(`${url}/v2/api/${api_path}/admin/product`, { data: this.tempProduct })
          .then(res => {
            this.$refs.pModal.closeModal();
            alert("新增產品成功");
            this.isNew = false;
            this.tempProduct = {};
            this.getProducts();

          })
          .catch(err => {
            alert(err.data.message);
          });
      }
      else if (this.isNew == false) {
        axios.put(`${url}/v2/api/${api_path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
          .then(res => {
            this.$refs.pModal.closeModal();
            alert("編輯產品成功");
            this.getProducts();
            this.tempProduct = {};
          })
          .catch(err => {
            alert(err.data.message);
          });
      };
    },

    addImg() {
      this.imagesUrl;
    },

    checkAdmin() {
      const link = `${url}/v2/api/user/check`;
      axios
        .post(link)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          console.dir(err)
          alert(err.response.data.message);
          window.location = 'index.html';
        });
    },

  },

  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },

  components: {
    pagination,
    modal,
    delProductModal,
  },
})


app.mount('#app');