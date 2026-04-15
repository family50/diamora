import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './home';
import About from './about';
import Collections from './collections/Collections';
import Cart from './cart/Cart';
import Corporate from './corporate';

export default function App() {
    // 1. جلب اللغة المحفوظة من المتصفح، أو استخدام 'en' كافتراضي
    const [lang, setLang] = useState(localStorage.getItem('language') || 'en');

    // 2. دالة تبديل اللغة مع الحفظ في الـ LocalStorage
    const toggleLanguage = () => {
        const nextLang = lang === 'en' ? 'ar' : 'en';
        setLang(nextLang);
        localStorage.setItem('language', nextLang); // حفظ الاختيار
    };

    return (
        <Router>
            {/* نمرر اللغة والدالة للهيدر */}
            <Header lang={lang} toggleLanguage={toggleLanguage} />
            
            <main>
                <Routes>
                    {/* تمرير البروب فقط للصفحة الرئيسية حالياً بناءً على طلبك */}
                    <Route path="/" element={<Home lang={lang} />} />
                    
                    {/* باقي الصفحات بدون ترجمة حالياً */}
                    <Route path="/about" element={<About />} />
                    <Route path="/collections/collections" element={<Collections />} />
                    <Route path="/cart/Cart" element={<Cart />} />
                    <Route path="/corporate" element={<Corporate />} />
                </Routes>
            </main>
        </Router>
    );
}