// Shared copy for the three lab directions, so they differ only in design. Every line is true of the
// live site today (site.js, HowItWorks, TheRules, CloseCta): no clients yet, so no numbers or reviews.
export { homeProblems, homeFaq } from '../data/site.js';

export const BOOKING_URL = 'https://cal.com/mert-ozcetin/missed-calls-visioning-workshop';
export const DEMO_TEL = 'tel:+13526407955';

export const steps = [
  { title: 'A call comes in', desc: 'Same number on your truck and your Google listing. Calls forward to the receptionist, so nothing goes to voicemail.', tag: 'Your number stays' },
  { title: 'The AI answers', desc: 'It picks up for your business and asks what they need and how urgent it is. Your own contacts ring straight through to you.', tag: 'Known callers skip it' },
  { title: 'You get a text', desc: "Who called, their number, what they need and how urgent. If it really needs you, it's passed to you right away.", tag: 'Every call, by text' },
];

export const rules = [
  { title: 'Keep your number', desc: 'It works with call forwarding on the line you already have.' },
  { title: "Says it's AI", desc: 'Callers hear that up front. It never pretends to be you.' },
  { title: 'No made-up prices', desc: "It won't quote, promise a time or book a job unless you set that up." },
  { title: 'Spam never reaches you', desc: 'Sales pitches and robocalls get a polite no and no text. Your phone stays quiet.' },
];

export const sampleText = { title: 'New call, handled', body: 'Dana, (352) 555-0147. Water leaking under the kitchen sink, wants someone today. Gainesville.' };
