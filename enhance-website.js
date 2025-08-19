// Website Enhancement Script
// This script adds advanced features to your Multi-Tools website

// 1. Add Google Analytics
function addGoogleAnalytics() {
    const analyticsCode = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    </script>
    `;
    return analyticsCode;
}

// 2. Add Google AdSense
function addGoogleAdSense() {
    const adSenseCode = `
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
    `;
    return adSenseCode;
}

// 3. Add SEO Meta Tags
function addSEOMetaTags() {
    const seoTags = `
    <!-- SEO Meta Tags -->
    <meta name="keywords" content="free online tools, converters, calculators, generators, web tools, developer tools">
    <meta name="author" content="Multi-Tools">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Multi-Tools - 100+ Free Online Tools">
    <meta property="og:description" content="Free online tools for developers, designers, and everyday users. Converters, calculators, generators, and more.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourdomain.com">
    <meta name="twitter:card" content="summary_large_image">
    `;
    return seoTags;
}

// 4. Add Structured Data
function addStructuredData() {
    const structuredData = `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Multi-Tools",
        "description": "100+ Free Online Tools for developers, designers, and everyday users",
        "url": "https://yourdomain.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://yourdomain.com?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    }
    </script>
    `;
    return structuredData;
}

// 5. Add Performance Monitoring
function addPerformanceMonitoring() {
    const performanceCode = `
    <script>
        // Performance monitoring
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log('Page load time:', loadTime + 'ms');
            
            // Track tool usage
            document.querySelectorAll('.tool-card a').forEach(link => {
                link.addEventListener('click', function() {
                    const toolName = this.closest('.tool-card').querySelector('.card-title').textContent;
                    console.log('Tool accessed:', toolName);
                    // Send analytics data here
                });
            });
        });
    </script>
    `;
    return performanceCode;
}

// 6. Add Dark Mode Toggle
function addDarkModeToggle() {
    const darkModeCode = `
    <style>
        .dark-mode {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
        }
        .dark-mode .card {
            background-color: #2d2d2d !important;
            border-color: #404040 !important;
        }
        .dark-mode .navbar {
            background-color: #0d6efd !important;
        }
    </style>
    <script>
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }
        
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    </script>
    `;
    return darkModeCode;
}

// 7. Add Tool Usage Statistics
function addToolUsageStats() {
    const statsCode = `
    <script>
        // Track tool usage
        function trackToolUsage(toolName) {
            const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
            usage[toolName] = (usage[toolName] || 0) + 1;
            localStorage.setItem('toolUsage', JSON.stringify(usage));
        }
        
        // Display popular tools
        function showPopularTools() {
            const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
            const sorted = Object.entries(usage).sort((a, b) => b[1] - a[1]).slice(0, 5);
            
            if (sorted.length > 0) {
                const popularSection = document.createElement('div');
                popularSection.className = 'col-12 mb-4';
                popularSection.innerHTML = \`
                    <h3 class="mb-3">
                        <i class="fas fa-star me-2"></i>Popular Tools
                    </h3>
                    <div class="row g-3">
                        \${sorted.map(([tool, count]) => \`
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div class="card h-100 tool-card">
                                    <div class="card-body d-flex flex-column">
                                        <div class="text-center mb-3">
                                            <i class="fas fa-fire fa-2x text-warning"></i>
                                        </div>
                                        <h5 class="card-title text-center">\${tool}</h5>
                                        <p class="card-text flex-grow-1">Used \${count} times</p>
                                    </div>
                                </div>
                            </div>
                        \`).join('')}
                    </div>
                \`;
                document.getElementById('toolGrid').prepend(popularSection);
            }
        }
        
        // Show popular tools on page load
        document.addEventListener('DOMContentLoaded', showPopularTools);
    </script>
    `;
    return statsCode;
}

// Export functions for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addGoogleAnalytics,
        addGoogleAdSense,
        addSEOMetaTags,
        addStructuredData,
        addPerformanceMonitoring,
        addDarkModeToggle,
        addToolUsageStats
    };
}

console.log('✅ Website enhancement functions loaded');
console.log('📝 Instructions:');
console.log('1. Replace GA_MEASUREMENT_ID with your Google Analytics ID');
console.log('2. Replace YOUR_PUBLISHER_ID with your AdSense Publisher ID');
console.log('3. Replace yourdomain.com with your actual domain');
console.log('4. Add these functions to your HTML files as needed'); 