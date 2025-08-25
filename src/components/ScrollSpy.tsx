"use client";

import { useEffect } from 'react';

export default function ScrollSpy() {
  useEffect(() => {
    // Smooth scroll with focus + active state + scrollspy
    const links = document.querySelectorAll('a.nav-link, .footer-link');
    const headerEl = document.querySelector('header');
    const sections = ['#features', '#pricing', '#faq'].map(id => document.querySelector(id)).filter(Boolean);

    const setActive = (id: string) => {
      document.querySelectorAll('a.nav-link').forEach(a => a.removeAttribute('aria-current'));
      const active = document.querySelector(`a.nav-link[href="${id}"]`);
      if (active) active.setAttribute('aria-current', 'page');
    };

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (!hash || !hash.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(hash);
        if (!target) return;
        const headerHeight = headerEl?.offsetHeight || 0;
        const y = (target as HTMLElement).getBoundingClientRect().top + window.pageYOffset - (headerHeight + 12);
        window.scrollTo({ top: y, behavior: 'smooth' });
        setTimeout(() => { try { (target as HTMLElement).focus({ preventScroll: true }); } catch (_) { } }, 300);
        setActive(hash);
        history.replaceState(null, '', hash);
      });
    });

    // Scrollspy via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(`#${entry.target.id}`);
        }
      });
    }, { rootMargin: '-50% 0px -40% 0px', threshold: 0.01 });

    sections.forEach(sec => observer.observe(sec as Element));

    if (location.hash) setActive(location.hash);
    
    return () => {
      observer.disconnect();
      links.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  return null; // This component doesn't render anything
}
