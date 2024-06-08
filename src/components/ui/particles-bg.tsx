"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBg = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(loadSlim)
      .then(() => {
        setInit(true);
      })
      .catch(console.error);
  }, []);

  return (
    init && (
      <Particles
        className="absolute inset-0 m-0 h-full w-full p-0"
        // particlesLoaded={particlesLoaded}
        options={{
          autoPlay: true,
          detectRetina: true,
          pauseOnBlur: false,
          fpsLimit: 60,
          pauseOnOutsideViewport: false,
          // background: {
          //   // color: '#171717',
          //   position: "absolute",
          // },
          particles: {
            color: {
              value: "#fff",
            },
            links: {
              color: "#fff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                // area: 500,
              },
              value: 30,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          interactivity: {
            modes: {
              grab: {
                distance: 250,
              },
            },
            // events: {
            //   onHover: {
            //     enable: true,
            //     mode: "",
            //   },
            //   // onClick: {
            //   //   enable: true,
            //   //   mode: 'repulse',
            //   // },
            // },
          },
          backgroundMode: {
            zIndex: -50,
            enable: false,
          },
        }}
      />
    )
  );
};
export default ParticlesBg;
