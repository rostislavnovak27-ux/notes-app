export const ui = {
    layout: {
        page: {
            minHeight: "100vh",
            background: "#0f0f0f",
            padding: "60px 20px",
            color: "#e6e6e6",
            fontFamily: "ui-sans-serif, system-ui"
        },
        container: {
            maxWidth: 800,
            margin: "0 auto",
            width: "100%"
        }
    },

    text: {
        title: {
            fontSize: 28,
            fontWeight: 600,
            color: "#fff"
        },
        small: {
            fontSize: 12,
            color: "#666"
        }
    },

    button: {
        base: {
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "#ccc",
            transition: "all 0.15s ease"
        },

        primary: {
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
            border: "none",
            background: "#2563eb",
            color: "#fff"
        },

        ghost: {
            padding: "6px 10px",
            background: "transparent",
            border: "1px solid transparent",
            color: "#aaa",
            cursor: "pointer",
            fontSize: 13
        },

        danger: {
            padding: "6px 10px",
            background: "transparent",
            color: "#ff6b6b",
            border: "1px solid transparent",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13
        }
    },

    input: {
        base: {
            width: "100%",
            padding: 10,
            background: "#111",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#fff"
        }
    },

    card: {
        base: {
            background: "#1a1a1a",
            padding: 20,
            borderRadius: 10,
            border: "1px solid #2a2a2a"
        }
    },

    listItem: {
        base: {
            padding: "6px 8px",
            borderRadius: 6,
            cursor: "pointer"
        }
    }
}

export const hover = {
    item: {
        onMouseEnter: (e: any) => {
            e.currentTarget.style.background = "#1f1f1f"
        },
        onMouseLeave: (e: any) => {
            e.currentTarget.style.background = "transparent"
        }
    }
}