import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './home';
import About from './about';
import Collections from './collections/Collections';
import Cart from './cart/Cart';
import Corporate from './corporate';
import Loading from './loding'; // تأكد من تسمية الملف وكتابة المسار الصحيح
import Mouse from './mouse'; 
export default function App() {
    // 1. إدارة اللغة
    const [lang, setLang] = useState(localStorage.getItem('language') || 'en');
    
    // 2. إدارة شاشة التحميل
    const [isLoading, setIsLoading] = useState(true);

    const toggleLanguage = () => {
        const nextLang = lang === 'en' ? 'ar' : 'en';
        setLang(nextLang);
        localStorage.setItem('language', nextLang);
    };

    // 3. تحديث اتجاه الصفحة (RTL/LTR) عند تغيير اللغة
    useEffect(() => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [lang]);

    return (
        <Router>
            {!isLoading && <Mouse />}
            {/* شاشة التحميل تظهر طالما أن isLoading تساوي true */}
            {isLoading && (
                <Loading onFinish={() => setIsLoading(false)} />
            )}

            {/* محتوى الموقع - يظهر بـ Fade In ناعم بعد انتهاء التحميل */}
            <div 
                className="app-container" 
                style={{ 
                    opacity: isLoading ? 0 : 1, 
                    transition: 'opacity 1s ease-in-out',
                    visibility: isLoading ? 'hidden' : 'visible'
                }}
            >
                <Header lang={lang} toggleLanguage={toggleLanguage} />
                
                <main>
                    <Routes>
                        <Route path="/" element={<Home lang={lang} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/collections/collections" element={<Collections />} />
                        <Route path="/cart/Cart" element={<Cart />} />
                        <Route path="/corporate" element={<Corporate />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}