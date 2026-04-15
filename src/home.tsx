import { useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
        const step = 450; 
        
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
            gsap.fromTo(heroSecRef.current, 
                { opacity: 0, scale: 1.1 }, 
                { 
                    opacity: 1, scale: 1, duration: 2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: heroSecRef.current,
                        start: "top 50%",
                        once: true 
                    }
                }
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
            gsap.fromTo(offersSecRef.current,
                { opacity: 0, x: lang === 'ar' ? 100 : -100 },
                { 
                    opacity: 1, x: 0, duration: 1.2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: offersSecRef.current,
                        start: "top 70%",
                        once: true
                    }
                }
            );

            // --- 4. السيكشن الرابع (Heritage) ---
            const heritageTL = gsap.timeline({
                scrollTrigger: { trigger: heritageSecRef.current, start: "top 70%", once: true }
            });
            heritageTL.from(".heritage-image-side", { x: -100, opacity: 0, duration: 1.5, ease: "power4.out" })
                      .from(".heritage-content-side", { x: 100, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=1");

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

            // --- 6. السيكشن السادس (Floating Choc) ---
            gsap.fromTo(floatingChocSecRef.current,
                { opacity: 0, y: 150 },
                { 
                    opacity: 1, y: 0, duration: 2, ease: "elastic.out(1, 0.75)",
                    scrollTrigger: {
                        trigger: floatingChocSecRef.current,
                        start: "top 80%",
                        once: true
                    }
                }
            );

        }, [lang]); 

        return () => ctx.revert(); 
    }, [lang]);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section ref={heroSecRef} className="hero-video-section">
                <div className="video-overlay"></div> 
                <video ref={videoRef} autoPlay loop muted playsInline className="hero-video-bg">
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="video-content-wrapper">
                    <h1 className="video-title">
                        <span className="reveal-text">{t.heroTitle1}</span>
                        <br />
                        <span className="gold-text-shimmer">{t.heroTitle2}</span>
                    </h1>
                    <p className="video-subtext">{t.heroSub}</p>
                    <div className="explore-badge">
                        <span className="badge-line"></span>
                        <span className="badge-text">EST. 1924</span>
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
                                   <img 
                                        src={product.image3d1} 
                                        alt={lang === 'ar' ? product.name.ar : product.name.en} 
                                        className="img-primary" 
                                    />
                                    <img 
                                        src={product.image3d2} 
                                        alt={lang === 'ar' ? product.name.ar : product.name.en} 
                                        className="img-secondary" 
                                    />
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
                            <img src="/Diamore-Heritage-Chocolate.png" alt="Heritage" />
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
                        <path d="M500,0 C950,325 50,650 100,650 C150,650 50,975 500,1300" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="20 15" strokeLinecap="round" />
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
                            <img src="./broken-choc.png" alt="Choc" className="floating-choc" />
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