import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';

interface LoadingProps {
  onFinish?: () => void;
  isReady: boolean; 
}

const Loading: React.FC<LoadingProps> = ({ onFinish, isReady }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null); // مرجع للتايم لاين للتحكم به لاحقاً

  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '5px';
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    };

    lockScroll();

    const ctx = gsap.context(() => {
      // 1. إنشاء التايم لاين وتخزينه في Ref
      tlRef.current = gsap.timeline();

      gsap.set(".dm-loader-content", { opacity: 1 });

      // 2. التحريك المبدئي للشريط (يصل لـ 80% ويقف مؤقتاً في انتظار الـ Assets)
      tlRef.current.to(progressBarRef.current, { 
        width: "80%", 
        duration: 2, 
        ease: "power2.out",
      });

      // أنميشن مستمر للأيقونة
      gsap.to(".dm-loader-main-lotus", { 
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });
      
      gsap.to(".dm-loader-lotus-box", {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
      });
      
      gsap.to(".dm-loader-dot", { 
        opacity: 0.3, 
        scale: 0.8,
        repeat: -1, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power1.inOut"
      });
    }, wrapperRef);

    return () => {
      unlockScroll();
      ctx.revert();
    };
  }, []); // تشغيل الـ Setup مرة واحدة فقط

  // 3. مراقبة الـ isReady: أول ما تبقى true نكمل الـ 20% اللي فاضلين ونخرج
  useEffect(() => {
    if (isReady && tlRef.current) {
      tlRef.current.to(progressBarRef.current, {
        width: "100%",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          // أنميشن الخروج الفخم
          gsap.to(wrapperRef.current, {
            opacity: 0,
            y: -20,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
              onFinish?.();
            }
          });
        }
      });
    }
  }, [isReady, onFinish]);

  return (
    <div className="dm-loader-wrapper" ref={wrapperRef}>
      <style>{`
        .dm-loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: var(--light-purple); 
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999999;
          font-family: var(--font-heading); 
          overflow: hidden;
        }

        .dm-loader-wrapper::before {
          content: '';
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 75%);
          filter: blur(100px);
          opacity: 0.7;
        }

        .dm-loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .dm-loader-logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .dm-loader-main-lotus {
          width: 65px;
          height: 65px;
          color: var(--accent-gold); 
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.3)); 
          stroke-width: 0.7px;
        }

        .dm-loader-text {
          font-size: 3.8rem;
          letter-spacing: 0.7em;
          margin: 0;
          text-transform: uppercase;
          font-weight: 400;
          padding-left: 0.7em;
          background: linear-gradient(
            135deg, 
            var(--primary-purple) 0%, 
            var(--accent-gold) 25%, 
            var(--primary-purple) 50%, 
            var(--accent-gold) 75%, 
            var(--primary-purple) 100%
          );
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: dm-text-shine 10s ease infinite;
          filter: drop-shadow(0 2px 1px rgba(0,0,0,0.05));
        }

        @keyframes dm-text-shine {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }

        .dm-loader-dots-wrap {
          display: flex;
          justify-content: center;
          margin-top: -20px;
          gap: 5px;
        }

        .dm-loader-dot {
          font-size: 3rem;
          color: var(--accent-gold); 
          font-weight: bold;
          filter: drop-shadow(0 0 5px var(--accent-gold));
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
        }

        .dm-loader-progress-bg {
          width: 400px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.4); 
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          margin-top: 50px;
          overflow: hidden;
          position: relative;
          border-radius: 2px;
        }

        .dm-loader-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: linear-gradient(
            90deg, 
            #BFA043 0%, 
            var(--accent-gold) 50%, 
            #BFA043 100%
          );
          background-size: 200% auto;
          box-shadow: 0 0 20px var(--accent-gold);
          animation: dm-loader-shine 3s infinite linear;
        }

        @keyframes dm-loader-shine {
          to { background-position: 200% center; }
        }

        @media (max-width: 600px) {
          .dm-loader-text {
            font-size: 2.2rem;
            letter-spacing: 0.5em;
            padding-left: 0.5em;
          }
          .dm-loader-progress-bg {
            width: 280px;
          }
        }
      `}</style>

      <div className="dm-loader-content">
        <div className="dm-loader-logo-area">
          <div className="dm-loader-lotus-box">
           <Sparkles className="dm-loader-main-lotus" />
          </div>
          <h1 className="dm-loader-text">DIAMORE</h1>
        </div>

        <div className="dm-loader-dots-wrap">
          <span className="dm-loader-dot">.</span>
          <span className="dm-loader-dot">.</span>
          <span className="dm-loader-dot">.</span>
        </div>

        <div className="dm-loader-progress-bg">
          <div ref={progressBarRef} className="dm-loader-progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;