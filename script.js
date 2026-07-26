document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GREETING LOGIC (TEMPORARY: Resets when tab closes) ---
    const path = window.location.pathname.toLowerCase();
    const isAllowedPage = path.endsWith("index.html") || path.endsWith("register.html") || path.endsWith("/");
    
    if (isAllowedPage) {
        let savedName = sessionStorage.getItem("abc_university_username");
        let heading = document.querySelector(".intro");

        if (savedName && heading) {
            heading.textContent = `Welcome to ABC University, ${savedName}!`;
        } else if (heading) {
            let userName = prompt("Please enter your name:");
            if (userName && userName.trim() !== "") {
                heading.textContent = `Welcome to ABC University, ${userName.trim()}!`;
                sessionStorage.setItem("abc_university_username", userName.trim());
            }
        }
    }

    // --- 2. THEME LOGIC (PERMANENT) ---
    const themeBtn = document.getElementById("theme-toggle");
    
    // Read the permanent theme preference from localStorage on page load
    let isRedMode = localStorage.getItem("abc_university_theme") === "red";

    // Reusable function to apply styles based on the current state
    function applyTheme(redModeActive) {
        const headers = document.querySelectorAll("header");
        const footers = document.querySelectorAll("footer");
        const navs = document.querySelectorAll("nav");
        const tableHeaders = document.querySelectorAll("th");
        const submitButtons = document.querySelectorAll('input[type="submit"]');
        const flipCardBacks = document.querySelectorAll(".flip-card-back");
        
        // Target text wrappers to manage contrast
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const links = document.querySelectorAll("a");
        const tableCells = document.querySelectorAll("td");
        const paragraphsAndLists = document.querySelectorAll("p, li, main, section");

        if (redModeActive) {
            // Apply Red Mode Styles
            document.body.style.backgroundColor = "#140505";
            document.body.style.color = "#ffffff"; 

            headers.forEach(el => el.style.backgroundColor = "#800000");
            footers.forEach(el => el.style.backgroundColor = "#800000");
            tableHeaders.forEach(el => el.style.backgroundColor = "#800000");
            flipCardBacks.forEach(el => el.style.backgroundColor = "#800000");
            navs.forEach(el => el.style.backgroundColor = "#cc0000");
            submitButtons.forEach(el => el.style.backgroundColor = "#cc0000");

            // Page text contrast defaults
            headings.forEach(el => el.style.color = "#ffcc00");
            links.forEach(el => el.style.color = "#ffcc00");
            
            // FIX: Keep text dark charcoal inside the white table blocks
            tableCells.forEach(el => el.style.color = "#222222");

            // FIX: Keep paragraph and list text dark charcoal inside the white content boxes
            paragraphsAndLists.forEach(el => {
                if (el.closest("main") || el.closest("section") || el.closest(".contact-container")) {
                    el.style.color = "#222222";
                }
            });
            
            // FIX: Override headings inside the white cards so they stay dark red instead of turning white
            document.querySelectorAll("main h1, main h2, main h3, section h1, section h2, section h3").forEach(el => {
                el.style.color = "#800000";
            });

            if (themeBtn) {
                themeBtn.textContent = "🔵 Click to switch theme to Blue";
                themeBtn.style.backgroundColor = "#cc0000";
            }
        } else {
            // Apply Original Blue Mode Styles
            document.body.style.backgroundColor = "#eef3f8";
            document.body.style.color = "#333333"; 

            headers.forEach(el => el.style.backgroundColor = "#003366");
            footers.forEach(el => el.style.backgroundColor = "#003366");
            tableHeaders.forEach(el => el.style.backgroundColor = "#003366");
            flipCardBacks.forEach(el => el.style.backgroundColor = "#003366");
            navs.forEach(el => el.style.backgroundColor = "#00509e");
            submitButtons.forEach(el => el.style.backgroundColor = "#00509e");

            // Revert all customized text color overrides back to original CSS values
            headings.forEach(el => el.style.color = "");
            links.forEach(el => el.style.color = "");
            tableCells.forEach(el => el.style.color = "");
            paragraphsAndLists.forEach(el => el.style.color = "");
            document.querySelectorAll("main h1, main h2, main h3, section h1, section h2, section h3").forEach(el => {
                el.style.color = "";
            });

            if (themeBtn) {
                themeBtn.textContent = "🔴 Click to switch theme to Red";
                themeBtn.style.backgroundColor = "#003366";
            }
        }
    }

    if (themeBtn) {
        // Initial setup for the button look
        themeBtn.style.color = "white";
        themeBtn.style.border = "2px solid white";

        // Instantly run the theme on load so it reflects your saved choice right away
        applyTheme(isRedMode);

        // Click listener to toggle the states
        themeBtn.addEventListener("click", () => {
            isRedMode = !isRedMode;
            localStorage.setItem("abc_university_theme", isRedMode ? "red" : "blue");
            applyTheme(isRedMode);
        });
    }
});



