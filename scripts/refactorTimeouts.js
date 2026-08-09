const fs = require('fs');
const file = 'c:/Users/Ashraf/Desktop/Temp/CommerceCast/src/components/landing/AnimatedDashboardMock.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/import { (.*?) } from 'lucide-react';/, (match, p1) => {
  if (!p1.includes('Play')) p1 += ', Play, Pause';
  return `import { ${p1} } from 'lucide-react';`;
});

content = content.replace(/const autoPlayRef = useRef\(true\);/, 
  `const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  
  const togglePause = () => {
    setIsPaused(prev => {
      isPausedRef.current = !prev;
      return !prev;
    });
  };
  
  const autoPlayRef = useRef(true);`);

content = content.replace(/const runSequence = async \(\) => {/, 
  `const runSequence = async () => {
      const smartWait = async (ms: number) => {
        let elapsed = 0;
        const interval = 50;
        while (elapsed < ms) {
          if (!isMounted || !autoPlayRef.current) return;
          if (isPausedRef.current) {
            await new Promise(r => setTimeout(r, interval));
            continue;
          }
          await new Promise(r => setTimeout(r, interval));
          elapsed += interval;
        }
      };`);

content = content.replace(/await new Promise\(r => setTimeout\(r, (\d+)\)\);/g, 'await smartWait($1);');

content = content.replace(/<\/AnimatePresence>\r?\n\s*<\/div>\r?\n\s*\);\r?\n}/, 
  `</AnimatePresence>
      
      {/* Play/Pause Control */}
      <div className="absolute bottom-6 left-6 z-50">
        <button 
          onClick={togglePause}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg hover:scale-105 active:scale-95 transition-all text-foreground"
        >
          {isPaused ? <Play className="w-5 h-5 ml-1" /> : <Pause className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}`);

fs.writeFileSync(file, content);
console.log('Successfully updated AnimatedDashboardMock.tsx');
