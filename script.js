/* =========================================================
   SENTINELS — GLOBAL SCRIPT
   V2 Interactive System
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = $("#menuToggle");
    const mainNav = $("#mainNav");


    const closeMenu = () => {

        if (!mainNav || !menuToggle) {
            return;
        }

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

        document.body.style.overflow = "";

    };


    const openMenu = () => {

        if (!mainNav || !menuToggle) {
            return;
        }

        mainNav.classList.add("open");
        menuToggle.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        document.body.classList.add(
            "menu-open"
        );

        document.body.style.overflow =
            "hidden";

    };


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.contains(
                        "open"
                    );

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );


        $$(".main-nav a").forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            closeMenu();

        }
    );


    /* =====================================================
       RESPONSIVE NAVIGATION RESET
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 760
            ) {

                closeMenu();

            }

        },
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    $$(".main-nav a").forEach(link => {

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


        link.classList.remove("active");


        if (
            (
                currentPage === "" ||
                currentPage === "index.html"
            ) &&
            linkPage === "index.html"
        ) {

            link.classList.add("active");

            return;

        }


        if (
            currentPage &&
            currentPage === linkPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       SMOOTH INTERNAL SCROLLING
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

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
                    $(".site-header");


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const position =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    18;


                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });


                closeMenu();

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYear =
        new Date().getFullYear();


    $$("[data-current-year]").forEach(
        element => {

            element.textContent =
                currentYear;

        }
    );


    const footerYear =
        $("#currentYear");


    if (footerYear) {

        footerYear.textContent =
            currentYear;

    }


    /* =====================================================
       CHARACTER DOSSIER
       ===================================================== */

    const dossierOverlay =
        $("#dossierOverlay");

    const dossier =
        $(".dossier", dossierOverlay || document);

    const dossierClose =
        $("#dossierClose");

    const dossierImage =
        $("#dossierImage");

    const dossierNumber =
        $("#dossierNumber");

    const dossierName =
        $("#dossierName");

    const dossierRole =
        $("#dossierRole");

    const dossierColour =
        $("#dossierColour");

    const dossierAbilities =
        $("#dossierAbilities");

    const dossierDescription =
        $("#dossierDescription");


    let activeCard = null;


    const getCardData = card => {

        return {

            name:
                card.dataset.name ||
                "UNKNOWN",

            role:
                card.dataset.role ||
                "SENTINEL",

            colour:
                card.dataset.colour ||
                "UNKNOWN",

            abilities:
                card.dataset.abilities ||
                "UNKNOWN",

            description:
                card.dataset.description ||
                "Profile unavailable.",

            image:
                card.dataset.image ||
                "",

            number:
                card.querySelector(
                    ".sentinel-number"
                )?.textContent.trim() ||
                "SENTINEL"

        };

    };


    const fillDossier = data => {

        if (dossierName) {

            dossierName.textContent =
                data.name;

        }


        if (dossierRole) {

            dossierRole.textContent =
                data.role;

        }


        if (dossierColour) {

            dossierColour.textContent =
                data.colour;

        }


        if (dossierAbilities) {

            dossierAbilities.textContent =
                data.abilities;

        }


        if (dossierDescription) {

            dossierDescription.textContent =
                data.description;

        }


        if (dossierNumber) {

            dossierNumber.textContent =
                data.number;

        }


        if (
            dossierImage &&
            data.image
        ) {

            dossierImage.classList.remove(
                "loaded"
            );

            dossierImage.src =
                data.image;

            dossierImage.alt =
                `${data.name} character artwork`;

        }

    };


    const openDossier = card => {

        if (
            !dossierOverlay ||
            !card
        ) {
            return;
        }


        const data =
            getCardData(card);


        activeCard = card;


        /* ---------------------------------------------
           SMALL CARD SPIN
        --------------------------------------------- */

        card.classList.remove(
            "is-opening"
        );


        /*
         * Force a browser layout calculation so the
         * animation can restart every time.
         */

        void card.offsetWidth;


        card.classList.add(
            "is-opening"
        );


        fillDossier(data);


        /*
         * Open the dossier shortly after the card
         * begins its transition.
         */

        window.setTimeout(
            () => {

                dossierOverlay.classList.add(
                    "is-open"
                );

                dossierOverlay.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.classList.add(
                    "dossier-open"
                );

                document.body.style.overflow =
                    "hidden";


                if (dossierClose) {

                    window.setTimeout(
                        () => {
                            dossierClose.focus();
                        },
                        100
                    );

                }

            },
            180
        );


        window.setTimeout(
            () => {

                card.classList.remove(
                    "is-opening"
                );

            },
            650
        );

    };


    const closeDossier = () => {

        if (!dossierOverlay) {
            return;
        }


        dossierOverlay.classList.remove(
            "is-open"
        );

        dossierOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "dossier-open"
        );

        document.body.style.overflow =
            "";


        if (activeCard) {

            activeCard.classList.remove(
                "is-opening"
            );

            activeCard.focus();

        }


        activeCard = null;

    };


    /* -----------------------------------------------------
       CHARACTER CARD EVENTS
       ----------------------------------------------------- */

    const characterCards =
        $$(".sentinel-card[data-character]");


    characterCards.forEach(card => {


        card.addEventListener(
            "click",
            event => {

                /*
                 * Do not trigger when the user somehow
                 * clicks an interactive child.
                 */

                if (
                    event.target.closest("a, button")
                ) {
                    return;
                }


                openDossier(card);

            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Enter" &&
                    event.key !== " "
                ) {
                    return;
                }


                event.preventDefault();

                openDossier(card);

            }
        );


        /*
         * Small pointer movement gives the card a
         * subtle 3D response on desktop.
         */

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.matchMedia(
                        "(hover: none)"
                    ).matches
                ) {
                    return;
                }


                if (
                    card.classList.contains(
                        "is-opening"
                    )
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) *
                    3;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -3;


                card.style.transform =
                    `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                if (
                    card.classList.contains(
                        "is-opening"
                    )
                ) {
                    return;
                }


                card.style.transform = "";

            }
        );

    });


    /* -----------------------------------------------------
       DOSSIER CLOSE
       ----------------------------------------------------- */

    if (dossierClose) {

        dossierClose.addEventListener(
            "click",
            closeDossier
        );

    }


    if (dossierOverlay) {

        dossierOverlay.addEventListener(
            "click",
            event => {

                /*
                 * Clicking the dark area closes the
                 * dossier, but clicking the actual
                 * dossier panel does not.
                 */

                if (
                    event.target ===
                    dossierOverlay
                ) {

                    closeDossier();

                }

            }
        );

    }


    /* =====================================================
       DOSSIER IMAGE LOAD
       ===================================================== */

    if (dossierImage) {

        dossierImage.addEventListener(
            "load",
            () => {

                dossierImage.classList.add(
                    "loaded"
                );

            }
        );


        dossierImage.addEventListener(
            "error",
            () => {

                dossierImage.classList.remove(
                    "loaded"
                );

                dossierImage.alt =
                    "Character artwork unavailable";

            }
        );

    }


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    $$("img").forEach(image => {

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

    const revealElements =
        $$(".reveal");


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

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =====================================================
       EXTERNAL LINK SAFETY
       ===================================================== */

    $$('a[target="_blank"]').forEach(
        link => {

            const existingRel =
                link.getAttribute("rel") ||
                "";


            const relParts =
                existingRel
                    .split(" ")
                    .filter(Boolean);


            if (
                !relParts.includes(
                    "noopener"
                )
            ) {

                relParts.push(
                    "noopener"
                );

            }


            if (
                !relParts.includes(
                    "noreferrer"
                )
            ) {

                relParts.push(
                    "noreferrer"
                );

            }


            link.setAttribute(
                "rel",
                relParts.join(" ")
            );

        }
    );


    /* =====================================================
       PREVENT BROKEN EMPTY LINKS
       ===================================================== */

    $$('a[href="#"]').forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        }
    );


    /* =====================================================
       PAGE VISIBILITY
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
             * If the user leaves the page while a
             * dossier is open, don't leave the body
             * permanently locked.
             */

            if (
                document.visibilityState ===
                "hidden"
            ) {
                return;
            }

        }
    );


    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    if (dossierOverlay) {

        dossierOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       INITIAL PAGE STATE
       ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );

});