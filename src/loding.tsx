import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// تأكد من استخدام الاسم الصحيح هنا (Lotus أو Flower2) بناءً على ما عمل معك
import { Sparkles } from 'lucide-react';

interface LoadingProps {
  onFinish?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onFinish }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    // منع السكرول بشكل قاطع فور تشغيل اللودر
    const lockScroll = () => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '5px'; // تعويض مكان السكرول بار لمنع "الرعشة"
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    };

    lockScroll();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(wrapperRef.current, {
            opacity: 0,
            y: -20,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
              unlockScroll(); // فتح السكرول فقط بعد اختفاء اللودر تماماً
              onFinish?.();
            }
          });
        }
      });

      gsap.set(".dm-loader-content", { opacity: 1 });

      tl.to(progressBarRef.current, { 
        width: "100%", 
        duration: 2.5, // مدة أطول لتعطي تأنّي فخم
        ease: "power4.inOut",
      });

      // أنميشن مستمر للأيقونة (دوران هادئ جداً ونبض)
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
      
      // أنميشن النقط الماسية
      gsap.to(".dm-loader-dot", { 
        opacity: 0.3, 
        scale: 0.8,
        repeat: -1, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power1.inOut"
      });

    }, wrapperRef);

  // 3. احتياطاً: لو المكون اتشال فجأة (Unmount) نرجع السكرول
return () => {
      unlockScroll();
      ctx.revert();
    };
  }, [onFinish]);

  return (
    <div className="dm-loader-wrapper" ref={wrapperRef}>
      <style>{`
        .dm-loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          /* الحفاظ على لون الخلفية الموف الفاتح العاجب */
          background-color: var(--light-purple); 
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999999;
          font-family: var(--font-heading); 
          overflow: hidden;
        }

        /* هالة ذهبية ناعمة جداً وأوسع */
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

        .dm-loader-lotus-box {
          margin-bottom: 0px;
        }

        .dm-loader-main-lotus {
          width: 65px;
          height: 65px;
          color: var(--accent-gold); 
          /* توهج أنعم */
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.3)); 
          stroke-width: 0.7px; /* خط فائق الرفع لزيادة الرقي */
        }

        .dm-loader-text {
          font-size: 3.8rem;
          letter-spacing: 0.7em;
          margin: 0;
          text-transform: uppercase;
          font-weight: 400;
          padding-left: 0.7em;
          
          /* تأثير الذهب المعدني (Metallic Gold) للنص */
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
          
          /* أنميشن لمعان الذهب (Shimmer) */
          animation: dm-text-shine 10s ease infinite;
          
          /* ظل خفي جداً لإعطاء عمق */
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
          /* تأثير بريق الألماس النقطي */
          filter: drop-shadow(0 0 5px var(--accent-gold));
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
        }

        /* تصميم شريط التحميل بأسلوب الزجاج الطافي (Floating Glass) */
        .dm-loader-progress-bg {
          width: 400px;
          height: 2px;
          /* تأثير زجاجي شفاف */
          background-color: rgba(255, 255, 255, 0.4); 
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          margin-top: 50px;
          overflow: hidden;
          position: relative;
          border-radius: 2px;
          border: 1px solid rgba(212, 175, 55, 0.05); /* إطار ذهبي لا يرى */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03); /* ظل ناعم للسقوط */
        }

        .dm-loader-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          /* تدرج ذهبي ملكي ثري */
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
          .dm-loader-main-lotus {
            width: 45px;
            height: 45px;
          }
          .dm-loader-progress-bg {
            width: 280px;
            margin-top: 40px;
          }
          .dm-loader-dot {
            font-size: 2.2rem;
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