"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ToastType = "error" | "success";

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Use this hook in any component that needs to display a toast.
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return ctx;
}

let idCounter = 0;

export default function ToastProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = ++idCounter;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const showError = useCallback(
        (message: string) => addToast(message, "error"),
        [addToast],
    );
    const showSuccess = useCallback(
        (message: string) => addToast(message, "success"),
        [addToast],
    );

    return (
        <ToastContext.Provider value={{ showError, showSuccess }}>
            {children}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-[90%] max-w-sm">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className="flex items-center gap-3 px-5 py-3 rounded-full shadow-lg pointer-events-auto"
                        style={{
                            backgroundColor:
                                t.type === "error" ? "#2d3a4a" : "#1e2a3a",
                            color: "#f7f3ed",
                        }}
                    >
                        <span
                            style={{
                                color:
                                    t.type === "error" ? "#d4734a" : "#7a9e7e",
                            }}
                        >
                            {t.type === "error" ? "⚠" : "✓"}
                        </span>
                        <span className="text-sm font-medium flex-1">
                            {t.message}
                        </span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
