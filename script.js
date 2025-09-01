const PROJECTS_URL = "projetos.json"; // Arquivo editável
let projects = [];

// Carregar projetos
async function loadProjects() {
  try {
    const res = await fetch(PROJECTS_URL);
    if (!res.ok) throw new Error("Erro ao carregar JSON");
    projects = await res.json();
  } catch (e) {
    console.error("Erro:", e);
    projects = [];
  }
  render();
}

// Renderizar cards
function render() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";

  projects.forEach((proj, i) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 flex flex-col gap-3 transition hover:scale-[1.02]";

    card.innerHTML = `
      <div class="flex-1">
        <h3 class="text-lg font-semibold mb-2">${proj.title}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm">${proj.desc}</p>
      </div>
      <div class="flex gap-2 mt-2">
        <button class="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          onclick="openPreview(${i})">Preview</button>
        <a href="${proj.url}" target="_blank"
          class="px-3 py-1 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition">Abrir ↗</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Abrir modal de preview
function openPreview(i) {
  const modal = document.getElementById("previewModal");
  const frame = document.getElementById("previewFrame");
  const title = document.getElementById("previewTitle");
  frame.src = projects[i].url;
  title.textContent = projects[i].title;
  modal.classList.remove("hidden");
}

// Fechar modal
function closePreview() {
  document.getElementById("previewModal").classList.add("hidden");
  document.getElementById("previewFrame").src = "";
}

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Início
document.getElementById("year").textContent = new Date().getFullYear();
applySavedTheme();
loadProjects();
