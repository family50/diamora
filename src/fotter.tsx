import "./fotter.css";

// إضافة الـ Interface لاستلام اللغة
interface FooterProps {
    lang: string;
}

export default function Fotter({ lang }: FooterProps) {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* العمود الأول: الهوية والوصف */}
                <div className="footer-section brand-info">
                    <img src="/logo.png" alt="Diamore Logo" className="footer-logo" />
                    <p className="footer-tagline">
                        {lang === 'en' 
                            ? "Crafting timeless Swiss chocolate masterpieces since 1924. Indulge in the symphony of pure cocoa and Alpine heritage."
                            : "نصنع تحف الشوكولاتة السويسرية الخالدة منذ عام 1924. استمتع بسيمفونية الكاكاو النقي والتراث الألبي العريق."
                        }
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
                    </div>
                </div>

                {/* العمود الثاني: الروابط السريعة */}
                <div className="footer-section quick-links">
                    <h4 className="footer-heading">{lang === 'en' ? 'Inquiries' : 'الاستفسارات'}</h4>
                    <ul>
                        <li><a href="/contact">{lang === 'en' ? 'Customer Service' : 'خدمة العملاء'}</a></li>
                        <li><a href="/corporate">{lang === 'en' ? 'Corporate Orders' : 'طلبات الشركات'}</a></li>
                        <li><a href="/heritage">{lang === 'en' ? 'Our Story' : 'قصتنا'}</a></li>
                    </ul>
                </div>

                {/* العمود الثالث: معلومات التواصل */}
                <div className="footer-section contact-info">
                    <h4 className="footer-heading">{lang === 'en' ? 'Connect' : 'تواصل معنا'}</h4>
                    <div className="contact-details">
                        <p>
                            <i className="fas fa-map-marker-alt"></i> 
                            {lang === 'en' ? ' Exclusive Boutique: Zurich, Switzerland' : ' بوتيك حصري: زيورخ، سويسرا'}
                        </p>
                        <p><i className="fas fa-envelope"></i> concierge@diamore.com</p>
                    </div>
                    <div className="gold-divider"></div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    &copy; 2026 DIAMORE CHOCOLATIER. 
                    {lang === 'en' ? ' ALL RIGHTS RESERVED.' : ' جميع الحقوق محفوظة.'}
                </p>
            </div>
        </footer>
    );
}