import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './header.css';

interface HeaderProps {
    lang: string;
    toggleLanguage: () => void;
}

export default function Header({ lang, toggleLanguage }: HeaderProps) {
    const location = useLocation(); // لمعرفة المسار الحالي
    const isHomePage = location.pathname === '/'; // هل نحن في الرئيسية؟

    const [logoSrc, setLogoSrc] = useState(window.innerWidth < 850 ? './logo2.AVIF' : './logo.AVIF');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        html.setAttribute('lang', lang);

        const handleScroll = () => {
            // الهيدر يتغير عند السكرول فقط في الصفحة الرئيسية
            // أما في باقي الصفحات، نعتبره "Scrolled" دائماً
            if (isHomePage) {
                setIsScrolled(window.scrollY > 50);
            } else {
                setIsScrolled(true);
            }
        };

        // استدعاء يدوي عند تغيير الصفحة لضبط حالة الهيدر فوراً
        handleScroll();

        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 850);
            setLogoSrc(width < 850 ? './logo2.AVIF' : './logo.AVIF');
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [lang, isHomePage]); // أضفنا isHomePage هنا

    // لتسهيل الكود، سنستخدم متغير لتحديد كلاس الحالة
    const headerStatusClass = isHomePage 
        ? (isScrolled ? 'scrolled' : 'initial') 
        : 'scrolled always-scrolled';
   return (
        <>
            <header className={`main-header ${headerStatusClass} ${isMobile ? 'mobile-mode' : ''}`}>
                <nav className="nav-container">
                    {!isMobile && (
                        <div className="nav-left">
                            <ul className="nav-links">
                                {/* استخدام NavLink لتمييز الرابط النشط */}
                                <li><NavLink to="/"><span>{lang === 'en' ? 'Home' : 'الرئيسية'}</span></NavLink></li>
                                <li style={{ color: '#ffffff' }}><span>{lang === 'en' ? 'Collections' : 'المجموعات'}</span></li>
                                <li style={{ color: '#ffffff' }}><span>{lang === 'en' ? 'About' : 'من نحن'}</span></li>
                                <li className="desktop-cart-li">
                                    <a className="desktop-cart">
                                        <div className="cart-wrapper">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <span className="cart-count">0</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="nav-center">
                        <Link to="/" className="logo-box">
                            <img src={logoSrc} alt="Diamore Logo" className="logo-img" />
                        </Link>
                    </div>

               <div className="nav-right">
                         {/* رابط Corporate أيضاً يمكن تمييزه */}
                         <nav  className="corporate-link">
                             <i className="fa-solid fa-handshake"></i>
                             <span>{lang === 'en' ? 'Corporate' : 'للشركات'}</span>
                         </nav>
                         <button className="lang-toggle-btn" onClick={toggleLanguage}>
                            {lang === 'en' ? 'العربية' : 'English'}
                        </button>
                    </div>
                </nav>
            </header>

            {isMobile && (
                <div className="mobile-bottom-nav">
                    <ul className="mobile-nav-links">
                        <li><NavLink to="/"><i className="fa-solid fa-house"></i><span>{lang === 'en' ? 'Home' : 'الرئيسية'}</span></NavLink></li>
                        <li><a ><i className="fa-solid fa-gem"></i><span>{lang === 'en' ? 'Collections' : 'المجموعات'}</span></a></li>
                        <li><a><i className="fa-solid fa-leaf"></i><span>{lang === 'en' ? 'About' : 'من نحن'}</span></a></li>
                        <li>
                            <a>
                                <div className="cart-wrapper">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="cart-count">0</span>
                                </div>
                                <span>{lang === 'en' ? 'Cart' : 'السلة'}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}