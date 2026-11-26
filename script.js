// =====================================
// MANGAVERSE DATA
// =====================================

// Add or edit genres here.

const genres = [
    {
        name: "Action",
        image: "images/action.jpg",
        description: "Exciting battles and powerful adventures."
    },
    {
        name: "Romance",
        image: "images/romance.jpg",
        description: "Beautiful stories about love."
    },
    {
        name: "Adventure",
        image: "images/adventure.jpg",
        description: "Discover new worlds and adventures."
    },
    {
        name: "Fantasy",
        image: "images/fantasy.jpg",
        description: "Magic, kingdoms and mysterious worlds."
    },
    {
        name: "Horror",
        image: "images/horror.jpg",
        description: "Dark stories and terrifying mysteries."
    },
    {
        name: "Comedy",
        image: "images/comedy.jpg",
        description: "Funny stories and hilarious moments."
    }
];


// Add manga titles and covers here.

const mangaList = [
    {
        title: "Tougen Anki Season 2",
        genre: "Action",
        image: "images/TougenAnki.jpg",
        description: "The story follows teenager Shiki Ichinose, who discovers he is an Oni after a Momotarō agency attack and enters a long-standing conflict between Oni and Momotarō descendants"
    },
    {
        title: "Berserk",
        genre: "Action",
        image: "images/Berserk.jpg",
        description: "Set in a brutal medieval Europe-inspired world, it follows Guts, a lone mercenary turned \"Black Swordsman\" wielding a massive greatsword, as he battles demonic forces and seeks vengeance after a catastrophic betrayal."
    },
    {
        title: "Cool na Eikoku Bishoujo wa Orenchi ni Homestay Shitairashii",
        genre: "Romance",
        image: "images/Love.jpg",
        description: "High school student Miyamoto Shouhei hails from a distinguished samurai lineage that has endured for generations.One day, the Miyamoto Household welcomes an exchange student from England—Eleanor—for a homestay!Cool and fluent in Japanese, Eleanor seems to have an ulterior motive for coming to Japan beyond simply learning about the culture…"
    },
    {
        title: "Yoimiya Nagi ga Mane ni Yashoku wo Tsukuru Wake",
        genre: "Romance",
        image: "images/summer.jpg",
        description: "“I’ll come make you a late-night meal again tomorrow.” This is a late-night-meal love comedy about Nagi Yoimiya, the vocalist of a hugely popular band, and her manager. Despite her busy life as a band member, Nagi comes to make late-night meals for her manager, bringing the two closer together through their after-hours meals."
    },
    {
        title: "Lost Kingdom",
        genre: "Adventure",
        image: "images/kingdom.jpg",
        description: "An adventure beyond imagination."
    },
    {
        title: "The Great Journey",
        genre: "Adventure",
        image: "images/journey.jpg",
        description: "A journey across unknown lands."
    },
    {
        title: "Magic Academy",
        genre: "Fantasy",
        image: "images/magic.jpg",
        description: "A school of powerful magic."
    },
    {
        title: "Mystic World",
        genre: "Fantasy",
        image: "images/mystic.jpg",
        description: "A world full of mysteries."
    },
    {
        title: "Dark Night",
        genre: "Horror",
        image: "images/dark.jpg",
        description: "Something lurks in the shadows."
    },
    {
        title: "The Haunted House",
        genre: "Horror",
        image: "images/haunted.jpg",
        description: "A mysterious house with secrets."
    },
    {
        title: "Funny Days",
        genre: "Comedy",
        image: "images/funny.jpg",
        description: "Every day is an adventure."
    },
    {
        title: "Crazy Life",
        genre: "Comedy",
        image: "images/crazy.jpg",
        description: "A hilarious everyday life."
    }
];


// =====================================
// IMAGE FALLBACK
// =====================================
// If a cover image file is missing, show a themed placeholder
// instead of a broken image icon.

const PLACEHOLDER_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' " +
    "width='300' height='400'%3E%3Crect width='100%25' height='100%25' " +
    "fill='%231c1c25'/%3E%3Ctext x='50%25' y='50%25' fill='%238b5cf6' " +
    "font-family='Arial' font-size='18' text-anchor='middle' " +
    "dominant-baseline='middle'%3ENo Cover%3C/text%3E%3C/svg%3E";

function attachImageFallback(imgElement) {

    imgElement.addEventListener("error", function () {
        this.onerror = null;
        this.src = PLACEHOLDER_IMAGE;
    });

}


// =====================================
// LOGIN SYSTEM
// =====================================

const loginForm = document.getElementById("loginForm");

const loginPage = document.getElementById("loginPage");

const mainWebsite = document.getElementById("mainWebsite");

const passwordInput = document.getElementById("password");


// SHOW / HIDE PASSWORD

document.getElementById("togglePassword")
    .addEventListener("click", function () {

        const isHidden = passwordInput.type === "password";

        passwordInput.type = isHidden ? "text" : "password";
        this.textContent = isHidden ? "Hide" : "Show";
        this.setAttribute("aria-pressed", String(isHidden));

    });


// LOGIN

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password = passwordInput.value;

    const message =
        document.getElementById("loginMessage");

    // DEMO LOGIN ONLY - replace with real authentication before going live
    if (username === "admin" && password === "12345") {

        loginPage.classList.add("hidden");

        mainWebsite.classList.remove("hidden");

        message.textContent = "";

        showHomePage();

    } else {

        message.textContent =
            "Incorrect username or password!";

    }

});


// LOGOUT

document.getElementById("logoutBtn")
    .addEventListener("click", function () {

        mainWebsite.classList.add("hidden");

        loginPage.classList.remove("hidden");

        loginForm.reset();

        document.getElementById("loginMessage")
            .textContent = "";

        passwordInput.type = "password";

        document.getElementById("togglePassword")
            .textContent = "Show";

        // Reset search state so the next session starts clean
        searchInput.value = "";
        toggleClearButton();
        searchResultsMessage.textContent = "";

        // Make sure any open modal/reader is closed
        closeReader();
        closeMangaModal();

    });


// =====================================
// DISPLAY GENRES
// =====================================

const genreGrid = document.getElementById("genreGrid");

function displayGenres() {

    genreGrid.innerHTML = "";

    genres.forEach(function (genre) {

        const card = document.createElement("div");

        card.className = "genre-card";

        const image = document.createElement("img");
        image.src = genre.image;
        image.alt = genre.name;
        attachImageFallback(image);

        const heading = document.createElement("h3");
        heading.textContent = genre.name;

        card.appendChild(image);
        card.appendChild(heading);

        card.addEventListener("click", function () {
            openGenre(genre.name);
        });

        genreGrid.appendChild(card);

    });

}


// =====================================
// DISPLAY POPULAR MANGA
// =====================================

const popularGrid =
    document.getElementById("popularGrid");

function displayPopularManga() {

    popularGrid.innerHTML = "";

    mangaList.forEach(function (manga) {

        const card = createMangaCard(manga);

        popularGrid.appendChild(card);

    });

}


// =====================================
// CREATE MANGA CARD
// =====================================

function createMangaCard(manga) {

    const card = document.createElement("div");

    card.className = "manga-card";

    const image = document.createElement("img");
    image.src = manga.image;
    image.alt = manga.title;
    attachImageFallback(image);

    const title = document.createElement("h3");
    title.textContent = manga.title;

    const description = document.createElement("p");
    description.textContent = manga.description;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);

    // Open the manga's detail view when the card is clicked
    card.addEventListener("click", function () {
        openMangaModal(manga);
    });

    return card;

}


// =====================================
// MANGA DETAIL MODAL
// =====================================

const mangaModal = document.getElementById("mangaModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalGenre = document.getElementById("modalGenre");
const modalDescription = document.getElementById("modalDescription");
const chapterList = document.getElementById("chapterList");

let currentManga = null;

function openMangaModal(manga) {

    currentManga = manga;

    modalImage.src = manga.image;
    modalImage.alt = manga.title;
    attachImageFallback(modalImage);

    modalTitle.textContent = manga.title;
    modalGenre.textContent = manga.genre;
    modalDescription.textContent = manga.description;

    populateChapterList(manga);

    mangaModal.classList.remove("hidden");

}

function closeMangaModal() {

    mangaModal.classList.add("hidden");
    currentManga = null;

}

function populateChapterList(manga) {

    chapterList.innerHTML = "";

    generateChapters(manga).forEach(function (chapter) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "chapter-item";
        button.textContent = chapter.title;

        button.addEventListener("click", function () {
            openReader(manga, chapter.number);
        });

        chapterList.appendChild(button);

    });

}

// Generates a stable (not random-on-every-render) list of fake
// chapters for a manga, newest first, since this demo has no
// real chapter data to pull from.
function generateChapters(manga) {

    const chapterCount = 8 + (manga.title.length % 15);

    const chapters = [];

    for (let number = chapterCount; number >= 1; number--) {

        chapters.push({
            number: number,
            title: "Chapter " + number
        });

    }

    return chapters;

}


// Close modal via the X button, or by clicking the dark overlay

modalCloseBtn.addEventListener("click", closeMangaModal);

mangaModal.addEventListener("click", function (event) {

    if (event.target === mangaModal) {
        closeMangaModal();
    }

});


// =====================================
// CHAPTER READER
// =====================================

const readerOverlay = document.getElementById("readerOverlay");
const readerCloseBtn = document.getElementById("readerCloseBtn");
const readerTitle = document.getElementById("readerTitle");
const readerPage = document.getElementById("readerPage");
const readerPageCount = document.getElementById("readerPageCount");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

let currentChapterNumber = null;
let currentPage = 1;
let totalPages = 1;

// Deterministic fake page count per chapter, since there are no
// real page images in this demo.
function generatePageCount(mangaTitle, chapterNumber) {

    return 6 + ((mangaTitle.length + chapterNumber) % 10);

}

function openReader(manga, chapterNumber) {

    currentManga = manga;
    currentChapterNumber = chapterNumber;
    currentPage = 1;
    totalPages = generatePageCount(manga.title, chapterNumber);

    mangaModal.classList.add("hidden");
    readerOverlay.classList.remove("hidden");

    readerTitle.textContent = manga.title + " — Chapter " + chapterNumber;

    renderReaderPage();

}

function closeReader() {

    readerOverlay.classList.add("hidden");

    // Return to the manga's detail view rather than dropping
    // the reader straight back to the homepage
    if (currentManga) {
        mangaModal.classList.remove("hidden");
    }

}

function renderReaderPage() {

    readerPage.innerHTML = `
        <div class="page-placeholder">
            <span class="page-manga">${currentManga.title}</span>
            <span>Chapter ${currentChapterNumber}</span>
            <span class="page-number">Page ${currentPage} of ${totalPages}</span>
        </div>
    `;

    readerPageCount.textContent = currentPage + " / " + totalPages;

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.textContent =
        currentPage === totalPages ? "Finish" : "Next ›";

}

function goToNextPage() {

    if (currentPage < totalPages) {
        currentPage++;
        renderReaderPage();
    } else {
        closeReader();
    }

}

function goToPrevPage() {

    if (currentPage > 1) {
        currentPage--;
        renderReaderPage();
    }

}

readerCloseBtn.addEventListener("click", closeReader);
prevPageBtn.addEventListener("click", goToPrevPage);
nextPageBtn.addEventListener("click", goToNextPage);

readerOverlay.addEventListener("click", function (event) {

    if (event.target === readerOverlay) {
        closeReader();
    }

});


// CLOSE / NAVIGATE WITH KEYBOARD

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (!readerOverlay.classList.contains("hidden")) {
            closeReader();
        } else if (!mangaModal.classList.contains("hidden")) {
            closeMangaModal();
        }

    }

    if (!readerOverlay.classList.contains("hidden")) {

        if (event.key === "ArrowRight") goToNextPage();
        if (event.key === "ArrowLeft") goToPrevPage();

    }

});


// =====================================
// NAVIGATION ACTIVE STATE
// =====================================

function setActiveNav(linkId) {

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.classList.remove("active");
    });

    const activeLink = document.getElementById(linkId);

    if (activeLink) {
        activeLink.classList.add("active");
    }

}


// =====================================
// OPEN SELECTED GENRE
// =====================================

function openGenre(genreName) {

    const selectedGenre = genres.find(function (genre) {
        return genre.name === genreName;
    });

    if (!selectedGenre) return;

    // Hide homepage
    document.getElementById("homePage")
        .classList.add("hidden");

    // Show genre page
    const genrePage = document.getElementById("genrePage");

    genrePage.classList.remove("hidden");

    setActiveNav("genresLink");

    // Update genre information
    document.getElementById("genreTitle")
        .textContent = selectedGenre.name + " Manga";

    document.getElementById("genreDescription")
        .textContent = selectedGenre.description;

    // Find manga in selected genre
    const filteredManga = mangaList.filter(function (manga) {
        return manga.genre === genreName;
    });

    const genreMangaGrid =
        document.getElementById("genreMangaGrid");

    genreMangaGrid.innerHTML = "";

    if (filteredManga.length === 0) {

        genreMangaGrid.innerHTML =
            "<p class=\"no-results\">No manga available in this genre yet.</p>";

        return;

    }

    filteredManga.forEach(function (manga) {

        genreMangaGrid.appendChild(
            createMangaCard(manga)
        );

    });

    window.scrollTo(0, 0);

}


// =====================================
// BACK TO HOMEPAGE
// =====================================

function showHomePage() {

    document.getElementById("genrePage")
        .classList.add("hidden");

    document.getElementById("homePage")
        .classList.remove("hidden");

    setActiveNav("homeLink");

    window.scrollTo(0, 0);

}


// BACK BUTTON

document.getElementById("backBtn")
    .addEventListener("click", showHomePage);


// HOME NAVIGATION

document.getElementById("homeLink")
    .addEventListener("click", function (event) {

        event.preventDefault();
        showHomePage();

    });


// GENRES NAVIGATION

document.getElementById("genresLink")
    .addEventListener("click", function (event) {

        event.preventDefault();
        showHomePage();
        setActiveNav("genresLink");

        document.getElementById("genres")
            .scrollIntoView({ behavior: "smooth" });

    });


// EXPLORE BUTTON

document.getElementById("exploreBtn")
    .addEventListener("click", function () {

        setActiveNav("genresLink");

        document.getElementById("genres")
            .scrollIntoView({ behavior: "smooth" });

    });


// =====================================
// SEARCH MANGA
// =====================================

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchResultsMessage = document.getElementById("searchResultsMessage");

let searchDebounceTimer = null;

function toggleClearButton() {

    clearSearchBtn.classList.toggle(
        "hidden",
        searchInput.value.trim() === ""
    );

}

function searchManga() {

    const rawValue = searchInput.value.trim();
    const searchValue = rawValue.toLowerCase();

    // If we're looking at a genre page, bring the person back to
    // the homepage so they can actually see the results.
    if (!document.getElementById("genrePage").classList.contains("hidden")) {
        showHomePage();
    }

    // Empty search = restore the full popular list
    if (searchValue === "") {

        displayPopularManga();
        searchResultsMessage.textContent = "";
        return;

    }

    const results = mangaList.filter(function (manga) {

        return manga.title.toLowerCase()
            .includes(searchValue);

    });

    popularGrid.innerHTML = "";

    if (results.length === 0) {

        popularGrid.innerHTML =
            "<p class=\"no-results\">No manga found. Try another title.</p>";

        searchResultsMessage.textContent =
            "No results for \"" + rawValue + "\".";

        return;

    }

    results.forEach(function (manga) {

        popularGrid.appendChild(createMangaCard(manga));

    });

    searchResultsMessage.textContent =
        results.length + (results.length === 1 ? " result" : " results") +
        " found for \"" + rawValue + "\".";

}

function searchMangaNow() {

    clearTimeout(searchDebounceTimer);
    searchManga();
    document.getElementById("popular")
        .scrollIntoView({ behavior: "smooth" });

}


// SEARCH BUTTON (immediate search)

document.getElementById("searchBtn")
    .addEventListener("click", searchMangaNow);


// SEARCH USING ENTER KEY (immediate search)

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchMangaNow();
    }

});


// LIVE SEARCH AS YOU TYPE (debounced, no auto-scroll so it
// doesn't yank the page around while typing)

searchInput.addEventListener("input", function () {

    toggleClearButton();

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(searchManga, 250);

});


// CLEAR SEARCH BUTTON

clearSearchBtn.addEventListener("click", function () {

    searchInput.value = "";
    toggleClearButton();
    displayPopularManga();
    searchResultsMessage.textContent = "";
    searchInput.focus();

});


// =====================================
// INITIALIZE WEBSITE
// =====================================

displayGenres();

displayPopularManga();