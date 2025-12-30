/**
 * Avatar Scene - Three.js
 * 3D avatar with mouse spotlight effect (green flashlight)
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class AvatarScene {
    constructor() {
        this.canvas = document.getElementById('avatar-canvas');
        if (!this.canvas) return;

        this.container = this.canvas.parentElement;
        this.mouse = { x: 0, y: 0 };
        this.avatar = null;

        // Mouse spotlight
        this.mouseLight = null;
        this.avatarCenter = new THREE.Vector3();

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();

        // Get container dimensions
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width || 400;
        this.height = rect.height || 500;

        // Camera
        this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.01, 100);
        this.camera.position.set(0, 0.5, 1.5);
        this.camera.lookAt(0, 0.4, 0);

        // Renderer with transparency
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Lighting
        this.setupLighting();

        // Load avatar
        this.loadAvatar();

        // Event listeners
        this.setupEventListeners();

        // Start animation loop
        this.animate();
    }

    setupLighting() {
        // Soft ambient light
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        // Subtle fill light
        const fillLight = new THREE.DirectionalLight(0x446655, 0.2);
        fillLight.position.set(-1, 0, 1);
        this.scene.add(fillLight);

        // Rim light (green tinted)
        const rimLight = new THREE.DirectionalLight(0x00ff66, 0.15);
        rimLight.position.set(0, 0.5, -2);
        this.scene.add(rimLight);

        // ========================================
        // MOUSE SPOTLIGHT - Green flashlight effect
        // ========================================
        this.mouseLight = new THREE.SpotLight(0x55ffaa, 2.8);
        this.mouseLight.angle = Math.PI / 5;
        this.mouseLight.penumbra = 0.65;
        this.mouseLight.decay = 1.2;
        this.mouseLight.distance = 6;
        this.mouseLight.position.set(0, 0.5, 2);

        this.mouseLightTarget = new THREE.Object3D();
        this.mouseLightTarget.position.set(0, 0.5, 0);
        this.scene.add(this.mouseLightTarget);
        this.mouseLight.target = this.mouseLightTarget;

        this.scene.add(this.mouseLight);
    }

    loadAvatar() {
        const loader = new GLTFLoader();

        loader.load(
            './assets/avatar2.glb',
            (gltf) => this.onAvatarLoaded(gltf),
            (progress) => {
                const percent = (progress.loaded / progress.total) * 100;
                console.log(`Loading avatar: ${percent.toFixed(1)}%`);
            },
            (error) => {
                console.error('Error loading avatar:', error);
            }
        );
    }

    onAvatarLoaded(gltf) {
        this.avatar = gltf.scene;
        this.avatar.position.set(0, 0, 0);

        // Hide hands mesh
        this.avatar.traverse((child) => {
            if (child.isMesh) {
                const meshName = child.name;
                if (meshName === 'Wolf3D_Hands' || meshName.toLowerCase().includes('hand')) {
                    child.visible = false;
                }
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this.scene.add(this.avatar);

        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(this.avatar);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        this.avatarCenter.copy(center);
        this.avatarCenter.y += size.y * 0.2;

        // Position camera
        const cameraDistance = Math.max(size.y * 1.8, 0.8);
        this.camera.position.set(0, center.y + size.y * 0.1, cameraDistance);
        this.camera.lookAt(center.x, center.y + size.y * 0.15, center.z);
        this.camera.updateProjectionMatrix();

        this.mouseLightTarget.position.copy(this.avatarCenter);

        console.log('Avatar loaded with spotlight effect');
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            const rect = this.container.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;

            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });
    }

    updateMouseSpotlight() {
        if (!this.mouseLight || !this.avatar) return;

        const lightX = this.mouse.x * 1.8;
        const lightY = this.avatarCenter.y + this.mouse.y * 1.0;
        const lightZ = 2.0;

        this.mouseLight.position.lerp(
            new THREE.Vector3(lightX, lightY, lightZ),
            0.12
        );

        const targetX = this.avatarCenter.x + this.mouse.x * 0.4;
        const targetY = this.avatarCenter.y + this.mouse.y * 0.4;

        this.mouseLightTarget.position.lerp(
            new THREE.Vector3(targetX, targetY, this.avatarCenter.z),
            0.15
        );

        const distFromCenter = Math.sqrt(this.mouse.x ** 2 + this.mouse.y ** 2);
        this.mouseLight.intensity = THREE.MathUtils.lerp(3.2, 1.8, distFromCenter);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update spotlight
        this.updateMouseSpotlight();

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AvatarScene();
});
