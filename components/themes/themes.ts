import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react";

const tokens = {
    fonts: {
        body: { value: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" },
        heading: { value: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" },
    },
    colors: {
        brand: {
            400: { value: "#f43f5e" },
            500: { value: "#e11d48" },
            600: { value: "#be123c" },
            700: { value: "#9f1239" },
        },
        
        glass: {
            surface: { value: "#20000066" },
            border: { value: "#ffffff24" },
            inner: { value: "#ffffff14" },
            bgInner: { value: "#2523238c" },
            textColor: {value: "gray.300"}
        },
    },
};


const semanticTokens = {
    colors: {
        accent: {
            value: "{colors.brand.500}",
            _dark: { value: "{colors.brand.500}" },
        },
        cardBg: {
            value: "{colors.glass.surface}",
            _dark: { value: "{colors.glass.surface}" },
        },
        cardBorder: {
            value: "{colors.glass.border}",
            _dark: { value: "{colors.glass.border}" },
        },
        cardInner: {
            value: "{colors.glass.inner}",
            _dark: { value: "{colors.glass.inner}" },
        },
        inputBg: {
            value: "{colors.glass.bgInner}",
            _dark: { value: "{colors.glass.bgInner}" }
        }
    },
};


const button = defineRecipe({
    base: {
        borderRadius: "md",
        fontWeight: "bold",
        cursor: "pointer",

        // REMOVE focus ring
        _focus: { boxShadow: "none" },
        _focusVisible: {
            outline: "0",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.2)", // subtle ring
        },
    },
    variants: {
        variant: {
            solid: {
                bg: "{colors.brand.500}",
                color: "{colors.glass.textColor}",
                _hover: { bg: "{colors.brand.600}" },
                _active: { bg: "{colors.brand.700}" },
            },
            ghost: {
                color: "{colors.brand.500}",
                _hover: { bg: "#e11d4814" },
            },
        },
        size: {
            md: { p: 2, fontSize: "md" },
        },
    },
    defaultVariants: {
        variant: "solid",
        size: "md",
    },
});

export const themeSystem = createSystem(defaultConfig, {
    theme: {
        tokens,
        semanticTokens,
        breakpoints: {
            base: "0",
            sm: "30em",
            md: "48em",
            lg: "62em",
            xl: "80em",
        },
        recipes: {
            button,
        },
    },
    globalCss: {
        "html, body": {
            // bg: "black",
            backgroundImage: `
                radial-gradient(circle at center, #00063d40, transparent 70%)
            `,

        },
        "input, textarea, select": {
            fontSize: "16px",
        },
        "*": {
            boxSizing: "border-box",
        },
        
        html: { textSizeAdjust: "100%" },
    },
});