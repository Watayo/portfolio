<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as THREE from "three";
import Trails from "@/myThreeLib/Trails";

export default {
  name: "Top3D",
  data() {
    const scene = new THREE.Scene();
    const renderer = null;
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    const light = new THREE.DirectionalLight(0xffffff);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    // const trail = new Trails(renderer, 100, 50);
    let w = window.innerWidth;
    let h = window.innerHeight;
    return {
      scene,
      renderer,
      camera,
      light,
      geometry,
      material,
      cube,
      // trail,
      w,
      h
    };
  },
  mounted() {
    const $canvas = document.getElementById("canvas");

    // renderer setting
    {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: $canvas
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // camera setting
    {
      this.camera.position.set(0, 0, 2);
    }

    // light
    {
      this.light.position.set(0, 0, 10);
      this.scene.add(this.light);
    }

    // obj
    {
      this.scene.add(this.cube);
      // trails
      // this.scene.add(this.trail.obj);
    }

    // functiions
    this.animate();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);

      this.cube.rotation.x += 0.02;
      this.cube.rotation.y += 0.02;
      // this.trail.update();
      this.renderer.render(this.scene, this.camera);
    },
    onResize() {
      // rendererのサイズを調整
      this.w = window.innerWidth;
      this.h = window.innerHeight;

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
};
</script>
<style>
#canvas {
}
</style>
