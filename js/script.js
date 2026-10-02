/**
 * js/script.js
 *
 * Implements client-side interactivity for the Opa's Birthday Website.
 * This includes:
 * - Initialization of AOS (Animate On Scroll) library for smooth scroll animations.
 * - A 'reveal' mechanism for the personalized birthday letter.
 * - An interactive confetti burst feature on a 'celebrate' button click.
 * - A personalized "wish" message revelation.
 * - A scroll-to-top button for improved navigation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Initializes the AOS (Animate On Scroll) library.
     * AOS allows for elements to animate as they scroll into view.
     * Configuration:
     * - `duration`: Animation duration in milliseconds.
     * - `once`: Whether animation should happen only once (true) or every time it enters/exits view.
     * - `offset`: Offset (in px) from the top of the screen to trigger animations.
     * - `easing`: Specifies the easing function for the animation.
     */
    AOS.init({
        duration: 1200, // Longer duration for smoother, less abrupt animations
        once: true,     // Animations typically happen only once on a birthday site to avoid repetitive distractions
        offset: 150,    // A bit more generous offset to trigger animations slightly earlier
        easing: 'ease-in-out', // A smoother easing function for a more polished feel
    });

    /**
     * Implements the 'reveal' mechanism for the birthday letter section.
     * The letter is initially hidden (e.g., using Bootstrap's `d-none` or a custom CSS class)
     * and revealed with an animation upon a specific button click.
     * The reveal button is then hidden to prevent repeated actions.
     */
    const revealLetterBtn = document.getElementById('revealLetterBtn');
    const birthdayLetterSection = document.getElementById('birthdayLetterSection');

    if (revealLetterBtn && birthdayLetterSection) {
        revealLetterBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button behavior (e.g., form submission, page reload)
            try {
                // Remove the utility class that hides the section
                birthdayLetterSection.classList.remove('d-none');
                // Add an animation class for a smooth transition (assumes 'fade-in-up' is defined in styles.css)
                birthdayLetterSection.classList.add('fade-in-up', 'animated');
                // Hide the reveal button after the letter is shown
                revealLetterBtn.classList.add('d-none');

                // Scroll smoothly to the revealed letter section for better user experience
                birthdayLetterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                console.log('Birthday letter revealed successfully.');
            } catch (error) {
                console.error('Error revealing birthday letter:', error);
            }
        });
    } else {
        console.warn('Reveal letter button (ID: revealLetterBtn) or birthday letter section (ID: birthdayLetterSection) not found. The letter reveal mechanism will not function.');
    }

    /**
     * Implements the interactive confetti burst feature.
     * This relies on the `canvas-confetti` library, which is expected to be loaded via CDN in `index.html`.
     * Triggers a series of visually appealing confetti bursts upon a 'celebrate' button click.
     */
    const celebrateBtn = document.getElementById('celebrateBtn');

    // Check if the button exists and the confetti library is loaded (global 'confetti' function available)
    if (celebrateBtn && typeof confetti !== 'undefined') {
        celebrateBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button behavior
            try {
                // First burst: standard upward burst from the center-bottom
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 } // Slightly above the bottom center
                });

                // Second burst: slightly delayed, originating from the left side
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        angle: 60, // Angle towards the right
                        spread: 70,
                        origin: { x: 0, y: 0.8 } // From bottom-left corner
                    });
                }, 200);

                // Third burst: slightly delayed, originating from the right side
                setTimeout(() => {
                    confetti({
                        particleCount: 100,
                        angle: 120, // Angle towards the left
                        spread: 70,
                        origin: { x: 1, y: 0.8 } // From bottom-right corner
                    });
                }, 400);

                // Add a brief visual feedback to the button to indicate interaction
                celebrateBtn.classList.add('btn-clicked');
                setTimeout(() => {
                    celebrateBtn.classList.remove('btn-clicked');
                }, 300);

                console.log('Confetti burst triggered successfully.');

            } catch (error) {
                // Log an error if the confetti function fails (e.g., due to library issues)
                console.error('Error triggering confetti:', error);
            }
        });
    } else if (celebrateBtn && typeof confetti === 'undefined') {
        console.warn('Confetti library (canvas-confetti) not loaded or available. The celebrate button (ID: celebrateBtn) will not trigger confetti.');
    } else {
        console.warn('Celebrate button (ID: celebrateBtn) not found. Confetti feature will not be available.');
    }

    /**
     * Implements a personalized "wish" message revelation.
     * A button click reveals a hidden, heartfelt wish message, adding a personal and interactive touch.
     */
    const wishButton = document.getElementById('wishButton');
    const wishMessage = document.getElementById('wishMessage');

    if (wishButton && wishMessage) {
        wishButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button behavior
            try {
                // Set the personalized message text
                wishMessage.textContent = "Möge Dein Geburtstag voller Freude, Lachen und unvergesslicher Momente sein! Wir lieben Dich sehr!";
                // Remove the hidden class to make the message visible
                wishMessage.classList.remove('d-none');
                // Add animation classes for a smooth appearance (assumes 'fade-in' is in styles.css)
                wishMessage.classList.add('fade-in', 'animated');
                // Hide the button after the wish is revealed to prevent multiple clicks
                wishButton.classList.add('d-none');

                console.log('Wish message revealed successfully.');
            } catch (error) {
                console.error('Error revealing wish message:', error);
            }
        });
    } else {
        console.warn('Wish button (ID: wishButton) or wish message element (ID: wishMessage) not found. Wish revelation will not function.');
    }

    /**
     * Implements a scroll-to-top button for enhanced navigation.
     * The button appears after the user scrolls down a certain amount and smoothly scrolls the page to the top
     * when clicked.
     */
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        /**
         * Event handler for window scroll to control the visibility of the scroll-to-top button.
         * The button appears when the user scrolls down past a specified threshold.
         */
        const handleScrollToTopButtonVisibility = () => {
            // Show button after scrolling down 400px
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.remove('d-none');
                scrollToTopBtn.classList.add('fade-in-up'); // Animate button appearance (assumes 'fade-in-up' is in CSS)
            } else {
                scrollToTopBtn.classList.add('d-none');
                scrollToTopBtn.classList.remove('fade-in-up');
            }
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScrollToTopButtonVisibility);

        // Perform an initial check in case the page is loaded already scrolled (e.g., from a link)
        handleScrollToTopButtonVisibility();

        // Add click listener for the scroll-to-top action
        scrollToTopBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link/button behavior
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Smooth scroll animation for a pleasant user experience
                });
                console.log('Scrolled to top of the page.');
            } catch (error) {
                console.error('Error scrolling to top:', error);
            }
        });
    } else {
        console.warn('Scroll-to-top button (ID: scrollToTopBtn) not found. The scroll-to-top feature will not be available.');
    }
});

/**
 * Simulates a typing effect on a given HTML element.
 * This function is provided as a utility and can be called if a dynamic typing animation is desired
 * for a specific text element (e.g., a hero title, a greeting message).
 *
 * @param {HTMLElement} element - The target HTML element where the text will be typed.
 * @param {string} text - The complete string of text to be typed out character by character.
 * @param {number} [delay=100] - The delay in milliseconds between typing each character. Defaults to 100ms.
 * @param {Function} [callback=null] - An optional callback function to execute after the typing effect is fully complete.
 */
function typeWriterEffect(element, text, delay = 100, callback = null) {
    let i = 0;
    // Clear any existing text content from the element
    element.textContent = '';
    // Ensure the element is visible (e.g., if it was hidden by CSS opacity: 0)
    element.style.opacity = '1';

    /**
     * Recursive helper function to type out characters one by one.
     */
    function type() {
        if (i < text.length) {
            // Append the next character to the element's text content
            element.textContent += text.charAt(i);
            i++;
            // Schedule the next character to be typed after the specified delay
            setTimeout(type, delay);
        } else if (callback) {
            // If a callback function is provided, execute it once all characters are typed
            callback();
        }
    }
    // Start the typing effect
    type();
}