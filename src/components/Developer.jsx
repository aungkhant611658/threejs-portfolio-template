import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

const Developer = ({ animationName = "idle", ...props }) => {
  const group = useRef();

  // Load the GLTF model and animations
  const { nodes, materials } = useGLTF("/models/human/developer.glb");

  const { animations: idleAnimation } = useGLTF("/models/animations/idle.glb");

  const { animations: saluteAnimation } = useGLTF(
    "/models/animations/salute.glb"
  );

  const { animations: dancingAnimation } = useGLTF(
    "/models/animations/dancing.glb"
  );

  const { animations: offensiveIdleAnimation } = useGLTF(
    "/models/animations/offensive_idle.glb"
  );

  // Rename animation for clarity
  idleAnimation[0].name = "idle";
  saluteAnimation[0].name = "salute";
  dancingAnimation[0].name = "dancing";
  offensiveIdleAnimation[0].name = "offensive_idle";

  // Setup animations using `useAnimations` hook
  const { actions } = useAnimations(
    [
      idleAnimation[0],
      saluteAnimation[0],
      dancingAnimation[0],
      offensiveIdleAnimation[0],
    ],
    group
  );

  useEffect(() => {
    const action = actions[animationName];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }

    // Clean up on component unmount
    return () => {
      if (action) action.fadeOut(0.5);
    };
  }, [actions, animationName]);

  return (
    <group {...props} ref={group} dispose={null}>
      {/* Skinned Meshes for the Model */}
      <skinnedMesh
        geometry={nodes.EyeLeft001.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.EyeRight001.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body001.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses001.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair001.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Head001.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom001.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear001.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top001.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Teeth001.geometry}
        material={materials["Wolf3D_Teeth.002"]}
        skeleton={nodes.Wolf3D_Teeth001.skeleton}
      />
      <primitive object={nodes.mixamorigHips} />
    </group>
  );
};

// Preload model for performance
useGLTF.preload("/models/human/developer.glb");

export default Developer;
