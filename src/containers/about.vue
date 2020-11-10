<template>
  <section id="about" class="about-wrapper">
    <pageSection title="About" />
    <div class="box-wrapper">
      <table>
        <tbody>
          <tr v-for="(content, index) in contents" :key="index">
            <th>{{ content.key }}</th>
            <td v-if="content.url">
              <a :href="content.url">
                {{ content.value }}
              </a>
            </td>
            <td v-else>
              {{ content.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="myphoto-wrapper">
      <img class="profile-photo" src="@/assets/img/myphoto.jpg" alt="" />
    </div>
  </section>
</template>

<script>
import PageSection from "@/components/pageSection";

export default {
  name: "About",
  components: {
    PageSection
  },

  data() {
    return {
      contents: [
        { key: "Name", value: "渡辺 亮 (Watanabe Ryo)", url: "" },
        { key: "BirthPlace", value: "静岡県 伊豆の国市" },
        {
          key: "University",
          value: "大阪府立大学 工学域 電子物理工学課程",
          url: ""
        },
        {
          key: "GitHub",
          value: "Watayo",
          url: "https://github.com/Watayo"
        },
        {
          key: "Facebook",
          value: "わたなべりょう",
          url: "https://www.facebook.com/profile.php?id=100034536423329"
        },
        {
          key: "Twitter",
          value: "@watayo",
          url: "https://twitter.com/"
        },
        { key: "Mail", value: "ryo0616mani@gmail.com", url: "" }
      ]
    };
  }
};
</script>

<style scoped>
.profile-photo {
  width: 30%;
  height: auto;
}
</style>
