import { Canvas, useFrame } from "@react-three/fiber";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useMemo, useRef, useState } from "react";
import { Vector3, Mesh } from "three";

type BoxProps = {
    position: Vector3
}

class ThreeStore {
  hovered = false;
  hover = (val: boolean) => this.hovered = val;
  clicked = false;
  click = (val: boolean) => this.clicked = val;

  constructor() {
    makeAutoObservable(this);
  }

  static create = () => new ThreeStore();
}


function BoxComp(props: BoxProps) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef<Mesh>(null)
    const {hover, click, hovered, clicked} = useMemo(ThreeStore.create, [])
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current!.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

const Box = observer(BoxComp)

export default function ThreeView() {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={new Vector3(-1.2, 0, 0)} />
            <Box position={new Vector3(1.2, 0, 0)} />
        </Canvas>
    )
}