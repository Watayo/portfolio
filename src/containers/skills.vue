<template>
  <section id="skills" class="skills-wrapper">
    <pageSection title="Skills" />
    <div class="skill-wrapper">
      <ul>
        <li v-for="skill in skills" :key="skill.content">
          {{ skill.content }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import PageSection from "@/components/pageSection";

export default {
  name: "Skills",
  components: {
    PageSection
  },
  data() {
    return {
      skills: [
        { content: "C++ : openFrameworks" },
        { content: "Shader : GLSL ( a little... )" },
        { content: "javaScript : Node.js, Three.js, Vue.js" },
        { content: "Ruby : sinatra, Ruby on Rails" },
        { content: "HTML & CSS" }
      ]
    };
  }
};
</script>

<style scoped>
.about-wrapper {
  margin-bottom: 40px;
}
.skill-wrapper {
  margin: auto;
  width: 400px;
}
</style>
