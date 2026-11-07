import { useState } from 'react'

const contactRows = [
  {
    label: 'الهاتف',
    value: '+20 100 000 0000',
    ltr: true,
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
    ),
  },
  {
    label: 'البريد',
    value: 'info@elnokhba.law',
    ltr: true,
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
  },
  {
    label: 'المكتب',
    value: 'التجمع الخامس — القاهرة الجديدة',
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__panel" data-reveal>
          <div className="contact__info">
            <span className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              تواصل معنا
            </span>
            <h2>لنبدأ بملفك.</h2>
            <p>
              اكتب ملخصًا قصيرًا لموضوعك، وسنعاود التواصل خلال يوم عمل واحد لتحديد موعد
              استشارة.
            </p>

            <ul className="contact__rows">
              {contactRows.map((row) => (
                <li key={row.label}>
                  <span className="contact__icon" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {row.icon}
                    </svg>
                  </span>
                  <span className="contact__label">{row.label}</span>
                  <span className="contact__value" dir={row.ltr ? 'ltr' : undefined}>
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              الاسم الكامل
              <input name="name" type="text" placeholder="اسمك" required />
            </label>

            <label>
              رقم الهاتف
              <input name="phone" type="tel" placeholder="01xxxxxxxxx" dir="ltr" required />
            </label>

            <label className="form__full">
              نوع الاستشارة
              <select name="topic" defaultValue="تجاري">
                <option value="تجاري">تجاري وعقود</option>
                <option value="شركات">شركات واستثمار</option>
                <option value="تحكيم">تقاضي وتحكيم</option>
                <option value="أخرى">أخرى</option>
              </select>
            </label>

            <label className="form__full">
              تفاصيل الطلب
              <textarea name="message" rows="4" placeholder="اكتب ملخصًا للموضوع…" />
            </label>

            <button className="btn" type="submit">
              إرسال الطلب
            </button>

            {sent && (
              <p className="form__ok" role="status">
                تم استلام طلبك — سنعاود التواصل قريبًا.
              </p>
            )}
            <p className="form__note">نموذج تجريبي: البيانات المعروضة لا تُرسل إلى أي جهة.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
