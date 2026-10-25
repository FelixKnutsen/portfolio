export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export type ContactError = 'name' | 'emailMissing' | 'emailInvalid' | 'message';
export type ContactErrors = Partial<Record<ContactField, ContactError>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = 'name';
  if (!values.email.trim()) errors.email = 'emailMissing';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'emailInvalid';
  if (!values.message.trim()) errors.message = 'message';
  return errors;
}

/** Strips any markup: the form only ever sends plain text. DOMPurify loads on first submit, not with the page. */
async function plainTextSanitizer(): Promise<(text: string) => string> {
  const { default: DOMPurify } = await import('dompurify');
  return (text) => DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

// Web3Forms access keys are public by design; they only allow sending to the owner's inbox.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'e6f73012-bb6e-468d-bee1-3144ccc41446';

export async function sendContactMessage(values: ContactValues, fallbackSubject: string): Promise<boolean> {
  const toPlainText = await plainTextSanitizer();
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: toPlainText(values.name),
      email: toPlainText(values.email),
      subject: toPlainText(values.subject) || fallbackSubject,
      message: toPlainText(values.message),
      from_name: 'felixknutsen.com',
    }),
  });
  const result: unknown = await response.json().catch(() => null);
  return (
    response.ok && typeof result === 'object' && result !== null && (result as { success?: unknown }).success === true
  );
}
