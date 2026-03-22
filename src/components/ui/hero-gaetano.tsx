"use client"

import { useState, useEffect } from "react"
import { X, Check, ArrowRight, Calendar, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import portrait from "@/assets/gaetano-portrait.jpg"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-cyan-500/[0.12]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, rotate: rotate - 5 }}
      animate={{
        opacity: 1,
        y: [0, 15, 0],
        rotate: [rotate, rotate + 3, rotate],
      }}
      transition={{
        opacity: { duration: 1, delay },
        y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute ${className}`}
    >
      <div
        className={`bg-gradient-to-r ${gradient} to-transparent rounded-full blur-2xl`}
        style={{ width, height }}
      />
    </motion.div>
  )
}

export default function HeroGaetano() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle")

  const handleExpand = () => setIsExpanded(true)
  const handleClose = () => {
    setIsExpanded(false)
    setTimeout(() => setFormStep("idle"), 500)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep("submitting")
    setTimeout(() => setFormStep("success"), 1500)
  }

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isExpanded])

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.4 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "#030d1a" }}>
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-violet-500/[0.04]" />

        {/* Floating shapes */}
        <ElegantShape delay={0} width={500} height={140} rotate={-12} gradient="from-cyan-500/[0.12]" className="top-[15%] left-[-5%]" />
        <ElegantShape delay={0.3} width={400} height={120} rotate={8} gradient="from-violet-500/[0.10]" className="top-[60%] right-[-8%]" />
        <ElegantShape delay={0.5} width={350} height={100} rotate={-6} gradient="from-indigo-500/[0.08]" className="bottom-[10%] left-[10%]" />
        <ElegantShape delay={0.7} width={300} height={80} rotate={15} gradient="from-cyan-500/[0.06]" className="top-[5%] right-[15%]" />
        <ElegantShape delay={0.9} width={250} height={70} rotate={-20} gradient="from-violet-500/[0.06]" className="bottom-[30%] right-[20%]" />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d1a] via-transparent to-[#030d1a]/80" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              {/* Badge */}
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm tracking-widest uppercase">
                  ✓ Zertifizierter GoHighLevel Admin
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Marketing Automation
                </span>
                <br />
                <span className="text-white">
                  Berater für Selbstständige
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-base md:text-lg text-white/60 max-w-xl mb-8 leading-relaxed"
              >
                Ich unterstütze dich dabei, Leads, Termine und Follow-ups sauber zu organisieren,
                indem ich dir ein zentrales Marketing-System aufsetze, das ohne manuelle Prozesse funktioniert.
              </motion.p>

              {/* CTA */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  {!isExpanded && (
                    <motion.button
                      key="cta-button"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleExpand}
                      className="group flex items-center gap-3 px-8 py-4 bg-cyan-400 text-[#030d1a] font-bold text-sm tracking-widest uppercase hover:bg-cyan-300 transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>System-Analyse starten</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  )}
                </AnimatePresence>
                <p className="text-xs text-white/40 mt-3">
                  Kurz sprechen, Setup verstehen, nächsten Schritt klären
                </p>
              </motion.div>
            </div>

            {/* Right: Photo */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex justify-center order-1 lg:order-2"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-2xl" />

                {/* Portrait */}
                <img
                  src={portrait}
                  alt="Gaetano Ficarra – Marketing Automation Berater"
                  className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] rounded-full object-cover ring-4 ring-cyan-400/30 shadow-2xl shadow-cyan-500/20"
                />

                {/* GoHighLevel Badge */}
                <motion.a
                  href="https://directory.gohighlevel.com/germany/bielefeld/certified-admins/gaetano-ficarra?from=badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-2 -right-2 md:bottom-2 md:right-2"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl scale-110" />
                    <img
                      src="https://directory.gohighlevel.com/images/BD_Certified_Admin_Main_Badge.png"
                      alt="GoHighLevel Certified Admin Badge"
                      className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 drop-shadow-2xl"
                      loading="lazy"
                    />
                  </div>
                </motion.a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Fullscreen Overlay Form */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#030d1a]/95 backdrop-blur-xl"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left: Info */}
                <div className="flex flex-col justify-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                  >
                    Lass uns kurz sprechen.
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/50 mb-8 leading-relaxed"
                  >
                    Ich schaue mir dein Setup an und zeige dir konkret, wo du Zeit verlierst — und wie du das fixst.
                  </motion.p>

                  {/* Feature cards */}
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Zap, title: "Schnelle Analyse", text: "In 30 Minuten weißt du, wo dein System hakt und was als nächstes zu tun ist." },
                      { icon: Calendar, title: "Kein Verkaufsgespräch", text: "Das ist kein Pitch. Wir klären konkret deinen nächsten Schritt." },
                    ].map(({ icon: Icon, title, text }) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{title}</p>
                          <p className="text-white/40 text-sm">{text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <p className="text-white/50 text-sm italic mb-3">
                      "Gaetano hat in einer Woche aufgebaut, woran ich Monate saß. Mein Follow-up läuft jetzt komplett automatisch."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 text-xs font-bold">
                        MK
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Marco K.</p>
                        <p className="text-white/30 text-xs">Business Coach, München</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Form */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm"
                  >
                    {formStep === "success" ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white text-xl font-bold mb-2">Anfrage erhalten!</p>
                          <p className="text-white/50 text-sm">Ich melde mich innerhalb von 24h bei dir. Bis gleich!</p>
                        </div>
                        <button
                          onClick={handleClose}
                          className="mt-6 px-6 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                        >
                          Schließen
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <p className="text-white text-lg font-bold">System-Analyse anfragen</p>
                          <p className="text-white/40 text-sm">Kostenlos, unverbindlich, konkret.</p>
                        </div>
                        {[
                          { id: "name", label: "Name", type: "text", placeholder: "Dein Name" },
                          { id: "email", label: "E-Mail", type: "email", placeholder: "deine@email.de" },
                          { id: "business", label: "Was machst du?", type: "text", placeholder: "z.B. Business Coach, Berater, Freelancer" },
                        ].map(({ id, label, type, placeholder }) => (
                          <div key={id}>
                            <label htmlFor={id} className="block text-white/60 text-sm mb-1.5">{label}</label>
                            <input
                              id={id}
                              type={type}
                              placeholder={placeholder}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-colors text-sm"
                            />
                          </div>
                        ))}
                        <div>
                          <label htmlFor="challenge" className="block text-white/60 text-sm mb-1.5">Wo hakt es gerade?</label>
                          <textarea
                            id="challenge"
                            placeholder="z.B. Ich verliere Leads, weil ich nicht nachfasse…"
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-colors text-sm resize-none"
                          />
                        </div>
                        <button
                          disabled={formStep === "submitting"}
                          type="submit"
                          className="w-full flex items-center justify-center px-8 py-3.5 rounded-lg bg-cyan-400 text-[#030d1a] font-bold text-sm tracking-widest uppercase hover:bg-cyan-300 transition-colors disabled:opacity-60 mt-2"
                        >
                          {formStep === "submitting" ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-[#030d1a] border-t-transparent rounded-full animate-spin" />
                              Wird gesendet...
                            </span>
                          ) : "Kostenlos anfragen"}
                        </button>
                        <p className="text-xs text-center text-white/20 mt-2">
                          Keine Weitergabe deiner Daten. Kein Spam.
                        </p>
                      </form>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
