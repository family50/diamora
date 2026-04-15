import { useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LuxeMedia from './LuxeMedia';
// تسجيل ScrollTrigger لضمان عمله بشكل صحيح
gsap.registerPlugin(ScrollTrigger);

import type { Product } from './date/prodect'; 
import { products } from './date/prodect'; 
import './home.css';
import Fotter from './fotter';

export default function Home({ lang = 'en' }: { lang?: string }) {
    
    // 1. قاموس النصوص (تعريفه ككائن منفصل)
    const translations = {
        en: {
            heroTitle1: "Diamore",
            heroTitle2: "Pure Artistry",
            heroSub: "The finest Belgian chocolate, crafted into artistic masterpieces by Egyptian hands.",
            brandTagline: "The Art of Pure Indulgence",
            brandTitle: "DIAMORE",
            brandRoyal: "The Royal Essence",
            brandDesc: "Each piece is a story of passion, handcrafted by Egyptian hands, blending the luxury of Belgian chocolate with the spirit of local creativity. Diamore.. where craftsmanship turns into edible art.",
            dealsLabel: "CRAFTED DEALS",
            dealsTitle: "Signature Collections",
            heritageSubtitle: "Crafted to be Remembered",
            heritageTitle: "Every Piece Tells a Dessert Story",
            heritageDesc: "At Diamore, we believe chocolate is an experience to be lived, not just a dessert. Our pieces are handcrafted daily with love, completely free of preservatives to reach you fresh and bursting with authentic flavor. For perfection in every bite, we recommend refrigerating for 1 week or freezing for up to a month.",
            heritageBtn: "Order Your Masterpiece Now",
            testiTitle: "What our customers say",
            testi1: "I usually only eat Italian and French chocolates, so I was worried yours would be just like the average commercial brands. But honestly, wow! This is beyond incredible—bless your hands.",
            testi2: "The chocolate is absolutely divine, thank you so much!",
            testi3: "Seriously, it's a masterpiece! I’m so happy with it, and the Honey Pop is just spectacular!",
            exquisite: "DIAMORE",
            swiss: "Belgian Chocolate, Egyptian Soul",
            snap: "Artisan excellence in every bite.",
            discover: "DISCOVER"
        },
        ar: {
            heroTitle1: "ديامور",
            heroTitle2: "فن خالص",
            heroSub: "أجود أنواع الشوكولاتة البلجيكية، تتحول إلى تحف فنية بأيدٍ مصرية.",
            brandTagline: "فن الانغماس المطلق",
            brandTitle: "ديامور",
            brandRoyal: "الجوهر الملكي",
            brandDesc: "كل قطعة هي قصة شغف نُحتت يدوياً بأيدٍ مصرية، لنمزج فخامة الشوكولاتة البلجيكية بروح الإبداع المحلي. ديامور.. حيث الحرفة تتحول إلى فن يُتذوق.",
            dealsLabel: "عروض مختارة",
            dealsTitle: "مجموعتنا المميزة",
            heritageSubtitle: "صُنعت لتدوم ذكراها",
            heritageTitle: "كل قطعة تروي قصة عشق",
            heritageDesc: "في ديامور، نؤمن أن الشوكولاتة تجربة تُعاش وليست مجرد حلوى. تُحضر قطعنا يومياً بكل حب، خالية تماماً من المواد الحافظة لتصلكم طازجة ومفعمة بالنكهة الأصيلة. ولأننا نهتم بالتفاصيل، نوصي بحفظها مبردة للاستمتاع بجودتها لمدة أسبوع، أو تجميدها لمدة شهر كامل.",
            heritageBtn: "اطلب قطعتك الفنية الآن",
            testiTitle: "ماذا يقول عملاءنا",
            testi1: "انا باكل شيكولاتة ايطالي و فرنسي و كنت قلقانة ان الشيكولاتة بتاعتك تكون زي العادي كابري و جلاكسي شكولاتة كلها كاكاو بس بجد ايه الحلاوة دي تسلم ايدك",
            testi2: "الشيكولاتة تحفة بجد شكرا اوي",
            testi3: "بجدد تحفهههه حقيقي مبسوطة اوييي منه و ال Honey pop تحفة تحفههه",
            exquisite: "ديامور",
            swiss: "شوكولاتة بلجيكية بأيدٍ مصرية",
            snap: "تميز يدوي في كل قطمة.",
            discover: "اكتشف"
        }
    };

    // حماية: إذا كانت lang غير مدعومة أو لم تصل بعد، استخدم الإنجليزية كافتراضي
    const currentLang = (lang === 'ar' || lang === 'en') ? lang : 'en';
    const t = translations[currentLang];

    const videoRef = useRef<HTMLVideoElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const heroSecRef = useRef(null);
    const brandSecRef = useRef(null);
    const offersSecRef = useRef(null);
    const heritageSecRef = useRef(null);
    const testimonialsSecRef = useRef(null);
    const floatingChocSecRef = useRef(null);
    // مراجع داخلية للعناصر التي ستتحرك
    const testimonialCardsRef = useRef<HTMLDivElement[]>([]);

    // 1. منطق اختيار الـ 6 منتجات بطريقة "Pure"
    const displayProducts = useMemo(() => {
        // تصفية المنتجات التي عليها خصم
        const discounted = products.filter((p: Product) => !!(p.sell && p.sell < p.price));
        let finalSelection = [...discounted];

        if (finalSelection.length < 6) {
            const remaining = products.filter((p: Product) => !finalSelection.find(f => f.id === p.id));
            const extra = remaining.slice(0, 6 - finalSelection.length);
            finalSelection = [...finalSelection, ...extra];
        }

        const topSix = finalSelection.slice(0, 6);
        return [...topSix, ...topSix];
    }, []);

    // 2. كود useLayoutEffect الخاص بـ GSAP للسلايدر
    useLayoutEffect(() => {
        const slider = sliderRef.current;
        if (!slider || displayProducts.length === 0) return;

        const totalWidth = slider.scrollWidth / 2;
        const targetX = lang === 'ar' ? totalWidth : -totalWidth;

        gsap.set(slider, { x: 0 });

        tweenRef.current = gsap.to(slider, {
            x: targetX,
            duration: 35,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => {
                    const val = parseFloat(x);
                    return lang === 'ar' 
                        ? (val % totalWidth + totalWidth) % totalWidth 
                        : (val % totalWidth - totalWidth) % totalWidth;
                })
            }
        });

        return () => { 
            tweenRef.current?.kill(); 
            gsap.killTweensOf(slider);
        };
    }, [displayProducts, lang]);

    const delayRef = useRef<gsap.core.Tween | null>(null);
    
    // 3. كود handleManualScroll
    const handleManualScroll = (direction: 'left' | 'right') => {
        const mainTween = tweenRef.current;
        const slider = sliderRef.current;
        if (!mainTween || !slider) return;

        const totalWidth = slider.scrollWidth / 2;
        const step = 250; 
        
        let moveAmount = direction === 'left' ? step : -step;
        if (lang === 'ar') moveAmount *= -1; 

        gsap.killTweensOf(slider);
        if (delayRef.current) delayRef.current.kill();
        
        mainTween.timeScale(0);

        gsap.to(slider, {
            x: `+=${moveAmount}`,
            duration: 1.2,
            ease: "expo.out",
            onUpdate: function() {
                let currentX = gsap.getProperty(slider, "x") as number;
                if (lang === 'ar') {
                    if (currentX > totalWidth) currentX -= totalWidth;
                    if (currentX < 0) currentX += totalWidth;
                } else {
                    if (currentX < -totalWidth) currentX += totalWidth;
                    if (currentX > 0) currentX -= totalWidth;
                }
                gsap.set(slider, { x: currentX });
            },
            onComplete: () => {
                delayRef.current = gsap.delayedCall(3, () => {
                    gsap.to(mainTween, { 
                        timeScale: 1, 
                        duration: 2, 
                        ease: "power2.inOut" 
                    });
                });
            }
        });
    };

    // 4. كود useLayoutEffect الخاص بـ Scroll Animations
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // --- 1. السيكشن الأول (Hero Video) ---
         // --- 1. السيكشن الأول (Hero - GSAP Pure Animation) ---

// أولاً: إخفاء العناصر فوراً بواسطة GSAP (بدلاً من CSS)
gsap.set([heroSecRef.current, ".reveal-text", ".gold-text-shimmer", ".video-subtext", ".explore-badge"], { 
    autoAlpha: 0 
});

// ثانياً: أنميشن ظهور السيكشن (الفيديو) بنعومة فائقة
gsap.to(heroSecRef.current, {
    autoAlpha: 1,
    duration: 2.5,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: heroSecRef.current,
        start: "top 80%",
        once: true
    }
});

// ثالثاً: تايم لاين النصوص (ظهور متدرج "Fade" مع حركة بسيطة للأعلى)
const heroTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: heroSecRef.current,
        start: "top 45%", 
        once: true
    }
});

heroTimeline
    .fromTo(".reveal-text", 
        { y: 50, filter: "blur(15px)", autoAlpha: 0 }, 
        { 
            y: 0, 
            filter: "blur(0px)", 
            autoAlpha: 1, 
            duration: 2, 
            ease: "expo.out" 
        }
    )
    .fromTo(".gold-text-shimmer", 
        { y: 30, filter: "blur(10px)", autoAlpha: 0 }, 
        { 
            y: 0, 
            filter: "blur(0px)", 
            autoAlpha: 1, 
            duration: 1.8, 
            ease: "power3.out" 
        }, 
        "-=1.4" // تداخل انسيابي
    )
    .fromTo(".video-subtext", 
        { y: 20, autoAlpha: 0 }, 
        { 
            y: 0, 
            autoAlpha: 1, 
            duration: 1.5, 
            ease: "power2.out" 
        }, 
        "-=1.2"
    )
    .fromTo(".explore-badge", 
        { scale: 0.8, autoAlpha: 0 }, 
        { 
            scale: 1, 
            autoAlpha: 1, 
            duration: 1.2, 
            ease: "back.out(1.7)" 
        }, 
        "-=1"
    );

            gsap.from(".reveal-text, .gold-text-shimmer, .video-subtext", {
                y: 50, opacity: 0, stagger: 0.3, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: heroSecRef.current, start: "top 40%", once: true }
            });

            // --- 2. السيكشن الثاني (Brand Reveal) ---
            gsap.fromTo(brandSecRef.current,
                { y: 100, opacity: 0 },
                { 
                    y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
                    scrollTrigger: {
                        trigger: brandSecRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

        // --- 3. السيكشن الثالث (Exclusive Offers) ---
// --- 3. السيكشن الثالث (Exclusive Offers) - Ultra Smooth Reveal ---
// --- 3. السيكشن الثالث (Exclusive Offers) - Independent Reveal ---
gsap.fromTo(offersSecRef.current,
    { 
        opacity: 0, 
        y: 100, 
        scale: 0.95,
        filter: "blur(10px)" 
    },
    { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)",
        duration: 2.5,      // مدة الأنميشن ثابتة الآن (بطيئة وفخمة)
        ease: "expo.out",    // سحبة ناعمة جداً
        scrollTrigger: {
            trigger: offersSecRef.current,
            start: "top 50%", // نقطة التفعيل التي حددتها
            once: true,       // يحدث مرة واحدة فقط
            // بما أننا حذفنا scrub، الأنميشن سينطلق بمفرده بمجرد لمس هذه النقطة
        }
    }
);

 
            // --- 5. السيكشن الخامس (Testimonials) ---
            testimonialCardsRef.current.forEach((card) => {
                if (!card) return;
                gsap.fromTo(card,
                    { scale: 0.8, opacity: 0, y: 50 },
                    { 
                        scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            });

            gsap.fromTo(".magic-line path", 
                { strokeDashoffset: 1300, strokeDasharray: 1300 }, 
                { 
                    strokeDashoffset: 0, 
                    duration: 3, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".testimonials-container",
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1.5, 
                    }
                }
            );
// --- 6. السيكشن السادس (Floating Choc) - Recurring Animation ---

        }, [lang]); 

        return () => ctx.revert(); 
    }, [lang]);
    // 1. تصحيح تعريف الـ Ref في بداية الكومبوننت




useLayoutEffect(() => {
    if (!heritageSecRef.current) return;

    const ctx = gsap.context(() => {
        
        // بناء التايم لاين المتكرر
        const heritageTL = gsap.timeline({
            scrollTrigger: {
                trigger: heritageSecRef.current,
                start: "top 80%",    // يبدأ الأنميشن لما السيكشن يظهر بنسبة 20% في الشاشة
               
                // play: عند الدخول | reverse: عند الخروج للأعلى | restart: عند العودة من الأعلى | reset: عند العودة من الأسفل
                toggleActions: "play reverse restart reverse",
            }
        });

        heritageTL
            .fromTo(".heritage-image-side", 
                { 
                    x: lang === 'ar' ? 200 : -200, 
                    autoAlpha: 0, 
                    scale: 0.8, 
                    filter: "blur(20px)",
                    y: 50 
                },
                { 
                    x: 0, 
                    y: 0,
                    autoAlpha: 1, 
                    scale: 1, 
                    filter: "blur(0px)", 
                    duration: 2.5, 
                    ease: "expo.out" 
                }
            )
            .fromTo(".heritage-content-side", 
                { 
                    x: lang === 'ar' ? -200 : 200, 
                    autoAlpha: 0, 
                    filter: "blur(15px)",
                    y: 50 
                },
                { 
                    x: 0, 
                    y: 0,
                    autoAlpha: 1, 
                    filter: "blur(0px)", 
                    duration: 2, 
                    ease: "expo.out" 
                }, 
                "<" // تداخل انسيابي
            );

    }, heritageSecRef);

    return () => ctx.revert();
}, [lang]);






useLayoutEffect(() => {
    if (!floatingChocSecRef.current) return;

    const ctx = gsap.context(() => {
        
        // التايم لاين الرئيسي - تم ضبط السرعات لتكون متوسطة وفخمة
        const floatingTL = gsap.timeline({
            scrollTrigger: {
                trigger: floatingChocSecRef.current,
                start: "top 70%", // يبدأ عندما يظهر جزء جيد من السيكشن
                end: "bottom 20%",
                toggleActions: "play reverse restart reverse"
            }
        });

        floatingTL
            // 1. العنوان الرئيسي (Hook) - يرتفع بنعومة فائقة مع مسافة إزاحة متوسطة
            .fromTo(".hero-hook", 
                { 
                    y: 70, 
                    autoAlpha: 0, 
                    filter: "blur(12px)" 
                },
                { 
                    y: 0, 
                    autoAlpha: 1, 
                    filter: "blur(0px)", 
                    duration: 1.8, 
                    ease: "power3.out" 
                }
            )

            // 2. الشوكولاتة (The Star) - دخول متزن بـ Scale تدريجي
            // لاحظ قللنا الـ elastic عشان يبان أتقل وأفخم
            .fromTo(".chocolate-wrapper", 
                { 
                    y: 120, 
                    scale: 0.7, 
                     
                    autoAlpha: 0 
                },
                { 
                    y: 0, 
                    scale: 1, 
                  
                    autoAlpha: 1, 
                    duration: 2.5, 
                    ease: "power3.out" // ارتداد هادئ جداً (Subtle)
                },
                "-=1.4" // تداخل انسيابي مع العنوان
            )

            // 3. النصوص السفلية ومؤشر الاكتشاف
            .fromTo(".hero-footer-text", 
                { 
                    y: 40, 
                    autoAlpha: 0 
                },
                { 
                    y: 0, 
                    autoAlpha: 1, 
                    duration: 1.2, 
                    ease: "power3.out" 
                },
                "<"
            );

    }, floatingChocSecRef);

    return () => ctx.revert();
}, [lang]);
    return (
        <div className="home-container">
            {/* Hero Section */}
        <section ref={heroSecRef} className="hero-video-section">
    <div className="video-overlay"></div> 

    {/* LuxeMedia بياخد الـ variant والـ class اللي بيحدد مكانه */}
    <LuxeMedia 
        variant="video" 
        className="hero-video-bg-wrapper" // غلاف السكيلتون
    >
        {/* الفيديو الحقيقي بيتحط جواه، وكل الـ Props والـ ref تروح للـ video مباشرة */}
        <video
            ref={videoRef} 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            className="hero-video-bg" // كلاس الفيديو الفعلي للتنسيق
        >
            <source src="/hero-video.mp4" type="video/mp4" />
        </video>
    </LuxeMedia>

    <div className="video-content-wrapper">
        <h1 className="video-title">
            <span className="reveal-text">{t.heroTitle1}</span>
            <br />
            <span className="gold-text-shimmer">{t.heroTitle2}</span>
        </h1>
        <p className="video-subtext">{t.heroSub}</p>
        
        <div className="explore-badge">
            <span className="badge-line"></span>
            {/* تم تعديل التاريخ ليتناسب مع الهوية الجديدة لو حبيت، أو سيبه لو براندك له تاريخ قديم */}
            <span className="badge-text">EST. 2026</span> 
        </div>
    </div>
</section>

            {/* Brand Reveal */}
            <section ref={brandSecRef} className="diamore-brand-reveal">
                <div className="container">
                    <div className="brand-signature">
                        <i className="fa-solid fa-spa lotus-icon"></i>
                        <div className="vertical-gold-line"></div>
                    </div>
                    <div className="brand-content-compact">
                        <span className="brand-tagline">{t.brandTagline}</span>
                        <h2 className="brand-title">
                            {t.brandTitle} <span className="gold-gradient-text">{t.brandRoyal}</span>
                        </h2>
                        <p className="brand-description">{t.brandDesc}</p>
                    </div>
                </div>
            </section>

            {/* Exclusive Offers */}
            <section ref={offersSecRef} className="exclusive-offers-section">
                <div className="section-header">
                    <div className="header-left">
                        <span className="gold-label">{t.dealsLabel}</span>
                        <h2 className="main-heading">{t.dealsTitle}</h2>
                    </div>
                    <div className="scroll-controls">
                        <button onClick={() => handleManualScroll('left')} className="nav-btn">
                            <i className={`fa-solid fa-chevron-${lang === 'en' ? 'left' : 'right'}`}></i>
                        </button>
                        <button onClick={() => handleManualScroll('right')} className="nav-btn">
                            <i className={`fa-solid fa-chevron-${lang === 'en' ? 'right' : 'left'}`}></i>
                        </button>
                    </div>
                </div>
                
                <div className="infinite-slider-container"
                     onMouseEnter={() => tweenRef.current?.pause()}
                     onMouseLeave={() => tweenRef.current?.play()}>
                    <div className="slider-track" ref={sliderRef}>
                        {displayProducts.map((product, index) => (
                            <div className="product-offer-card" key={`${product.id}-${index}`}>
                                <div className="image-wrapper">
<LuxeMedia variant="image" className="product-media-loader">
        <img 
            src={product.image3d1} 
            alt="Primary" 
            className="img-primary" 
            
        />
        <img 
            src={product.image3d2} 
            alt="Secondary" 
            className="img-secondary" 
        />
    </LuxeMedia>
                                </div>
                                <div className="card-info">
                                    <h3 className="prod-name">
                                        {lang === 'ar' ? product.name.ar : product.name.en}
                                    </h3>
                                    <div className="price-tag">
                                        {product.sell ? (
                                            <>
                                                <span className="old-price">{product.price} EGP</span>
                                                <span className="new-price gold-gradient-text">{product.sell} EGP</span>
                                            </>
                                        ) : (
                                            <span className="normal-price">{product.price} EGP</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Heritage Section */}
            <section ref={heritageSecRef} className="about-heritage-container">
                <div className="heritage-card">
                    <div className="heritage-image-side">
                        <div className="heritage-img-wrapper">
                            <LuxeMedia variant="image" className="heritage-img">
                                <img src="/Diamore-Heritage-Chocolate.png" alt="Heritage" />
                            </LuxeMedia>
                        </div>
                    </div>
                    <div className="heritage-content-side">
                        <span className="heritage-subtitle">{t.heritageSubtitle}</span>
                        <h2 className="heritage-title">{t.heritageTitle}</h2>
                        <div className="heritage-divider"></div>
                        <p className="heritage-description">{t.heritageDesc}</p>
                        <button className="heritage-btn">{t.heritageBtn}</button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section ref={testimonialsSecRef} className="testimonials-section">
                <h2 className="testimonials-title">{t.testiTitle}</h2>
                <div className="testimonials-container">
                    <svg className="magic-line" viewBox="0 0 1000 1300" fill="none">
                        <path 
  d="M500,0 
     C950,300 50,350 50,650 
     C50,950 950,1000 500,1300" 
  stroke="url(#goldGradient)" 
  strokeWidth="1.8" 
  strokeDasharray="25 18" 
  strokeLinecap="round" 
/>
                        <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#A67C00" />
                                <stop offset="50%" stopColor="#F1D592" />
                                <stop offset="100%" stopColor="#A67C00" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div 
                    ref={(el) => { if(el) testimonialCardsRef.current[0] = el }}
                    className="testimonial-card right">
                        <div className="stars">★★★★★</div>
                        <p className="testimonial-text">{t.testi1}</p>
                        <div className="user-info">
                            <span className="user-name">Nour</span>
                        </div>
                    </div>
                    <div 
                    ref={(el) => { if(el) testimonialCardsRef.current[1] = el }}
                    className="testimonial-card left">
                        <div className="stars">★★★★★</div>
                        <p className="testimonial-text">{t.testi2}</p>
                        <div className="user-info">
                            <span className="user-name">Mai</span>
                        </div>
                    </div>
                    <div 
                    ref={(el) => { if(el) testimonialCardsRef.current[2] = el }}
                    className="testimonial-card center">
                        <div className="stars">★★★★★</div>
                        <p className="testimonial-text">{t.testi3}</p>
                        <div className="user-info">
                            <span className="user-name">Laila</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Choc Section */}
            <section ref={floatingChocSecRef} className="hero-section">
                <div className="hero-bg-text">DIAMORE</div>
                <div className="hero-content">
                    <h1 className="hero-hook">
                        <span className="gold-text">{t.exquisite}</span> <br />
                        {t.swiss}
                    </h1>
                    <div className="chocolate-container">
                        <div className="chocolate-wrapper">
                            <LuxeMedia variant="image" className="floating-choc-wrapper">
                                <img src="./broken-choc.png" alt="Choc" className="floating-choc" />
                            </LuxeMedia>
                            <div className="choc-shadow"></div>
                        </div>
                    </div>
                    <div className="hero-footer-text">
                        <p className="sub-text">{t.snap}</p>
                        <div className="scroll-indicator">
                            <span className="gold-line"></span>
                            <span className="scroll-label">{t.discover}</span>
                        </div>
                    </div>
                </div>
            </section>
            
            <Fotter lang={lang} />
        </div>
    );
}