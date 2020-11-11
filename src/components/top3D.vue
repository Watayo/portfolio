<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import * as THREE from "three";
import { computePos } from "@/assets/shaders/computePos.js";
import { computeVel } from "@/assets/shaders/computeVel.js";
import { computeVel2 } from "@/assets/shaders/computeVel2.js";
import { normalfrag } from "@/assets/shaders/normalfrag.js";
import { normalvert } from "@/assets/shaders/normalvert.js";

import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";

import Trails from "@/assets/myThreeLib/Trails.js";
export default {
  name: "Top3D",
  data() {
    const scene = new THREE.Scene();
    const renderer = null;
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const light = new THREE.DirectionalLight(0xffffff);

    let w = window.innerWidth;
    let h = window.innerHeight;

    let WIDTH = 256;
    let PARTICLES = WIDTH * WIDTH;

    let gpuCompute;
    let velocityVariable;
    let positionVariable;
    let positionUniforms;
    let velocityUniforms;
    let particleUniforms;
    let effectController;
    let particleGeo;
    return {
      scene,
      renderer,
      camera,
      light,
      w,
      h,
      WIDTH,
      PARTICLES,
      gpuCompute,
      velocityVariable,
      positionVariable,
      positionUniforms,
      velocityUniforms,
      particleUniforms,
      effectController,
      particleGeo
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
      this.camera.position.set(0, 0, 300);
    }

    // light
    {
      this.light.position.set(0, 0, 10);
      this.scene.add(this.light);
    }

    // obj
    {
      //this.scene.add(this.cube);
      // trail = new Trails(this.renderer, 200, 200);
      // this.scene.add(this.trail.obj);
    }

    // functiions
    this.initComputeRenderer();
    this.initPosition();
    this.animate();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    // gpuCompute用のレンダラーを作る
    initComputeRenderer() {
      this.gpuCompute = new GPUComputationRenderer(
        this.WIDTH,
        this.WIDTH,
        this.renderer
      );

      // particleの位置情報と、移動方向を保存するテクスチャ２つ用意する.
      let dtPosition = this.gpuCompute.createTexture();
      let dtVelocity = this.gpuCompute.createTexture();

      // create first setup for texture
      this.fillTextures(dtPosition, dtVelocity);

      // shaderProgramのアタッチ
      this.velocityVariable = this.gpuCompute.addVariable(
        "textureVelocity",
        computeVel,
        dtVelocity
      );
      this.positionVariable = this.gpuCompute.addVariable(
        "texturePosition",
        computePos,
        dtPosition
      );

      // 一連の関係性を構築するためのおまじない
      this.gpuCompute.setVariableDependencies(this.velocityVariable, [
        this.positionVariable,
        this.velocityVariable
      ]);
      this.gpuCompute.setVariableDependencies(this.positionVariable, [
        this.positionVariable,
        this.velocityVariable
      ]);

      var error = this.gpuCompute.init();
      if (error !== null) {
        console.error(error);
      }
    },
    initPosition() {
      this.particleGeo = new THREE.BufferGeometry();
      let positions = new Float32Array(this.PARTICLES * 3);
      let p = 0;
      for (let i = 0; i < this.PARTICLES; i++) {
        positions[p++] = 0;
        positions[p++] = 0;
        positions[p++] = 0;
      }

      // uv情報の決定。テクスチャから情報を取り出すときに必要
      let uvs = new Float32Array(this.PARTICLES * 2);
      p = 0;
      for (let j = 0; j < this.WIDTH; j++) {
        for (let i = 0; i < this.WIDTH; i++) {
          uvs[p++] = i / (this.WIDTH - 1);
          uvs[p++] = j / (this.WIDTH - 1);
        }
      }

      // attributeをgeometryに登録する
      this.particleGeo.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      this.particleGeo.addAttribute("uv", new THREE.BufferAttribute(uvs, 2));

      // uniform変数をオブジェクトで定義
      // 今回はカメラをマウスでいじれるように、計算に必要な情報もわたす。
      this.particleUniforms = {
        texturePosition: { value: null },
        textureVelocity: { value: null },
        cameraConstant: { value: this.getCameraConstant(this.camera) }
      };

      // Shaderマテリアル これはパーティクルそのものの描写に必要なシェーダー
      let material = new THREE.ShaderMaterial({
        uniforms: this.particleUniforms,
        vertexShader: normalvert,
        fragmentShader: normalfrag
      });

      material.extensions.drawBuffers = true;
      let particles = new THREE.Points(this.particleGeo, material);
      particles.matrixAutoUpdate = false;
      particles.updateMatrix();

      // パーティクルをシーンに追加
      this.scene.add(particles);
    },
    fillTextures(texturePosition, textureVelocity) {
      // textureのイメージデータを取り出す
      let posArray = texturePosition.image.data;
      let velArray = textureVelocity.image.data;

      for (let k = 0, kl = posArray.length; k < kl; k += 4) {
        // Position
        let x, y, z;
        x = Math.random() * 400 - 200;
        z = Math.random() * 400 - 200;
        y = 0;
        // posArrayの実態は一次元配列なので
        // x,y,z,wの順番に埋めていく。
        // wは今回は使用しないが、配列の順番などを埋めておくといろいろ使えて便利
        posArray[k + 0] = x;
        posArray[k + 1] = y;
        posArray[k + 2] = z;
        posArray[k + 3] = 0;

        // 移動する方向はとりあえずランダムに決めてみる。
        // これでランダムな方向にとぶパーティクルが出来上がるはず。
        velArray[k + 0] = Math.random() * 2 - 1;
        velArray[k + 1] = Math.random() * 2 - 1;
        velArray[k + 2] = Math.random() * 2 - 1;
        velArray[k + 3] = Math.random() * 2 - 1;
      }
    },
    getCameraConstant(camera) {
      return (
        window.innerHeight /
        (Math.tan(THREE.Math.DEG2RAD * 0.5 * camera.fov) / camera.zoom)
      );
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
      // this.trail.update();
    },
    onResize() {
      // rendererのサイズを調整
      this.w = window.innerWidth;
      this.h = window.innerHeight;

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    render() {
      this.gpuCompute.compute();
      // 計算した結果が格納されたテクスチャをレンダリング用のシェーダーに渡す
      this.particleUniforms.texturePosition.value = this.gpuCompute.getCurrentRenderTarget(
        this.positionVariable
      ).texture;
      this.particleUniforms.textureVelocity.value = this.gpuCompute.getCurrentRenderTarget(
        this.velocityVariable
      ).texture;
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
<style>
#canvas {
}
</style>
