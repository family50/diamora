import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

interface HeaderProps {
    lang: string;
    toggleLanguage: () => void;
}

export default function Header({ lang, toggleLanguage }: HeaderProps) {
    const [logoSrc, setLogoSrc] = useState(window.innerWidth < 850 ? './logo2.png' : './logo.png');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

    useEffect(() => {
        // تحديث سمات الـ HTML للاتجاه واللغة فور تغير الحالة
        const html = document.documentElement;
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        html.setAttribute('lang', lang);

        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 850);
            setLogoSrc(width < 850 ? './logo2.png' : './logo.png');
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [lang]);

    return (
        <>
            <header className={`main-header ${isScrolled ? 'scrolled' : 'initial'} ${isMobile ? 'mobile-mode' : ''}`}>
                <nav className="nav-container">
                    {!isMobile && (
                        <div className="nav-left">
                            <ul className="nav-links">
                                <li><Link to="/"><span>{lang === 'en' ? 'Home' : 'الرئيسية'}</span></Link></li>
                                <li><Link to="/collections/collections"><span>{lang === 'en' ? 'Collections' : 'المجموعات'}</span></Link></li>
                                <li><Link to="/about"><span>{lang === 'en' ? 'About' : 'من نحن'}</span></Link></li>
                                <li className="desktop-cart-li">
                                    <Link to="/cart/Cart" className="desktop-cart">
                                        <div className="cart-wrapper">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <span className="cart-count">0</span>
                                        </div>
                                    </Link>
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
    <button className="lang-toggle-btn" onClick={toggleLanguage}>
        {lang === 'en' ? 'العربية' : 'English'}
    </button>
    
    <Link to="/corporate" className="corporate-link">
        <i className="fa-solid fa-handshake"></i>
        <span>{lang === 'en' ? 'Corporate' : 'للشركات'}</span>
    </Link>
</div>
                </nav>
            </header>

            {isMobile && (
                <div className="mobile-bottom-nav">
                    <ul className="mobile-nav-links">
                        <li><Link to="/"><i className="fa-solid fa-house"></i><span>{lang === 'en' ? 'Home' : 'الرئيسية'}</span></Link></li>
                        <li><Link to="/collections/collections"><i className="fa-solid fa-gem"></i><span>{lang === 'en' ? 'Collections' : 'المجموعات'}</span></Link></li>
                        <li><Link to="/about"><i className="fa-solid fa-leaf"></i><span>{lang === 'en' ? 'About' : 'من نحن'}</span></Link></li>
                        <li>
                            <Link to="/cart/Cart">
                                <div className="cart-wrapper">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="cart-count">0</span>
                                </div>
                                <span>{lang === 'en' ? 'Cart' : 'السلة'}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}