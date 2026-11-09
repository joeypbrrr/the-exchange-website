"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  CanvasTexture,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildDiorama } from "@/lib/build-diorama";

type Props = {
  scrollRoot: RefObject<HTMLElement | null>;
};

function screenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const wash = ctx.createLinearGradient(0, 0, 512, 1024);
  wash.addColorStop(0, "#2a1860");
  wash.addColorStop(0.55, "#140e28");
  wash.addColorStop(1, "#14244c");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, 512, 1024);
  ctx.fillStyle = "rgba(124, 77, 255, 0.28)";
  ctx.beginPath();
  ctx.ellipse(210, 340, 170, 260, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(60, 120, 255, 0.22)";
  ctx.beginPath();
  ctx.ellipse(320, 720, 150, 220, 0.3, 0, Math.PI * 2);
  ctx.fill();
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function DioramaCanvas({ scrollRoot }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const rootEl = scrollRoot.current;
    if (!mount || !rootEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      mount.dataset.state = "reduced";
      return;
    }

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      mount.dataset.state = "fallback";
      return;
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const cap = mobile ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 40);
    const { root, triangles } = buildDiorama();
    scene.add(root);
    mount.dataset.triangles = String(triangles);

    const texture = screenTexture();
    if (texture) {
      root.traverse((obj) => {
        const mesh = obj as Mesh;
        if (mesh.name !== "phone-screen") return;
        const mat = mesh.material as MeshStandardMaterial;
        mat.map = texture;
        mat.color = new Color("#ffffff");
        mat.emissive = new Color("#000000");
        mat.emissiveIntensity = 0;
        mat.needsUpdate = true;
      });
    }

    const pmrem = new PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.add(new AmbientLight(0xfff6ea, 0.38));
    const key = new DirectionalLight(0xfff4e5, 2.35);
    key.position.set(2.4, 4.6, 3.6);
    scene.add(key);
    const fill = new DirectionalLight(0xd5def2, 0.55);
    fill.position.set(-3.2, 1.8, 2.2);
    scene.add(fill);
    const purple = new PointLight(0x7a45e8, 8, 4.5, 2);
    purple.position.set(-1.3, 0.8, 1.1);
    const blue = new PointLight(0x3c78ff, 7, 4.2, 2);
    blue.position.set(1.4, 0.45, 1.2);
    scene.add(purple, blue);

    const box = new Box3().setFromObject(root);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const distance = Math.max(size.x, size.y, size.z) * 1.95;
    camera.position.set(center.x + 0.05, center.y + size.y * 0.12, center.z + distance);
    camera.lookAt(center);
    camera.aspect = mount.clientWidth / Math.max(1, mount.clientHeight);
    camera.updateProjectionMatrix();

    let targetYaw = -0.2;
    let targetPitch = 0;
    let yaw = -0.2;
    let pitch = 0;
    let visible = true;
    let stopped = false;
    let frames = 0;
    let slow = 0;
    let raf = 0;

    const render = () => {
      yaw += (targetYaw - yaw) * 0.08;
      pitch += (targetPitch - pitch) * 0.08;
      root.rotation.y = yaw;
      root.rotation.x = pitch;
      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      if (stopped || !visible) return;
      const start = now;
      raf = requestAnimationFrame(loop);
      render();
      const cost = performance.now() - start;
      frames += 1;
      if (cost > 140) slow += 1;
      if (frames === 30 && slow > 18) {
        stopped = true;
        cancelAnimationFrame(raf);
        renderer.domElement.remove();
        mount.dataset.state = "fallback";
      }
    };

    const onScroll = () => {
      const rect = rootEl.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      targetYaw = -0.35 + progress * 0.75;
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = mount.getBoundingClientRect();
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetPitch = ny * -0.06;
    };

    const onLeave = () => {
      targetPitch = 0;
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (!visible || reduced) render();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !stopped) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(mount);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", onPointer);
    mount.addEventListener("pointerleave", onLeave);
    onScroll();
    resize();
    mount.dataset.state = "ready";
    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", onPointer);
      mount.removeEventListener("pointerleave", onLeave);
      texture?.dispose();
      scene.environment?.dispose();
      pmrem.dispose();
      root.traverse((obj) => {
        const mesh = obj as Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [scrollRoot]);

  return <div ref={mountRef} className="diorama-mount" data-state="loading" />;
}
