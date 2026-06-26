import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-12 pt-10">
      <div className="rounded-3xl glass p-8 sm:p-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#home" className="font-display text-2xl font-bold tracking-tight gradient-text">
              {profile.name}.
            </a>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">{profile.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: profile.socials.github },
              { icon: Linkedin, href: profile.socials.linkedin },
              { icon: Mail, href: `mailto:${profile.email}` },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                aria-label="social link"
                className="grid h-11 w-11 place-items-center rounded-full glass transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-accent-glow"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[var(--muted)] sm:flex-row">
          <p>
            © {2026} {profile.name}. Crafted with care.
          </p>
          <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]" data-cursor="hover">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
