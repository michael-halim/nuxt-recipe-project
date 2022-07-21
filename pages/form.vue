<template>
  <div class="container wrapper mt-5">
    <div class="m-4">
      <form @submit="onSubmit" @reset="onReset" class="mt-2">
        <div class="row">
          <!-- Label dan Input Makanan -->
          <div class="col-6">
            <label for="recipeName" class="form-label pt-4">Nama Makanan</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="recipeName"
                placeholder="Soto Banjar"
                v-model="form.recipeName"
              />
            </div>
          </div>

          <!-- Label dan Input Foto Resep -->
          <div class="col-4">
            <div class="input-group mb-3 pt-2 mt-5">
              <label class="input-group-text">Foto</label>
              <input
                type="file"
                class="form-control"
                ref="recipeImageFiles"
                @change="recipeImageHandler($event)"
              />
            </div>
          </div>
          <div class="col-2 mt-5">
            <img class="previewImage" :src="form.image.imgURL" alt="" />
          </div>
        </div>

        <!-- Label dan Deskripsi Makanan -->
        <label for="recipeDescription" class="form-label"
          >Deskripsi Makanan</label
        >
        <div class="input-group mb-3">
          <textarea
            type="text"
            class="form-control"
            id="recipeDescription"
            placeholder="Soto Bajar adalah makanan khas Banjar, duh"
            v-model="form.recipeDescription"
          />
        </div>

        <!-- Label dan Ukuran Harga Foto Makanan yang Dinamis -->
        <button
          type="button"
          class="btn btn-secondary"
          @click="addSizePriceForm"
        >
          Add Size
        </button>
        <SizePriceForm
          v-for="(formObject, index) in form.sizePriceForm"
          :key="index"
          :size="formObject"
          :formIndex="index"
          @sizePriceFormImageHandler="sizePriceFormImageHandler"
        />

        <!-- Label dan Ingredient Makanan -->
        <label for="recipeIngredient" class="form-label"
          >Ingredient Makanan</label
        >
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="recipeIngredient"
            placeholder="Ingredients Makanan Dipisahkan koma"
            v-model="form.ingredientList"
          />
        </div>

        <!-- Button Submit dan Reset -->
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="reset" class="btn btn-danger">Reset</button>
      </form>
      <div class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // Fetch a JSON data from backend
  async fetch() {
    // If request coming from edit button
    if (this.$route.params.foodID !== undefined) {
      const BASE_LINK = this.$store.getters.getBaseLink();

      // FETCHING Data from API
      const fetchData = await axios.get(
        `${BASE_LINK}/menurecipe/${this.$route.params.foodID}`
      );

      // GET recipeName, recipeDescription, recipeImage, and all sizes
      const fetchObject = fetchData.data.data;

      this.form.recipeName = fetchObject.name;
      this.form.recipeDescription = fetchObject.desc;
      this.form.ingredientList = fetchObject.ingredient;
      this.form.image.imgURL = fetchObject.imgFileName;
      this.form.recipeID = fetchObject.ID;

      // GET All Sizes and Prices from API
      const tempListSizePriceForm = [];
      for (const sizeObject of fetchObject.sizeList) {
        let tempSizePriceForm = {};
        tempSizePriceForm["dataSize"] = sizeObject.size.name;
        tempSizePriceForm["dataPrice"] = sizeObject.price;
        tempSizePriceForm["dataImage"] = {
          imgURL: sizeObject.imgFileName,
          imgFileName: null,
          pic: null,
        };
        tempSizePriceForm["menuID"] = sizeObject.ID;
        tempSizePriceForm["sizeID"] = sizeObject.sizeID;
        tempListSizePriceForm.push(tempSizePriceForm);
      }
      this.form.sizePriceForm = tempListSizePriceForm;

      // console.log(this.form.sizePriceForm);
    }
  },
  data() {
    return {
      form: {
        recipeName: null,
        recipeID: null,
        recipeDescription: null,
        image: {
          imgURL: null,
          imgFileName: null,
          pic: null,
        },
        ingredientList: "",
        sizePriceForm: [
          {
            menuID: null,
            sizeID: null,
            dataSize: null,
            dataPrice: null,
            dataImage: {
              imgURL: null,
              imgFileName: null,
              pic: null,
            },
          },
        ],
      },
      sizePriceCount: 1,
    };
  },
  methods: {
    async onSubmit(event) {
      // PREVENT Reload Default Browser
      event.preventDefault();

      // GET Base Link
      const BASE_LINK = this.$store.getters.getBaseLink();

      // IF Edit Go Here Else It's Created
      if (this.$route.params.foodID !== undefined) {
        for (const sizePriceObject of this.form.sizePriceForm) {
          await axios
            .put(`${BASE_LINK}/menu/${sizePriceObject.menuID}`, {
              recipeID: parseInt(this.form.recipeID),
              sizeID: parseInt(sizePriceObject.sizeID),
              price: sizePriceObject.dataPrice,
              imgFileName: sizePriceObject.dataImage.imgFileName,
              pic: sizePriceObject.dataImage.pic,
            })
            .then((res) => {
              console.log("RESPONSE UPDATE");
              console.log(res);
            })
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
        }

        await axios
            .put(`${BASE_LINK}/recipe/${this.form.recipeID}`, {
              name: this.form.recipeName,
              ingredient: this.form.ingredientList,
              desc: this.form.recipeDescription,
              imgFileName: this.form.image.imgFileName,
              pic: this.form.image.pic,
            })
            .then((res) => {
              console.log("RESPONSE UPDATE");
              console.log(res);
            })
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
      } else {
        // POST Request Size
        const sizeID = [];
        for (const sizePriceObject of this.form.sizePriceForm) {
          await axios
            .post(`${BASE_LINK}/size`, {
              name: sizePriceObject.dataSize,
            })
            .then((res) => {
              sizeID.push(res.data.data.ID);
            })
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
        }

        // POST Recipe
        let recipeID = null;
        await axios
          .post(`${BASE_LINK}/recipe`, {
            name: this.form.recipeName,
            ingredient: this.form.ingredientList,
            desc: this.form.recipeDescription,
            imgFileName: this.form.image.imgFileName,
            pic: this.form.image.pic,
          })
          .then((res) => {
            recipeID = res.data.data.ID;
          })
          .catch((error) => {
            console.log("ERROR");
            console.log(error);
          });

        // POST Menu
        for (let i = 0; i < this.form.sizePriceForm.length; i++) {
          await axios
            .post(`${BASE_LINK}/menu`, {
              recipeID: recipeID,
              sizeID: parseInt(sizeID[i]),
              price: parseInt(this.form.sizePriceForm[i].dataPrice),
              imgFileName: this.form.sizePriceForm[i].dataImage.imgFileName,
              pic: this.form.sizePriceForm[i].dataImage.pic,
            })
            .then((res) => {})
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
        }
      }
      console.log("FORM");
      console.log(this.form);

      const defaultForm = {
        recipeName: null,
        recipeID: null,
        recipeDescription: null,
        image: {
          imgURL: null,
          imgFileName: null,
          pic: null,
        },
        ingredientList: "",
        sizePriceForm: [
          {
            menuID: null,
            sizeID: null,
            dataSize: null,
            dataPrice: null,
            dataImage: {
              imgURL: null,
              imgFileName: null,
              pic: null,
            },
          },
        ],
      };
      // // RESET Form
      this.form = defaultForm;
      this.sizePriceCount = 1;
    },
    readRecord(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function (event) {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    },
    async recipeImageHandler(event) {
      let file = this.$refs.recipeImageFiles.files[0];

      // PREVIEW UPLOADED URL
      this.form.image.imgURL = URL.createObjectURL(file);

      // GET Base64 from Image File
      let base64 = await this.readRecord(file);

      // SET Image Name and Base 64
      this.form.image.imgFileName = file.name;
      this.form.image.pic = this.formatBase64(base64);
    },
    sizePriceFormImageHandler({ index, fileInfo, base64 }) {
      this.form.sizePriceForm[index].dataImage.imgFileName = fileInfo.name;
      this.form.sizePriceForm[index].dataImage.pic = this.formatBase64(base64);
    },
    onReset(event) {
      // PREVENT Default Browser Reload
      event.preventDefault();

      // Reset our form values
      this.form.recipeName = null;
      this.form.recipeID = null;
      this.form.recipeDescription = null;
      this.form.ingredientList = "";
      this.form.image = {
        imgURL: null,
        imgFileName: null,
        pic: null,
      };
      this.form.sizePriceForm = [
        {
          menuID: null,
          sizeID: null,
          dataSize: null,
          dataPrice: null,
          dataImage: {
            imgURL: null,
            imgFileName: null,
            pic: null,
          },
        },
      ];
      this.sizePriceCount = 1;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    formatBase64(str) {
      return str.replace(/^data:image\/[a-z]+;base64,/, "");
    },
    addSizePriceForm() {
      // ADD Dynamically Data, Price, and Image Form
      this.form.sizePriceForm.push({
        menuID: null,
        sizeID: null,
        dataSize: null,
        dataPrice: null,
        dataImage: {
          imgURL: null,
          imgFileName: null,
          pic: null,
        },
      });
    },
  },
};
</script>
<style scoped>
.previewImage {
  max-width: 100px;
}
.wrapper {
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>