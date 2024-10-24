// Update text and styles when input changes
document.getElementById('name').addEventListener('input', function() {
    document.getElementById('nameText').textContent = this.value;
});

document.getElementById('height').addEventListener('input', function() {
    document.getElementById('heightText').textContent = this.value;
});

document.getElementById('age').addEventListener('input', function() {
    document.getElementById('ageText').textContent = this.value;
});

document.getElementById('weight').addEventListener('input', function() {
    document.getElementById('weightText').textContent = this.value;
});

document.getElementById('gender').addEventListener('input', function() {
    document.getElementById('genderText').textContent = this.value;
});

document.getElementById('phrase').addEventListener('input', function() {
    document.getElementById('phraseText').textContent = this.value;
    adjustPhraseText();
});

// Handle image upload
document.getElementById('profilePhoto').addEventListener('change', function(e) {
    handleImageUpload(e, 'profilePhotoArea');
});

function handleImageUpload(e, areaId) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const area = document.getElementById(areaId);
            area.style.backgroundImage = `url(${event.target.result})`;
            area.style.backgroundSize = 'cover';
            area.style.backgroundPosition = 'center';
            area.style.border = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// Text overflow handling for phrase
function adjustPhraseText() {
    const phraseText = document.getElementById('phraseText');
    const phrase = document.getElementById('phrase').value;

    // Start with the current font size
    let fontSize = parseInt(document.getElementById('phraseFontSize').value);
    phraseText.style.fontSize = `${fontSize}px`;
    phraseText.textContent = phrase;

    // Check if text overflows and reduce font size if needed
    while (
        (phraseText.scrollHeight > phraseText.clientHeight ||
            phraseText.scrollWidth > phraseText.clientWidth) &&
        fontSize > 8
        ) {
        fontSize--;
        phraseText.style.fontSize = `${fontSize}px`;
    }

    // Update the font size input if it was adjusted
    document.getElementById('phraseFontSize').value = fontSize;
}

// Update global font
function updateGlobalFont() {
    const font = document.getElementById('globalFont').value;
    const textElements = document.querySelectorAll('.card-text');
    textElements.forEach(element => {
        element.style.fontFamily = font;
    });
    // Update all font selects
    document.querySelectorAll('select[id$="Font"]').forEach(select => {
        select.value = font;
    });
}

// Update global color
function updateGlobalColor() {
    const color = document.getElementById('globalColor').value;
    const textElements = document.querySelectorAll('.card-text');
    textElements.forEach(element => {
        element.style.color = color;
    });
    // Update all color pickers
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        picker.value = color;
    });
}

// Update global font size
function updateGlobalFontSize() {
    const size = document.getElementById('globalFontSize').value + 'px';
    const textElements = document.querySelectorAll('.card-text');
    textElements.forEach(element => {
        element.style.fontSize = size;
    });
    // Update all font size inputs
    document.querySelectorAll('input[type="number"].font-size-control').forEach(input => {
        input.value = document.getElementById('globalFontSize').value;
    });
    // Check phrase text overflow after global font size change
    adjustPhraseText();
}

// Update individual text style
function updateTextStyle(elementId) {
    const element = document.getElementById(elementId);
    const fontSelect = document.getElementById(elementId.replace('Text', 'Font'));
    const colorPicker = document.getElementById(elementId.replace('Text', 'Color'));
    const fontSizeInput = document.getElementById(elementId.replace('Text', 'FontSize'));

    if (fontSelect) {
        element.style.fontFamily = fontSelect.value;
    }
    if (colorPicker) {
        element.style.color = colorPicker.value;
    }
    if (fontSizeInput) {
        element.style.fontSize = fontSizeInput.value + 'px';
    }

    // If this is the phrase text, adjust for overflow
    if (elementId === 'phraseText') {
        adjustPhraseText();
    }
}

// Add event listeners for font size changes
document.getElementById('phraseFontSize').addEventListener('change', function() {
    updateTextStyle('phraseText');
    adjustPhraseText();
});

// Save as PNG with improved quality
function saveAsPNG() {
    const card = document.getElementById('card');
    const scale = 2; // Increase quality by scaling up

    html2canvas(card, {
        scale: scale,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        // Create a temporary link
        const link = document.createElement('a');
        link.download = 'ic-card.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        console.error('Error generating PNG:', error);
        alert('เกิดข้อผิดพลาดในการบันทึกไฟล์ กรุณาลองใหม่อีกครั้ง');
    });
}

// Load template image
function loadTemplateImage() {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.backgroundImage = 'url("template.png")';
}

// Initialize on page load
window.onload = function() {
    loadTemplateImage();
    // Set initial global font and color
    updateGlobalFont();
    updateGlobalColor();
    updateGlobalFontSize();

    // Add event listeners for all text input fields
    const textInputs = ['name', 'height', 'age', 'weight', 'gender', 'phrase'];
    textInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                const textElement = document.getElementById(id + 'Text');
                if (textElement) {
                    textElement.textContent = this.value;
                    if (id === 'phrase') {
                        adjustPhraseText();
                    }
                }
            });
        }
    });
};