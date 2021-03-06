
const Light = () => {
    return(
        <>
            <ambientLight intensity={0.2} />

            <directionalLight
                castShadow
                position={[3, 10, -7]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
        </>
    );
}

export default Light;