<template>
  <section id="about" class="about-wrapper">
    <pageSection title="About" />
    <div class="box-wrapper">
      <div class="index-wrapper">
        <table>
          <tbody>
            <tr v-for="(content, index) in contents" :key="index">
              <th>{{ content.key }}</th>
              <td v-if="content.url">
                <a
                  :href="content.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
          key: "Instagram",
          value: "watayo_1111",
          url: "https://www.instagram.com/watayo_1111/"
        },
        { key: "Mail", value: "ryo0616mani@gmail.com", url: "" }
      ]
    };
  }
};
</script>

<style scoped>
.about-wrapper {
  margin-bottom: 40px;
}

.box-wrapper {
  display: flex;
  justify-content: center;
}

.index-wrapper {
  width: 600px;
  padding: 0 10px;
}

.index-wrapper table {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  border-spacing: 0;
}

.index-wrapper tr {
  border-bottom: solid 1px #eee;
}

.index-wrapper table th,
table td {
  text-align: center;
  width: 15%;
  padding: 14px 0;
}

.index-wrapper table th,
table td a {
  text-decoration: none;
}

.myphoto-wrapper {
  width: 300px;
  padding: 0 10px;
}

.profile-photo {
  width: 290px;
  height: auto;
}
</style>
