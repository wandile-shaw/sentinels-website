/* =========================================================
   SENTINELS — GLOBAL SCRIPT
   Official Archive
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.classList.toggle(
                "open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu when a navigation link is selected */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* Close mobile menu with Escape */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    mainNav.classList.contains("open")
                ) {

                    mainNav.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN SCREEN GETS LARGE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 760 &&
            mainNav &&
            menuToggle
        ) {

            mainNav.classList.remove("open");

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .toLowerCase();


        /*
         * Do not override an explicitly active
         * Home link when the URL is empty.
         */

        if (
            currentPage === "" &&
            linkPage === "index.html"
        ) {

            link.classList.add("active");

        } else if (
            currentPage === linkPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    /*
     * If an image asset is missing, prevent the page
     * from displaying a broken-image icon.
     *
     * The surrounding element stays in place.
     */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-missing"
                );

                image.setAttribute(
                    "data-image-error",
                    "true"
                );

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    /*
     * Elements with .reveal will gently appear as
     * they enter the viewport.
     */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
    ===================================================== */

    const updateMenuScrollState = () => {

        if (
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            document.body.style.overflow =
                "hidden";

        } else {

            document.body.style.overflow =
                "";

        }

    };


    if (menuToggle && mainNav) {

        const observer =
            new MutationObserver(
                updateMenuScrollState
            );


        observer.observe(
            mainNav,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }


    /* =====================================================
       DOSSIER IMAGE SAFETY
    ===================================================== */

    /*
     * Keeps dossier images visually contained if they
     * have very different dimensions.
     */

    const dossierImage =
        document.getElementById(
            "dossierImage"
        );


    if (dossierImage) {

        dossierImage.addEventListener(
            "load",
            () => {

                dossierImage.classList.add(
                    "loaded"
                );

            }
        );

    }


    /* =====================================================
       ESCAPE DOSSIER
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const overlay =
                document.getElementById(
                    "dossierOverlay"
                );


            if (
                overlay &&
                overlay.classList.contains(
                    "is-open"
                )
            ) {

                const closeButton =
                    document.getElementById(
                        "dossierClose"
                    );


                if (closeButton) {
                    closeButton.click();
                }

            }

        }
    );


    /* =====================================================
       EXTERNAL / DOWNLOAD LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        const existingRel =
            link.getAttribute("rel") || "";


        if (
            !existingRel.includes(
                "noopener"
            )
        ) {

            link.setAttribute(
                "rel",
                `${existingRel} noopener noreferrer`
                    .trim()
            );

        }

    });

});