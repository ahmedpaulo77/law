import { useState } from 'react'

const links = [
  { href: '#about', label: 'من نحن' },
  { href: '#practice', label: 'مجالات الممارسة' },
  { href: '#principles', label: 'مبدأنا' },
  { href: '#team', label: 'الفريق' },
  { href: '#articles', label: 'المقالات' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="brand" href="#home" aria-label="النخبة للمحاماة — الرئيسية">
          <span className="brand__mark" aria-hidden="true">
            ن
          </span>
          <span className="brand__text">
            النخبة
            <small>للمحاماة والاستشارات القانونية</small>
          </span>
        </a>

        <nav className="nav__links" aria-label="التنقل الرئيسي">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn--sm" href="#contact">
            احجز استشارة
          </a>
          <button
            type="button"
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <nav aria-label="قائمة الموبايل">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={close}>
            تواصل معنا
          </a>
        </nav>
      </div>
    </header>
  )
}
