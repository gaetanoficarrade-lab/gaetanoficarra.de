import { createContext, useContext, useState, ReactNode } from "react";
import BookingModal from "@/components/BookingModal";

interface BookingModalContextType {
  openBookingModal: () => void;
  closeBookingModal: () => void;
  isOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export const useBookingModal = () => {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider");
  return ctx;
};

export const BookingModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingModalContext.Provider
      value={{
        isOpen,
        openBookingModal: () => setIsOpen(true),
        closeBookingModal: () => setIsOpen(false),
      }}
    >
      {children}
      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </BookingModalContext.Provider>
  );
};
