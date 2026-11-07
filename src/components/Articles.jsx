const posts = [
  {
    category: 'عقود',
    date: '١٢ أكتوبر ٢٠٢٦',
    title: 'خمس بنود تحمي شركتك في أي عقد تجاري',
    excerpt: 'البنود اللي بتفرق بين عقد محكم وعقد بيخسرك في أول نزاع.',
  },
  {
    category: 'شركات',
    date: '٢٨ سبتمبر ٢٠٢٦',
    title: 'قبل التأسيس: شكل الشركة وأثره على الضرائب',
    excerpt: 'اختيار الشكل القانوني مش إجراء شكلي، ده قرار بيلاحقك سنين.',
  },
  {
    category: 'تحكيم',
    date: '٩ سبتمبر ٢٠٢٦',
    title: 'متى يكون التحكيم أسرع من المحكمة؟',
    excerpt: 'ليس دائمًا… ثلاث حالات فقط يوفّر فيها التحكيم وقتًا حقيقيًا.',
  },
]

export default function Articles() {
  return (
    <section className="section articles" id="articles">
      <div className="container">
        <div className="section__head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            مقالات وأخبار
          </span>
          <h2>نقرأ لك القانون… بلغة مفهومة.</h2>
          <p className="section__lead">
            مقالات قصيرة تشرح مواقف قانونية متكررة، مكتوبة لصاحب القرار مش للمحامين.
          </p>
          <div className="rule" data-line />
        </div>

        <div className="posts" data-stagger>
          {posts.map((post) => (
            <article className="post" key={post.title}>
              <div className="post__meta">
                <span className="post__category">{post.category}</span>
                <span className="post__date">{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="post__more">
                نموذج مقال
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
