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
      window.innerWidth / 600,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, 600);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xff7120, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff7120, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Primary central shape - large icosahedron (focal point)
    const geometry1 = new THREE.IcosahedronGeometry(12, 1);
    const wireframe1 = new THREE.WireframeGeometry(geometry1);
    const material1 = new THREE.LineBasicMaterial({
      color: 0xff7120,
      transparent: true,
      opacity: 0.15,
    });
    const mesh1 = new THREE.LineSegments(wireframe1, material1);
    mesh1.position.set(0, 0, -5); // Centered, slightly back
    scene.add(mesh1);

    // Secondary shape - nested smaller icosahedron for depth
    const geometry2 = new THREE.IcosahedronGeometry(6, 0);
    const wireframe2 = new THREE.WireframeGeometry(geometry2);
    const material2 = new THREE.LineBasicMaterial({
      color: 0xff7120,
      transparent: true,
      opacity: 0.3,
    });
    const mesh2 = new THREE.LineSegments(wireframe2, material2);
    mesh2.position.set(0, 0, 0); // Centered, front layer
    scene.add(mesh2);

    // Accent shape - torus ring around composition
    const geometry3 = new THREE.TorusGeometry(18, 0.5, 16, 64);
    const wireframe3 = new THREE.WireframeGeometry(geometry3);
    const material3 = new THREE.LineBasicMaterial({
      color: 0xff7120,
      transparent: true,
      opacity: 0.1,
    });
    const mesh3 = new THREE.LineSegments(wireframe3, material3);
    mesh3.position.set(0, 0, -10); // Behind, creates boundary
    mesh3.rotation.x = Math.PI / 3; // Angled for perspective
    scene.add(mesh3);

    // Particle field for depth
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;     // x
      positions[i + 1] = (Math.random() - 0.5) * 40; // y
      positions[i + 2] = (Math.random() - 0.5) * 40; // z
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xff7120,
      size: 0.1,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation - cohesive unified rotation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // All shapes rotate in same direction for cohesion
      // Primary shape - slowest rotation (focal point stability)
      mesh1.rotation.y += 0.002;
      mesh1.rotation.x += 0.001;

      // Secondary shape - medium speed (creates depth parallax)
      mesh2.rotation.y += 0.004;
      mesh2.rotation.x += 0.002;

      // Torus ring - slow elegant rotation
      mesh3.rotation.z += 0.001;

      // Subtle particle drift
      particles.rotation.y += 0.0003;

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
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
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
