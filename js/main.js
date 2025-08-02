// Main JavaScript for Multi-Tools Website

// Function to render tools in the grid
function renderTools(toolsList) {
  const grid = document.getElementById('toolGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  // Group tools by category
  const categories = {};
  toolsList.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  
  // Render each category
  Object.keys(categories).forEach(category => {
    const categorySection = document.createElement('div');
    categorySection.className = 'col-12 mb-4';
    categorySection.innerHTML = `
      <h3 class="mb-3" id="${category.toLowerCase().replace(/\s+/g, '-')}">
        <i class="fas fa-folder me-2"></i>${category}
      </h3>
      <div class="row g-3">
        ${categories[category].map(tool => `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card h-100 tool-card">
              <div class="card-body d-flex flex-column">
                <div class="text-center mb-3">
                  <i class="fas fa-tools fa-2x text-primary"></i>
                </div>
                <h5 class="card-title text-center">${tool.name}</h5>
                <p class="card-text flex-grow-1">${tool.description}</p>
                <a href="tools/${tool.filename}" class="btn btn-primary mt-auto">
                  <i class="fas fa-external-link-alt me-2"></i>Open Tool
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(categorySection);
  });
}

// Search functionality
function searchTools(query) {
  if (!window.tools) return;
  
  const filtered = window.tools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase()) ||
    tool.category.toLowerCase().includes(query.toLowerCase()) ||
    tool.description.toLowerCase().includes(query.toLowerCase())
  );
  
  renderTools(filtered);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load tools data
  if (typeof toolsData !== 'undefined') {
    window.tools = toolsData;
    renderTools(toolsData);
  }
  
  // Setup search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      if (query === '') {
        renderTools(window.tools || []);
      } else {
        searchTools(query);
      }
    });
  }
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add some interactive features
function addToolCardEffects() {
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    });
  });
}

// Call this after rendering tools
setTimeout(addToolCardEffects, 1000);

// Dark mode functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  
  // Update button icon
  const button = document.querySelector('[onclick="toggleDarkMode()"] i');
  if (document.body.classList.contains('dark-mode')) {
    button.className = 'fas fa-sun';
  } else {
    button.className = 'fas fa-moon';
  }
}

// Load saved dark mode preference
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const button = document.querySelector('[onclick="toggleDarkMode()"] i');
    if (button) button.className = 'fas fa-sun';
  }
});

// Track tool usage
function trackToolUsage(toolName) {
  const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
  usage[toolName] = (usage[toolName] || 0) + 1;
  localStorage.setItem('toolUsage', JSON.stringify(usage));
}

// Add click tracking to tool cards
function addToolTracking() {
  document.querySelectorAll('.tool-card a').forEach(link => {
    link.addEventListener('click', function() {
      const toolName = this.closest('.tool-card').querySelector('.card-title').textContent;
      trackToolUsage(toolName);
    });
  });
}

// Call tracking after tools are rendered
setTimeout(addToolTracking, 1000); 