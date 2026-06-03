// =========================
// Global Variables
// =========================

let aboutData = {};
let projectsData = [];

// =========================
// Fetch Data
// =========================

async function fetchAboutData() {
    try {
        const response = await fetch("./data/aboutMeData.json");

        if (!response.ok) {
            throw new Error("Failed to fetch About Me data");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchProjectsData() {
    try {
        const response = await fetch("./data/projectsData.json");

        if (!response.ok) {
            throw new Error("Failed to fetch Projects data");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// =========================
// About Me Section
// =========================

function renderAboutMe(data) {
    const aboutContainer = document.getElementById("aboutMe");

    const paragraph = document.createElement("p");
    paragraph.textContent = data.aboutMe;
    paragraph.style.whiteSpace = "pre-line";
    paragraph.textContent = data.aboutMe || "About information unavailable.";

    const headshotContainer = document.createElement("div");
    headshotContainer.classList.add("headshotContainer");

    const image = document.createElement("img");
    image.src =
        data.headshot || "./images/card_placeholder_bg.webp";
    image.alt = "Headshot";

    headshotContainer.appendChild(image);

    aboutContainer.appendChild(paragraph);
    aboutContainer.appendChild(headshotContainer);
}

// =========================
// Project Spotlight
// =========================

function updateSpotlight(project) {
    const spotlight = document.getElementById("projectSpotlight");

    const titleContainer =
        document.getElementById("spotlightTitles");

    titleContainer.innerHTML = "";

    spotlight.style.backgroundImage = `url(${project.spotlight_image ||
        "../images/spotlight_placeholder_bg.webp"
        })`;

    const title = document.createElement("h3");
    title.textContent =
        project.project_name || "Untitled Project";

    const description = document.createElement("p");
    description.textContent =
        project.long_description ||
        "No detailed description available.";

    const link = document.createElement("a");
    link.textContent = "Click here to see more...";
    link.href = project.url || "#";
    link.target = "_blank";

    titleContainer.appendChild(title);
    titleContainer.appendChild(description);
    titleContainer.appendChild(link);
}

// =========================
// Project Cards
// =========================

function renderProjects(projects) {
    const projectList =
        document.getElementById("projectList");

    projects.forEach((project) => {
        const card = document.createElement("div");

        card.classList.add("projectCard");
        card.id = project.project_id;

        card.style.backgroundImage = `url(${project.card_image ||
            "../images/card_placeholder_bg.webp"
            })`;

        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";

        const title = document.createElement("h4");
        title.textContent =
            project.project_name || "Untitled Project";

        const description = document.createElement("p");
        description.textContent =
            project.short_description ||
            "No description available.";

        card.appendChild(title);
        card.appendChild(description);

        card.addEventListener("click", () => {
            updateSpotlight(project);
        });

        projectList.appendChild(card);
    });

    if (projects.length > 0) {
        updateSpotlight(projects[0]);
    }
}

// =========================
// Project Navigation
// =========================

function setupProjectNavigation() {
    const projectList =
        document.getElementById("projectList");

    const leftArrow =
        document.querySelector(".arrow-left");

    const rightArrow =
        document.querySelector(".arrow-right");

    leftArrow.addEventListener("click", () => {
        const desktop =
            window.matchMedia("(min-width: 768px)").matches;

        if (desktop) {
            projectList.scrollBy({
                top: -300,
                behavior: "smooth",
            });
        } else {
            projectList.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    });

    rightArrow.addEventListener("click", () => {
        const desktop =
            window.matchMedia("(min-width: 768px)").matches;

        if (desktop) {
            projectList.scrollBy({
                top: 300,
                behavior: "smooth",
            });
        } else {
            projectList.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    });
}

// =========================
// Form Validation
// =========================

function setupCharacterCounter() {
    const textarea =
        document.getElementById("contactMessage");

    const counter =
        document.getElementById("charactersLeft");

    textarea.addEventListener("input", () => {
        counter.textContent =
            `Characters: ${textarea.value.length}/300`;
    });
}

function validateForm() {
    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");

    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const illegalRegex =
        /[^a-zA-Z0-9@._-\s]/;

    // Email Empty

    if (!email) {
        emailError.textContent =
            "Email address is required.";
        isValid = false;
    }

    // Email Format

    else if (!emailRegex.test(email)) {
        emailError.textContent =
            "Please enter a valid email address.";
        isValid = false;
    }

    // Illegal Email Characters

    else if (illegalRegex.test(email)) {
        emailError.textContent =
            "Email contains invalid characters.";
        isValid = false;
    }

    // Message Empty

    if (!message) {
        messageError.textContent =
            "Message is required.";
        isValid = false;
    }

    // Message Length

    else if (message.length > 300) {
        messageError.textContent =
            "Message cannot exceed 300 characters.";
        isValid = false;
    }

    // Illegal Characters

    else if (illegalRegex.test(message)) {
        messageError.textContent =
            "Message contains invalid characters.";
        isValid = false;
    }

    return isValid;
}

function setupForm() {
    const form =
        document.getElementById("formSection");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validateForm()) {
            alert("Form validation passed!");
            form.reset();

            document.getElementById(
                "charactersLeft"
            ).textContent = "Characters: 0/300";
        }
    });
}

// =========================
// Initialize App
// =========================

async function initializeApp() {
    try {
        aboutData = await fetchAboutData();
        projectsData = await fetchProjectsData();

        renderAboutMe(aboutData);
        renderProjects(projectsData);

        setupProjectNavigation();
        setupCharacterCounter();
        setupForm();
    } catch (error) {
        console.error(
            "Application failed to initialize:",
            error
        );
    }
}

initializeApp();