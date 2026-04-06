import { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths, isSameDay } from "date-fns";
import { de } from "date-fns/locale";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://supabase.gaetanoficarra.de";
const ANON_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3NDY1NDc0MCwiZXhwIjo0OTMwMzI4MzQwLCJyb2xlIjoiYW5vbiJ9.paW1Vtr0IFHdBv3ErFqCAlmdXu4aDfB-aZtEwiBwa2M";

const getEdgeFunctionHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${ANON_KEY}`,
  apikey: ANON_KEY,
});

type Step = "calendar" | "form" | "confirmed" | "error";

interface Slot {
  [date: string]: { slots: string[] };
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  const [step, setStep] = useState<Step>("calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slots, setSlots] = useState<Slot>({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("calendar");
        setSelectedDate(null);
        setSelectedSlot(null);
        setName("");
        setEmail("");
        setPhone("");
        setErrorMsg("");
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const fetchSlots = useCallback(async (month: Date) => {
    setLoading(true);
    setErrorMsg("");
    const startDate = format(startOfMonth(month), "yyyy-MM-dd");
    const endDate = format(endOfMonth(month), "yyyy-MM-dd");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/ghl-get-slots`, {
        method: "POST",
        headers: getEdgeFunctionHeaders(),
        body: JSON.stringify({ startDate, endDate, timezone }),
      });
      if (!res.ok) throw new Error("Slots konnten nicht geladen werden.");
      const data = await res.json();
      setSlots(data);
    } catch {
      setErrorMsg("Verfügbare Termine konnten nicht geladen werden.");
      setSlots({});
    } finally {
      setLoading(false);
    }
  }, [timezone]);

  useEffect(() => {
    if (isOpen) fetchSlots(currentMonth);
  }, [isOpen, currentMonth, fetchSlots]);

  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    for (const [dateKey, val] of Object.entries(slots)) {
      if (val?.slots?.length > 0) dates.add(dateKey);
    }
    return dates;
  }, [slots]);

  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    return slots[key]?.slots || [];
  }, [selectedDate, slots]);

  const handleSubmit = async () => {
    if (!selectedSlot || !name.trim() || !email.trim()) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/ghl-book-appointment`, {
        method: "POST",
        headers: getEdgeFunctionHeaders(),
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          selectedSlot,
          timezone,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || "Buchung fehlgeschlagen.");
      }
      window.location.href = "https://funnelpay.de/checkout/90-minuten-highlevel-setup-call";
    } catch (e: any) {
      setErrorMsg(e.message || "Ein Fehler ist aufgetreten.");
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDay = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
  const daysInMonth = monthEnd.getDate();

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }
    return days;
  }, [currentMonth, startDay, daysInMonth]);

  const formatSlotTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: timezone });
    } catch {
      return iso;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl text-foreground">
                {step === "calendar" && "Termin wählen"}
                {step === "form" && "Deine Daten"}
                {step === "confirmed" && "Bestätigt"}
                {step === "error" && "Fehler"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Step indicators */}
              {step !== "confirmed" && step !== "error" && (
                <div className="flex items-center gap-2 mb-6">
                  {(["calendar", "form"] as const).map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-medium transition-colors ${
                          step === s
                            ? "bg-primary text-primary-foreground"
                            : (["calendar", "form"] as const).indexOf(step) > i
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < 1 && <div className="w-8 h-px bg-border" />}
                    </div>
                  ))}
                </div>
              )}

              {/* CALENDAR STEP — two columns */}
              {step === "calendar" && (
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Calendar */}
                  <div className="flex-1 min-w-0">
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                        className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-display text-lg text-foreground">
                        {format(currentMonth, "MMMM yyyy", { locale: de })}
                      </span>
                      <button
                        onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                        className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        <span className="ml-3 text-muted-foreground font-body text-sm">Termine werden geladen…</span>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                            <div key={d} className="text-center text-xs font-body text-muted-foreground py-1">
                              {d}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((day, i) => {
                            if (!day) return <div key={`e-${i}`} />;
                            const dateKey = format(day, "yyyy-MM-dd");
                            const hasSlots = availableDates.has(dateKey);
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

                            return (
                              <button
                                key={dateKey}
                                disabled={!hasSlots || isPast}
                                onClick={() => {
                                  setSelectedDate(day);
                                  setSelectedSlot(null);
                                }}
                                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-body transition-all ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : hasSlots && !isPast
                                      ? "text-foreground hover:bg-primary/10 cursor-pointer"
                                      : "text-muted-foreground/40 cursor-not-allowed"
                                }`}
                              >
                                {day.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {errorMsg && (
                      <div className="mt-4 flex items-start gap-2 text-destructive text-sm font-body">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        {errorMsg}
                      </div>
                    )}
                  </div>

                  {/* Right: Time slots */}
                  <div className="md:w-52 shrink-0">
                    {selectedDate ? (
                      <>
                        <p className="font-body text-muted-foreground text-sm mb-3">
                          {format(selectedDate, "EEEE, d. MMMM", { locale: de })}
                        </p>
                        {slotsForSelectedDate.length > 0 ? (
                          <div className="flex flex-row flex-wrap md:flex-col gap-2 max-h-[320px] overflow-y-auto pr-1">
                            {slotsForSelectedDate.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-2.5 px-4 rounded-lg text-sm font-body transition-all border text-center ${
                                  selectedSlot === slot
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                                }`}
                              >
                                {formatSlotTime(slot)}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm font-body">
                            Keine Zeiten verfügbar.
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground text-sm font-body text-center">
                          Wähle einen Tag aus, um verfügbare Uhrzeiten zu sehen.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Weiter button for calendar step */}
              {step === "calendar" && selectedSlot && (
                <div className="mt-6">
                  <button
                    onClick={() => setStep("form")}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-md"
                  >
                    Weiter
                  </button>
                </div>
              )}

              {/* FORM STEP */}
              {step === "form" && (
                <div>
                  <button
                    onClick={() => setStep("calendar")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body mb-4 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Zurück
                  </button>

                  <div className="bg-muted/30 rounded-lg p-3 mb-6">
                    <p className="text-sm font-body text-foreground">
                      {selectedDate && format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })}
                      {" um "}
                      {selectedSlot && formatSlotTime(selectedSlot)} Uhr
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-body text-foreground mb-1.5">Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dein Name"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-foreground mb-1.5">E-Mail *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="deine@email.de"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-foreground mb-1.5">Telefon</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+49 ..."
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="mt-4 flex items-start gap-2 text-destructive text-sm font-body">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !name.trim() || !email.trim()}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Wird gebucht…
                      </>
                    ) : (
                      "Termin bestätigen"
                    )}
                  </button>
                </div>
              )}

              {/* CONFIRMED */}
              {step === "confirmed" && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-foreground mb-2">Termin gebucht!</h3>
                  <p className="text-muted-foreground font-body mb-2">
                    Dein Termin am{" "}
                    {selectedDate && format(selectedDate, "d. MMMM yyyy", { locale: de })} um{" "}
                    {selectedSlot && formatSlotTime(selectedSlot)} Uhr wurde bestätigt.
                  </p>
                  <p className="text-muted-foreground font-body text-sm">
                    Du erhältst in Kürze eine Bestätigungs-E-Mail.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-md"
                  >
                    Schließen
                  </button>
                </div>
              )}

              {/* ERROR */}
              {step === "error" && (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                  <h3 className="font-display text-2xl text-foreground mb-2">Buchung fehlgeschlagen</h3>
                  <p className="text-muted-foreground font-body mb-4">{errorMsg}</p>
                  <button
                    onClick={() => { setErrorMsg(""); setStep("form"); }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-body hover:bg-primary/90 transition-all duration-300 rounded-md"
                  >
                    Erneut versuchen
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
