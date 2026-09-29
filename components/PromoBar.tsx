import { Countdown } from './Countdown';

export function PromoBar() {
  return (
    <div className="bg-accent text-bg text-[13px] font-extrabold tracking-[.04em]">
      <div className="wrap py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span>CYBER MONDAY · JUSQU&apos;À −50 % SUR TOUT LE SETUP</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-bg animate-pulse" aria-hidden />
          FLASH DEAL · <Countdown />
        </span>
      </div>
    </div>
  );
}
