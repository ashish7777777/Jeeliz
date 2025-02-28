"use strict";


// SETTINGS of this demo:
const SETTINGS = {
  pivotOffsetYZ: [0.3, 0.5], // XYZ of the distance between the center of the cube and the pivot
};

let THREECAMERA = null;

// callback: launched if a face is detected or lost
function detect_callback(isDetected) {
  if (isDetected) {
    console.log('INFO in detect_callback(): DETECTED');
  } else {
    console.log('INFO in detect_callback(): LOST');
  }
}


// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  const threeStuffs = JeelizThreeHelper.init(spec, detect_callback);

  let HATOBJ3D = new THREE.Object3D();
  // Create the JSONLoader for our hat
  const loader = new THREE.GLTFLoader();
  // Load our cool hat
  loader.load(
    'https://ashish7777777.github.io/earrings/earrings2.glb',
    function (geometry) {
      // we create our Hat mesh
      // const mat = new THREE.MeshBasicMaterial({
      //   map: new THREE.TextureLoader().load("./models/luffys_hat/Texture2.jpg")
      // });

      // const HATMESH = new THREE.Mesh(geometry, mat);

      geometry.scene.scale.multiplyScalar(1.5);
      geometry.scene.rotation.set(-0.1, 0, 0);
      geometry.scene.position.set(0.0,1, -0.2);
      geometry.scene.frustumCulled = false;
      geometry.scene.side = THREE.DoubleSide;


      // CREATE THE MASK
      const maskLoader = new THREE.BufferGeometryLoader();
      /*
      faceLowPolyEyesEarsFill.json has been exported from dev/faceLowPolyEyesEarsFill.blend using THREE.JS blender exporter with Blender v2.76
      */
      maskLoader.load('./models/mask/faceLowPolyEyesEarsFill2.json', function (maskBufferGeometry) {
          const vertexShaderSource = 'varying vec2 vUVvideo;\n\
        varying float vY, vNormalDotZ;\n\
        const float THETAHEAD=1.4;\n\
        void main() {\n\
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n\
          vec4 projectedPosition=projectionMatrix * mvPosition;\n\
          gl_Position=projectedPosition;\n\
          \n\
          // compute UV coordinates on the video texture:\n\
          vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
          vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
          vUVvideo = vec2(0.5,0.5) + 0.5*projectedPosition0.xy/projectedPosition0.w;\n\
          vY = position.y * cos(THETAHEAD)-position.z*sin(THETAHEAD);\n\
          vec3 normalView = vec3(modelViewMatrix * vec4(normal,0.));\n\
          vNormalDotZ = pow(abs(normalView.z), 1.5);\n\
        }';

         const fragmentShaderSource = "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUVvideo;\n\
        varying float vY, vNormalDotZ;\n\
        void main() {\n\
          vec3 videoColor = texture2D(samplerVideo, vUVvideo).rgb;\n\
          float darkenCoeff = smoothstep(-0.5, 0.45, vY);\n\
          float borderCoeff = smoothstep(0.0, 0.85, vNormalDotZ);\n\
          gl_FragColor = vec4(videoColor*(1.-darkenCoeff), borderCoeff );\n\
          // gl_FragColor=vec4(borderCoeff, 0., 0., 1.);\n\
          // gl_FragColor=vec4(darkenCoeff, 0., 0., 1.);\n\
        }";

        const mat = new THREE.ShaderMaterial({
          vertexShader: vertexShaderSource,
          fragmentShader: fragmentShaderSource,
          transparent: true,
          flatShading: false,
          uniforms: {
            samplerVideo:{ value: JeelizThreeHelper.get_threeVideoTexture() }
          },
          transparent: true
        });
        maskBufferGeometry.computeVertexNormals();
        const FACEMESH = new THREE.Mesh(maskBufferGeometry, mat);
        FACEMESH.frustumCulled = false;
        FACEMESH.scale.multiplyScalar(1.12 * 1.1);
        FACEMESH.position.set(0, 0.5, -0.5);
        

        HATOBJ3D.add(geometry.scene);
        HATOBJ3D.add(FACEMESH);
        addDragEventListener(HATOBJ3D);

        threeStuffs.faceObject.add(HATOBJ3D);
      });
    }
  );


loader.load(
    'https://ashish7777777.github.io/earrings/neckles.glb',
    function (geometry) {
      // we create our Hat mesh
      // const mat = new THREE.MeshBasicMaterial({
      //   map: new THREE.TextureLoader().load("./models/luffys_hat/Texture2.jpg")
      // });

      // const HATMESH = new THREE.Mesh(geometry, mat);

      geometry.scene.scale.multiplyScalar(0.08);
      geometry.scene.rotation.set(-90, 0, 0);
      geometry.scene.position.set(0.0,-2.5, 0);
      geometry.scene.frustumCulled = false;
      geometry.scene.side = THREE.DoubleSide;


      // CREATE THE MASK
      const maskLoader = new THREE.BufferGeometryLoader();
      /*
      faceLowPolyEyesEarsFill.json has been exported from dev/faceLowPolyEyesEarsFill.blend using THREE.JS blender exporter with Blender v2.76
      */
      maskLoader.load('./models/mask/faceLowPolyEyesEarsFill2.json', function (maskBufferGeometry) {
          const vertexShaderSource = 'varying vec2 vUVvideo;\n\
        varying float vY, vNormalDotZ;\n\
        const float THETAHEAD=1.4;\n\
        void main() {\n\
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n\
          vec4 projectedPosition=projectionMatrix * mvPosition;\n\
          gl_Position=projectedPosition;\n\
          \n\
          // compute UV coordinates on the video texture:\n\
          vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
          vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
          vUVvideo = vec2(0.5,0.5) + 0.5*projectedPosition0.xy/projectedPosition0.w;\n\
          vY = position.y * cos(THETAHEAD)-position.z*sin(THETAHEAD);\n\
          vec3 normalView = vec3(modelViewMatrix * vec4(normal,0.));\n\
          vNormalDotZ = pow(abs(normalView.z), 1.5);\n\
        }';

         const fragmentShaderSource = "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUVvideo;\n\
        varying float vY, vNormalDotZ;\n\
        void main() {\n\
          vec3 videoColor = texture2D(samplerVideo, vUVvideo).rgb;\n\
          float darkenCoeff = smoothstep(-0.5, 0.45, vY);\n\
          float borderCoeff = smoothstep(0.0, 0.85, vNormalDotZ);\n\
          gl_FragColor = vec4(videoColor*(1.-darkenCoeff), borderCoeff );\n\
          // gl_FragColor=vec4(borderCoeff, 0., 0., 1.);\n\
          // gl_FragColor=vec4(darkenCoeff, 0., 0., 1.);\n\
        }";

        const mat = new THREE.ShaderMaterial({
          vertexShader: vertexShaderSource,
          fragmentShader: fragmentShaderSource,
          transparent: true,
          flatShading: false,
          uniforms: {
            samplerVideo:{ value: JeelizThreeHelper.get_threeVideoTexture() }
          },
          transparent: true
        });
        maskBufferGeometry.computeVertexNormals();
        const FACEMESH = new THREE.Mesh(maskBufferGeometry, mat);
        FACEMESH.frustumCulled = false;
        FACEMESH.scale.multiplyScalar(1.12 * 1.1);
        FACEMESH.position.set(0, 0.5, -0.5);
        

        HATOBJ3D.add(geometry.scene);
        HATOBJ3D.add(FACEMESH);
        addDragEventListener(HATOBJ3D);

        threeStuffs.faceObject.add(HATOBJ3D);
      });
    }
  );



  // CREATE THE VIDEO BACKGROUND
  function create_mat2d(threeTexture, isTransparent){ //MT216: we put the creation of the video material in a func because we will also use it for the frame
    return new THREE.RawShaderMaterial({
      depthWrite: false,
      depthTest: false,
      transparent: isTransparent,
      vertexShader: "attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position = vec4(position, 0., 1.);\n\
          vUV = 0.5 + 0.5 * position;\n\
        }",
      fragmentShader: "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor = texture2D(samplerVideo, vUV);\n\
        }",
       uniforms:{
        samplerVideo: { value: threeTexture }
       }
    });
  }

  //MT216: create the frame. We reuse the geometry of the video
  // const frameMesh=new THREE.Mesh(threeStuffs.videoMesh.geometry,  create_mat2d(new THREE.TextureLoader().load('./images/cadre_v1.png'), true))
  // frameMesh.renderOrder = 999; // render last
  // frameMesh.frustumCulled = false;
  // threeStuffs.scene.add(frameMesh);

  // CREATE A LIGHT
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  threeStuffs.scene.add(ambient);

  // CREATE THE CAMERA
  THREECAMERA = JeelizThreeHelper.create_camera();
} // end init_threeScene()

// Entry point, launched by body.onload():
function main(){
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    callback: function(isError, bestVideoSettings){
      init_faceFilter(bestVideoSettings);
    }
  });
}

function init_faceFilter(videoSettings){
  // Here we set a different pivotOffset value so that the mask fits better
  JeelizThreeHelper.set_pivotOffsetYZ(SETTINGS.pivotOffsetYZ);

  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: '../../../dist/', // path of NNC.json file
    videoSettings: videoSettings,
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENED. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO: JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    },

    // called at each render iteration (drawing loop)
    callbackTrack: function (detectState) {
      JeelizThreeHelper.render(detectState, THREECAMERA);
    }
  }); // end JEEFACEFILTERAPI.init call
}

