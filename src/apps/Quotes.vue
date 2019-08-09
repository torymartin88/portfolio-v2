<template>
  <div class="quotes">
    <blockquote>
      <span class="quote">{{quote}}</span>
      <span class="author">{{author}}</span>
    </blockquote>
  </div>
</template>

<script>
import { db } from '@/db'
const quotes = db.collection('quotes')

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

    quotes.get().then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let data = doc.data();
        self.quote = data.quote;
        self.author = data.author;
    });
    }).catch(error => {
      console.log("Error getting document:", error);
    })

    // console.log(new Date(self.$store.state.quoteOfDay.date).getTime(), new Date().getTime())
    // get from cache if it's there and it's still today's quote
    // if (self.$store.state.quoteOfDay.quote && new Date(self.$store.state.quoteOfDay.date).getTime() === new Date().getTime()) {
      // self.quote = self.$store.state.quoteOfDay.quote;
      // self.author = self.$store.state.quoteOfDay.author;
      // self.image = self.$store.state.quoteOfDay.background;
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

blockquote {
  position: relative;

  .quote {
    font-size: 20px;
    font-family: 'Times'
  }

  .author {
    display: block;
    font-style: italic;
    margin-top: 8px;
  }

  &:before {
    content: '"';
    position: absolute;
    top: -7px;
    left: -35px;
    font-size: 51px;
    font-family: 'Arial';
  }
}
</style>
