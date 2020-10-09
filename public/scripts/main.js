new Vue({
  el: "#app",
  data: {
    form: {
      url: "",
      slug: "",
      res: "",
      copyMsg: "",
    },
  },
  methods: {
    submit: async function ({ target }) {
      try {
        let res = await fetch("/links", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ url: this.form.url, slug: this.form.slug }),
        }).then((res) => res.json());

        this.form.res = res.url;
        target["dis-short"].hidden = false;
      } catch (err) {
        console.error(err);
      }
    },

    copyNewLink(event) {
      event.target.select();
      document.execCommand("copy");
      this.form.copyMsg = "Copied to clipboard";
    },
  },

  computed: {
    hoverTitle() {
      return this.form.res ? "Click to copy" : "";
    },
  },
});
