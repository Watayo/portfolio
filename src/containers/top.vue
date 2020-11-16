<template>
  <div id="top">
    <top3D></top3D>
  </div>
</template>

<script>
import Top3D from "@/components/top3D";

export default {
  name: "Top",
  components: {
    Top3D
  }
};
</script>

<style scoped>
#top {
  width: 100vw;
  height: 94vh;
  overflow: hidden;
}
</style>
