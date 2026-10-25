import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { contactDetails, copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import {
  sendContactMessage,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '../lib/contactForm';
import CvActions from './CvActions';
import ExternalLink from './ExternalLink';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

const EMPTY: ContactValues = { name: '', email: '', subject: '', message: '' };

function CopyEmailButton() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the address is still visible and selectable.
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copyEmail} data-copied={copied}>
      {copied ? t(copy.contact.copied) : t(copy.contact.copyEmail)}
      <span className="visually-hidden" aria-live="polite">
        {copied ? t(copy.contact.copied) : ''}
      </span>
    </button>
  );
}

function ContactForm() {
  const { t } = useLocale();
  const form = copy.contact.form;
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');
  const summaryRef = useRef<HTMLParagraphElement>(null);

  const update = (field: ContactField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'sent' || status === 'failed') setStatus('idle');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as ContactField[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const ok = await sendContactMessage(values, t(form.subject));
      setStatus(ok ? 'sent' : 'failed');
      if (ok) setValues(EMPTY);
    } catch {
      setStatus('failed');
    }
    summaryRef.current?.focus();
  };

  const field = (
    name: ContactField,
    label: string,
    options: { type?: string; autoComplete?: string; optional?: boolean; multiline?: boolean } = {},
  ) => {
    const id = `contact-${name}`;
    const error = errors[name];
    const errorId = `${id}-error`;
    const shared = {
      id,
      name,
      value: values[name],
      onChange: update(name),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
      required: !options.optional,
      className: styles.input,
    };
    return (
      <div className={styles.field} data-invalid={Boolean(error)}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {options.optional ? <span className={styles.optional}> ({t(form.optional)})</span> : null}
        </label>
        {options.multiline ? (
          <textarea {...shared} rows={5} />
        ) : (
          <input {...shared} type={options.type ?? 'text'} autoComplete={options.autoComplete} />
        )}
        {error ? (
          <p id={errorId} className={styles.error}>
            {t(form.errors[error])}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-labelledby="contact-form-heading">
      <h3 id="contact-form-heading" className={styles.formHeading}>
        {t(copy.contact.formHeading)}
      </h3>

      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <div className={styles.row}>
        {field('name', t(form.name), { autoComplete: 'name' })}
        {field('email', t(form.email), { type: 'email', autoComplete: 'email' })}
      </div>
      {field('subject', t(form.subject), { optional: true })}
      {field('message', t(form.message), { multiline: true })}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
          {status === 'sending' ? t(form.sending) : t(form.submit)}
        </button>
        <p ref={summaryRef} tabIndex={-1} className={styles.status} data-status={status} role="status">
          {status === 'sent' ? t(form.sent) : null}
          {status === 'failed' ? t(form.failed) : null}
        </p>
      </div>
      <p className={styles.privacy}>{t(form.privacy)}</p>
    </form>
  );
}

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" data-anchor className={styles.contact} aria-labelledby="contact-heading">
      <div className={`frame ${styles.inner}`}>
        <div className={styles.intro}>
          <h2 id="contact-heading" className={styles.heading}>
            {t(copy.contact.heading)}
          </h2>
          <p className={styles.body}>{t(copy.contact.body)}</p>

          <div className={styles.emailBlock}>
            <p className={styles.emailLabel}>{t(copy.contact.emailLabel)}</p>
            <a className={styles.email} href={`mailto:${contactDetails.email}`}>
              {contactDetails.email}
            </a>
            <CopyEmailButton />
          </div>

          <div className={styles.cvBlock}>
            <CvActions />
          </div>

          <ul className={styles.profiles}>
            <li>
              <ExternalLink href={contactDetails.linkedin} className={styles.profile}>
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={contactDetails.github} className={styles.profile}>
                GitHub
              </ExternalLink>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
