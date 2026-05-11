"use client";

import React, { useState } from "react";

const icons = {
  navLogo: (
    <img src="/assets/logo.svg" alt="Ascend" className="h-full w-full object-contain" />
  ),
  heroLogo: (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="52" height="52" rx="14" fill="#F35233" />
      <path d="M39.3125 40.7598H36.252L31.9082 29.3018L31.2578 27.5986C25.4431 26.6699 21.1536 29.4247 19.2139 31.4248L19.0439 31.8662L15.6523 40.7598H12.6328L24.1729 11.1836H27.7725L39.3125 40.7598ZM20.6768 27.6133C23.0969 26.1481 26.4121 25.0072 30.4043 25.3643L25.9521 13.707L20.6768 27.6133Z" fill="white" />
    </svg>
  ),
  chevron: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  apple: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.96.95-2.22 1.72-3.71 1.72-1.45 0-2.07-.88-3.69-.88-1.64 0-2.3.86-3.64.86-1.39 0-2.6-.74-3.51-1.63-1.89-1.85-2.88-5.32-2.88-8.23 0-3.32 2.05-5.08 4.02-5.08 1.07 0 1.95.44 2.85.44.83 0 1.48-.44 2.81-.44 1.71 0 3.19.9 3.99 2.19-3.41 1.63-2.87 6.44.56 8.07zM12.03 5.4c0-2.31 1.89-4.22 4.19-4.22.18 2.5-2.3 4.65-4.19 4.22z" />
    </svg>
  ),
};

type WalletEntry = { name: string; icon: string | React.ReactNode; isCardano?: boolean };

const cardanoWallets: WalletEntry[] = [
  { name: "Cardano", icon: "/assets/cardano.svg", isCardano: true },
];

const swapWallets: WalletEntry[] = [
  { name: "Metamask", icon: "/assets/meta.svg" },
  { name: "Phantom", icon: "/assets/phantom.svg" },
];

const connectWallets = [
  { name: "Eternl", icon: "/assets/Eternl.svg" },
  { name: "Lace", icon: "/assets/lace.svg" },
  { name: "Vespr", icon: "/assets/vespr.svg" },
];

export default function AscendLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* ── BACKGROUND: Applied via direct style for absolute reliability ── */}
      <div 
        className="fixed inset-0 z-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/background.gif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="scanline"></div>
      </div>

      {/* ── STRUCTURAL GUIDES: Now visible on all devices ── */}
      <div className="structural-guides pointer-events-none fixed inset-0 z-20">
        <span className="sg-line sg-h sg-top" style={{ animationDelay: '2s' }}></span>
        <span className="sg-line sg-h sg-bottom" style={{ animationDelay: '2s' }}></span>

        <span className="sg-line sg-v sg-x-left" style={{ animationDelay: '2s' }}></span>
        <span className="sg-line sg-v sg-x-center hidden sm:block" style={{ animationDelay: '2s' }}></span>
        <span className="sg-line sg-v sg-x-right sg-v-rev" style={{ animationDelay: '2s' }}></span>

        <GuideDiamond className="sg-y-top sg-x-left" />
        <GuideDiamond className="sg-y-top sg-x-center hidden sm:block" />
        <GuideDiamond className="sg-y-top sg-x-right" />

        <GuideDiamond className="sg-y-bottom sg-x-left" />
        <GuideDiamond className="sg-y-bottom sg-x-center hidden sm:block" />
        {/* Synchronized Moving Laser Streaks (Delayed 2s) */}
        <div className="gf-laser gf-laser-h sg-y-top" style={{ animationDelay: '2s' }}>
          <div className="gf-laser-head"></div>
        </div>
        <div className="gf-laser gf-laser-h sg-y-bottom" style={{ animationDelay: '2s' }}>
          <div className="gf-laser-head"></div>
        </div>
        <div className="gf-laser gf-laser-v sg-x-left" style={{ animationDelay: '2s' }}>
          <div className="gf-laser-head"></div>
        </div>
        <div className="gf-laser gf-laser-v sg-x-center hidden sm:block" style={{ animationDelay: '2s' }}>
          <div className="gf-laser-head"></div>
        </div>
        <div className="gf-laser gf-laser-v sg-x-right gf-laser-v-rev" style={{ animationDelay: '2s' }} />
      </div>

      <main className="page-shell">
        <header className="page-header stage-brand flex items-center gap-3 text-white">
          <div className="h-7 w-7 shrink-0">{icons.navLogo}</div>
          <span className="text-[20px] font-medium tracking-tight">Ascend</span>
        </header>

        <section className="desktop-stage">
          <div className="hero-column flex h-full items-center justify-center sm:items-start sm:justify-start xl:items-center">
            <div className="hero-content-shell relative p-1.5 sm:p-2">
              <div className="hero-stack relative">
                <div className="hero-badge-wrap reveal-1">
                  <span className="hero-badge-text">$ASCEND</span>
                </div>
                
                <div className="hero-copy-shell mb-10 md:mb-12">
                  <h1 className="hero-title reveal-2">
                    Liquid<br />Staking
                  </h1>
                  <p className="hero-summary reveal-3 max-w-[420px]">
                    Stake to earn your share of 100% of Ascend protocol revenue
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-column panel-float">
            <div className="panel-shell relative p-1">
              <div className="panel-rim"></div>

              <div className="panel-card relative rounded-[24px] bg-[radial-gradient(circle_at_50%_0%,rgba(120,30,20,0.4),rgba(15,5,5,0.98)_40%,rgba(8,3,3,1)_100%)] px-4 pb-3 pt-6 sm:rounded-[26px] sm:px-5 sm:pb-3 sm:pt-7 md:rounded-[28px] md:px-6 md:pb-2 md:pt-8">
                <div className="panel-shine"></div>
                <div className="panel-header mb-5 flex flex-col items-center text-center sm:mb-7 md:mb-8">
                  <div className="panel-brand-shell reveal-2 mb-3 h-10 w-10 sm:mb-4 sm:h-12 sm:w-12">
                    <img src="/assets/card.svg" alt="Ascend" className="h-full w-full object-contain" />
                  </div>
                  <h2 className="reveal-3 text-[1.35rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[1.6rem] md:text-[1.8rem]">
                    $Ascend Liquid Staking
                  </h2>
                  <p className="panel-subtitle reveal-4">
                    Select wallet to start staking
                  </p>
                </div>

                <div className="panel-sections space-y-5">
                  <WalletSection 
                    title="CHOOSE A WALLET TO CONTINUE" 
                    wallets={cardanoWallets} 
                    onCardanoClick={() => setIsModalOpen(true)}
                  />
                  <WalletSection title="OR SWAP TOKENS TO $ASCEND" wallets={swapWallets} />

                  <div className="buy-card relative mt-4 overflow-hidden rounded-[20px] bg-[#0A0A0C] p-3 sm:mt-5 sm:rounded-[22px] sm:p-3.5 md:mt-6 md:rounded-[24px] md:p-4 border border-white/5">
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-4">
                        <div className="card-art-thumb h-12 w-20 rounded-lg bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div>
                          <h3 className="text-[0.95rem] font-semibold text-white sm:text-[1rem]">Buy $Ascend with card</h3>
                          <div className="mt-2.5 flex items-center gap-3">
                            <div className="payment-icons flex items-center gap-2">
                              <span className="rounded-[4px] bg-white px-1 py-0.5 text-[0.5rem] font-black text-[#1a2f80]">VISA</span>
                              <div className="flex -space-x-1.5">
                                <div className="h-4 w-4 rounded-full bg-[#eb001b]"></div>
                                <div className="h-4 w-4 rounded-full bg-[#f79e1b] opacity-90"></div>
                              </div>
                              <div className="flex items-center gap-1 text-white text-[0.8rem]">
                                {icons.apple}
                                <span className="font-semibold">Pay</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="wallet-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/40">
                        <div className="h-5 w-5">{icons.chevron}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── CONNECT MODAL ── */}
      <ConnectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

function ConnectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="modal-reveal relative w-full max-w-[440px] overflow-hidden rounded-[32px] border border-white/5 bg-[#110e0e] p-1.5 shadow-2xl">
        <div className="relative rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(120,30,20,0.35),rgba(15,5,5,0.98)_40%,rgba(8,3,3,1)_100%)] px-6 pb-8 pt-10">
          
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <div className="h-6 w-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          <div className="mb-10 flex flex-col items-start px-2">
            <div className="mb-4 h-14 w-14 bg-[#FF5C33] rounded-2xl p-2.5">
              <img src="/assets/cardano.svg" alt="Cardano" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-[26px] font-bold tracking-tight text-white">Connect Wallet</h2>
            <p className="text-[14px] font-medium text-white/40">Choose a Cardano wallet</p>
          </div>

          <div className="space-y-3">
            {connectWallets.map((wallet, i) => (
              <button
                key={i}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white/[0.03] p-3.5 transition-all hover:bg-white/[0.06] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                    <img src={wallet.icon} alt={wallet.name} className="h-full w-full object-contain" />
                  </div>
                  <span className="text-[17px] font-semibold text-white/95">{wallet.name}</span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-white/20">
                  <div className="h-5 w-5">{icons.chevron}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideDiamond({ className }: { className: string }) {
  return <span className={`gf-dot absolute ${className}`}></span>;
}

function WalletSection({ title, wallets, onCardanoClick }: { title: string; wallets: WalletEntry[]; onCardanoClick?: () => void }) {
  const isSwapSection = title.startsWith("OR ");
  const baseDelay = isSwapSection ? 0.9 : 0.7;
  return (
    <section className="wallet-block reveal-card rounded-[16px] bg-[#19181D] px-3.5 py-2.5 sm:px-4 sm:py-3">
      <div className="wallet-section-title mb-2 flex items-center justify-between gap-2 text-[0.44rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.5rem]">
        {isSwapSection ? (
          <>
            <div className="min-w-0">
              <span className="text-white/20 font-normal">OR</span>{" "}
              <span className="text-[#FF5C33] opacity-90 font-medium">{title.slice(3)}</span>
            </div>
            <span className="coming-soon-badge shrink-0">Coming Soon</span>
          </>
        ) : (
          <span className="text-[#FF5C33] opacity-90 font-medium">{title}</span>
        )}
      </div>
      <div className="space-y-1">
        {wallets.map((wallet, i) => (
          <WalletRow 
            key={i} 
            wallet={wallet} 
            delay={baseDelay + i * 0.1} 
            onClick={wallet.isCardano ? onCardanoClick : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function WalletRow({ wallet, delay, onClick }: { wallet: WalletEntry; delay: number; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`wallet-row wallet-reveal flex w-full items-center justify-between gap-2 rounded-[12px] bg-transparent px-2.5 py-2 text-left text-white transition sm:px-3.5 sm:py-2.5 ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="h-5.5 w-5.5 shrink-0 overflow-hidden rounded-[7px] sm:h-6 sm:w-6">
          {typeof wallet.icon === 'string' ? (
            <img src={wallet.icon} alt={wallet.name} className="h-full w-full object-contain" />
          ) : (
            wallet.icon
          )}
        </div>
        <span className="wallet-name truncate text-[0.82rem] font-medium tracking-[-0.03em] hero-type-glow sm:text-[0.9rem]">
          {wallet.name}
        </span>
      </div>
      <span className="wallet-arrow flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden="true">
        <span className="h-4 w-4">{icons.chevron}</span>
      </span>
    </button>
  );
}
