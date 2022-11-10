/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: ["bg-blue-400", "bg-green-400", "bg-red-400", "text-red-900"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "0rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "12rem",
        },
      },
      screens: {
        /*---------------------------------------------------------------------
        max-width
      ----------------------------------------------------------------------*/
        "2xlM": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xlM: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lgM: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        mdM: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        smM: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xsM: { max: "479px" },
        // => @media (max-width: 479px) { ... }

        /*---------------------------------------------------------------------
      min-width
      ----------------------------------------------------------------------*/
        xs: "480px",
        // => @media (min-width: 480px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        /*---------------------------------------------------------------------
        both max and min 
      ----------------------------------------------------------------------*/

        sxsB: { min: "360px", max: "479px" },
        // => @media (min-width: 360px and max-width: 479px) { ... }

        xsB: { min: "480px", max: "639px" },
        // => @media (min-width: 480px and max-width: 639px) { ... }

        smB: { min: "640px", max: "767px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        mdB: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        lgB: { min: "1024px", max: "1279px" },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        xlB: { min: "1280px", max: "1535px" },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        "2xlB": { min: "1536px" },
        // => @media (min-width: 1536px) { ... }
      },
      animation: {
        // "spin-slow": "spin 20s linear infinite",
        slideRight: "slideRight 1s ease-in-out",
        slideRightSlow: "slideRightSlow 2s  ease-in-out ",
        slideRightSlower: "slideRightSlower 3s  ease-in-out ",

        zoomOut: " cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        zoomIn: " cubic-bezier(0.165, 0.84, 0.44, 1) forwards",

        fadeOut: " fadeOut 5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        fadeIn: " fadeIn 5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",

        zoomInS: "0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        zoomOutS: "0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",

        sketchIn:
          "sketchIn 0.5s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        sketchOut: "sketchOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",

        modalContentFadeOut:
          "modalContentFadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        modalContentFadeIn:
          "modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
      },

      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideRightSlow: {
          "0%": { transform: "translateX(140%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideRightSlower: {
          "0%": { transform: "translateX(180%)" },
          "100%": { transform: "translateX(0%)" },
        },

        zoomIn: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },

        zoomOut: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: " scale(0)" },
        },

        fadeIn: {
          "0%": { background: " rgba(0, 0, 0, 0)" },
          "100%": { background: " rgba(0, 0, 0, 0.7)" },
        },

        fadeOut: {
          "0%": { background: " rgba(0, 0, 0, 0.7)" },
          "100%": { background: "rgba(0, 0, 0, 0)" },
        },
        sketchIn: {
          "0%": {
            strokeDashoffset: "778",
          },
          "100%": {
            strokeDashoffset: "0",
          },
        },

        modalContentFadeIn: {
          "0%": {
            opacity: "0",
            top: "-20px",
          },
          "100%": {
            opacity: "1",
            top: "0",
          },
        },
        modalContentFadeOut: {
          "0%": {
            opacity: "1",
            top: "0px",
          },
          "100%": {
            opacity: "0",
            top: "-20px",
          },
        },
      },
      colors: {
        // *  added variables */
        "primary-color": "#ee3436",
        "secondary-color": "#08B05F",
        "tertiary-color": "#1a4040d7",
        "bg-color": "#F3FCF7",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),

    //  <!-- section: child variant -->
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("first-child", "&>*:nth-child(1)");
      addVariant("2nd-child", "&>*:nth-child(2)");
      addVariant("3rd-child", "&>*:nth-child(3)");
      addVariant("4th-child", "&>*:nth-child(4)");
      addVariant("first-2-child", "&>*:nth-child(-n+2)");
      addVariant("first-3-child", "&>*:nth-child(-n+3)");

      addVariant(
        "2-onwards-child",
        "&>*:nth-child(n+2)"
      ); /* selects from the second onwards */
      addVariant(
        "3-onwards-child",
        "&>*:nth-child(n+3)"
      ); /* selects from the third onwards */

      addVariant("odd-child", "&>*:nth-child(odd)");
      addVariant("even-child", "&>*:nth-child(even)");
      addVariant("last-2-child", "&>*:nth-last-child(-n+2)");
      addVariant("last-3-child", "&>*:nth-last-child(-n+3)");
      addVariant("last-child", "&>*:nth-last-child(1)");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
