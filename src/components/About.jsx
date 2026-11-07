const points = [
  {
    title: 'سرية مطلقة',
    desc: 'كل ما يُقال داخل المكتب يبقى داخل المكتب، بلا استثناء.',
  },
  {
    title: 'تخصص دقيق',
    desc: 'محامٍ مسؤول لكل نوع من القضايا، لا فريق عام يتعلم على حسابك.',
  },
  {
    title: 'تواصل مباشر',
    desc: 'تعرف اسم من يدير ملفك ورقمه، بدون وسطاء أو ردود آلية.',
  },
  {
    title: 'متابعة حتى التنفيذ',
    desc: 'لا نغلق الملف عند الحكم، بل نرافقه حتى آخر إجراء.',
  },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section__head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            من نحن
          </span>
          <h2>خبرة هادئة… ونتائج تتحدث.</h2>
          <div className="rule" data-line />
        </div>

        <div className="about__grid">
          <div className="about__text" data-reveal>
            <p>
              نعمل بهدوء ووضوح: نسمعك أولًا، نقرأ الملف مرتين، ثم نرسم خطة لا تعتمد على
              الحظ. فريقنا يجمع بين خبرة المحاكم والاستشارات، ويعطيك محاميًا مسؤولًا تعرف
              اسمه ورقمه حتى نهاية الطريق.
            </p>
            <blockquote>
              «القضية لا تُكسب بالصوت العالي، بل بالملف المُحكم.»
            </blockquote>
          </div>

          <ul className="about__points" data-stagger>
            {points.map((point) => (
              <li key={point.title}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <div>
                  <strong>{point.title}</strong>
                  <span>{point.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
