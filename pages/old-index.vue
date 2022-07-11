<template>
  <div class="container">
    <div class="wrapper">
      <div class="circle"></div>
      <div class="header-title">{{ recipeList[selectedRecipeIndex] }}</div>
      <div class="circle"></div>
    </div>
    <div class="row recipe-ingredients-wrapper">
      <div class="col-4 creambg recipe-wrapper">
        <b-button variant="primary"
          ><NuxtLink to="/form" class="add-new-btn">Add New</NuxtLink></b-button
        >

        <div class="row">
          <div class="col-12 sub-title">Recipes</div>
        </div>
        <ul>
          <RecipeIngredient
            :dataInput="recipeList"
            @changeIndex="changeSelectedIndex($event)"
          />
        </ul>
      </div>

      <div class="col-1"></div>
      <div class="col-7 creambg ingredients-wrapper">
        <b-button
          class="mt-3 bg-danger"
          @click="deleteRecipe(selectedRecipeIndex)"
          >Delete</b-button
        >
        <div class="row">
          <div class="col-12 sub-title">Ingredients</div>
        </div>
        <ol id="ingredients-list">
          <RecipeIngredient
            :dataInput="ingredientsList[selectedRecipeIndex]"
            @changeIndex="changeSelectedIndex($event)"
          />
        </ol>
      </div>
    </div>
    <!-- <Modal
      @addRecipeHandler="addRecipe($event)"
      @addIngredientsHandler="addIngredients($event)"
    /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedRecipeIndex: 0,
      recipeList: ["Sandwich Egg", "Boiled Water", "Powerpuff Girls"],
      ingredientsList: [
        ["Egg", "Bread", "Mayonaise"],
        ["Water", "Firebender"],
        ["Sugar", "Spice", "Everything Nice", "Chemical X"],
      ],
    };
  },
  methods: {
    changeSelectedIndex(index) {
      this.selectedRecipeIndex = index;
    },
    addRecipe(recipe) {
      this.recipeList.push(recipe);
    },
    addIngredients(ingredients) {
      this.ingredientsList.push(ingredients);
    },
    deleteRecipe(idx) {
      // filter the old recipe and ingredients list
      const newRecipeList = this.recipeList.filter((value, index, arr) => {
        return index !== idx;
      });
      const newIngredientList = this.ingredientsList.filter(
        (value, index, arr) => {
          return index !== idx;
        }
      );

      // copy the filtered array back to the old variable
      this.recipeList = [...newRecipeList];
      this.ingredientsList = [...newIngredientList];
      this.selectedRecipeIndex = 0;
    },
  },
  name: "IndexPage",
};
</script>

<style scoped>
.add-new-btn {
  color: white;
}
.header-title {
  background-color: inherit;
  color: white;
  font-size: xx-large;
}

.circle {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: rgb(214, 186, 72);
}

.wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3d3d3d;
  padding: 10px;
  border-radius: 16px;
}

.title {
  border-radius: 16px;
}

.creambg {
  background-color: rgb(227, 227, 193);
  overflow: scroll;
  height: 400px;
  box-shadow: 6px 6px 8px 0px rgba(0, 0, 0, 0.75);
}

.sub-title {
  text-align: center;
  font-size: x-large;
  color: rgb(96, 96, 96);
}

.recipe-ingredients-wrapper {
  position: relative;
}

.recipe-wrapper {
  position: absolute;
  left: 40px;
}

.ingredients-wrapper {
  position: absolute;
  right: 30px;
}

[v-cloak] {
  display: none;
}
</style>

