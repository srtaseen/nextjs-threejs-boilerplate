import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { DivContainer, DivSpinner } from "./ScreenPage";

const MainModel = () => {
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  const [_camera, setCamera] = useState();
  const [scene] = useState(new THREE.Scene());
  const [_controls, setControls] = useState();

  const refContainer = useRef();

  useEffect(() => {
    const { current: container } = refContainer;

    if (container && !renderer) {
      //Object
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      //Lights
      const directioanlLight = new THREE.DirectionalLight(0xffffff, 1);
      directioanlLight.position.set(1, 1, 0);
      directioanlLight.castShadow = true;
      scene.add(directioanlLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      //sizes
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      //camera
      const camera = new THREE.PerspectiveCamera(
        35,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 6;
      scene.add(camera);

      //Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      //Resize
      window.addEventListener("resize", () => {
        //update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        //update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        //update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
      //Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;

      //Animate
      const clock = new THREE.Clock();
      let previousTime = 0;

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        //animate meshes

        cube.rotation.x += deltaTime * 0.1;
        cube.rotation.y += deltaTime * 0.12;

        //render
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <DivContainer ref={refContainer}>{loading && <DivSpinner />}</DivContainer>
  );
};

export default MainModel;
