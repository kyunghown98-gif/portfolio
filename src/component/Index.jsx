import React, { useState, useEffect, useRef } from "react";
import "../css/index.css";


const tocData = [
  {
    idx: "01",
    name: "LOTTE HOTELS CLONE",
    type: "Clone Coding",
    tags: ["React", "Swiper.js", "CSS"],
    desc: "복잡한 드롭다운 애니메이션과 슬라이더 인터랙션을 구현한 호텔 사이트 클론",
  },
  {
    idx: "02",
    name: "WEATHER APP",
    type: "Web Application",
    tags: ["React", "Redux Toolkit", "OpenWeatherMap API"],
    desc: "실시간 날씨 데이터 기반의 반응형 날씨 앱. 다크/라이트 테마 및 미니게임 포함",
  },
  {
    idx: "03",
    name: "E-chanel",
    type: "Clone Coding",
    tags: ["HTML", "CSS", "Javascript"],
    desc: "e-chanel 사이트 클론",
  },
  {
    idx: "04",
    name: "MATRIX PORTFOLIO",
    type: "Creative Portfolio",
    tags: ["React", "GSAP", "Canvas", "UnicornStudio"],
    desc: "매트릭스 컨셉의 인터랙티브 포트폴리오. ScrollTrigger 기반 시네마틱 전환",
  },
];


const SectionHeader = ({ label, title }) => (
  <div className="section-header">
    <span className="glitch-title" data-text={title}>
      {title}
    </span>
  </div>
);


const Index = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="toc"
      className={`toc-section ${visible ? "visible" : ""}`}
    >
      <SectionHeader title="INDEX" />

      {tocData.map((item, i) => (
        <div
          key={i}
          className={`toc-item ${visible ? "visible" : ""}`}
          style={{ transitionDelay: `${i * 0.12}s` }}
        >
          {/* Index */}
          <div className="toc-index">
            <span className="toc-index-number">{item.idx}</span>
            <div className="toc-index-bar" />
          </div>

          {/* Content */}
          <div className="toc-content">
            <div className="toc-meta">
              <span className="toc-type">{item.type}</span>
              {item.tags.map((tag, ti) => (
                <span key={ti} className="toc-tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="toc-title" data-text={item.name}>
              {item.name}
            </span>
            <p className="toc-desc">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Index;