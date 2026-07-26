document.addEventListener("DOMContentLoaded", () => {
    

    // 1. WELCOME MESSAGE 
  

const heading = document.getElementById("intro");
const storageKey = "abc_university_username";

function updateHeading(name) {
    if (heading) {
        heading.textContent = `Welcome to ABC University, ${name}!`;
    }
}

let savedName = sessionStorage.getItem(storageKey);

if (savedName) {
    updateHeading(savedName);
} else {
    let userName = prompt("Please enter your name:");
    if (userName && userName.trim() !== "") {
        let cleanName = userName.trim();
        updateHeading(cleanName);
        sessionStorage.setItem(storageKey, cleanName);
    }
}





 
    // 2. FORM VALIDATION
  

    const mainForm = document.querySelector("form");

    if (mainForm) {
        mainForm.addEventListener("submit", (event) => {
            let isValid = true;
            let firstErrorMessage = "";

            // Find all inputs with the "required" attribute
            const requiredFields = mainForm.querySelectorAll("[required]");

            requiredFields.forEach((field) => {
                // Clear any old red borders or styling
                field.style.border = "";

                // Check if field is empty or just whitespace
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.border = "2px solid #cc0000"; // Visual error cue
                    
                    if (!firstErrorMessage) {
                        // Snag the placeholder or name for a cleaner error message
                        const fieldName = field.placeholder || field.name || "required fields";
                        firstErrorMessage = `Please fill out the missing field: "${fieldName}"`;
                    }
                }
            });

            // Prevent form dispatch if validation fails
            if (!isValid) {
                event.preventDefault();
                alert(firstErrorMessage);
            } else {
                // Feature 3 Bonus: Display a confirmation message after successful validation
                event.preventDefault(); // Prevents page reload for demo simulation purposes
                alert("🎉 Success! Your form has been submitted completely and securely.");
                mainForm.reset();
            }
        });
    }


    // 3. DYNAMIC CONTENT & PERMANENT THEME
   
    const themeBtn = document.getElementById("theme-toggle");
    let isRedMode = localStorage.getItem("abc_university_theme") === "red";

    function applyTheme(redModeActive) {
        const headers = document.querySelectorAll("header");
        const footers = document.querySelectorAll("footer");
        const navs = document.querySelectorAll("nav");
        const tableHeaders = document.querySelectorAll("th");
        const submitButtons = document.querySelectorAll('input[type="submit"]');
        const flipCardBacks = document.querySelectorAll(".flip-card-back");
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

            headings.forEach(el => el.style.color = "#ffcc00");
            links.forEach(el => el.style.color = "#ffcc00");
            tableCells.forEach(el => el.style.color = "#222222");

            paragraphsAndLists.forEach(el => {
                if (el.closest("main") || el.closest("section") || el.closest(".contact-container")) {
                    el.style.color = "#222222";
                }
            });
            
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

    // Initialize Theme
    if (themeBtn) {
        themeBtn.style.color = "white";
        themeBtn.style.border = "2px solid white";
        applyTheme(isRedMode);

        themeBtn.addEventListener("click", () => {
            isRedMode = !isRedMode;
            localStorage.setItem("abc_university_theme", isRedMode ? "red" : "blue");
            applyTheme(isRedMode);
        });
    }

    // ------------------------------------------
    // Dynamic Content Feature: Show/Hide Read More
    // ------------------------------------------
    // Target any button with class="read-more-btn" and elements with class="extra-content"
    const readMoreButtons = document.querySelectorAll(".read-more-btn");

    readMoreButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Find the panel/paragraph structurally right next to or inside the card component
            const extraContent = btn.parentElement.querySelector(".extra-content");
            
            if (extraContent) {
                if (extraContent.style.display === "none" || extraContent.style.display === "") {
                    extraContent.style.display = "block";
                    btn.textContent = "Show Less ▲";
                } else {
                    extraContent.style.display = "none";
                    btn.textContent = "Read More ▼";
                }
            }
        });
    });

});

