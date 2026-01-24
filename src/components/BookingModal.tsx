import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "erstgespraech" | "supportCall";
}

const BOOKING_CONFIG = {
  erstgespraech: {
    title: "Kostenloses Erstgespräch buchen",
    iframeSrc: "https://klick.gaetanoficarra.de/widget/booking/5s0iHWQ0crY7ogs9gviU",
    iframeId: "5s0iHWQ0crY7ogs9gviU_1769280793656",
  },
  supportCall: {
    title: "Support-Call buchen",
    iframeSrc: "https://klick.gaetanoficarra.de/widget/booking/TtiptceNlgcJ1pI3nCPK",
    iframeId: "TtiptceNlgcJ1pI3nCPK_1769280903591",
  },
};

const BookingModal = ({ open, onOpenChange, type }: BookingModalProps) => {
  const config = BOOKING_CONFIG[type];

  useEffect(() => {
    // Load the form embed script when modal opens
    if (open) {
      const existingScript = document.querySelector('script[src="https://klick.gaetanoficarra.de/js/form_embed.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://klick.gaetanoficarra.de/js/form_embed.js";
        script.type = "text/javascript";
        document.body.appendChild(script);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-display text-xl text-foreground">
            {config.title}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 overflow-auto max-h-[calc(90vh-80px)]">
          <iframe
            src={config.iframeSrc}
            style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
            scrolling="no"
            id={config.iframeId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
