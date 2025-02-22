export const dartsColors = {
    // Primary colors for buttons and interactive elements
    primary: {
        DEFAULT: "#ff4d4d", // Bright red
        foreground: "#ffffff",
    },
    // Secondary colors
    secondary: {
        DEFAULT: "#4d79ff", // Bright blue
        foreground: "#ffffff",
    },
    // Success states
    success: {
        DEFAULT: "#10b981", // Green
        foreground: "#ffffff",
    },
    // Accent colors
    accent: {
        DEFAULT: "#8b5cf6", // Purple
        foreground: "#ffffff",
    },
    // Background colors
    background: {
        DEFAULT: "#f8fafc",
        darker: "#f1f5f9",
    },
    // Card backgrounds
    card: {
        DEFAULT: "#ffffff",
        foreground: "#0f172a",
    },
    // Destructive actions
    destructive: {
        DEFAULT: "#ef4444",
        foreground: "#ffffff",
    },
    // Player colors for identification
    players: [
        "#ef4444", // Red
        "#3b82f6", // Blue
        "#22c55e", // Green
        "#f59e0b", // Amber
        "#8b5cf6", // Purple
        "#ec4899", // Pink
        "#06b6d4", // Cyan
        "#84cc16", // Lime
        "#64748b", // Slate
    ]
};

// Export colors for use in tailwind config
export const colors = {
    ...dartsColors
};
