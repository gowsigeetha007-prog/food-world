import { useEffect, useState } from 'react';
import { X, CalendarDays, Clock, Users, User, Mail, CheckCircle2 } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  restaurantName?: string;
};

const times = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

export function ReservationModal({ open, onClose, restaurantName }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '7:00 PM',
    guests: '2',
    request: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.date) e.date = 'Choose a date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg animate-scale-in rounded-t-3xl bg-white p-6 shadow-card sm:rounded-3xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={36} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">
              Reservation Requested!
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
              Thank you, {form.name.split(' ')[0] || 'foodie'}. We have received your request
              {restaurantName ? ` for ${restaurantName}` : ''} on {form.date} at {form.time} for{' '}
              {form.guests} guest{form.guests === '1' ? '' : 's'}. A confirmation will be sent to{' '}
              {form.email}.
            </p>
            <button onClick={onClose} className="btn-primary mt-7">
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold text-ink-900">Reserve a Table</h3>
            <p className="mt-1.5 text-sm text-ink-500">
              {restaurantName ? `Booking at ${restaurantName}` : 'Tell us a few details and we will take care of the rest.'}
            </p>

            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name} icon={<User size={16} />}>
                <input
                  className="input pl-10"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </Field>
              <Field label="Email" error={errors.email} icon={<Mail size={16} />}>
                <input
                  className="input pl-10"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </Field>
              <Field label="Date" error={errors.date} icon={<CalendarDays size={16} />}>
                <input
                  type="date"
                  className="input pl-10"
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                />
              </Field>
              <Field label="Time" icon={<Clock size={16} />}>
                <select
                  className="input pl-10"
                  value={form.time}
                  onChange={(e) => update('time', e.target.value)}
                >
                  {times.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Guests" icon={<Users size={16} />} className="sm:col-span-2">
                <select
                  className="input pl-10"
                  value={form.guests}
                  onChange={(e) => update('guests', e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <label className="label">Special requests</label>
                <textarea
                  className="input min-h-[88px] resize-none"
                  placeholder="Dietary needs, seating preference, occasion…"
                  value={form.request}
                  onChange={(e) => update('request', e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary mt-1 sm:col-span-2">
                Reserve Now
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  icon,
  className,
  children,
}: {
  label: string;
  error?: string;
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400">
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
