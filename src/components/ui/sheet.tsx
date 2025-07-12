/**
 * Sheet Components
 * Based on shadcn/ui design patterns with simplified implementation
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface SheetProps {
  children: React.ReactNode;
}

export interface SheetTriggerProps {
  children: React.ReactNode;
}

export interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

const SheetContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const Sheet: React.FC<SheetProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetTrigger: React.FC<SheetTriggerProps> = ({ children }) => {
  const { setIsOpen } = React.useContext(SheetContext);

  return (
    <button onClick={() => setIsOpen(true)}>
      {children}
    </button>
  );
};

const SheetContent: React.FC<SheetContentProps> = ({ 
  children, 
  className, 
  side = "right" 
}) => {
  const { isOpen, setIsOpen } = React.useContext(SheetContext);

  if (!isOpen) return null;

  const sideClasses = {
    top: "top-0 left-0 right-0 h-auto",
    right: "top-0 right-0 h-full w-80",
    bottom: "bottom-0 left-0 right-0 h-auto",
    left: "top-0 left-0 h-full w-80",
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sheet */}
      <div
        className={cn(
          "fixed z-50 bg-background border shadow-lg",
          sideClasses[side],
          className
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex-1 p-6 pt-0">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export { Sheet, SheetTrigger, SheetContent };
