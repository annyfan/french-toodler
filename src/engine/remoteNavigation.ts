// TV remote (D-pad) support: spatial focus navigation for smart TV browsers
// (Hisense VIDAA, Google TV, Fire TV, ...). Touch and mouse behavior is unchanged.

const FOCUSABLE =
  'button, [role="button"], a[href], [tabindex]:not([tabindex="-1"])';

const REMOTE_CLASS = 'remote-mode';

type Direction = 'left' | 'right' | 'up' | 'down';

const ARROWS: Record<string, Direction> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
};

const KEYCODE_DIRECTION: Record<number, Direction> = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

// Escape/Backspace, plus the Back key codes of Tizen (10009), webOS/VIDAA (461) and Android TV (4)
const BACK_KEYCODES = new Set([8, 27, 4, 461, 10009]);
const BACK_KEYS = new Set(['Escape', 'Backspace', 'BrowserBack', 'GoBack']);

const isVisible = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();
  if (rect.width < 4 || rect.height < 4) return false;
  const style = window.getComputedStyle(el);
  return style.visibility !== 'hidden' && style.display !== 'none';
};

// The topmost modal (if any) traps focus
const getRoot = (): ParentNode => {
  const dialogs = document.querySelectorAll('[aria-modal="true"]');
  return dialogs.length ? dialogs[dialogs.length - 1] : document;
};

const getCandidates = (): HTMLElement[] =>
  Array.from(getRoot().querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !(el as HTMLButtonElement).disabled && isVisible(el)
  );

const center = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

// Score candidates in the pressed direction: prefer aligned, nearby targets
const pickNext = (from: HTMLElement, dir: Direction, all: HTMLElement[]): HTMLElement | null => {
  const fromRect = from.getBoundingClientRect();
  const c = center(fromRect);
  let best: HTMLElement | null = null;
  let bestScore = Infinity;

  for (const el of all) {
    if (el === from) continue;
    const r = el.getBoundingClientRect();
    const p = center(r);
    const dx = p.x - c.x;
    const dy = p.y - c.y;

    let primary: number;
    let secondary: number;
    switch (dir) {
      case 'right': primary = r.left - fromRect.right; secondary = Math.abs(dy); if (dx <= 0) continue; break;
      case 'left': primary = fromRect.left - r.right; secondary = Math.abs(dy); if (dx >= 0) continue; break;
      case 'down': primary = r.top - fromRect.bottom; secondary = Math.abs(dx); if (dy <= 0) continue; break;
      default: primary = fromRect.top - r.bottom; secondary = Math.abs(dx); if (dy >= 0) continue; break;
    }
    primary = Math.max(primary, 0);
    const score = primary + secondary * 2;
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  return best;
};

const focusEl = (el: HTMLElement) => {
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
};

const isTextField = (el: Element | null) =>
  !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT');

const enterRemoteMode = () => document.body.classList.add(REMOTE_CLASS);
const leaveRemoteMode = () => document.body.classList.remove(REMOTE_CLASS);

const handleBack = (): boolean => {
  const root = getRoot();
  // Explicit close control inside the open modal, else the app-level back action
  const closer = root.querySelector<HTMLElement>('[data-remote-back]');
  if (closer) {
    closer.click();
    return true;
  }
  return false;
};

export const BACK_EVENT = 'remote-back';

const onKeyDown = (e: KeyboardEvent) => {
  const active = document.activeElement as HTMLElement | null;
  const dir = ARROWS[e.key] ?? KEYCODE_DIRECTION[e.keyCode];

  if (dir) {
    if (isTextField(active)) return;
    e.preventDefault();
    enterRemoteMode();
    const all = getCandidates();
    if (!all.length) return;
    const current = active && all.includes(active) ? active : null;
    if (!current) {
      focusEl(all[0]);
      return;
    }
    const next = pickNext(current, dir, all);
    if (next) focusEl(next);
    return;
  }

  if (e.key === 'Enter' || e.keyCode === 13) {
    if (active && active !== document.body && active.matches(FOCUSABLE) && active.tagName !== 'BUTTON') {
      e.preventDefault();
      active.click();
    }
    return;
  }

  if (BACK_KEYS.has(e.key) || BACK_KEYCODES.has(e.keyCode)) {
    if (isTextField(active)) return;
    e.preventDefault();
    if (!handleBack()) window.dispatchEvent(new CustomEvent(BACK_EVENT));
  }
};

export const initRemoteNavigation = (): (() => void) => {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('pointerdown', leaveRemoteMode, true);
  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('pointerdown', leaveRemoteMode, true);
  };
};
