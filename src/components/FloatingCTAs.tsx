import { useState, useEffect } from "react";
import { MessageCircle, GraduationCap, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { handleTrackedClick } from "@/lib/tracking";

const FloatingCTAs = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: sticky bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2"
            style={{
              background: "linear-gradient(to top, hsl(var(--background) / 0.95), transparent)",
            }}
          >
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleTrackedClick(
                    "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20quero%20um%20diagn%C3%B3stico%20r%C3%A1pido%20para%20meu%20neg%C3%B3cio.",
                    "primary_whatsapp_click",
                    "floating"
                  )
                }
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-primary-foreground"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
                  boxShadow: "0 6px 20px -4px hsl(168 100% 33% / 0.4)",
                }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button
                onClick={() =>
                  handleTrackedClick(
                    "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20aplicar%20para%20a%20mentoria%20Minimal%20PRO.",
                    "mentorship_apply_click",
                    "floating"
                  )
                }
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border border-primary/30 text-primary bg-card/90 backdrop-blur-md"
              >
                <GraduationCap size={16} />
                Mentoria
              </button>
            </div>
          </motion.div>

          {/* Desktop: floating FAB */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-2.5"
          >
            {/* Mentoria expandable */}
            <AnimatePresence>
              {menuOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  onClick={() => {
                    handleTrackedClick(
                      "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20aplicar%20para%20a%20mentoria%20Minimal%20PRO.",
                      "mentorship_apply_click",
                      "floating"
                    );
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border border-primary/30 text-primary bg-card/90 backdrop-blur-md shadow-lg transition-colors hover:bg-primary/10"
                >
                  <GraduationCap size={16} />
                  Mentoria
                </motion.button>
              )}
            </AnimatePresence>

            {/* Main FAB row */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="h-10 w-10 rounded-full flex items-center justify-center bg-card/80 backdrop-blur-md border border-border/40 text-muted-foreground hover:text-foreground shadow-lg transition-all"
                aria-label={menuOpen ? "Fechar menu" : "Mais opções"}
              >
                <motion.div
                  animate={{ rotate: menuOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={16} className={menuOpen ? "" : "rotate-45"} />
                </motion.div>
              </button>

              <button
                onClick={() =>
                  handleTrackedClick(
                    "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20quero%20um%20diagn%C3%B3stico%20r%C3%A1pido%20para%20meu%20neg%C3%B3cio.",
                    "primary_whatsapp_click",
                    "floating"
                  )
                }
                className="h-14 w-14 rounded-full flex items-center justify-center text-primary-foreground shadow-xl transition-transform hover:scale-110 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
                  boxShadow: "0 8px 30px -6px hsl(168 100% 33% / 0.5)",
                }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTAs;
