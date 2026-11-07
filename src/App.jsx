import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Practice from './components/Practice'
import Principles from './components/Principles'
import About from './components/About'
import Team from './components/Team'
import Articles from './components/Articles'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })

      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 82%', once: true },
        })
      })

      gsap.utils.toArray('[data-line]').forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: line, start: 'top 90%', once: true },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        تخطَّ إلى المحتوى
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Practice />
        <Principles />
        <About />
        <Team />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
