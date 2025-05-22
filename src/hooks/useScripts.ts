"use client";

import { useEffect } from "react";

export default function useScripts() {
  useEffect(() => {
    // Function to load a single script
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    };

    // Function to initialize scripts after loading
    const initializeScripts = () => {
      if (window.WOW) {
        new window.WOW({
          offset: 100,
          mobile: true,
          live: true,
        }).init();
      }

      if (window.jQuery) {
        window.jQuery(".navbar-nav").slicknav({
          label: "MENU",
          prependTo: "#mobile-menu-container",
          allowParentLinks: true,
        });
      }

      if (window.parallaxie) {
        window.parallaxie();
      }
    };

    const loadAllScripts = async () => {
      try {
        await loadScript("/assets/js/jquery-3.7.1.min.js");
        await loadScript("/assets/js/bootstrap.min.js");
        await loadScript("/assets/js/gsap.min.js");
        await loadScript("/assets/js/magiccursor.js");
        await loadScript("/assets/js/wow.min.js");
        await loadScript("/assets/js/jquery.slicknav.js");
        await loadScript("/assets/js/parallaxie.js");
        await loadScript("/assets/js/jquery.counterup.min.js");
        await loadScript("/assets/js/jquery.magnific-popup.min.js");
        await loadScript("/assets/js/jquery.mb.YTPlayer.min.js");
        await loadScript("/assets/js/jquery.waypoints.min.js");
        await loadScript("/assets/js/ScrollTrigger.min.js");
        await loadScript("/assets/js/SmoothScroll.js");
        await loadScript("/assets/js/SplitText.js");
        await loadScript("/assets/js/swiper-bundle.min.js");
        await loadScript("/assets/js/validator.min.js");

        initializeScripts();
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadAllScripts();

    return () => {};
  }, []);
}
