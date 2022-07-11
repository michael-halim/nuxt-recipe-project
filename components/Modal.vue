<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Awesome Recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        @keypress.enter="handleSubmit"
      >
        <b-form-group
          label="Recipe"
          label-for="recipe-input"
          invalid-feedback="Recipe is required"
          :state="recipeState"
        >
          <b-form-input
            id="recipe-input"
            v-model="recipe"
            :state="recipeState"
            placeholder="your awesome name of recipe"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Ingredients"
          label-for="ingredients-input"
          invalid-feedback="Ingredients is required"
          :state="ingredientsState"
        >
          <b-form-input
            id="ingredients-input"
            v-model="ingredients"
            :state="ingredientsState"
            placeholder="ingredient, no space, and separated with commas"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: "",
      recipeState: null,
      submittedRecipes: [],
      ingredients: "",
      ingredientsState: null,
      submittedIngredients: [],
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.recipeState = valid;
      return valid;
    },
    resetModal() {
      this.recipe = "";
      this.recipeState = null;
      this.ingredients = "";
      this.ingredientsState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedRecipes.push(this.recipe);
      this.$emit("addRecipeHandler", this.recipe);

      const arr = this.ingredients.split(",");
      this.$emit("addIngredientsHandler", arr);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>