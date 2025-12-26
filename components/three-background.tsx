"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const height = Math.min(window.innerHeight * 0.7, 800); // 70vh max
    const camera = new THREE.PerspectiveCamera(
      50, // Tighter FOV for less distortion
      window.innerWidth / height,
      0.1,
      1000
    );
    // Low-angle camera - looking slightly up at model for imposing feel
    camera.position.set(0, -8, 25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xff7120, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff7120, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Single large prominent model - Bitcoin/Data Node inspired
    // Main structure - large dodecahedron (represents blockchain node)
    const mainGeometry = new THREE.DodecahedronGeometry(18, 0);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xff7120,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const mainWireframe = new THREE.WireframeGeometry(mainGeometry);
    const mainMesh = new THREE.LineSegments(mainWireframe, wireframeMaterial);
    mainMesh.position.set(0, 0, 0);
    scene.add(mainMesh);

    // Inner core - glowing icosahedron (represents satoshi/data)
    const coreGeometry = new THREE.IcosahedronGeometry(8, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xff7120,
      emissive: 0xff7120,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.position.set(0, 0, 0);
    scene.add(coreMesh);

    // Orbital rings - represent transaction flow
    const ring1Geometry = new THREE.TorusGeometry(22, 0.3, 16, 100);
    const ring1Material = new THREE.LineBasicMaterial({
      color: 0xff7120,
      transparent: true,
      opacity: 0.3,
    });
    const ring1Wireframe = new THREE.WireframeGeometry(ring1Geometry);
    const ring1 = new THREE.LineSegments(ring1Wireframe, ring1Material);
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(22, 0.3, 16, 100);
    const ring2Material = new THREE.LineBasicMaterial({
      color: 0xff7120,
      transparent: true,
      opacity: 0.3,
    });
    const ring2Wireframe = new THREE.WireframeGeometry(ring2Geometry);
    const ring2 = new THREE.LineSegments(ring2Wireframe, ring2Material);
    ring2.rotation.y = Math.PI / 2.5;
    scene.add(ring2);

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

    // Animation - slow, commanding rotation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Main node - slow, stable rotation (focal point)
      mainMesh.rotation.y += 0.002;
      mainMesh.rotation.x += 0.001;

      // Inner core - slightly faster for depth effect
      coreMesh.rotation.y += 0.004;
      coreMesh.rotation.x += 0.002;

      // Orbital rings - represent data flow
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      // Subtle particle drift
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newHeight = Math.min(window.innerHeight * 0.7, 800);
      camera.aspect = window.innerWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, newHeight);
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
      className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center"
      style={{ zIndex: 1 }}
    />
  );
}
