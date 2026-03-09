import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';
import '../css/hero.css';
import Rain from './Rain';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onTriggerRain }) => {
  const containerRef = useRef(null);
  const portfolioTextRef = useRef(null);
  const [startScramble, setStartScramble] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !portfolioTextRef.current) return;

    const introScene = document.querySelector('.intro-scene');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", 
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
  // 0.9 -> 0.6으로 변경하여 GSAP 페이드아웃 타이밍과 맞춥니다.
  if (self.progress > 0.8) {
    setStartScramble(true);
    if (onTriggerRain) onTriggerRain(true);
  } else {
    setStartScramble(false);
    if (onTriggerRain) onTriggerRain(false);
  }
}
        }
      });

      if (introScene) {
        tl.to(introScene, {
          scale: 6,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        }, 0);
      }

      tl.fromTo(portfolioTextRef.current, 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }, 0.8
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onTriggerRain]);

  return (
    <section ref={containerRef} className="hero-container">
      {/* 배경에 Rain 컴포넌트 추가하고 start 상태 전달 */}
      <Rain start={startScramble} />
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll To</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-green-400" />
        </motion.div>
      </div>

      <div ref={portfolioTextRef} className="portfolio-text-wrapper">
        <h2 className="neon-text">
          <ScrambleText 
            text="PORTFOLIO" 
            start={startScramble} 
            chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*" 
            speed={0.15} 
            delay={0} 
            duration={3}
          />
        </h2>
      </div>
    </section>
  );
};

export default Hero;


