import React, { useState, useEffect, useRef } from "react";
import "../css/closing.css";

const FULL_TEXT = "LET'S WORK TOGETHER";
const LINES = [
  { prefix: "→", text: "kyunghown98@naver.com", speed: 55 },
  { prefix: "→", text: "010-8985-4968", speed: 75 },
];

const Closing = () => {
  const [titleTyped, setTitleTyped] = useState("");
  const [typedLines, setTypedLines] = useState(LINES.map(() => ""));
  const [phase, setPhase] = useState("idle"); // idle | title | lines | done
  const [showLines, setShowLines] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState(-1);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") setPhase("title");
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [phase]);

  // Title typing
  useEffect(() => {
    if (phase !== "title") return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTitleTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(iv);
        setTimeout(() => {
          setShowLines(true);
          setPhase("lines");
        }, 400);
      }
    }, 70);
    return () => clearInterval(iv);
  }, [phase]);

  // Lines typing (sequential)
  useEffect(() => {
    if (phase !== "lines") return;
    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await sleep(200);
      for (let li = 0; li < LINES.length; li++) {
        if (cancelled) return;
        setActiveLineIdx(li);
        const { text, speed } = LINES[li];
        for (let j = 1; j <= text.length; j++) {
          if (cancelled) return;
          setTypedLines((prev) => {
            const next = [...prev];
            next[li] = text.slice(0, j);
            return next;
          });
          await sleep(speed);
        }
        await sleep(300);
      }
      if (!cancelled) setPhase("done");
    };

    run();
    return () => { cancelled = true; };
  }, [phase]);

  const titleDone = titleTyped.length >= FULL_TEXT.length;

  return (
    <section ref={sectionRef} className="cls-section" id="contact">
      <div className="cls-inner">
        <div className="cls-title">
          {titleTyped}
          {!titleDone && <span className="cls-cursor" />}
        </div>

        <div className={`cls-divider ${showLines ? "show" : ""}`} />

        <div className={`cls-lines-wrap ${showLines ? "show" : ""}`}>
          {LINES.map((line, i) => (
            <div key={i} className="cls-email-row">
              <span className="cls-prompt">{line.prefix}</span>
              <span>{typedLines[i]}</span>
              {activeLineIdx === i && phase !== "done" && (
                <span className="cls-cursor" />
              )}
              {phase === "done" && i === LINES.length - 1 && (
                <span className="cls-cursor" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="cls-footer">
        © 2026 PARK GYEONG-HOON. ALL RIGHTS RESERVED.
      </div>
    </section>
  );
};

export default Closing;