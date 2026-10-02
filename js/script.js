/**
 * @file js/script.js
 * @brief Handles interactive elements, dynamic content for the unique memory timeline/gallery,
 *        animation triggers (AOS initialization), and overall user experience logic for Opa's birthday website.
 */

// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Initializes the AOS (Animate On Scroll) library.
     * @returns {void}
     */
    function initializeAOS(): void {
        AOS.init({
            duration: 1200, // global duration for animations
            once: true,     // whether animation should happen only once - while scrolling down
            mirror: false,  // whether elements should animate out while scrolling past them
        });
    }

    /**
     * Sets up smooth scrolling for all internal anchor links.
     * @returns {void}
     */
    function setupSmoothScroll(): void {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Close responsive navbar if open on click
                        const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
                        const navbarCollapse = document.getElementById('navbarNav');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            // Programmatically click the toggler to close the menu
                            if (navbarToggler) navbarToggler.click();
                        }

                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    /**
     * Toggles the "read more/less" functionality for personalized letters.
     * @param {string} letterId - The ID of the letter section (e.g., 'phil-letter', 'amy-letter').
     * @returns {void}
     */
    function setupLetterToggle(letterId: string): void {
        const letterContent = document.getElementById(`${letterId}-content`);
        const readMoreBtn = document.getElementById(`${letterId}-read-more-btn`);

        if (letterContent && readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                if (letterContent.classList.contains('expanded')) {
                    letterContent.classList.remove('expanded');
                    readMoreBtn.textContent = 'Mehr lesen';
                    // Scroll back to the top of the letter snippet if needed, or to the beginning of the section
                    const section = letterContent.closest('section');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    letterContent.classList.add('expanded');
                    readMoreBtn.textContent = 'Weniger lesen';
                }
            });
        }
    }

    /**
     * Interface for a Memory object.
     * @interface Memory
     */
    interface Memory {
        id: string;
        date: string;
        title: string;
        snippet: string; // Short snippet for the timeline card
        description: string; // Full description for the modal
        imageUrl: string;
        videoUrl?: string; // Optional YouTube embed URL
        author: string;
    }

    /**
     * Array of memory objects for the timeline.
     * @type {Memory[]}
     */
    const memories: Memory[] = [
        {
            id: 'memory-1',
            date: '1975',
            title: 'Dein erstes selbstgebautes Regal',
            snippet: 'Wir erinnern uns alle an das unglaublich stabile Regal im Wohnzimmer. Ein Meisterwerk deiner Handwerkskunst!',
            description: 'Dein erstes selbstgebautes Regal im Wohnzimmer war nicht nur ein Möbelstück, sondern ein Symbol deiner Schaffenskraft und deines Talents. Es hat unzählige Bücher und Andenken getragen und war jahrelang ein fester Bestandteil unseres Zuhauses. Jedes Mal, wenn wir es sahen, dachten wir an deine Geduld und Präzision.',
            imageUrl: 'https://source.unsplash.com/800x600/?carpentry,woodworking,vintagefurniture',
            author: 'Phil'
        },
        {
            id: 'memory-2',
            date: '1988',
            title: 'Unvergessliche Familienurlaube',
            snippet: 'Die Sommer in den Bergen oder am Meer – du hast uns immer die schönsten Orte gezeigt und die Reise zu einem Abenteuer gemacht.',
            description: 'Die Familienurlaube, die du organisiert hast, sind in unserer Erinnerung fest verankert. Egal ob in den Alpen, an der Nordsee oder im Schwarzwald – du hast immer dafür gesorgt, dass wir die Welt entdecken und unvergessliche Momente als Familie erleben. Dein Enthusiasmus für Entdeckungen war ansteckend.',
            imageUrl: 'https://source.unsplash.com/800x600/?family,vintagevacation,mountains',
            author: 'Amy'
        },
        {
            id: 'memory-3',
            date: '1995',
            title: 'Deine erste digitale Kamera',
            snippet: 'Du warst schon immer technikbegeistert! Wir wissen noch genau, wie stolz du auf deine erste Digitalkamera warst.',
            description: 'Deine Faszination für Technik war immer beeindruckend. Als du deine erste Digitalkamera bekamst, warst du der Erste, der uns die neue Welt der digitalen Fotografie erklärte. Unzählige Familienfotos und Schnappschüsse wurden dank deiner Neugier und deines Eifers eingefangen.',
            imageUrl: 'https://source.unsplash.com/800x600/?vintagecamera,photography,technology',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=i29Wf6eF0B9h-R7V', // Placeholder
            author: 'Sven'
        },
        {
            id: 'memory-4',
            date: '2005',
            title: 'Dein Schrebergarten-Paradies',
            snippet: 'Dein grüner Daumen ist legendär. Dein Garten war und ist ein echtes Paradies, das du mit viel Liebe pflegst.',
            description: 'Der Schrebergarten ist dein Reich, ein Ort der Ruhe und Schönheit, den du über Jahrzehnte mit unermüdlicher Leidenschaft gepflegt hast. Die frischen Kräuter, das knackige Gemüse und die farbenfrohen Blumen sind ein Zeugnis deiner Hingabe. Wir lieben es, dort mit dir Zeit zu verbringen und von deiner Erfahrung zu lernen.',
            imageUrl: 'https://source.unsplash.com/800x600/?gardening,allotment,flowers',
            author: 'Gloria'
        },
        {
            id: 'memory-5',
            date: '2012',
            title: 'Der Ausflug zur alten Burg',
            snippet: 'Ein Tag voller Geschichten und Abenteuer, als du uns die Geschichte der Region nähergebracht hast.',
            description: 'Der Ausflug zur alten Burg war mehr als nur eine Besichtigung; es war eine Geschichtsstunde, die lebendig wurde durch deine Erzählungen. Du hast uns gezeigt, wie wichtig es ist, die Vergangenheit zu verstehen und die Spuren unserer Vorfahren zu würdigen. Ein wirklich unvergesslicher Tag.',
            imageUrl: 'https://source.unsplash.com/800x600/?oldcastle,history,familytrip',
            author: 'Phil'
        },
        {
            id: 'memory-6',
            date: '2018',
            title: 'Deine erste Smartphone-App',
            snippet: 'Wer hätte gedacht, dass Opa mal eine App benutzt? Du hast uns alle überrascht mit deiner Schnelligkeit, neue Dinge zu lernen.',
            description: 'Als du dir dein erstes Smartphone zulegtest, dachten wir, es würde eine Weile dauern, bis du dich daran gewöhnt hast. Aber du hast uns alle überrascht! Schnell hast du die ersten Apps gemeistert und sogar selbstständig Videotelefonie genutzt. Dein Lerneifer ist wirklich inspirierend!',
            imageUrl: 'https://source.unsplash.com/800x600/?smartphone,grandpa,technology',
            author: 'Amy'
        },
        {
            id: 'memory-7',
            date: '2023',
            title: 'Dein 80. Geburtstagspicknick',
            snippet: 'Ein wunderschöner Tag im Park, umgeben von Familie und Freunden. Ein weiteres Highlight in deinem Leben.',
            description: 'Das Picknick zum 80. Geburtstag war ein Fest der Liebe und Zusammengehörigkeit. Es war so schön zu sehen, wie viele Menschen dich wertschätzen und wie viel Freude du in unser aller Leben bringst. Wir freuen uns auf viele weitere solcher Momente mit dir!',
            imageUrl: 'https://source.unsplash.com/800x600/?birthday,picnic,familycelebration',
            author: 'Sven'
        }
    ];

    /**
     * Renders the memory timeline dynamically.
     * @returns {void}
     */
    function renderMemoryTimeline(): void {
        const timelineContainer = document.getElementById('memory-timeline-container');
        const memoryModal = document.getElementById('memoryModal');
        const modalTitle = document.getElementById('memoryModalLabel');
        const modalBody = document.querySelector('#memoryModal .modal-body');

        if (!timelineContainer || !memoryModal || !modalTitle || !modalBody) {
            console.error('Required elements for memory timeline or modal not found.');
            return;
        }

        memories.forEach((memory, index) => {
            const isLeft = index % 2 === 0;
            const timelineItem = document.createElement('div');
            timelineItem.classList.add('timeline-item', isLeft ? 'left' : 'right');
            timelineItem.setAttribute('data-aos', isLeft ? 'fade-right' : 'fade-left');
            timelineItem.setAttribute('data-aos-delay', (index * 150).toString()); // Staggered animation

            timelineItem.innerHTML = `
                <div class="timeline-date">${memory.date}</div>
                <div class="timeline-content card shadow-lg glassmorphism">
                    <img src="${memory.imageUrl}" class="card-img-top" alt="${memory.title}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${memory.title}</h5>
                        <p class="card-text">${memory.snippet}</p>
                        <button type="button" class="btn btn-primary btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#memoryModal" data-memory-id="${memory.id}">
                            Mehr erfahren
                        </button>
                    </div>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });

        // Event listener for opening the memory modal
        memoryModal.addEventListener('show.bs.modal', (event: Event) => {
            const button = (event as any).relatedTarget; // Button that triggered the modal
            const memoryId = button.getAttribute('data-memory-id');
            const memory = memories.find(m => m.id === memoryId);

            if (memory) {
                (modalTitle as HTMLElement).textContent = memory.title;
                (modalBody as HTMLElement).innerHTML = `
                    <img src="${memory.imageUrl}" class="img-fluid rounded mb-3" alt="${memory.title}" loading="lazy">
                    <p>${memory.description}</p>
                    <p class="text-muted small"><em>Erinnerung von: ${memory.author}</em></p>
                    ${memory.videoUrl ? `
                        <div class="ratio ratio-16x9 mt-4">
                            <iframe src="${memory.videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
                        </div>` : ''}
                `;
            }
        });

        // Event listener to stop video when modal closes
        memoryModal.addEventListener('hidden.bs.modal', () => {
            const iframes = modalBody.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const src = iframe.src;
                iframe.src = src; // Reloads the iframe, effectively stopping the video
            });
        });
    }

    /**
     * Initializes the sticky navigation bar and active link highlighting.
     * @returns {void}
     */
    function setupStickyNavbar(): void {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > 0) {
                header.classList.add('sticky-top', 'scrolled');
            } else {
                header.classList.remove('sticky-top', 'scrolled');
            }

            // Hide/show navbar on scroll down/up for better mobile UX
            if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
                // Scrolling down, hide header
                header.classList.add('navbar-hidden');
            } else {
                // Scrolling up, show header
                header.classList.remove('navbar-hidden');
            }
            lastScrollY = window.scrollY;

            // Highlight active navigation link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

            sections.forEach(sec => {
                const top = window.scrollY;
                const offset = sec.offsetTop - 150; // Adjust offset for better active state
                const height = sec.offsetHeight;
                const id = sec.getAttribute('id');

                if (top >= offset && top < offset + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on load to set initial state
        handleScroll();
    }

    /**
     * Initializes the "Back to Top" button functionality.
     * @returns {void}
     */
    function setupBackToTopButton(): void {
        const backToTopBtn = document.getElementById('back-to-top-btn');

        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- Function Calls ---
    initializeAOS();
    setupSmoothScroll();
    setupLetterToggle('phil-letter');
    setupLetterToggle('amy-letter');
    setupLetterToggle('sven-letter');
    setupLetterToggle('gloria-letter');
    renderMemoryTimeline();
    setupStickyNavbar();
    setupBackToTopButton();

    // Small animation for hero section elements on load using animate.css (if linked)
    // These classes should be added by default on `index.html` and animate.css handles them
    // but if not, this ensures they get added for initial animation.
    const heroTitle = document.querySelector('.hero-content h1');
    const heroText = document.querySelector('.hero-content p');
    const heroBtn = document.querySelector('.hero-content .btn');

    // Adding classes dynamically if not already present
    // Note: It's better to have these in HTML directly for initial load performance
    // and rely on animate.css for actual animation.
    if (heroTitle && !heroTitle.classList.contains('animate__animated')) heroTitle.classList.add('animate__animated', 'animate__fadeInDown');
    if (heroText && !heroText.classList.contains('animate__animated')) heroText.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-0-5s');
    if (heroBtn && !heroBtn.classList.contains('animate__animated')) heroBtn.classList.add('animate__animated', 'animate__zoomIn', 'animate__delay-1s');

});