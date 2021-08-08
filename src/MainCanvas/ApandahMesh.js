import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";


const ApandahMesh = ({ position, args, shape, textureType }) => {
  // declare State hook
  const [expand, setExpand] = useState(false);

  // Refresh every Frame
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.007;
  });

  // load Apandah Texture
  const [ApandahTexture, AztroTexture, ShlattTexture, MikaTexture] = useTexture([
    process.env.PUBLIC_URL + "/Apandah.jpg",
    process.env.PUBLIC_URL + "/Aztro.jpg",
    process.env.PUBLIC_URL + "/Jschlatt.png",
    process.env.PUBLIC_URL + "/Mikasacus.jpg",
  ]);

  let textureArr = [ApandahTexture, AztroTexture, ShlattTexture, MikaTexture];

  // Load Animations with spring
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  // TODO: Add More Shapes
  // TODO: Maybe port this to the Slidebar?

  // handles shape of Mesh, Sphere or Box
  function handleMeshShape() {   
    // if(isCircle) return <sphereBufferGeometry attach="geometry" args={[args[0], (args[1] * 15), (args[2] * 13)]}  />;
    // // ^^^ NOTE: this formula might need changing in the future
    // else return <boxBufferGeometry attach="geometry" args={args} />;
    switch(shape) {
      
      case 0:
        return <boxBufferGeometry attach="geometry" args={args} />;
      case 1:
        return <sphereBufferGeometry attach="geometry" args={[args[0], (args[1] * 15), (args[2] * 13)]} />;


      // Current Way it is set up,
      // if case is not recognized, do nothing
      default:
        break;
    }


  }


  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      {handleMeshShape()}
      <meshStandardMaterial
        attach="material"

        map={textureArr[textureType]}



        factor={0.3}
        roughness={0.7}
      />
    </a.mesh>
  );
};

export default ApandahMesh;
