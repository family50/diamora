import "./fotter.css";
import LuxeMedia from './LuxeMedia';
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
                  <LuxeMedia 
   
   
    className="footer-logo-wrapper"
>
    <img 
        src="/logo.AVIF" 
        alt="Diamore Logo" 
        className="footer-logo" 
       
    />
</LuxeMedia>
                    <p className="footer-tagline">
                    {lang === 'en' 
    ? "At Diamore, we believe chocolate is more than just a treat; it is a feeling, a comfort, and a connection. From our kitchen to your heart, every piece is crafted with love and a touch of magic."
    : "في ديامور، نؤمن بأن الشوكولاتة ليست مجرد حلوى، بل هي مشاعر وراحة وتواصل. من مطبخنا إلى قلبك، كل قطعة مصنوعة بحب ولمسة سحرية."
}
                    </p>
                    <div className="social-links">
    <a 
      href="https://www.facebook.com/diamorechocolate/" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Facebook"
      onClick={(e) => e.stopPropagation()}
    >
      <i className="fab fa-facebook-f"></i>
    </a>
    
    <a 
      href="https://www.instagram.com/diamorechocolate/" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Instagram"
      onClick={(e) => e.stopPropagation()}
    >
      <i className="fab fa-instagram"></i>
    </a>
    
    <a 
      href="https://www.tiktok.com/@diamorechocolate" 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="TikTok"
      onClick={(e) => e.stopPropagation()}
    >
      <i className="fab fa-tiktok"></i>
    </a>
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
                         {lang === 'en' 
    ? 'Digital Boutique: Based in Cairo, Egypt' 
    : 'بوتيك رقمي: من قلب القاهرة، مصر'}
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