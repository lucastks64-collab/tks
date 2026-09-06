import { ArrowRight, Check, Gift, LockKeyhole, Sparkles, Verified } from 'lucide-react';
import lucasImageDesktop from '../assets/image/lucas-fade-desktop.webp';
import lucasImageMobile from '../assets/image/lucas-fade-mobile.webp';

export default function Hero() {
  const salesNotifications = [
    { amount: 'R$ 15.329,80', time: 'hoje, 10:42' },
    { amount: 'R$ 10.458,90', time: 'hoje, 09:15' },
    { amount: 'R$ 5.872,40', time: 'ontem, 21:37' },
  ];

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -left-1/4 top-1/3 h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-0 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Left Content */}
        <div className="-mt-16 order-2 text-center lg:order-1 lg:mt-0 lg:text-left">
          <div className="mx-auto max-w-2xl lg:mx-0">
            {/* Kicker */}
            <div className="hidden items-center gap-2 text-cyan-400 text-xs sm:text-sm font-medium uppercase tracking-wide lg:flex">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Treinamento completo para TikTok Shop</span>
            </div>

            {/* Title */}
            <h1 className="hero-desktop-title mt-3 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              ALGORITMO<br />DE<br />
              <span className="text-cyan-400">VENDAS TKS</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm text-neutral-400 sm:text-base max-w-xl">
              O curso completo para aprender a vender no TikTok Shop através de vídeos, do básico ao avançado.
            </p>

            {/* Bonus Box */}
            <div className="bonus-highlight mt-5 flex items-start gap-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 text-left sm:p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 sm:h-12 sm:w-12">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm">
                  Compre o treinamento e ganhe
                </p>
                <p className="text-xs text-neutral-400 sm:text-sm">
                  uma análise de perfil completa gratuitamente!
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://pay.kiwify.com.br/fxhc0Y8" 
              className="hero-cta mt-5 group flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-4 py-2 font-semibold text-neutral-950 shadow-[0_0_22px_rgba(0,224,255,0.42)] transition-all sm:px-6 sm:py-2.5"
            >
              <span className="whitespace-nowrap text-[9px] sm:text-xs">QUERO ENTRAR NO ALGORITMO DE VENDAS TKS</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-cyan-300 sm:h-6 sm:w-6">
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </span>
            </a>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-nowrap items-center justify-between gap-1 text-[10px] text-neutral-400 sm:gap-6 sm:text-sm">
              <span className="flex shrink-0 items-center gap-1 whitespace-nowrap sm:gap-2">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                Acesso imediato
              </span>
              <span className="flex shrink-0 items-center gap-1 whitespace-nowrap sm:gap-2">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                Garantia de 7 dias
              </span>
              <span className="flex shrink-0 items-center gap-1 whitespace-nowrap sm:gap-2">
                <LockKeyhole className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                Compra segura
              </span>
            </div>

            <div className="hero-mobile-commission mt-5 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-neutral-900/90 px-3 py-2.5 text-left backdrop-blur-xl lg:hidden">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                <Verified className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">+ de R$100.000,00</p>
                <p className="text-[10px] text-neutral-400">em comissões na TikTok Shop</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image and Notifications */}
        <div className="relative order-1 flex justify-center lg:order-2 lg:justify-start">
          {/* Main Image Container */}
          <div className="hero-image-stage relative mx-auto w-full max-w-[320px] translate-x-0 sm:max-w-[380px] sm:translate-x-2 lg:mx-0 lg:max-w-[470px] lg:translate-x-0 xl:max-w-[520px] xl:-translate-x-2 lg:translate-y-10 xl:translate-y-14">
            <div className="relative pb-[20px] lg:pb-0">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl" />
              <picture className="relative z-10 block w-full">
                <source
                  media="(max-width: 1024px)"
                  srcSet={`${lucasImageMobile} 420w`}
                  sizes="(max-width: 640px) 320px, 380px"
                />
                <img
                  src={lucasImageDesktop}
                  srcSet={`${lucasImageDesktop} 800w`}
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 470px, 100vw"
                  width="800"
                  height="694"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  alt="Lucas, criador do Algoritmo de Vendas TKS"
                  className="hero-person-image relative z-10 w-full object-contain object-top drop-shadow-2xl"
                  style={{ aspectRatio: '3/4' }}
                />
              </picture>

              <div className="hero-mobile-kicker absolute inset-x-0 bottom-[136px] z-20 flex items-center justify-center gap-1.5 rounded-md border border-cyan-400/60 bg-[#061925]/90 px-2 py-1.5 text-center text-[9px] font-semibold uppercase tracking-wide text-cyan-300 backdrop-blur-sm lg:hidden">
                <Sparkles className="hidden h-3 w-3 shrink-0 lg:block" />
                <span>Treinamento completo para TikTok Shop</span>
              </div>

              <h1 className="hero-mobile-title absolute inset-x-0 bottom-[62px] z-20 text-center font-display text-[2.05rem] font-black uppercase leading-[0.94] text-white lg:hidden">
                ALGORITMO<br />
                <span>DE <b>VENDAS TKS</b></span>
              </h1>

              {/* Commission Badge */}
              <div className="hero-commission-badge absolute -bottom-3 sm:-bottom-4 left-3 sm:left-6 right-3 sm:right-6 z-20 hidden items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-cyan-500/30 bg-neutral-900/90 px-3 py-2.5 sm:px-5 sm:py-3 backdrop-blur-xl lg:flex">
                <div className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Verified className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-xs sm:text-sm">+ de R$100.000,00</p>
                  <p className="text-[10px] sm:text-xs text-neutral-400">em comissões na TikTok Shop</p>
                </div>
              </div>
            </div>

            {/* Sales Notifications - Mobile */}
            <div className="hero-mobile-notifications absolute inset-x-0 top-6 z-30 flex items-start justify-between lg:hidden">
              {salesNotifications.slice(0, 2).map((notification, index) => (
                <div
                  key={index}
                  className={`hero-mobile-notification group w-[35%] rounded-lg border bg-neutral-950/90 p-1 backdrop-blur-xl ${index === 1 ? 'mt-8' : ''}`}
                >
                  <div className="mb-0.5 flex items-center gap-1">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shrink-0">
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    <p className="text-[9px] font-medium text-white">TikTok Shop</p>
                  </div>
                  <p className="hero-mobile-notification-amount text-[11px] font-bold">{notification.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Notifications - Desktop (Posicionado no canto direito) */}
          <div className="hidden lg:flex absolute right-0 top-0 z-30 w-64 xl:w-72 flex-col gap-3">
            {salesNotifications.map((notification, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/10 bg-neutral-900/90 p-4 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:bg-neutral-800/90"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 shrink-0">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">TikTok Shop</p>
                    <p className="text-[10px] text-neutral-400">{notification.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Transferência recebida</p>
                  <p className="text-lg font-bold text-emerald-400">{notification.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
