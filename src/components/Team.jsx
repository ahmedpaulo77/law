const members = [
  {
    letter: 'ك',
    name: 'كريم منصور',
    role: 'شريك مؤسس · تحكيم',
    bio: 'خبرة في التحكيم التجاري والدولي، وتمثيل الشركات أمام هيئات التحكيم.',
  },
  {
    letter: 'ه',
    name: 'هدى الشاذلي',
    role: 'شريك · شركات واستثمار',
    bio: 'تأسيس الشركات، الاندماج والاستحواذ، وهيكلة الاستثمارات.',
  },
  {
    letter: 'ع',
    name: 'عمر فتحي',
    role: 'محامٍ أول · تقاضي',
    bio: 'إدارة ملفات التقاضي المدني والتجاري من أول جلسة حتى التنفيذ.',
  },
]

export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="container">
        <div className="section__head" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            فريق المحامين
          </span>
          <h2>أسماء تعرفها… ومسؤولية واضحة.</h2>
          <p className="section__lead">
            كل ملف له محامٍ مسؤول تعرفه بالاسم، ويعمل معه فريق مراجعة داخلي.
          </p>
          <div className="rule" data-line />
        </div>

        <div className="team__grid" data-stagger>
          {members.map((member) => (
            <article className="member" key={member.name}>
              <span className="member__avatar" aria-hidden="true">
                {member.letter}
              </span>
              <h3>{member.name}</h3>
              <span className="member__role">{member.role}</span>
              <p>{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
