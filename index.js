/**
 * Omkar Jadhav Portfolio Engine
 * Includes Interactive Hero Terminal, Smooth Scroll Observer, and Contact Workflow
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initActiveNavOnScroll();
  initDynamicYear();
  initInteractiveTerminal();
});

/**
 * Mobile Drawer Menu
 */
function initMobileNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta a");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });
}

/**
 * Active Navigation Indicator on Scroll
 */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActive() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
}

/**
 * Dynamic Copyright Year
 */
function initDynamicYear() {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Interactive Hero Terminal Sandbox
 * Gives recruiters a unique, hands-on console to test commands
 */
function initInteractiveTerminal() {
  const form = document.getElementById("terminalForm");
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalOutput");

  if (!form || !input || !output) return;

  const commands = {
    help: () => `Available commands:
• <span class="term-cmd">skills</span>   - List primary technical competencies
• <span class="term-cmd">metrics</span>  - Display academic and project numbers
• <span class="term-cmd">projects</span> - View featured application names
• <span class="term-cmd">contact</span>  - View direct email and phone
• <span class="term-cmd">clear</span>    - Clear the terminal screen`,
    
    skills: () => `Technical Skills Matrix:
• Analytics: SQL, Power BI, Excel, Data Modeling, DAX
• Programming: Python (Pandas, NumPy, Matplotlib, Seaborn)
• Database: MySQL (Joins, CTEs, Window Functions)
• AI Tools: Prompt Engineering, ChatGPT, Copilot, Gemini`,

    metrics: () => `Key Performance Indicators:
• Degree CGPA: 8.53 / 10.0 (SRTM University)
• Practical Training: QSpiders Data Analytics with Python
• Core Projects: SmartKrushi, Banking System, Employee System`,

    projects: () => `Portfolio Projects:
1. SmartKrushi (AI Crop Advisory & Farmer Marketplace)
2. Banking Information System (Core Python + Persistence)
3. Employee Information System (CRUD + Search Engine)`,

    contact: () => `Contact Details:
• Email: omkarjadhav3560@gmail.com
• Phone: +91 9505164754
• LinkedIn: https://www.linkedin.com/in/omkar-jadhav-80799b2a5/c`,

    clear: () => {
      output.innerHTML = "";
      return null;
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    // Append user input line
    const userLine = document.createElement("p");
    userLine.className = "term-line";
    userLine.innerHTML = `<span class="term-prompt">guest@omkar:~$</span> ${escapeHTML(cmd)}`;
    output.appendChild(userLine);

    // Process command response
    if (commands[cmd]) {
      const response = commands[cmd]();
      if (response) {
        const respLine = document.createElement("div");
        respLine.className = "term-info";
        respLine.innerHTML = response.replace(/\n/g, "<br>");
        output.appendChild(respLine);
      }
    } else {
      const errLine = document.createElement("p");
      errLine.className = "term-info";
      errLine.innerHTML = `command not found: "${escapeHTML(cmd)}". Type <span class="term-cmd">help</span> for commands.`;
      output.appendChild(errLine);
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

/**
 * Mailto Form Action
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const name = encodeURIComponent(document.getElementById("contactName").value.trim());
  const subject = encodeURIComponent(document.getElementById("contactSubject").value.trim());
  const message = encodeURIComponent(document.getElementById("contactMessage").value.trim() + `\n\n— From: ${decodeURIComponent(name)}`);

  window.location.href = `mailto:omkarjadhav3560@gmail.com?subject=${subject}&body=${message}`;
  return false;
}