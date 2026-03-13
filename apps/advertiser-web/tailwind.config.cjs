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
                "background-base": "#f8fafc",
                "surface": "#ffffff",
                "border-light": "#e2e8f0",
                "text-main": "#1e293b",
                "text-muted": "#64748b",
            },
            fontFamily: {
                "sans": ["Inter", "Noto Sans SC", "sans-serif"]
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
}
