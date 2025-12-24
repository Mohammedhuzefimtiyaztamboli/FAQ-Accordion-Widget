const faqList = document.getElementById("faqList");
const searchInput = document.getElementById("searchInput");
const tabs = document.querySelectorAll(".tab");
const themeToggle = document.getElementById("themeToggle");

// Load Theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

// Render FAQs
function renderFAQs(category = "all", search = "") {
    faqList.innerHTML = "";

    faqData
        .filter(faq =>
            (category === "all" || faq.category === category) &&
            faq.question.toLowerCase().includes(search.toLowerCase())
        )
        .forEach(faq => {
            const item = document.createElement("div");
            item.className = "faq-item";

            item.innerHTML = `
                <button class="faq-question" tabindex="0">
                    ${faq.question}
                    <span class="icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            `;

            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
            const icon = item.querySelector(".icon");

            function toggleFAQ() {
                document.querySelectorAll(".faq-item").forEach(i => {
                    if (i !== item) {
                        i.classList.remove("active");
                        i.querySelector(".faq-answer").style.maxHeight = null;
                        i.querySelector(".icon").textContent = "+";
                    }
                });

                item.classList.toggle("active");

                if (item.classList.contains("active")) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.textContent = "−";
                    item.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                    answer.style.maxHeight = null;
                    icon.textContent = "+";
                }
            }

            question.addEventListener("click", toggleFAQ);
            question.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") toggleFAQ();
            });

            faqList.appendChild(item);
        });
}

// Tabs
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderFAQs(tab.dataset.category, searchInput.value);
    });
});

// Search
searchInput.addEventListener("input", () => {
    const activeTab = document.querySelector(".tab.active").dataset.category;
    renderFAQs(activeTab, searchInput.value);
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initial Load
renderFAQs();
