import { Link } from 'react-router-dom';

export function BackButton() {
  return (
    <Link to="/" className="btn btn-ghost btn-sm mb-4">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </Link>
  );
}
