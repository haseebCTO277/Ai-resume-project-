import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
 
const Confetti = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true, 
    });
 
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });
      
      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        // Call onComplete when the animation is finished
        onComplete();
      }
    };

    frame();

    return () => {
      myConfetti.reset();
    };
  }, [onComplete]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }} />;
};

export default Confetti;