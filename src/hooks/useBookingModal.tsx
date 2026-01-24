import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import BookingModal from "@/components/BookingModal";

type BookingType = "erstgespraech" | "supportCall";

interface BookingModalContextType {
  openBooking: (type: BookingType) => void;
}

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export const BookingModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>("erstgespraech");

  const openBooking = useCallback((type: BookingType) => {
    setBookingType(type);
    setIsOpen(true);
  }, []);

  return (
    <BookingModalContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal
        open={isOpen}
        onOpenChange={setIsOpen}
        type={bookingType}
      />
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
};
