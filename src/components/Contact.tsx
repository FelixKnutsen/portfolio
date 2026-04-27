import { useState, useCallback, type FormEvent } from 'react';
import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import type { ContentData, FormStatus } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Contact() {
  const { language } = useLanguage();
  const content = typedContent[language];
  const infoRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState(''); // Honeypot field
  const [status, setStatus] = useState<FormStatus>('idle');

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setBotField('');
  }, []);

  const sanitizeInput = (text: string) => {
    // Robust sanitization: remove HTML tags and potential script/event attributes
    return text
      .replace(/<[^>]*>?/gm, '') // Remove tags
      .replace(/on\w+="[^"]*"/gm, '') // Remove event handlers like onclick="..."
      .replace(/javascript:[^"]*/gim, '') // Remove javascript: links
      .trim();
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Honeypot check: if field is filled, it's a bot
      if (botField) {
        console.warn('Bot detected via honeypot');
        return;
      }

      // Basic validation
      if (!name || !email || !message) {
        setStatus('error');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setStatus('error');
        return;
      }

      setStatus('loading');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: 'e6f73012-bb6e-468d-bee1-3144ccc41446',
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            subject: sanitizeInput(subject),
            message: sanitizeInput(message),
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          resetForm();
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('Contact form submission failed:', err);
        setStatus('error');
      }

      // Auto-reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    },
    [name, email, subject, message, botField, resetForm],
  );

  const inputClassName =
    'w-full px-4 py-3 rounded-lg bg-surface-container-lowest dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-slate-900 dark:text-slate-50 font-body-md';

  return (
    <section
      className="max-w-[1120px] mx-auto px-5 md:px-8 py-section-padding"
      id="contact"
      aria-label={content.contact.heading}
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start pt-16 md:pt-0">
        {/* Contact info */}
        <div ref={infoRef} className="animate-on-scroll">
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50 mb-4">
            {content.contact.heading}
          </h2>
          <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400 mb-8">
            {content.contact.body}
          </p>

          <div className="space-y-6">
            {content.contact.links.map((link) => (
              <a
                key={link.value}
                className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-secondary-container transition-colors group"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                <div className="p-3 bg-surface-variant dark:bg-slate-900 rounded-lg group-hover:bg-secondary-container/20 transition-colors">
                  <span
                    className="material-symbols-outlined text-slate-900 dark:text-slate-50 group-hover:text-secondary-container"
                    aria-hidden="true"
                  >
                    {link.icon}
                  </span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-slate-500 dark:text-slate-400">
                    {link.type}
                  </p>
                  <p className="font-body-md font-medium">{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div
          ref={formRef}
          className="bg-surface-container-lowest dark:bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-on-scroll"
          style={{ animationDelay: '0.2s' }}
        >
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Honeypot field - hidden from humans */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="full_name"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label
                className="block font-label-caps text-label-caps text-slate-700 dark:text-slate-300"
                htmlFor="contact-name"
              >
                {content.contact.form.nameLabel}
              </label>
              <input
                className={inputClassName}
                id="contact-name"
                placeholder={content.contact.form.namePlaceholder}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <label
                className="block font-label-caps text-label-caps text-slate-700 dark:text-slate-300"
                htmlFor="contact-email"
              >
                {content.contact.form.emailLabel}
              </label>
              <input
                className={inputClassName}
                id="contact-email"
                placeholder={content.contact.form.emailPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label
                className="block font-label-caps text-label-caps text-slate-700 dark:text-slate-300"
                htmlFor="contact-subject"
              >
                {content.contact.form.subjectLabel}
              </label>
              <input
                className={inputClassName}
                id="contact-subject"
                placeholder={content.contact.form.subjectPlaceholder}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                className="block font-label-caps text-label-caps text-slate-700 dark:text-slate-300"
                htmlFor="contact-message"
              >
                {content.contact.form.messageLabel}
              </label>
              <textarea
                className={`${inputClassName} min-h-[120px] resize-y`}
                id="contact-message"
                placeholder={content.contact.form.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              className={`w-full px-6 py-3 rounded-DEFAULT font-button text-button transition-all duration-200 flex items-center justify-center gap-2 ${
                status === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : status === 'error'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-primary text-on-primary dark:bg-slate-50 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' && (
                <span className="material-symbols-outlined animate-spin" aria-hidden="true">
                  progress_activity
                </span>
              )}
              {status === 'success' && (
                <span className="material-symbols-outlined" aria-hidden="true">
                  check_circle
                </span>
              )}
              {status === 'error' && (
                <span className="material-symbols-outlined" aria-hidden="true">
                  error
                </span>
              )}
              {status === 'loading'
                ? 'Sending...'
                : status === 'success'
                  ? 'Message Sent!'
                  : status === 'error'
                    ? 'Failed to Send'
                    : content.contact.form.buttonText}
            </button>

            {/* Accessible status announcements */}
            <div aria-live="polite" className="sr-only">
              {status === 'success' && 'Your message has been sent successfully.'}
              {status === 'error' && 'There was an error sending your message. Please try again.'}
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
              Powered by{' '}
              <span className="font-semibold">Web3Forms</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
