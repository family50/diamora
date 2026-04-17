import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Home from './home';
import About from './about';
import Collections from './collections/Collections';
import Cart from './cart/Cart';
import Corporate from './corporate';
import Loading from './loding'; // تأكد من أن المسار الصحيح هو ./loading إذا كان مكتوباً خطأ
import Mouse from './mouse'; 

export default function App() {
    // 1. إدارة اللغة
    const [lang, setLang] = useState(localStorage.getItem('language') || 'en');
    
    // 2. إدارة شاشة التحميل
    const [isLoading, setIsLoading] = useState(true);
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

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

    // 4. منطق فحص تحميل الصور والفيديوهات
    useEffect(() => {
        const checkAssets = async () => {
            // ننتظر قليلاً للتأكد من أن المتصفح بدأ في قراءة الـ DOM للمكونات
            await new Promise(resolve => setTimeout(resolve, 200));

            const images = Array.from(document.images);
            const videos = Array.from(document.querySelectorAll('video'));

            const imagePromises = images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve; 
                });
            });

            const videoPromises = videos.map(video => {
                // readyState >= 2 تعني أن المتصفح حمل ما يكفي لبدء التشغيل
                if (video.readyState >= 2) return Promise.resolve();
                return new Promise(resolve => {
                    video.oncanplaythrough = resolve;
                    video.onerror = resolve;
                    // أمان إضافي: لو الفيديو تأخر جداً نعتبره حمل عشان الصفحة متوقفش
                    setTimeout(resolve, 10000); 
                });
            });

            await Promise.all([...imagePromises, ...videoPromises]);
            setIsAssetsLoaded(true); // إشارة للمكون Loading إن كل شيء جاهز
        };

        // استدعاء الفحص مباشرة
        checkAssets();
    }, []);

    return (
        <Router>
            {/* الماوس يظهر فقط بعد اختفاء اللودر تماماً */}
            {!isLoading && <Mouse />}
            
            {/* شاشة التحميل - نمرر لها حالة الجاهزية */}
            {isLoading && (
                <Loading 
                    isReady={isAssetsLoaded} 
                    onFinish={() => setIsLoading(false)} 
                />
            )}

            {/* ملاحظة هندسية: الـ Container لازم يكون موجود في الـ DOM (مش مخفي بـ &&) 
               عشان المتصفح يشوف الصور والفيديوهات ويبدأ يحملهم فعلياً.
            */}
            <div 
                className="app-container" 
                style={{ 
                    opacity: isLoading ? 0 : 1, 
                    transition: 'opacity 1s ease-in-out',
                    // منع التفاعل مع الصفحة أو السكرول طول ما اللودر شغال
                    visibility: isLoading ? 'hidden' : 'visible',
                    height: isLoading ? '100vh' : 'auto',
                    overflow: isLoading ? 'hidden' : 'visible'
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