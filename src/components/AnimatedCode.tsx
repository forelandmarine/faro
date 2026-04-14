"use client";

import { useEffect, useState } from "react";

const codeLines = [
  { text: "const faro = {", color: "#A8CCCA", indent: 0 },
  { text: '  name: "Faro Creative",', color: "#EEF7FF", indent: 0 },
  { text: '  captain: "Jack",', color: "#EEF7FF", indent: 0 },
  { text: '  craft: "Websites and stuff",', color: "#EEF7FF", indent: 0 },
  { text: "  approach: [", color: "#A8CCCA", indent: 0 },
  { text: '    "No templates",', color: "#D6E9E4", indent: 0 },
  { text: '    "No agency bloat",', color: "#D6E9E4", indent: 0 },
  { text: '    "Just sharp design"', color: "#D6E9E4", indent: 0 },
  { text: "  ],", color: "#A8CCCA", indent: 0 },
  { text: "  build(brand) {", color: "#4A8C86", indent: 0 },
  { text: "    return brand", color: "#EEF7FF", indent: 0 },
  { text: '      .designed("to be found")', color: "#A8CCCA", indent: 0 },
  { text: '      .crafted("with intention")', color: "#A8CCCA", indent: 0 },
  { text: '      .remembered();', color: "#D6E9E4", indent: 0 },
  { text: "  }", color: "#4A8C86", indent: 0 },
  { text: "};", color: "#A8CCCA", indent: 0 },
];

export default function AnimatedCode() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) return;

    const currentLine = codeLines[visibleLines];
    if (charIndex < currentLine.text.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCharIndex(0);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, charIndex]);

  return (
    <div className="bg-[#1A3640] rounded-xl p-5 md:p-6 font-mono text-sm md:text-base leading-relaxed overflow-hidden shadow-lg">
      {/* Window dots */}
      <div className="flex gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[#A8CCCA]/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#A8CCCA]/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#A8CCCA]/15" />
      </div>

      {/* Code lines */}
      <div className="space-y-0.5">
        {codeLines.map((line, i) => {
          if (i > visibleLines) return null;
          const isCurrentLine = i === visibleLines;
          const displayText = isCurrentLine
            ? line.text.slice(0, charIndex)
            : line.text;

          return (
            <div key={i} className="flex">
              <span className="text-[#4A8C86]/40 select-none w-6 text-right mr-3 text-xs leading-relaxed">
                {i + 1}
              </span>
              <span style={{ color: line.color }}>
                {displayText}
                {isCurrentLine && (
                  <span className="inline-block w-[2px] h-[1em] bg-[#A8CCCA] ml-px animate-pulse align-middle" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
