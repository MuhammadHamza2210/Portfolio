import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Check } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import MagneticButton from '../MagneticButton'
import { profile } from '../../data/portfolio'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Wire this up to your email service (Formspree, Resend, etc.)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        subtitle="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="flex h-full flex-col justify-between rounded-3xl glass-strong p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold">Get in touch</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Currently {profile.available ? 'available' : 'not available'} for new projects and collaborations.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm transition-colors hover:text-accent-glow">
                <span className="grid h-10 w-10 place-items-center rounded-xl glass"><Mail size={16} /></span>
                {profile.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <span className="grid h-10 w-10 place-items-center rounded-xl glass"><MapPin size={16} /></span>
                {profile.location}
              </div>
            </div>
          </div>
        </motion.div>

        {/* form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 rounded-3xl glass p-8 lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Ada Lovelace" />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="Project inquiry" />
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your idea..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--muted)]/60 focus:border-accent/60 focus:bg-white/[0.05]"
            />
          </div>
          <MagneticButton onClick={() => {}}>
            {sent ? (
              <>
                <Check size={16} /> Message sent
              </>
            ) : (
              <>
                <Send size={16} /> Send message
              </>
            )}
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-[var(--muted)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--muted)]/60 focus:border-accent/60 focus:bg-white/[0.05]"
      />
    </div>
  )
}
