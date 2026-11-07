import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Scene from './Scene'
import { usePrefersReducedMotion } from '../hooks'

const stats = [
  { value: 20, suffix: '', label: 'عامًا في المحاكم' },
  { value: 450, suffix: '', label: 'ملفًا قانونيًا' },
  { value: 96, suffix: '٪', label: 'عملاء يعودون إلينا' },
]

const formatNumber = (value) =>
  Math.round(value).toLocaleString('ar-EG', { useGrouping: false })

export default function Hero() {
  const statRefs = useRef([])
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      statRefs.current.forEach((el, index) => {
        if (!el) return
        const state = { value: 0 }
        gsap.to(state, {
          value: stats[index].value,
          duration: 1.6,
          delay: 0.6 + index * 0.12,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = formatNumber(state.value)
          },
        })
      })
    })

    return () => ctx.revert()
  }, [reduced])

  function handleMagnet(event) {
    if (reduced) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    gsap.to(event.currentTarget, { x: x * 0.16, y: y * 0.22, duration: 0.45, ease: 'power2.out' })
  }

  function resetMagnet(event) {
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow" data-hero>
            <span className="eyebrow__dot" aria-hidden="true" />
            النخبة للمحاماة والاستشارات القانونية
          </span>

          <h1 className="hero__title" data-hero>
            حقّك يستحق
            <span className="gold-text"> دفاعًا بلا تهاون.</span>
          </h1>

          <p className="hero__lead" data-hero>
            أكثر من عشرين عامًا في التقاضي والتحكيم واستشارات الشركات، بفريق يدرس تفاصيل
            قضيتك قبل أن يراها الخصم.
          </p>

          <div className="hero__actions" data-hero>
            <a
              className="btn"
              href="#contact"
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
            >
              احجز استشارة
            </a>
            <a className="btn btn--ghost" href="#practice">
              مجالات الممارسة
            </a>
          </div>

          <dl className="hero__stats" data-hero>
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <dt>
                  <span
                    ref={(el) => {
                      statRefs.current[index] = el
                    }}
                  >
                    {formatNumber(stat.value)}
                  </span>
                  {stat.suffix}
                </dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" data-hero aria-hidden="true">
          <span className="hero__glow" />
          <Scene />
          <span className="hero__hint">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            اسحب المجسم لتدويره
          </span>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>مرّر للأسفل</span>
        <i />
      </div>
    </section>
  )
}
