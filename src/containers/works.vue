<template>
  <section id="works" class="works-wrapper">
    <pageSection title="Works" />
    <div class="works-container">
      <workBox v-for="work in works" :key="work.name" :item="work" />
    </div>
  </section>
</template>

<script>
import PageSection from "@/components/pageSection";
import workBox from "@/components/workBox";

export default {
  name: "Works",
  components: {
    PageSection,
    workBox
  },

  data() {
    return {
      works: [
        {
          name: "Portfolio",
          content: "Vue.jsを勉強して作りました. ",
          photo: "./static/worksImg/portfolio.png",
          subContent: "Vue.js, HTML, CSS",
          link: ""
        },
        {
          name: "Enoslee",
          content: "2020JPHacksで作成しました.",
          photo: "./static/worksImg/enoslee.png",
          subContent: "Expo(ReactNative), Node.js, firebase",
          link: "https://github.com/jphacks/D_2013"
        },
        {
          name: "SakuraSaku",
          content: "2020SPAJAMで作成しました.",
          photo: "./static/worksImg/sakurasaku.png",
          subContent: "Three.js, Node.js, firebase",
          link: "https://github.com/Watayo/samples_for_2020spajam"
        },
        {
          name: "Neon Lotus",
          content: "蓮の花を表現しました.",
          photo: "./static/worksImg/neonLotus.png",
          subContent: "p5.js",
          link: ""
        },
        {
          name: "ToQ",
          content: "slack上で匿名質問し共有するものです.",
          photo: "./static/worksImg/toq.png",
          subContent: "Ruby, HTML, CSS",
          link: "https://tranquil-eyrie-07947.herokuapp.com/"
        },
        {
          name: "Plan&Check",
          content: "タスク管理を見直すサービス.",
          photo: "./static/worksImg/plan&check.png",
          subContent: "Ruby, HTML, CSS",
          link: "https://boiling-garden-62154.herokuapp.com/"
        },
        {
          name: "first VJ",
          content: "人生初VJでした.",
          photo: "./static/worksImg/firstVJ.png",
          subContent: "TouchDesigner",
          link: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.works-wrapper {
  margin-bottom: 40px;
}

.works-container {
  margin: auto;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
