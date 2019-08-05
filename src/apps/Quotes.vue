<template>
  <div class="quotes">
    <blockquote>
      {{quote}}
      <br />
      {{author}}
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "Quotes",
  data() {
    return {
      quote: "",
      author: "",
      image: ""
    };
  },
  mounted() {
    const self = this;

    console.log(new Date(self.$store.state.quoteOfDay.date).getTime(), new Date().getTime())
    // get from cache if it's there and it's still today's quote
    // if (self.$store.state.quoteOfDay.quote && new Date(self.$store.state.quoteOfDay.date).getTime() === new Date().getTime()) {
      self.quote = self.$store.state.quoteOfDay.quote;
      self.author = self.$store.state.quoteOfDay.author;
      self.image = self.$store.state.quoteOfDay.background;
    // } else {
    //   self.$http.get(`https://quotes.rest/qod.json`).then(
    //     response => {
    //       console.log(response.body.contents);
    //       const quote = response.body.contents.quotes[0];
    //       self.quote = quote.quote;
    //       self.author = quote.author;
    //       self.image = quote.background;

    //       // tell store which window is active
    //       this.$store.dispatch("setQuoteOfDay", {
    //         quote: quote.quote,
    //         author: quote.author,
    //         image: quote.background,
    //         date: quote.date
    //       });
    //     },
    //     response => {
    //       console.error("could not get data", response);
    //     }
    //   );
    // }
  }
};
</script>

<style lang="stylus" scoped>
.quotes {
  padding: 10px;
}
</style>
