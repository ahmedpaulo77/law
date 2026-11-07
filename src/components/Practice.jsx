const areas = [
  {
    num: '٠١',
    title: 'القانون التجاري والعقود',
    desc: 'صياغة ومراجعة العقود التجارية، تسوية النزاعات، وحماية مصالح شركتك في كل تعامل.',
    icon: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h6M10 16h6" />
      </>
    ),
  },
  {
    num: '٠٢',
    title: 'التقاضي والتحكيم',
    desc: 'تمثيل أمام جميع المحاكم وهيئات التحكيم المحلية والدولية، من أول جلسة حتى التنفيذ.',
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V9l7-4 7 4v12" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    num: '٠٣',
    title: 'قانون الشركات والاستثمار',
    desc: 'تأسيس الشركات، الاندماج والاستحواذ، والامتثال التنظيمي بما يحفظ استثمارك.',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </>
    ),
  },
]

function handleTilt(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  card.style.transitionDuration = '0.12s'
  card.style.transform = `perspective(800px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`
}

function resetTilt(event) {
  event.currentTarget.style.transitionDuration = ''
  event.currentTarget.style.transform = ''
}

export default function Practice() {
  return (
    <section className="section practice" id="practice">
      <div className="container">
        <div className="section__head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            مجالات الممارسة
          </span>
          <h2>ما نقوم به… باحتراف.</h2>
          <p className="section__lead">
            ثلاثة مسارات نتحرك فيها بثقة، لأن التخصص هو أول خطوة في الدفاع الصحيح.
          </p>
          <div className="rule" data-line />
        </div>

        <div className="cards" data-stagger>
          {areas.map((area) => (
            <article
              className="card"
              key={area.title}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <span className="card__num" aria-hidden="true">
                {area.num}
              </span>
              <span className="card__icon" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {area.icon}
                </svg>
              </span>
              <h3>{area.title}</h3>
              <p>{area.desc}</p>
            </article>
          ))}
        </div>

        <p className="practice__note" data-reveal>
          حالتك خارج هذه المجالات؟{' '}
          <a href="#contact">تواصل معنا وسنوجّهك للمختص</a>
        </p>
      </div>
    </section>
  )
}
