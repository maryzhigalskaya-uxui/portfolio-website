gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 1.2,
    infinite: false
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
const aboutSection = document.querySelector(".about-scroll");
const lines = gsap.utils.toArray(".about-line");
const WORD_STEP = 0.17;
const WORD_DURATION = 1.15;
const OVERLAP_WORDS = 4;
let aboutTimeline;
function setInitialPositions() {
    const vw = window.innerWidth;
    lines.forEach((line, lineIndex) => {
        const words = gsap.utils.toArray(
            line.querySelectorAll("span")
        );
        words.forEach((word, wordIndex) => {
            const isPhoneLandscape =
    window.matchMedia(
        "(orientation: landscape) and (max-height: 500px) and (max-width: 950px)"
    ).matches;
const baseOffset =
    isPhoneLandscape
        ? vw * 0.22
        : vw * 0.35;
const wordOffset =
    wordIndex *
    vw *
    (
        isPhoneLandscape
            ? 0.038
            : 0.065
    );
const lineOffset =
    lineIndex *
    (
        isPhoneLandscape
            ? 9
            : 15
    );
            const startX =
                baseOffset +
                wordOffset +
                lineOffset;
            gsap.set(word, {
                x: startX,
                y: 0,
                opacity: 0
            });
        });
    });
}
function createAboutAnimation() {
    if (aboutTimeline) {
        aboutTimeline.scrollTrigger?.kill();
        aboutTimeline.kill();
    }
    setInitialPositions();
    aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: aboutSection,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.1,
            invalidateOnRefresh: true
        }
    });
    let lineStart = 0;
    lines.forEach((line) => {
        const words = gsap.utils.toArray(
            line.querySelectorAll("span")
        );
        words.forEach((word, wordIndex) => {
            const wordStart =
                lineStart +
                wordIndex * WORD_STEP;
                aboutTimeline.to(
                word,
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration:
                        WORD_DURATION,
                    ease:
                        "power2.inOut"
                },
                wordStart
            );
        });
        const triggerIndex =
            Math.max(
                0,
                words.length - OVERLAP_WORDS
            );
            lineStart =
            lineStart +
            triggerIndex * WORD_STEP;
    });
    aboutTimeline.to(
        {},
        {
            duration: 0.3
        }
    );
}
document.fonts.ready.then(() => {
    createAboutAnimation();
    ScrollTrigger.refresh();
});
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        createAboutAnimation();
        ScrollTrigger.refresh();
    }, 250);
});
const projects = [
    {
        name: "NataWest",
        image: "img/natawest.png",
        overview: "To accelerate business growth, the company required a simple yet optimized website featuring a frictionless inquiry system — turning visitors into leads and strengthening brand presence.",
        tags: "Web Design<br>UI UX Design<br>Website Development",
        industry: "Product delivery<br>Business inquiries",
        client: "NataWest Sp z o.o.",
        link: "https://www.behance.net/gallery/253429085/NataWest-Delivery-of-goods-from-Poland"
    },
    {
        name: "Novyx",
        image: "img/novyx.png",
        overview: "An e-commerce experience built to boost purchasing power through remote access, increase brand recognition, and immerse visitors in the brand's key visual elements — with a distinctive interface and quick access to product categories.",
        tags: "Web Design<br>UI UX Design",
        industry: "Online store<br>Business inquiries",
        client: "NOVYX"
    },
    {
        name: "Inkverse",
        image: "img/inkverse.png",
        overview: "A reading app designed for effortless book discovery, with built-in widgets for tracking reading progress, a clear and intuitive structure, and seamless switching between light and dark modes.",
        tags: "Product Design<br>UX/UI Design<br>Mobile & Tablet",
        industry: "Digital publishing",
        client: "Inkverse"
    },
    {
        name: "Closet Loop",
        image: "img/closet_loop.png",
        overview: "A modern AI-powered app that helps users curate outfits through AI assistants, while tracking how often wardrobe items and accessories are worn in everyday looks.",
        tags: "UX/UI Design<br>AI Product",
        industry: "Fashion Tech<br>Artificial Intelligence",
        client: "Closet Loop"
    },
    {
        name: "VaPol",
        image: "img/VaPol.png",
        overview: "To accelerate business growth, the company required a simple yet optimized website featuring a frictionless inquiry system — turning visitors into leads and strengthening brand presence.",
        tags: "Web Design<br>UI UX Design<br>Website Development",
        industry: "Product delivery<br>Business inquiries",
        client: "VaPol Sp z o. o.",
        link: "https://www.vapol.pl/"
    },
    {
        name: "Probel",
        image: "img/PROBEL.png",
        overview: "A website design for an online cybersecurity and testing course platform, built to inspire trust and convey professionalism through a credible, expert-driven digital presence.",
        tags: "Web Design<br>UI UX Design",
        industry: "Cybersecurity<br>Information Technology",
        client: "PROBEL"
    },
    {
        name: "SafePath",
        image: "img/SAFEPATH.png",
        overview: "A security-focused platform for continuous data leak monitoring and strong password generation, offering practical guidance on improving the protection of data and applications.",
        tags: "Product Design<br>UX/UI Design<br>Mobile",
        industry: "Cybersecurity",
        client: "SafePath"
    }
];
const projectsAccordion =
    document.querySelector(
        "#projectsAccordion"
    );
function projectLinesHTML(value) {
    if (!value) {
        return "";
    }
    return value
        .split("<br>")
        .map(
            line =>
                `<span class="project-accordion-value-line">${line}</span>`
        )
        .join("");
}
function renderProjectsAccordion() {
    if (!projectsAccordion) {
        return;
    }
    projectsAccordion.innerHTML =
        projects
            .map(
                (project, index) => {
                    const linkAttributes =
                        project.link
                            ? `
                                href="${project.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                              `
                            : `
                                aria-disabled="true"
                              `;
                    const disabledClass =
                        project.link
                            ? ""
                            : " is-disabled";
                    return `
                        <article
                            class="project-accordion-item${index === 0 ? " is-active" : ""}"
                            data-project-index="${index}"
                        >
                            <button
                                class="project-accordion-trigger"
                                type="button"
                                aria-expanded="${index === 0}"
                            >
                                ${project.name}
                            </button>
                            <div
                                class="project-accordion-panel"
                            >
                                <div
                                    class="project-accordion-content"
                                >
                                    <div
                                        class="project-accordion-image"
                                    >
                                        <img
                                            src="${project.image}"
                                            alt="${project.name}"
                                            loading="lazy"
                                            decoding="async"
                                        >
                                    </div>
                                    <div
                                        class="project-accordion-data"
                                    >
                                        <div
                                            class="project-accordion-row"
                                        >
                                            <span
                                                class="project-accordion-label"
                                            >
                                                Overview
                                            </span>
                                            <p
                                                class="project-accordion-value"
                                            >
                                                ${project.overview}
                                            </p>
                                        </div>
                                        <div
                                            class="project-accordion-row"
                                        >
                                            <span
                                                class="project-accordion-label"
                                            >
                                                Tags
                                            </span>
                                            <p
                                                class="project-accordion-value"
                                            >
                                                ${projectLinesHTML(project.tags)}
                                            </p>
                                        </div>
                                        <div
                                            class="project-accordion-row"
                                        >
                                            <span
                                                class="project-accordion-label"
                                            >
                                                Industry
                                            </span>
                                            <p
                                                class="project-accordion-value"
                                            >
                                                ${projectLinesHTML(project.industry)}
                                            </p>
                                        </div>
                                        <div
                                            class="project-accordion-row"
                                        >
                                            <span
                                                class="project-accordion-label"
                                            >
                                                Client
                                            </span>
                                            <p
                                                class="project-accordion-value"
                                            >
                                                ${project.client}
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        class="project-accordion-link action-line${disabledClass}"
                                        ${linkAttributes}
                                    >
                                        Explore the case
                                    </a>
                                </div>
                            </div>
                        </article>
                    `;
                }
            )
            .join("");
}
function initProjectsAccordion() {
    if (!projectsAccordion) {
        return;
    }
    renderProjectsAccordion();
    const items =
        gsap.utils.toArray(
            ".project-accordion-item",
            projectsAccordion
        );
        items.forEach(
        (item, index) => {
            const panel =
                item.querySelector(
                    ".project-accordion-panel"
                );
            if (index === 0) {
                gsap.set(
                    panel,
                    {
                        height: "auto",
                        opacity: 1
                    }
                );
            } else {
                gsap.set(
                    panel,
                    {
                        height: 0,
                        opacity: 0
                    }
                );
            }
        }
    );
    items.forEach(
        (item) => {
            const trigger =
                item.querySelector(
                    ".project-accordion-trigger"
                );
            trigger.addEventListener(
                "click",
                () => {
                    if (
                        item.classList.contains(
                            "is-active"
                        )
                    ) {
                        return;
                    }
                    const currentItem =
                        projectsAccordion
                            .querySelector(
                                ".project-accordion-item.is-active"
                            );
                    const currentPanel =
                        currentItem
                            ?.querySelector(
                                ".project-accordion-panel"
                            );
                    const currentTrigger =
                        currentItem
                            ?.querySelector(
                                ".project-accordion-trigger"
                            );
                    const nextPanel =
                        item.querySelector(
                            ".project-accordion-panel"
                        );
                    if (currentItem) {
                        currentItem
                            .classList
                            .remove(
                                "is-active"
                            );
                        currentTrigger
                            ?.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                    }
                    item.classList.add(
                        "is-active"
                    );
                    trigger.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                    const tl =
                        gsap.timeline({
                            defaults: {
                                ease:
                                    "power3.inOut"
                            }
                        });
                    if (currentPanel) {
                        tl.to(
                            currentPanel,
                            {
                                height: 0,
                                opacity: 0,
                                duration: 0.4
                            },
                            0
                        );
                    }
                    tl.fromTo(
                        nextPanel,
                        {
                            height: 0,
                            opacity: 0
                        },
                        {
                            height: "auto",
                            opacity: 1,
                            duration: 0.6,
                            onComplete: () => {
                                ScrollTrigger.refresh();
                            }
                        },
                        0.12
                    );
                }
            );
        }
    );
}
function setProjectData(index) {
    const project = projects[index];
    projectImages.forEach((img, i) => {
        if (i === index) {
            img.classList.add("active");
        } else {
            img.classList.remove("active");
        }
    });
    overview.textContent =
        project.overview;
    tags.innerHTML =
        project.tags
            .split("<br>")
            .map(
                item =>
                    `<span class="project-value-line">${item}</span>`
            )
            .join("");
    industry.innerHTML =
        project.industry
            .split("<br>")
            .map(
                item =>
                    `<span class="project-value-line">${item}</span>`
            )
            .join("");
    client.textContent =
        project.client;
        if (project.link) {
            projectLink.href = project.link;
            projectLink.target = "_blank";
            projectLink.rel = "noopener noreferrer";
            projectLink.classList.remove("is-disabled");
            projectLink.removeAttribute("aria-disabled");
        } else {
            projectLink.removeAttribute("href");
            projectLink.removeAttribute("target");
            projectLink.removeAttribute("rel");
            projectLink.classList.add("is-disabled");
            projectLink.setAttribute("aria-disabled", "true");
        }
}
gsap.registerPlugin(ScrollTrigger);
const section = document.querySelector(".projects-scroll");
const list = document.querySelector(".project-list");
const setProjectListY =
    gsap.quickSetter(
        list,
        "y",
        "px"
    );
const names = gsap.utils.toArray(".project-name");
const projectImages = gsap.utils.toArray(".project-image");
const overview = document.querySelector("#projectOverview");
const tags = document.querySelector("#projectTags");
const industry = document.querySelector("#projectIndustry");
const client = document.querySelector("#projectClient");
const projectLink = document.querySelector(".project-link");
const projectRight = document.querySelector(".project-right");
const projectList = document.querySelector("#projectList");
let currentIndex = 0;
function getListY(index) {
    const item = names[index];
    const itemCenter =
        item.offsetTop +
        item.offsetHeight / 2;
    const containerCenter =
        projectRight.clientHeight * 0.58;
    return containerCenter - itemCenter;
}
function updateProjectOpacity(projectProgress) {
    names.forEach((name, i) => {
        if (i === currentIndex) {
            gsap.set(name, {
                opacity: 1,
                color: "#ffffff"
            });
            return;
        }
         const distance =
            Math.abs(
                i - projectProgress
            );
            const normalized =
            gsap.utils.clamp(
                0,
                1,
                distance / 2.5
            );
        const opacity =
            0.03 +
            0.32 *
            Math.pow(
                1 - normalized,
                2.4
            );
        gsap.set(name, {
            opacity: opacity,
            color: "#ffffff"
        });
    });
}
const projectsMedia =
    gsap.matchMedia();
document.fonts.ready.then(() => {
    projectsMedia.add(
        "(min-width: 861px) and (min-height: 501px), (min-width: 951px)",
        () => {
            currentIndex = 0;
            setProjectData(0);
            gsap.set(
                projectList,
                {
                    y:
                        getListY(0),
                    visibility:
                        "visible"
                }
            );
            updateProjectOpacity(0);
            const desktopProjectsTrigger =
                ScrollTrigger.create({
                    trigger:
                        section,
                    start:
                        "top top",
                    end:
                        "bottom bottom",
                    scrub:
                        true,
                    invalidateOnRefresh:
                        true,
                    onUpdate:
                        (self) => {
                            const progress =
                                self.progress;
                            const projectProgress =
                                progress *
                                (
                                    projects.length -
                                    1
                                );
                            const index =
                                Math.round(
                                    projectProgress
                                );
                            const low =
                                Math.floor(
                                    projectProgress
                                );
                            const high =
                                Math.min(
                                    low + 1,
                                    projects.length - 1
                                );
                            const localProgress =
                                projectProgress -
                                low;
                            const y1 =
                                getListY(
                                    low
                                );
                            const y2 =
                                getListY(
                                    high
                                );
                            const y =
                                gsap.utils
                                    .interpolate(
                                        y1,
                                        y2,
                                        localProgress
                                    );
                            setProjectListY(
                                y
                            );
                            if (
                                index !==
                                currentIndex
                            ) {
                                currentIndex =
                                    index;
                                setProjectData(
                                    index
                                );
                            }
                            updateProjectOpacity(
                                projectProgress
                            );
                        }
                });
            ScrollTrigger.refresh();
            return () => {
                desktopProjectsTrigger
                    .kill();
                gsap.set(
                    projectList,
                    {
                        clearProps:
                            "transform,visibility"
                    }
                );
                names.forEach(
                    (name) => {
                        gsap.set(
                            name,
                            {
                                clearProps:
                                    "opacity,color"
                            }
                        );
                    }
                );
            };
        }
    );
     projectsMedia.add(
        "(min-width: 700px) and (max-width: 860px), " +
        "(max-width: 699px) and (orientation: portrait), " +
        "(orientation: landscape) and (max-height: 500px) and (max-width: 950px)",
        () => {
            initProjectsAccordion();
            requestAnimationFrame(
                () => {
                    ScrollTrigger.refresh();
                }
            );
            return () => {
                if (
                    projectsAccordion
                ) {
                    projectsAccordion
                        .innerHTML = "";
                }
            };
        }
    );
});
const graphicTrack =
    document.querySelector(".graphic-track");
const graphicGroup =
    document.querySelector(".graphic-group");
let graphicTween;
if (
    graphicTrack &&
    graphicGroup &&
    graphicTrack.children.length === 1
) {
    const graphicClone =
        graphicGroup.cloneNode(true);

    graphicClone.setAttribute(
        "aria-hidden",
        "true"
    );
    graphicTrack.appendChild(
        graphicClone
    );
}
function startGraphicMarquee() {
    if (
        !graphicTrack ||
        !graphicGroup
    ) {
        return;
    }
    if (graphicTween) {
        graphicTween.kill();
    }
    const groupWidth =
        graphicGroup.offsetWidth;
    gsap.set(
        graphicTrack,
        {
            x: 0
        }
    );
    graphicTween =
        gsap.to(
            graphicTrack,
            {
                x: -groupWidth,
                duration: 30,
                ease: "none",
                repeat: -1
            }
        );
}
window.addEventListener(
    "load",
    startGraphicMarquee
);
let graphicResizeTimer;
window.addEventListener(
    "resize",
    () => {
        clearTimeout(
            graphicResizeTimer
        );
        graphicResizeTimer =
            setTimeout(
                startGraphicMarquee,
                200
            );
    }
);
const promptsSection =
    document.querySelector(
        ".prompts-scroll"
    );
const promptArts =
    gsap.utils.toArray(
        ".prompt-art"
    );
const promptsMedia =
    gsap.matchMedia();
if (
    promptsSection &&
    promptArts.length
) {
     promptsMedia.add(
        "(min-width: 700px) and (min-height: 501px), (min-width: 951px)",
        () => {
            const promptsTimeline =
                gsap.timeline({
                    scrollTrigger: {
                        trigger:
                            promptsSection,
                        start:
                            "top top",
                        end:
                            "bottom bottom",
                        scrub:
                            0.8,
                        invalidateOnRefresh:
                            true
                    }
                });
            promptsTimeline.to(
                promptArts,
                {
                    y: () =>
                        -window.innerHeight
                        * 2.7,
                    ease:
                        "none",
                    duration:
                        0.99
                },
                0
            );
            promptsTimeline.to(
                {},
                {
                    duration:
                        0.01
                }
            );
            return () => {
                promptsTimeline
                    .scrollTrigger
                    ?.kill();
                promptsTimeline
                    .kill();
                gsap.set(
                    promptArts,
                    {
                        clearProps:
                            "transform"
                    }
                );
            };
        }
    );
     promptsMedia.add(
        "(max-width: 699px) and (orientation: portrait)",
        () => {
            const promptsTimeline =
                gsap.timeline({
                    scrollTrigger: {
                        trigger:
                            promptsSection,
                        start:
                            "top top",
                        end:
                            "bottom bottom",
                        scrub:
                            0.65,
                        invalidateOnRefresh:
                            true
                    }
                });
            promptsTimeline.to(
                promptArts,
                {
                    y: () =>
                        -window.innerHeight
                        * 1.05,
                    ease:
                        "none",
                    duration:
                        1
                },
                0
            );
            return () => {
                promptsTimeline
                    .scrollTrigger
                    ?.kill();
                promptsTimeline
                    .kill();
                gsap.set(
                    promptArts,
                    {
                        clearProps:
                            "transform"
                    }
                );
            };
        }
    );
    promptsMedia.add(
    "(orientation: landscape) and (max-height: 500px) and (max-width: 950px)",
    () => {
        const promptsTimeline =
            gsap.timeline({
                scrollTrigger: {
                    trigger:
                        promptsSection,
                    start:
                        "top top",
                    end:
                        "bottom bottom",
                    scrub:
                        0.65,
                    invalidateOnRefresh:
                        true
                }
            });
        promptsTimeline.to(
            promptArts,
            {
                y: () =>
                    -window.innerHeight
                    * 1.65,
                ease:
                    "none",
                duration:
                    1
            },
            0
        );
        return () => {
            promptsTimeline
                .scrollTrigger
                ?.kill();
            promptsTimeline
                .kill();
            gsap.set(
                promptArts,
                {
                    clearProps:
                        "transform"
                }
            );
        };
    }
);
}
const swapLinks =
    document.querySelectorAll(
        ".swap-link"
    );
function buildSwapCharacters(element) {
    const nodes =
        Array.from(
            element.childNodes
        );
    const meaningfulNodes =
        nodes.filter((node) => {
            if (
                node.nodeType ===
                Node.TEXT_NODE
            ) {
                return Boolean(
                    node.textContent.trim()
                );
            }
            return true;
        });
    nodes.forEach((node) => {
        if (
            node.nodeType ===
            Node.TEXT_NODE
        ) {
            const rawText =
                node.textContent;
            if (!rawText.trim()) {
                node.remove();
                return;
            }
            let text =
                rawText.replace(
                    /\s+/g,
                    " "
                );
            const firstMeaningful =
                meaningfulNodes[0];
            const lastMeaningful =
                meaningfulNodes[
                    meaningfulNodes.length - 1
                ];
            if (
                node ===
                firstMeaningful
            ) {
                text =
                    text.trimStart();
            }
            if (
                node ===
                lastMeaningful
            ) {
                text =
                    text.trimEnd();
            }
            const fragment =
                document.createDocumentFragment();
            [...text].forEach(
                (char) => {
                    if (char === " ") {
                        fragment.appendChild(
                            document.createTextNode(
                                "\u00A0"
                            )
                        );
                        return;
                    }
                    const charWrap =
                        document.createElement(
                            "span"
                        );
                    charWrap.className =
                        "swap-char";
                    const track =
                        document.createElement(
                            "span"
                        );
                    track.className =
                        "swap-char-track";
                    const current =
                        document.createElement(
                            "span"
                        );
                    current.className =
                        "swap-char-copy";
                    current.textContent =
                        char;
                    const next =
                        document.createElement(
                            "span"
                        );
                    next.className =
                        "swap-char-copy";
                    next.textContent =
                        char;
                    next.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                    track.appendChild(
                        current
                    );
                    track.appendChild(
                        next
                    );
                    charWrap.appendChild(
                        track
                    );
                    fragment.appendChild(
                        charWrap
                    );
                }
            );
            node.replaceWith(
                fragment
            );
        }
        else if (
            node.nodeType ===
            Node.ELEMENT_NODE
        ) {
            buildSwapCharacters(
                node
            );
        }
    });
}
swapLinks.forEach((link) => {
    buildSwapCharacters(
        link
    );
    const tracks =
        gsap.utils.toArray(
            ".swap-char-track",
            link
        );
    const hoverTimeline =
        gsap.timeline({
            paused: true
        });
    hoverTimeline.to(
        tracks,
        {
            yPercent: -50,
            duration: 0.46,
            ease: "power2.inOut",
            stagger: {
                each: 0.018,
                from: "start"
            }
        }
    );
    let isAnimating = false;
link.addEventListener(
    "mouseenter",
    () => {
        if (isAnimating) {
            return;
        }
        isAnimating = true;
        gsap.to(
            tracks,
            {
                yPercent: -50,
                duration: 0.48,
                ease: "power2.inOut",
                stagger: {
                    each: 0.022,
                    from: "start"
                },
                onComplete: () => {
                    gsap.set(
                        tracks,
                        {
                            yPercent: 0
                        }
                    );
                    isAnimating = false;
                }
            }
        );
    }
);
});
const scrollLinks =
    document.querySelectorAll(
        ".scroll-link"
    );
scrollLinks.forEach((link) => {
    link.addEventListener(
        "click",
        (event) => {
            const selector =
                link.getAttribute(
                    "href"
                );
            if (
                !selector ||
                !selector.startsWith("#")
            ) {
                return;
            }
            const target =
                document.querySelector(
                    selector
                );
            if (!target) {
                return;
            }
            event.preventDefault();
            if (
                link.closest(
                    ".mobile-menu"
                )
            ) {
                setMobileMenu(false);
            }
            lenis.scrollTo(
                target,
                {
                    duration: 1.2,
                    easing:
                        (t) =>
                            1 -
                            Math.pow(
                                1 - t,
                                4
                            )
                }
            );
        }
    );
});
function initPageEntrance() {
    const heroElements = [
        ".header",
        ".main_info",
        ".main_nav",
        ".main_bottom"
    ];
    gsap.from(
        heroElements,
        {
            y: 28,
            autoAlpha: 0,
            filter: "blur(8px)",
            duration: 0.9,
            stagger: 0.11,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility,filter"
        }
    );
}
window.addEventListener(
    "load",
    initPageEntrance
);
gsap.from(
    [
        ".experience-title",
        ".experience-head",
        ...gsap.utils.toArray(".experience-row")
    ],
    {
        scrollTrigger: {
            trigger: ".experience",
            start: "top 82%",
            once: true
        },
        y: 28,
        autoAlpha: 0,
        filter: "blur(8px)",
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility,filter"
    }
);
gsap.from(
    [
        ".contact-title",
        ...gsap.utils.toArray(".contact-item")
    ],
    {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 85%",
            once: true
        },
        y: 24,
        autoAlpha: 0,
        filter: "blur(6px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility,filter"
    }
);
const mainRecap =
    document.querySelector(
        ".main_recap"
    );
const mainBottom =
    document.querySelector(
        ".main_bottom"
    );
function syncMainPhotoHeight() {
    if (
        !mainRecap ||
        !mainBottom
    ) {
        return;
    }
    const recapHeight =
        mainRecap.getBoundingClientRect()
            .height;
    mainBottom.style.setProperty(
        "--recap-height",
        `${recapHeight}px`
    );
}
if (
    mainRecap &&
    mainBottom
) {
    const recapObserver =
        new ResizeObserver(
            syncMainPhotoHeight
        );
    recapObserver.observe(
        mainRecap
    );
    document.fonts.ready.then(
        syncMainPhotoHeight
    );
    window.addEventListener(
        "resize",
        syncMainPhotoHeight
    );
}
const burgerButton =
  document.querySelector(
    ".burger-button"
  );
const mobileMenu =
  document.querySelector(
    ".mobile-menu"
  );
const mobileMenuLinks =
  document.querySelectorAll(
    ".mobile-menu .scroll-link"
  );
function setMobileMenu(open) {
  if (
    !burgerButton ||
    !mobileMenu
  ) {
    return;
  }
  burgerButton.classList.toggle(
    "is-open",
    open
  );
  mobileMenu.classList.toggle(
    "is-open",
    open
  );
  burgerButton.setAttribute(
    "aria-expanded",
    String(open)
  );
  if (open) {
    lenis.stop();
  } else {
    lenis.start();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
}
if (
  burgerButton &&
  mobileMenu
) {
  burgerButton.addEventListener(
    "click",
    () => {
      const open =
        !burgerButton.classList.contains(
          "is-open"
        );
      setMobileMenu(open);
    }
  );
  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 860
      ) {
        setMobileMenu(false);
      }
    }
  );
}
