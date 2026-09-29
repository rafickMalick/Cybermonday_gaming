import { Logo } from './Logo';

export function CheckoutHeader() {
  return (
    <header className="border-b-2 border-divider">
      <div className="wrap-md py-4 flex flex-wrap items-center gap-4">
        <span className="mr-auto"><Logo size={22} /></span>
        <span className="flex items-center gap-2 text-[13px] text-ink/75">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect width="18" height="11" x="3" y="11" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          Paiement 100 % sécurisé
        </span>
      </div>
    </header>
  );
}
