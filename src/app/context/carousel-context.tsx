"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CarouselData {
  gallery: string[];
  currentIndex: number;
  name: string;
}

interface CarouselContextType {
  isOpen: boolean;
  carouselData: CarouselData | null;
  openCarousel: (data: CarouselData) => void;
  closeCarousel: () => void;
}

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === undefined) {
    throw new Error(
      "useCarouselContext must be used within a CarouselProvider"
    );
  }
  return context;
};

interface CarouselProviderProps {
  children: ReactNode;
}

export const CarouselProvider: React.FC<CarouselProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [carouselData, setCarouselData] = useState<CarouselData | null>(null);

  const openCarousel = (data: CarouselData) => {
    setCarouselData(data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeCarousel = () => {
    setIsOpen(false);
    if (window.history.state && window.history.state.carouselOpen) {
      window.history.back();
    }
  };

  const value = {
    isOpen,
    carouselData,
    openCarousel,
    closeCarousel,
  };

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};
