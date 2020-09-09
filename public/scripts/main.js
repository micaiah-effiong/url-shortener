new Vue({
  el: "#app",
  data: {
    form: {
      url: "",
      slug: "",
      res: "",
    },
  },
  methods: {
    submit: async function () {
      let res = await fetch("/link", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url: this.form.url, slug: this.form.slug }),
      }).then((res) => res.json());

      this.form.res = res.success ? res.data : "";
    },
  },

  computed: {
    hoverTitle() {
      return this.form.res ? "Click to copy" : "";
    },
  },
});
