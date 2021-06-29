import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import {
  BoxGeometry,
  CanvasTexture,
  DataTexture,
  DepthFormat,
  DepthTexture,
  Mesh,
  MeshNormalMaterial,
  NearestFilter,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Texture,
  UnsignedIntType,
  UnsignedShortType,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { DepthBuffer, Viewport } from '../../lib/types';
import {
  vertexShader,
  computeServerDepthTextureMatrix,
  serverDepth16FragmentShader,
} from './shaders';

interface PostProcessingState {
  camera: OrthographicCamera;
  material: ShaderMaterial;
  scene: Scene;
  target: WebGLRenderTarget;
}

@Component({
  tag: 'vertex-viewer-threejs-renderer',
  styleUrl: 'viewer-threejs-renderer.css',
  shadow: true,
})
export class ViewerThreeJsRenderer {
  @Prop()
  public scene: Scene = new Scene();

  @Prop()
  public viewer?: HTMLVertexViewerElement;

  @State()
  private camera: PerspectiveCamera = new PerspectiveCamera();

  @State()
  private postProcessing: PostProcessingState;

  @State()
  private viewport: Viewport = new Viewport(0, 0);

  @Element()
  private hostEl!: HTMLElement;

  private renderer?: WebGLRenderer;

  public constructor() {
    const target = new WebGLRenderTarget(1, 1);
    target.texture.format = RGBAFormat;
    target.texture.minFilter = NearestFilter;
    target.texture.magFilter = NearestFilter;
    target.texture.generateMipmaps = false;
    target.depthBuffer = true;
    target.depthTexture = new DepthTexture(1, 1);
    target.depthTexture.format = DepthFormat;
    target.depthTexture.type = UnsignedIntType;

    const postMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader: serverDepth16FragmentShader,
      uniforms: {
        diffuseTexture: { value: target.texture },
        depthTexture: { value: target.depthTexture },
        serverDepthTexture: { value: createInitialDepthTexture(1, 1) },
        serverDepthRect: { value: { x: 0, y: 0, width: 1, height: 1 } },
        serverDepthMatrix: { value: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
        dimensions: { value: [1, 1] },
        cameraNear: { value: this.camera.near },
        cameraFar: { value: this.camera.far },
        serverNear: { value: 0 },
        serverFar: { value: 1 },
      },
    });
    const postPlane = new PlaneGeometry(2, 2);
    const postQuad = new Mesh(postPlane, postMaterial);
    const postScene = new Scene();
    postScene.add(postQuad);

    this.postProcessing = {
      camera: new OrthographicCamera(-1, 1, 1, -1, 0, 1),
      material: postMaterial,
      scene: postScene,
      target,
    };
  }

  protected componentDidLoad(): void {
    const canvas = this.hostEl.shadowRoot?.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    const geometry = new BoxGeometry(10, 10, 10);
    const material = new MeshNormalMaterial();

    const cubes: Mesh[] = [];

    const cubeC = new Mesh(geometry, material);
    cubeC.position.set(0, 0, 25);
    this.scene.add(cubeC);
    cubes.push(cubeC);

    const cubeF = new Mesh(geometry, material);
    cubeF.position.set(0, 0, 100);
    this.scene.add(cubeF);
    cubes.push(cubeF);

    const cubeB = new Mesh(geometry, material);
    cubeB.position.set(0, 0, -150);
    this.scene.add(cubeB);
    cubes.push(cubeB);

    const cubeL = new Mesh(geometry, material);
    cubeL.position.set(100, 0, 0);
    this.scene.add(cubeL);
    cubes.push(cubeL);

    const cubeR = new Mesh(geometry, material);
    cubeR.position.set(-100, 0, 0);
    this.scene.add(cubeR);
    cubes.push(cubeR);

    const cubeT = new Mesh(geometry, material);
    cubeT.position.set(0, 100, 0);
    this.scene.add(cubeT);
    cubes.push(cubeT);

    const cubeBtm = new Mesh(geometry, material);
    cubeBtm.position.set(0, -100, 0);
    this.scene.add(cubeBtm);
    cubes.push(cubeBtm);

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setAnimationLoop(() => {
      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      renderer.setRenderTarget(this.postProcessing.target);
      renderer.render(this.scene, this.camera);

      renderer.setRenderTarget(null);
      renderer.render(this.postProcessing.scene, this.postProcessing.camera);
    });
    this.renderer = renderer;
    console.log('WebGL capabilities', renderer.capabilities);

    const resize = new ResizeObserver(() => this.updateSize());
    resize.observe(this.hostEl);

    this.updateSize();
    this.handleViewerChanged(this.viewer);
  }

  protected render(): h.JSX.IntrinsicElements {
    return (
      <Host>
        <canvas id="canvas" class="canvas"></canvas>
      </Host>
    );
  }

  @Watch('viewer')
  protected handleViewerChanged(
    newViewer?: HTMLVertexViewerElement,
    oldViewer?: HTMLVertexViewerElement
  ): void {
    oldViewer?.removeEventListener('frameDrawn', this.handleFrameDrawn);
    newViewer?.addEventListener('frameDrawn', this.handleFrameDrawn);
  }

  private handleFrameDrawn = async (): Promise<void> => {
    const frame = this.viewer?.frame;
    if (frame != null) {
      const { camera } = frame.scene;
      const { position, lookAt, up, fovY, aspectRatio, near, far } = camera;

      const threeNear = Math.max(near - 1000, 0.1);
      const threeFar = far + 1000;

      this.camera.position.set(position.x, position.y, position.z);
      this.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
      this.camera.up.set(up.x, up.y, up.z);

      this.camera.fov = fovY;
      this.camera.aspect = aspectRatio;
      this.camera.near = threeNear;
      this.camera.far = threeFar;
      this.camera.updateProjectionMatrix();

      const { material: postMat, target } = this.postProcessing;
      postMat.uniforms.cameraNear = { value: threeNear };
      postMat.uniforms.cameraFar = { value: threeFar };
      postMat.uniforms.serverNear = { value: near };
      postMat.uniforms.serverFar = { value: far };
      postMat.uniforms.depthTexture = { value: target.depthTexture };
      postMat.uniforms.dimensions = {
        value: [this.viewport.width, this.viewport.height],
      };

      const depthBlob = frame.depthBufferBytes
        ? new Blob([frame.depthBufferBytes])
        : undefined;
      const [depthBitmap, depthBuffer] = await Promise.all([
        depthBlob != null ? createImageBitmap(depthBlob) : undefined,
        frame.depthBuffer(),
      ]);
      if (depthBitmap != null && depthBuffer != null) {
        const { x, y, width, height } = this.viewport.calculateDrawRect(
          depthBuffer,
          depthBuffer.imageDimensions
        );
        this.postProcessing.material.uniforms.serverDepthTexture = {
          value: createDepthDataTexture(depthBuffer, this.viewport),
        };
        this.postProcessing.material.uniforms.serverDepthRect = {
          value: {
            x: x,
            // Position server depth from top of screen. WebGL renders from
            // bottom of screen. Consider moving to shader.
            y: this.viewport.height - (height + y),
            width: width,
            height: height,
          },
        };
        this.postProcessing.material.uniforms.serverDepthMatrix = {
          value: computeServerDepthTextureMatrix(depthBuffer, this.viewport),
        };
      }
    }
  };

  private updateSize(): void {
    const { width, height } = this.hostEl.getBoundingClientRect();

    this.postProcessing.target.setSize(width, height);
    this.postProcessing.target.depthTexture = new DepthTexture(width, height);
    this.postProcessing.target.depthTexture.format = DepthFormat;
    this.postProcessing.target.depthTexture.type = UnsignedIntType;

    this.renderer?.setSize(width, height);
    this.viewport = new Viewport(width, height);
  }
}

function createInitialDepthTexture(w: number, h: number): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  return new CanvasTexture(canvas);
}

function createDepthDataTexture(
  depth: DepthBuffer,
  viewport: Viewport
): Texture {
  const { width, height } = depth.imageDimensions;

  const texture = new DataTexture(depth.data, width, height);
  texture.format = DepthFormat;
  texture.internalFormat = 'DEPTH_COMPONENT16';
  texture.type = UnsignedShortType;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.flipY = true;
  return texture;
}