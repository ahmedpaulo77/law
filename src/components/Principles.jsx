import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RingsScene from './RingsScene'

gsap.registerPlugin(ScrollTrigger)

export default function Principles() {
  const section = useRef(null)
  const progress = useRef(0)

  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
    return () => trigger.kill()
  }, [])

  return (
    <section className="principles" id="principles" ref={section}>
      <div className="principles__sticky">
        <div className="container principles__inner">
          <div className="principles__text" data-reveal>
            <span className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              مبدأنا
            </span>
            <h2>
              لا نبيع وعودًا…
              <br />
              <span className="gold-text">نُدير ملفًا.</span>
            </h2>
            <p>
              كل قضية تبدأ بسؤال واحد: أين نقطة الضعف؟ نجيب عليه قبل الجلسة الأولى، لا
              بعدها.
            </p>
            <ul className="principles__facts">
              <li>مراجعة مزدوجة لكل مستند</li>
              <li>خطة مكتوبة قبل أي إجراء</li>
              <li>تقرير حالة أسبوعي</li>
            </ul>
          </div>

          <div className="principles__visual" aria-hidden="true">
            <RingsScene progress={progress} />
          </div>
        </div>
      </div>
    </section>
  )
}
