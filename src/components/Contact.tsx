import { useState, type FormEvent } from 'react';
import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();
  const content = contentData[language];
  const infoRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e6f73012-bb6e-468d-bee1-3144ccc41446",
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="max-w-[1120px] mx-auto px-8 py-section-padding" id="contact">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div ref={infoRef} className="animate-on-scroll">
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50 mb-4">
            {content.contact.heading}
          </h2>
          <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400 mb-8">
            {content.contact.body}
          </p>

          <div className="space-y-6">
            {content.contact.links.map((link, index) => (
              <a
                key={index}
                className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-secondary-container transition-colors group"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                <div className="p-3 bg-surface-variant dark:bg-slate-900 rounded-lg group-hover:bg-secondary-container/20 transition-colors">
                  <span className="material-symbols-outlined text-slate-900 dark:text-slate-50 group-hover:text-secondary-container">{link.icon}</span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-slate-500 dark:text-slate-400">{link.type}</p>
                  <p className="font-body-md font-medium">{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div
          ref={formRef}
          className="bg-surface-container-lowest dark:bg-slate-900/50 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-on-scroll"
          style={{ animationDelay: '0.2s' }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-slate-600 dark:text-slate-400" htmlFor="name">{content.contact.form.nameLabel}</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-surface-bright dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-body-md"
                id="name"
                placeholder={content.contact.form.namePlaceholder}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-slate-600 dark:text-slate-400" htmlFor="email">{content.contact.form.emailLabel}</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-surface-bright dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-body-md"
                id="email"
                placeholder={content.contact.form.emailPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-slate-600 dark:text-slate-400" htmlFor="subject">{content.contact.form.subjectLabel}</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-surface-bright dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-body-md"
                id="subject"
                placeholder={content.contact.form.subjectPlaceholder}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-slate-600 dark:text-slate-400" htmlFor="message">{content.contact.form.messageLabel}</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-surface-bright dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-body-md min-h-[120px] resize-y"
                id="message"
                placeholder={content.contact.form.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              className={`w-full px-6 py-3 rounded-DEFAULT font-button text-button transition-all flex items-center justify-center gap-2 ${status === 'success' ? 'bg-green-600 text-white hover:bg-green-700' :
                status === 'error' ? 'bg-red-600 text-white hover:bg-red-700' :
                  'bg-primary text-on-primary dark:bg-slate-50 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
              {status === 'success' && <span className="material-symbols-outlined">check_circle</span>}
              {status === 'error' && <span className="material-symbols-outlined">error</span>}
              {status === 'loading' ? 'Sending...' :
                status === 'success' ? 'Message Sent!' :
                  status === 'error' ? 'Failed to Send' :
                    content.contact.form.buttonText}
            </button>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
              Powered by <a rel="noopener noreferrer" className="font-semibold transition-colors">Web3Forms</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
