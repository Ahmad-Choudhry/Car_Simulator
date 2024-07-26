import React, { useEffect, useRef, useState } from 'react';

const CarSimulation = ({ cars }) => {
  const simulationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const carImages = useRef({});
  const [totalDistance, setTotalDistance] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const canvas = simulationRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime = null;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log('Image loaded:', src);
          resolve(img);
        };
        img.onerror = (err) => {
          console.error('Failed to load image:', src);
          reject(new Error(`Failed to load image: ${src}`));
        };
      });
    };

    const loadImages = async () => {
      const carImageSrc = '/assets/cars/porsche_911_turbo_s.png';
      try {
        const img = await loadImage(carImageSrc);
        cars.forEach(car => {
          carImages.current[car.name] = img;
        });
        console.log('All images loaded successfully');
        setIsLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadImages();

    const draw = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const time = (timestamp - startTime) / 1000; // Time in seconds
      setCurrentTime(time.toFixed(2));

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let maxDistance = 0;

      cars.forEach((car, index) => {
        const acceleration = 60 / car.zero_to_sixty; // Speed increase per second
        const distance = 0.5 * acceleration * Math.pow(time, 2); // Distance covered using d = 0.5 * a * t^2
        const topSpeedDistance = car.top_speed * time;

        let x = distance;
        if (distance > topSpeedDistance) x = topSpeedDistance;
        if (x > canvas.width) x = canvas.width;
        maxDistance = Math.max(maxDistance, x);

        const img = carImages.current[car.name];
        if (img) {
          ctx.drawImage(img, x, 50 + index * 60, 100, 50);
        } else {
          console.log('Image not found for car:', car.name);
        }
      });

      setTotalDistance(maxDistance.toFixed(2));

      // Display time and distance
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Time: ${time.toFixed(2)} s`, 10, 30);
      ctx.fillText(`Total Distance: ${maxDistance.toFixed(2)} px`, 10, 60);

      animationFrameId = requestAnimationFrame(draw);
    };

    if (isLoaded && isStarted) {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cars, isLoaded, isStarted]);

  return (
    <div>
      <canvas ref={simulationRef} width={800} height={600} style={{ border: '1px solid black' }} />
      <button onClick={() => setIsStarted(true)} disabled={!isLoaded || isStarted}>
        Start Simulation
      </button>
    </div>
  );
};

export default CarSimulation;
