module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "../../packages/*/src/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#2563eb",
                "primary-hover": "#1d4ed8",
                "surface": "#ffffff",
                "background-base": "#f8fafc",
                "border-light": "#e2e8f0",
                "text-main": "#1e293b",
                "text-muted": "#64748b",
                "navy-sidebar": "#0f172a"
            },
            fontFamily: {
                "sans": ["Inter", "Noto Sans SC", "PingFang SC", "sans-serif"]
            },
            boxShadow: {
                "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                "modal": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
