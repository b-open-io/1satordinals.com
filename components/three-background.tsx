"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 600);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create rotating geometric structure
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.3,
    });
    const mesh = new THREE.LineSegments(wireframe, material);
    scene.add(mesh);

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xff8c00,
      transparent: true,
      opacity: 0.5,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;

      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 600;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 600);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-[600px] pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
