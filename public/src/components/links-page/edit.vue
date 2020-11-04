<template>
  <div
    class="absolute"
    style="width: 100% ;height: 100%; background-color: #f5f5f5;"
  >
    <div class="relative p-3">
      <router-link :to="'/links/' + $route.params.id">-Back</router-link>
      <div>
        <form autocomplete="off">
          <div>
            <label>Title</label>
            <input type="text" name="title" />
          </div>

          <div>
            <label>Destination</label>
            <input type="text" name="destination" />
          </div>
          <div>
            <label>Slug</label>
            <input type="text" name="slug" />
          </div>

          <div>
            <label>Description</label>
            <input type="text" name="description" />
          </div>

          <div>
            <button type="submit">Save</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
};
</script>
