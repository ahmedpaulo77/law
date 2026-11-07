export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="brand" href="#home" aria-label="النخبة للمحاماة — الرئيسية">
          <span className="brand__mark" aria-hidden="true">
            ن
          </span>
          <span className="brand__text">
            النخبة
            <small>للمحاماة والاستشارات القانونية</small>
          </span>
        </a>

        <nav className="footer__links" aria-label="روابط الفوتر">
          <a href="#about">من نحن</a>
          <a href="#practice">مجالات الممارسة</a>
          <a href="#team">الفريق</a>
          <a href="#articles">المقالات</a>
          <a href="#contact">تواصل معنا</a>
        </nav>

        <div className="footer__meta">
          <p className="footer__copy">© ٢٠٢٦ النخبة للمحاماة. جميع الحقوق محفوظة.</p>
          <p className="footer__tech">
            ديمو تفاعلي مبني بـ{' '}
            <span dir="ltr">React Three Fiber · Three.js · GSAP</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
