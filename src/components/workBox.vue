<template>
  <div class="work-box">
    <a :href="item.link" target="_blank" rel="noopener noreferrer">
      <h3>{{ item.name }}</h3>
    </a>
    <div class="img-container">
      <img class="img-content" :src="item.photo" alt="" />
    </div>
    <p class="box-content">
      {{ item.content }}
    </p>
    <p class="sub-content">
      {{ item.subContent }}
    </p>
  </div>
</template>

<script>
export default {
  name: "workBox",
  props: {
    item: {
      type: Object,
      default: () => {}
      // propsにObjectを指定する際にはFactory関数を指定する必要がある
    }
  }
};
</script>

<style scoped>
.work-box {
  width: 320px;
  height: 300px;
  margin: 25px 40px;
  color: #5d627b;
  background: white;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}
h3 {
  margin: 10px;
}

.img-container {
  overflow: hidden;
  height: 60%;
  position: relative;
}

.img-content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 90%;
  height: auto;
}
.box-content {
  padding: 0;
  margin: 8px;
}
.sub-content {
  padding: 0;
  margin: 10px;
}
</style>
