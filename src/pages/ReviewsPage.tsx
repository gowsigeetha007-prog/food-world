import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Twitter,
  Facebook,
  Send,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import { reviews } from '@/data';
import { StarRating } from '@/components/StarRating';
import { SectionHeading } from '@/components/SectionHeading';
import { useScrollReveal } from '@/hooks';

const times = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

export function ReviewsPage() {
  const ref = useScrollReveal<HTMLDivElement>();

  const [reserve, setReserve] = useState({
    name: '',
    email: '',
    date: '',
    time: '7:00 PM',
    guests: '2',
    request: '',
  });
  const [reserveErrors, setReserveErrors] = useState<Record<string, string>>({});
  const [reserveDone, setReserveDone] = useState(false);

  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactDone, setContactDone] = useState(false);

  const submitReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!reserve.name.trim()) err.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reserve.email)) err.email = 'Enter a valid email';
    if (!reserve.date) err.date = 'Choose a date';
    setReserveErrors(err);
    if (!Object.keys(err).length) setReserveDone(true);
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!contact.name.trim()) err.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) err.email = 'Enter a valid email';
    if (!contact.message.trim()) err.message = 'Tell us how we can help';
    setContactErrors(err);
    if (!Object.keys(err).length) {
      setContactDone(true);
      setContact({ name: '', email: '', message: '' });
    }
  };

  return (
    <div ref={ref}>
      {/* Reviews */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=700&w=1600"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="section relative py-16 text-center sm:py-20">
          <span className="eyebrow bg-white/10 text-brand-300 ring-1 ring-white/15">Testimonials</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl text-balance">
            What Our Foodies Say
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-300">
            Real stories from the people who matter most — the diners who keep coming back.
          </p>
        </div>
      </section>

      <section className="section py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="reveal group relative rounded-3xl bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
            >
              <Quote className="absolute right-6 top-6 text-brand-100 transition-colors duration-500 group-hover:text-brand-200" size={40} />
              <div className="flex items-center gap-4">
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-100"
                />
                <div>
                  <h3 className="font-display text-lg font-bold text-ink-900">{r.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating value={r.rating} size={13} />
                    <span className="text-xs text-ink-400">{r.date}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Reservation */}
      <section className="section py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading
              eyebrow="Book a table"
              title="Reserve Your Spot"
              subtitle="Planning a special evening? Send us a request and we will confirm your table right away."
              align="left"
            />
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-card sm:p-8">
              {reserveDone ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={36} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">
                    Reservation Requested!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
                    Thank you, {reserve.name.split(' ')[0] || 'foodie'}. We have received your
                    request for {reserve.date} at {reserve.time} for {reserve.guests} guest
                    {reserve.guests === '1' ? '' : 's'}. A confirmation will be sent to{' '}
                    {reserve.email}.
                  </p>
                  <button
                    onClick={() => {
                      setReserveDone(false);
                      setReserve({ name: '', email: '', date: '', time: '7:00 PM', guests: '2', request: '' });
                    }}
                    className="btn-ghost mt-6"
                  >
                    Make another reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={submitReserve} className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Name" error={reserveErrors.name}>
                    <input
                      className="input"
                      placeholder="Your name"
                      value={reserve.name}
                      onChange={(e) => setReserve({ ...reserve, name: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Email" error={reserveErrors.email}>
                    <input
                      className="input"
                      placeholder="you@email.com"
                      value={reserve.email}
                      onChange={(e) => setReserve({ ...reserve, email: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Date" error={reserveErrors.date}>
                    <input
                      type="date"
                      className="input"
                      value={reserve.date}
                      onChange={(e) => setReserve({ ...reserve, date: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Time">
                    <select
                      className="input"
                      value={reserve.time}
                      onChange={(e) => setReserve({ ...reserve, time: e.target.value })}
                    >
                      {times.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Guests" className="sm:col-span-2">
                    <select
                      className="input"
                      value={reserve.guests}
                      onChange={(e) => setReserve({ ...reserve, guests: e.target.value })}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <div className="sm:col-span-2">
                    <label className="label">Special requests</label>
                    <textarea
                      className="input min-h-[90px] resize-none"
                      placeholder="Dietary needs, seating preference, occasion…"
                      value={reserve.request}
                      onChange={(e) => setReserve({ ...reserve, request: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn-primary sm:col-span-2">
                    Reserve Now
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="reveal">
            <SectionHeading
              eyebrow="Get in touch"
              title="Contact Us"
              subtitle="Questions, feedback, or a partnership idea? We would love to hear from you."
              align="left"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactCard icon={<MapPin size={18} />} title="Address" lines={['248 Market Street', 'San Francisco, CA']} />
              <ContactCard icon={<Phone size={18} />} title="Phone" lines={['+1 (415) 555-0148', 'Daily 9am – 9pm']} />
              <ContactCard icon={<Mail size={18} />} title="Email" lines={['hello@foodiefinder.com', 'partners@foodiefinder.com']} />
              <ContactCard icon={<Clock size={18} />} title="Hours" lines={['Mon – Sun', '9:00 AM – 11:00 PM']} />
            </div>

            <div className="mt-5 rounded-3xl bg-white p-6 shadow-card sm:p-8">
              {contactDone ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={30} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Message Sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-500">
                    Thanks for reaching out. Our team will get back to you shortly.
                  </p>
                  <button onClick={() => setContactDone(false)} className="btn-ghost mt-5">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submitContact} className="grid gap-4">
                  <FormField label="Name" error={contactErrors.name}>
                    <input
                      className="input"
                      placeholder="Your name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Email" error={contactErrors.email}>
                    <input
                      className="input"
                      placeholder="you@email.com"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Message" error={contactErrors.message}>
                    <textarea
                      className="input min-h-[110px] resize-none"
                      placeholder="How can we help?"
                      value={contact.message}
                      onChange={(e) => setContact({ ...contact, message: e.target.value })}
                    />
                  </FormField>
                  <button type="submit" className="btn-primary">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map + socials */}
      <section className="section pb-16">
        <div className="reveal overflow-hidden rounded-3xl shadow-soft">
          <div className="relative h-72 bg-ink-100 sm:h-80">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.25) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-40" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-soft">
                  <MapPin size={22} />
                </span>
              </span>
              <p className="mt-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-700 backdrop-blur">
                248 Market Street, San Francisco
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <button
              key={i}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink-600 ring-1 ring-ink-200 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-500 hover:text-white"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function ContactCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-card">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
        {icon}
      </span>
      <h3 className="mt-3 text-sm font-bold text-ink-900">{title}</h3>
      {lines.map((l) => (
        <p key={l} className="text-sm text-ink-500">{l}</p>
      ))}
    </div>
  );
}
