const fs = require('fs');
const path = require('path');

// Load tool list
const tools = JSON.parse(fs.readFileSync('tools-list.json', 'utf8'));

// Ensure directories exist
const toolsDir = path.join(__dirname, 'tools');
const assetsImgDir = path.join(__dirname, 'assets', 'img');
const assetsJsDir = path.join(__dirname, 'assets', 'js');
if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });
if (!fs.existsSync(assetsImgDir)) fs.mkdirSync(assetsImgDir, { recursive: true });
if (!fs.existsSync(assetsJsDir)) fs.mkdirSync(assetsJsDir, { recursive: true });

// HTML template for each tool with basic functionality
const toolTemplate = (tool) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${tool.name} - Multi-Tools</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${tool.description}">
  <link href="../assets/css/style.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
  <div id="header"></div>
  
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-8">
        <h1 class="mb-4"><i class="fas fa-tools me-2"></i>${tool.name}</h1>
        <p class="lead mb-4">${tool.description}</p>
        
        <div class="card">
          <div class="card-body">
            ${getToolContent(tool)}
          </div>
        </div>
      </div>
      
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5><i class="fas fa-info-circle me-2"></i>About This Tool</h5>
          </div>
          <div class="card-body">
            <p>${tool.description}</p>
            <div class="d-grid">
              <a href="../index.html" class="btn btn-outline-primary">
                <i class="fas fa-home me-2"></i>Back to Home
              </a>
            </div>
          </div>
        </div>
        
        <div id="ad-sidebar" class="mt-3"></div>
      </div>
    </div>
    
    <div id="ad-bottom" class="mt-4"></div>
  </div>
  
  <div id="footer"></div>
  
  <script src="../assets/js/main.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  ${getToolScript(tool)}
</body>
</html>`;

// Function to get tool-specific content
function getToolContent(tool) {
  const toolName = tool.name.toLowerCase();
  
  if (toolName.includes('word counter') || toolName.includes('character counter')) {
    return `
      <div class="mb-3">
        <label for="textInput" class="form-label">Enter your text:</label>
        <textarea id="textInput" class="form-control" rows="8" placeholder="Type or paste your text here..."></textarea>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 id="wordCount">0</h5>
              <small class="text-muted">Words</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 id="charCount">0</h5>
              <small class="text-muted">Characters</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 id="charNoSpace">0</h5>
              <small class="text-muted">Characters (no spaces)</small>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 id="lineCount">0</h5>
              <small class="text-muted">Lines</small>
            </div>
          </div>
        </div>
      </div>`;
  }
  
  if (toolName.includes('percentage calculator')) {
    return `
      <div class="row g-3">
        <div class="col-md-6">
          <label for="value" class="form-label">Value:</label>
          <input type="number" id="value" class="form-control" placeholder="Enter value">
        </div>
        <div class="col-md-6">
          <label for="percent" class="form-label">Percentage (%):</label>
          <input type="number" id="percent" class="form-control" placeholder="Enter percentage">
        </div>
        <div class="col-12">
          <button id="calcBtn" class="btn btn-primary">
            <i class="fas fa-calculator me-2"></i>Calculate
          </button>
        </div>
        <div class="col-12">
          <div id="result" class="alert alert-info" style="display: none;"></div>
        </div>
      </div>`;
  }
  
  if (toolName.includes('base64')) {
    return `
      <div class="mb-3">
        <label for="inputText" class="form-label">Enter text:</label>
        <textarea id="inputText" class="form-control" rows="4" placeholder="Enter text to encode or decode..."></textarea>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2" onclick="encode()">
          <i class="fas fa-lock me-2"></i>Encode
        </button>
        <button class="btn btn-secondary" onclick="decode()">
          <i class="fas fa-unlock me-2"></i>Decode
        </button>
      </div>
      <div class="mb-3">
        <label for="outputText" class="form-label">Result:</label>
        <textarea id="outputText" class="form-control" rows="4" placeholder="Result will appear here..." readonly></textarea>
      </div>`;
  }
  
  if (toolName.includes('password generator')) {
    return `
      <div class="row g-3">
        <div class="col-md-6">
          <label for="passwordLength" class="form-label">Password Length:</label>
          <input type="number" id="passwordLength" class="form-control" value="12" min="4" max="100">
        </div>
        <div class="col-md-6">
          <label class="form-label">Options:</label>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="uppercase" checked>
            <label class="form-check-label" for="uppercase">Uppercase letters</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="lowercase" checked>
            <label class="form-check-label" for="lowercase">Lowercase letters</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="numbers" checked>
            <label class="form-check-label" for="numbers">Numbers</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="symbols">
            <label class="form-check-label" for="symbols">Special symbols</label>
          </div>
        </div>
        <div class="col-12">
          <button id="generateBtn" class="btn btn-primary">
            <i class="fas fa-key me-2"></i>Generate Password
          </button>
        </div>
        <div class="col-12">
          <div class="input-group">
            <input type="text" id="generatedPassword" class="form-control" readonly>
            <button class="btn btn-outline-secondary" onclick="copyPassword()">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>`;
  }
  
  if (toolName.includes('qr code')) {
    return `
      <div class="row g-3">
        <div class="col-md-8">
          <label for="qrText" class="form-label">Enter text or URL:</label>
          <input type="text" id="qrText" class="form-control" placeholder="Enter text to generate QR code...">
        </div>
        <div class="col-md-4">
          <label for="qrSize" class="form-label">Size:</label>
          <select id="qrSize" class="form-select">
            <option value="128">128x128</option>
            <option value="256" selected>256x256</option>
            <option value="512">512x512</option>
          </select>
        </div>
        <div class="col-12">
          <button id="generateQR" class="btn btn-primary">
            <i class="fas fa-qrcode me-2"></i>Generate QR Code
          </button>
        </div>
        <div class="col-12 text-center">
          <div id="qrResult"></div>
        </div>
      </div>`;
  }
  
  if (toolName.includes('temperature converter')) {
    return `
      <div class="row g-3">
        <div class="col-md-4">
          <label for="celsius" class="form-label">Celsius (°C):</label>
          <input type="number" id="celsius" class="form-control" placeholder="Enter temperature">
        </div>
        <div class="col-md-4">
          <label for="fahrenheit" class="form-label">Fahrenheit (°F):</label>
          <input type="number" id="fahrenheit" class="form-control" placeholder="Enter temperature">
        </div>
        <div class="col-md-4">
          <label for="kelvin" class="form-label">Kelvin (K):</label>
          <input type="number" id="kelvin" class="form-control" placeholder="Enter temperature">
        </div>
        <div class="col-12">
          <button class="btn btn-primary" onclick="convertTemperature()">
            <i class="fas fa-thermometer-half me-2"></i>Convert
          </button>
        </div>
      </div>`;
  }
  
  if (toolName.includes('bmi calculator')) {
    return `
      <div class="row g-3">
        <div class="col-md-6">
          <label for="weight" class="form-label">Weight (kg):</label>
          <input type="number" id="weight" class="form-control" placeholder="Enter weight">
        </div>
        <div class="col-md-6">
          <label for="height" class="form-label">Height (cm):</label>
          <input type="number" id="height" class="form-control" placeholder="Enter height">
        </div>
        <div class="col-12">
          <button id="calculateBMI" class="btn btn-primary">
            <i class="fas fa-calculator me-2"></i>Calculate BMI
          </button>
        </div>
        <div class="col-12">
          <div id="bmiResult" class="alert" style="display: none;"></div>
        </div>
      </div>`;
  }
  
  if (toolName.includes('age calculator')) {
    return `
      <div class="row g-3">
        <div class="col-md-6">
          <label for="birthDate" class="form-label">Date of Birth:</label>
          <input type="date" id="birthDate" class="form-control">
        </div>
        <div class="col-md-6">
          <label for="currentDate" class="form-label">Current Date:</label>
          <input type="date" id="currentDate" class="form-control">
        </div>
        <div class="col-12">
          <button id="calculateAge" class="btn btn-primary">
            <i class="fas fa-birthday-cake me-2"></i>Calculate Age
          </button>
        </div>
        <div class="col-12">
          <div id="ageResult" class="alert alert-info" style="display: none;"></div>
        </div>
      </div>`;
  }
  
  if (toolName.includes('json formatter')) {
    return `
      <div class="mb-3">
        <label for="jsonInput" class="form-label">Enter JSON:</label>
        <textarea id="jsonInput" class="form-control" rows="8" placeholder="Paste your JSON here..."></textarea>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2" onclick="formatJSON()">
          <i class="fas fa-code me-2"></i>Format JSON
        </button>
        <button class="btn btn-secondary" onclick="minifyJSON()">
          <i class="fas fa-compress me-2"></i>Minify JSON
        </button>
      </div>
      <div class="mb-3">
        <label for="jsonOutput" class="form-label">Result:</label>
        <textarea id="jsonOutput" class="form-control" rows="8" placeholder="Formatted JSON will appear here..." readonly></textarea>
      </div>`;
  }
  
  if (toolName.includes('case converter')) {
    return `
      <div class="mb-3">
        <label for="caseInput" class="form-label">Enter text:</label>
        <textarea id="caseInput" class="form-control" rows="6" placeholder="Enter text to convert..."></textarea>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2" onclick="convertCase('uppercase')">
          <i class="fas fa-font me-2"></i>UPPERCASE
        </button>
        <button class="btn btn-primary me-2" onclick="convertCase('lowercase')">
          <i class="fas fa-font me-2"></i>lowercase
        </button>
        <button class="btn btn-primary me-2" onclick="convertCase('titlecase')">
          <i class="fas fa-font me-2"></i>Title Case
        </button>
        <button class="btn btn-primary" onclick="convertCase('sentencecase')">
          <i class="fas fa-font me-2"></i>Sentence case
        </button>
      </div>
      <div class="mb-3">
        <label for="caseOutput" class="form-label">Result:</label>
        <textarea id="caseOutput" class="form-control" rows="6" placeholder="Converted text will appear here..." readonly></textarea>
      </div>`;
  }
  
  // Default template for other tools
  return `
    <div class="text-center py-5">
      <i class="fas fa-tools fa-3x text-muted mb-3"></i>
      <h4>${tool.name} Tool</h4>
      <p class="text-muted">This tool is under development. Check back soon for full functionality!</p>
      <div class="mt-3">
        <button class="btn btn-primary" onclick="alert('Coming soon!')">
          <i class="fas fa-rocket me-2"></i>Try Tool
        </button>
      </div>
    </div>`;
}

// Function to get tool-specific JavaScript
function getToolScript(tool) {
  const toolName = tool.name.toLowerCase();
  
  if (toolName.includes('word counter') || toolName.includes('character counter')) {
    return `
  <script>
    const textInput = document.getElementById('textInput');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const charNoSpace = document.getElementById('charNoSpace');
    const lineCount = document.getElementById('lineCount');
    
    textInput.addEventListener('input', function() {
      const text = this.value;
      const words = text.trim() ? text.trim().split(/\\s+/) : [];
      const chars = text.length;
      const charsNoSpace = text.replace(/\\s/g, '').length;
      const lines = text.split('\\n').length;
      
      wordCount.textContent = words.length;
      charCount.textContent = chars;
      charNoSpace.textContent = charsNoSpace;
      lineCount.textContent = lines;
    });
  </script>`;
  }
  
  if (toolName.includes('percentage calculator')) {
    return `
  <script>
    document.getElementById('calcBtn').onclick = function() {
      const value = parseFloat(document.getElementById('value').value);
      const percent = parseFloat(document.getElementById('percent').value);
      const result = document.getElementById('result');
      
      if (isNaN(value) || isNaN(percent)) {
        result.textContent = "Please enter valid numbers.";
        result.style.display = 'block';
        return;
      }
      
      const calculated = (value * percent / 100).toFixed(2);
      result.innerHTML = \`<strong>\${percent}% of \${value} is \${calculated}</strong>\`;
      result.style.display = 'block';
    };
  </script>`;
  }
  
  if (toolName.includes('base64')) {
    return `
  <script>
    function encode() {
      const input = document.getElementById('inputText').value;
      document.getElementById('outputText').value = btoa(unescape(encodeURIComponent(input)));
    }
    
    function decode() {
      const input = document.getElementById('inputText').value;
      try {
        document.getElementById('outputText').value = decodeURIComponent(escape(atob(input)));
      } catch (e) {
        document.getElementById('outputText').value = "Invalid Base64 string!";
      }
    }
  </script>`;
  }
  
  if (toolName.includes('password generator')) {
    return `
  <script>
    document.getElementById('generateBtn').onclick = function() {
      const length = parseInt(document.getElementById('passwordLength').value);
      const uppercase = document.getElementById('uppercase').checked;
      const lowercase = document.getElementById('lowercase').checked;
      const numbers = document.getElementById('numbers').checked;
      const symbols = document.getElementById('symbols').checked;
      
      let chars = '';
      if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (numbers) chars += '0123456789';
      if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      if (!chars) {
        alert('Please select at least one character type!');
        return;
      }
      
      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      document.getElementById('generatedPassword').value = password;
    };
    
    function copyPassword() {
      const password = document.getElementById('generatedPassword').value;
      if (password) {
        navigator.clipboard.writeText(password).then(() => {
          alert('Password copied to clipboard!');
        });
      }
    }
  </script>`;
  }
  
  if (toolName.includes('qr code')) {
    return `
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
  <script>
    document.getElementById('generateQR').onclick = function() {
      const text = document.getElementById('qrText').value;
      const size = document.getElementById('qrSize').value;
      const result = document.getElementById('qrResult');
      
      if (!text) {
        alert('Please enter some text!');
        return;
      }
      
      QRCode.toCanvas(result, text, {
        width: parseInt(size),
        margin: 2
      }, function (error) {
        if (error) console.error(error);
      });
    };
  </script>`;
  }
  
  if (toolName.includes('temperature converter')) {
    return `
  <script>
    function convertTemperature() {
      const celsius = document.getElementById('celsius').value;
      const fahrenheit = document.getElementById('fahrenheit').value;
      const kelvin = document.getElementById('kelvin').value;
      
      if (celsius !== '') {
        const c = parseFloat(celsius);
        document.getElementById('fahrenheit').value = ((c * 9/5) + 32).toFixed(2);
        document.getElementById('kelvin').value = (c + 273.15).toFixed(2);
      } else if (fahrenheit !== '') {
        const f = parseFloat(fahrenheit);
        document.getElementById('celsius').value = ((f - 32) * 5/9).toFixed(2);
        document.getElementById('kelvin').value = (((f - 32) * 5/9) + 273.15).toFixed(2);
      } else if (kelvin !== '') {
        const k = parseFloat(kelvin);
        document.getElementById('celsius').value = (k - 273.15).toFixed(2);
        document.getElementById('fahrenheit').value = (((k - 273.15) * 9/5) + 32).toFixed(2);
      }
    }
  </script>`;
  }
  
  if (toolName.includes('bmi calculator')) {
    return `
  <script>
    document.getElementById('calculateBMI').onclick = function() {
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const result = document.getElementById('bmiResult');
      
      if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        result.textContent = "Please enter valid weight and height.";
        result.className = "alert alert-danger";
        result.style.display = 'block';
        return;
      }
      
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      let category = '';
      let alertClass = '';
      
      if (bmi < 18.5) {
        category = 'Underweight';
        alertClass = 'alert-warning';
      } else if (bmi < 25) {
        category = 'Normal weight';
        alertClass = 'alert-success';
      } else if (bmi < 30) {
        category = 'Overweight';
        alertClass = 'alert-warning';
      } else {
        category = 'Obese';
        alertClass = 'alert-danger';
      }
      
      result.innerHTML = \`<strong>Your BMI: \${bmi.toFixed(1)}</strong><br>Category: \${category}\`;
      result.className = \`alert \${alertClass}\`;
      result.style.display = 'block';
    };
  </script>`;
  }
  
  if (toolName.includes('age calculator')) {
    return `
  <script>
    // Set current date as default
    document.getElementById('currentDate').value = new Date().toISOString().split('T')[0];
    
    document.getElementById('calculateAge').onclick = function() {
      const birthDate = new Date(document.getElementById('birthDate').value);
      const currentDate = new Date(document.getElementById('currentDate').value);
      const result = document.getElementById('ageResult');
      
      if (isNaN(birthDate.getTime()) || isNaN(currentDate.getTime())) {
        result.textContent = "Please enter valid dates.";
        result.style.display = 'block';
        return;
      }
      
      if (birthDate > currentDate) {
        result.textContent = "Birth date cannot be in the future.";
        result.style.display = 'block';
        return;
      }
      
      const diffTime = Math.abs(currentDate - birthDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const days = diffDays % 30;
      
      result.innerHTML = \`<strong>Age: \${years} years, \${months} months, \${days} days</strong><br>Total days: \${diffDays}\`;
      result.style.display = 'block';
    };
  </script>`;
  }
  
  if (toolName.includes('json formatter')) {
    return `
  <script>
    function formatJSON() {
      const input = document.getElementById('jsonInput').value;
      const output = document.getElementById('jsonOutput');
      
      try {
        const parsed = JSON.parse(input);
        output.value = JSON.stringify(parsed, null, 2);
      } catch (e) {
        output.value = "Invalid JSON: " + e.message;
      }
    }
    
    function minifyJSON() {
      const input = document.getElementById('jsonInput').value;
      const output = document.getElementById('jsonOutput');
      
      try {
        const parsed = JSON.parse(input);
        output.value = JSON.stringify(parsed);
      } catch (e) {
        output.value = "Invalid JSON: " + e.message;
      }
    }
  </script>`;
  }
  
  if (toolName.includes('case converter')) {
    return `
  <script>
    function convertCase(type) {
      const input = document.getElementById('caseInput').value;
      const output = document.getElementById('caseOutput');
      
      switch(type) {
        case 'uppercase':
          output.value = input.toUpperCase();
          break;
        case 'lowercase':
          output.value = input.toLowerCase();
          break;
        case 'titlecase':
          output.value = input.replace(/\\w\\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
          break;
        case 'sentencecase':
          output.value = input.toLowerCase().replace(/(^|\\?|\\.|!)\\s+(.)/g, function(match, p1, p2) {
            return p1 + ' ' + p2.toUpperCase();
          });
          break;
      }
    }
  </script>`;
  }
  
  return `
  <script>
    // Placeholder script for ${tool.name}
    console.log('${tool.name} tool loaded');
  </script>`;
}

// Generate each tool page
tools.forEach(tool => {
  const filePath = path.join(toolsDir, tool.filename);
  fs.writeFileSync(filePath, toolTemplate(tool), 'utf8');
  console.log(`Created: tools/${tool.filename}`);
});

// Generate tools-data.js
const toolsDataJs = `const tools = ${JSON.stringify(tools, null, 2)};`;
fs.writeFileSync(path.join(assetsJsDir, 'tools-data.js'), toolsDataJs, 'utf8');
console.log('Updated: assets/js/tools-data.js');

console.log(`\\n✅ Successfully generated ${tools.length} tool pages!`);
console.log('📁 Check the tools/ folder for all HTML files');
console.log('🎨 You can now customize each tool with specific functionality'); 