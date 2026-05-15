import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Sun, Palmtree, Waves, MapPin } from 'lucide-react';

const TARGET_DATE = new Date('2026-06-22T00:00:00').getTime();

const TimeUnit = ({ value, label, glowColor, index }: { value: number, label: string, glowColor: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
    className="flex flex-col items-center justify-center relative"
  >
    <div className={`relative glass-panel rounded-2xl w-[72px] h-[84px] sm:w-[136px] sm:h-[144px] md:w-[140px] md:h-[150px] flex items-center justify-center overflow-hidden transition-transform hover:scale-105 hover:border-${glowColor}/50 group`}>
      {/* Inner subtle glow */}
      <div className={`absolute inset-0 bg-${glowColor}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.3, type: "spring" }}
          className={`font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter ${
            glowColor === 'neo-blue' ? 'text-glow-blue text-neo-blue' : 
            glowColor === 'neo-pink' ? 'text-glow-pink text-neo-pink' : 
            'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]'
          }`}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="absolute -bottom-8 text-[10px] sm:text-sm font-medium tracking-[0.2em] uppercase text-white/60">
      {label}
    </span>
  </motion.div>
);

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft(); // initial call
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-neo-bg flex flex-col items-center justify-center overflow-hidden selection:bg-neo-pink/30">
      
      {/* --- Animated Neon Background Blobs --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-neo-blue), transparent 60%)' }}
        />
        <motion.div 
          animate={{ x: [0, -60, 30, 0], y: [0, 50, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-neo-pink), transparent 60%)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] rounded-full mix-blend-screen filter blur-[90px]"
          style={{ background: 'radial-gradient(circle, var(--color-neo-purple), transparent 70%)' }}
        />
      </div>

      {/* --- Floating Icons --- */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <FloatIcon Icon={Palmtree} color="text-emerald-400" size={48} x="15vw" y="20vh" delay={0} duration={8} glow="shadow-emerald-400" />
          <FloatIcon Icon={Sun} color="text-yellow-300" size={64} x="85vw" y="15vh" delay={1} duration={12} glow="shadow-yellow-300" />
          <FloatIcon Icon={Plane} color="text-neo-blue" size={40} x="75vw" y="75vh" delay={2} duration={9} animation="fly" />
          <FloatIcon Icon={Waves} color="text-cyan-400" size={56} x="20vw" y="80vh" delay={0.5} duration={7} />
        </div>
      )}

      {/* --- Main Content --- */}
      <div className="z-10 w-full max-w-5xl px-4 flex flex-col items-center py-12 sm:py-20">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center space-x-3 mb-8 sm:mb-12"
        >
          <MapPin className="w-6 h-6 text-neo-pink animate-bounce" />
          <h2 className="text-sm sm:text-lg font-medium tracking-[0.1em] text-white/80 uppercase">
            Летим на Пхукет
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="glass-panel w-full p-6 sm:p-10 md:p-12 rounded-[2rem] box-glow-purple relative overflow-hidden flex flex-col items-center text-center"
        >
          {/* Subtle grid background overlay for the card */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-sans mb-4 sm:mb-6 tracking-tight leading-tight">
            До отпуска в{' '}
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Таиланде
            </span>
          </h1>
          
          <p className="text-base sm:text-xl text-white/70 mb-12 sm:mb-16 font-light">
            Осталось совсем чуть-чуть до 22 июня 2026 года
          </p>

          <div className="flex justify-between items-center w-full max-w-[632px] mx-auto mb-10 px-2 sm:px-0">
            <TimeUnit value={timeLeft.days} label="Дней" glowColor="white" index={0} />
            <div className="text-xl sm:text-4xl text-white/20 font-light mb-2 sm:mb-0">:</div>
            <TimeUnit value={timeLeft.hours} label="Часов" glowColor="white" index={1} />
            <div className="text-xl sm:text-4xl text-white/20 font-light mb-2 sm:mb-0">:</div>
            <TimeUnit value={timeLeft.minutes} label="Минут" glowColor="neo-blue" index={2} />
            <div className="text-xl sm:text-4xl text-white/20 font-light mb-2 sm:mb-0">:</div>
            <TimeUnit value={timeLeft.seconds} label="Секунд" glowColor="neo-pink" index={3} />
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-center items-stretch gap-4 sm:gap-8 w-full z-10 px-2 sm:px-0 opacity-90">
            <CalendarMonth year={2026} month={4} targetTime={TARGET_DATE} />
            <CalendarMonth year={2026} month={5} targetTime={TARGET_DATE} />
          </div>

        </motion.div>
      </div>

    </div>
  );
}

const CalendarMonth = ({ year, month, targetTime }: { year: number, month: number, targetTime: number }) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const totalDays = lastDay.getDate();
  const days = [];
  
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i));
  }

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const targetDate = new Date(targetTime);
  const targetTimeNum = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col flex-1 max-w-none md:max-w-[300px] w-full p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] relative overflow-hidden group backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <h3 className="text-base sm:text-lg font-display font-bold text-center mb-4 tracking-wider text-white/90 uppercase">{monthNames[month]} {year}</h3>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {dayNames.map(d => <div key={d} className="text-[10px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center">
        {days.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} className="p-1 sm:p-2" />;
          const time = d.getTime();
          const isPast = time < todayDate;
          const isToday = time === todayDate;
          const isTarget = time === targetTimeNum;
          
          let className = "relative flex items-center justify-center p-1.5 sm:p-2 text-xs sm:text-sm rounded-lg transition-colors ";
          
          if (isTarget) {
            className += "text-white bg-neo-pink/40 border border-neo-pink shadow-[0_0_12px_rgba(255,42,133,0.8)] font-bold z-10";
          } else if (isToday) {
            className += "text-neo-blue bg-neo-blue/20 border border-neo-blue/80 font-bold shadow-[0_0_8px_rgba(0,240,255,0.4)]";
          } else if (isPast) {
            className += "text-white/30";
          } else {
            className += "text-white/80 hover:bg-white/15 cursor-default";
          }

          return (
            <div key={d.getDate()} className={className}>
              <span className="relative z-10">{d.getDate()}</span>
              {isPast && !isTarget && !isToday && (
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[2px] rounded-full bg-neo-pink/50 -rotate-45 z-20 shadow-[0_0_4px_rgba(255,42,133,0.5)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[2px] rounded-full bg-neo-pink/50 rotate-45 z-20 shadow-[0_0_4px_rgba(255,42,133,0.5)]" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Helper component for floating background icons
function FloatIcon({ Icon, color, size, x, y, delay, duration, animation = "float", glow = "" }: any) {
  const getAnimation = () => {
    switch (animation) {
      case "fly":
        return {
          y: [0, -30, 0],
          x: [0, 40, 0],
          rotate: [0, 5, -5, 0],
        };
      default:
        return {
          y: [0, -20, 0],
          rotate: [-5, 5, -5],
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 1, delay }}
      className={`absolute ${color}`}
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={getAnimation()}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`filter drop-shadow-[0_0_10px_currentColor]`}
      >
        <Icon size={size} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
