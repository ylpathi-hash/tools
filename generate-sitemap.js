const fs = require('fs');
const path = require('path');

// Load tools data
const toolsData = require('./assets/js/tools-data.js');

// Generate XML sitemap
function generateSitemap() {
    const baseUrl = 'https://yourdomain.com'; // Replace with your actual domain
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>`;
    
    // Add tool pages
    toolsData.forEach(tool => {
        sitemap += `
    <url>
        <loc>${baseUrl}/tools/${tool.filename}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    // Write sitemap to file
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ Sitemap generated: sitemap.xml');
}

// Generate robots.txt
function generateRobotsTxt() {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /private/

# Allow all tools
Allow: /tools/
Allow: /assets/`;
    
    fs.writeFileSync('robots.txt', robotsTxt);
    console.log('✅ Robots.txt generated: robots.txt');
}

// Generate manifest.json for PWA
function generateManifest() {
    const manifest = {
        "name": "Multi-Tools - 100+ Free Online Tools",
        "short_name": "Multi-Tools",
        "description": "Free online tools for developers, designers, and everyday users",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#0d6efd",
        "icons": [
            {
                "src": "assets/img/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "assets/img/icon-512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    };
    
    fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
    console.log('✅ Manifest.json generated: manifest.json');
}

// Generate category pages
function generateCategoryPages() {
    const categories = {};
    
    // Group tools by category
    toolsData.forEach(tool => {
        if (!categories[tool.category]) {
            categories[tool.category] = [];
        }
        categories[tool.category].push(tool);
    });
    
    // Create category pages
    Object.keys(categories).forEach(category => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
        const categoryTools = categories[category];
        
        const categoryPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${category} - Multi-Tools</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Free ${category.toLowerCase()} for developers, designers, and everyday users.">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="../assets/css/style.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <i class="fas fa-tools me-2"></i>Multi-Tools
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="../index.html">Home</a></li>
                    <li class="nav-item">
                        <button class="btn btn-outline-light btn-sm ms-2" onclick="toggleDarkMode()" title="Toggle Dark Mode">
                            <i class="fas fa-moon"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container my-5">
        <h1 class="mb-4"><i class="fas fa-folder me-2"></i>${category}</h1>
        <p class="lead mb-4">${categoryTools.length} free ${category.toLowerCase()} for your needs.</p>
        
        <div class="row g-4">
            ${categoryTools.map(tool => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 tool-card">
                    <div class="card-body d-flex flex-column">
                        <div class="text-center mb-3">
                            <i class="fas fa-tools fa-2x text-primary"></i>
                        </div>
                        <h5 class="card-title text-center">${tool.name}</h5>
                        <p class="card-text flex-grow-1">${tool.description}</p>
                        <a href="${tool.filename}" class="btn btn-primary mt-auto">
                            <i class="fas fa-external-link-alt me-2"></i>Open Tool
                        </a>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>

    <footer class="bg-dark text-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5><i class="fas fa-tools me-2"></i>Multi-Tools</h5>
                    <p>Free online tools for everyone. Convert, calculate, generate, and more.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p>Contact: <a href="mailto:info@multitools.com" class="text-light">info@multitools.com</a></p>
                    <p>&copy; 2024 Multi-Tools. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="../assets/js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
        
        // Create categories directory if it doesn't exist
        if (!fs.existsSync('categories')) {
            fs.mkdirSync('categories');
        }
        
        fs.writeFileSync(`categories/${categorySlug}.html`, categoryPage);
        console.log(`✅ Category page generated: categories/${categorySlug}.html`);
    });
}

// Run all generators
console.log('🚀 Generating SEO files...');
generateSitemap();
generateRobotsTxt();
generateManifest();
generateCategoryPages();
console.log('✅ All SEO files generated successfully!'); 