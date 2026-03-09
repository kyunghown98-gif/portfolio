import React, { useEffect, useRef, useState } from 'react';

const Rain = ({ start }) => {
  const canvasRef = useRef(null);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    let timer;
    if (start) {
      timer = setTimeout(() => {
        setIsRaining(true);
      }, 3500);
    } else {
      setIsRaining(false);
    }
    return () => clearTimeout(timer);
  }, [start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let interval;

    if (isRaining) {
      const chars = '01101010011010111001';
      const fontSize = 16;
      
      // 화면 너비에 맞춰 빗줄기 개수 설정
      const columns = Math.floor(canvas.width / 20); 
      const drops = [];
      
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          x: Math.random() * canvas.width, // 시작 가로 위치 랜덤
          y: Math.random() * -100 // 시작 세로 위치 랜덤
        };
      }

      const draw = () => {
        ctx.fillStyle = 'rgba(3, 3, 3, 0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          
          // 저장된 랜덤 x 좌표에 글자 그리기
          ctx.fillText(text, drops[i].x, drops[i].y * fontSize);

          // 바닥에 닿으면 다시 위로 올리면서 가로 위치(x)를 새로 랜덤하게 부여
          if (drops[i].y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i].y = 0;
            drops[i].x = Math.random() * canvas.width; // ★ 이 부분이 랜덤 위치 핵심
          }
          drops[i].y++;
        }
      };

      interval = setInterval(draw, 50);
    } else {
      // CSS opacity 트랜지션(2초)이 끝난 후 캔버스를 지우도록 setTimeout 적용
  setTimeout(() => {
    if (canvasRef.current && !isRaining) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isRaining]);

  return (
    <>
      <style>
        {`
          .matrix-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
            opacity: 0;
            transition: opacity 2s ease-in-out; 
          }

          .matrix-canvas.active {
            opacity: 0.3;
          }
        `}
      </style>
      <canvas
        ref={canvasRef}
        className={`matrix-canvas ${isRaining ? 'active' : ''}`}
      />
    </>
  );
};

export default Rain;