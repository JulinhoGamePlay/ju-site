// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.textContent = '☀️';
    }
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀️';
    }
});

// Pet the Cat Logic
const petButton = document.getElementById('pet-button');
const meowMessage = document.getElementById('meow-message');
const heartContainer = document.getElementById('heart-container');

const emojis = ['💖', '😻', '🐾', '✨', '💕'];

petButton.addEventListener('click', () => {
    // Show hidden cute message
    meowMessage.style.display = 'block';
    
    // Create random floating emojis
    createHearts();
    
    // Add a bounce effect to the button
    petButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        petButton.style.transform = '';
    }, 150);
});

function createHearts() {
    for(let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Randomize position and animation properties
            const randomX = Math.random() * window.innerWidth;
            const randomScale = Math.random() * 1 + 0.5; // 0.5 to 1.5
            
            heart.style.left = `${randomX}px`;
            heart.style.fontSize = `${randomScale * 2}rem`;
            // Randomize animation duration between 2s and 4s
            heart.style.animationDuration = `${Math.random() * 2 + 2}s`;
            
            heartContainer.appendChild(heart);
            
            // Remove after animation completes
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}

// Cat Facts Logic
const facts = [
    "Os gatos dormem cerca de 70% de suas vidas!",
    "Cada gato tem um padrão de focinho único, assim como a impressão digital humana.",
    "Um gato pode pular até seis vezes a sua própria altura.",
    "O ronronar de um gato não significa apenas felicidade, pode ser para se curar!",
    "Os gatos não conseguem sentir o gosto de doces.",
    "A audição dos gatos é muito mais sensível do que a dos cães.",
    "Eles andam nas pontas dos pés, o que os torna caçadores muito silenciosos.",
    "Gatos cumprimentam uns aos outros \"tocando os narizes\"."
];

const factText = document.getElementById('fact-text');
const nextFactBtn = document.getElementById('next-fact');
let currentFactIndex = 0;

nextFactBtn.addEventListener('click', () => {
    // Rotate to next fact
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    
    // Add fade out effect
    factText.style.opacity = 0;
    
    setTimeout(() => {
        factText.textContent = facts[currentFactIndex];
        // Fade back in
        factText.style.opacity = 1;
    }, 300);
});

// Calculator Logic
const calcBtn = document.getElementById('calc-button');
const calcResult = document.getElementById('calc-result');

calcBtn.addEventListener('click', () => {
    const type = document.getElementById('calc-type').value;
    const capital = parseFloat(document.getElementById('calc-capital').value);
    const rateInput = parseFloat(document.getElementById('calc-rate').value);
    const rateUnit = document.getElementById('calc-rate-unit').value;
    const timeInput = parseFloat(document.getElementById('calc-time').value);
    const timeUnit = document.getElementById('calc-time-unit').value;

    // Validate inputs
    if (isNaN(capital) || isNaN(rateInput) || isNaN(timeInput)) {
        calcResult.style.display = 'block';
        calcResult.innerHTML = '<p style="color: #ff4d4d;">Miau! Por favor, preencha todos os campos corretamente! 🐾</p>';
        return;
    }

    let time = timeInput;
    let timeLabel = timeUnit; 
    let rateLabel = rateUnit === 'mes' ? 'ao mês' : 'ao ano';
    let conversionHTML = '';

    // Convert time unit to match rate unit for the formula
    if (rateUnit === 'mes' && timeUnit === 'anos') {
        time = timeInput * 12;
        timeLabel = 'meses';
        conversionHTML = `<li><em>Nota da Prô:</em> Convertemos o tempo para bater com a taxa! ${timeInput} anos = ${time} meses.</li>`;
    } else if (rateUnit === 'ano' && timeUnit === 'meses') {
        time = timeInput / 12;
        timeLabel = 'anos';
        conversionHTML = `<li><em>Nota da Prô:</em> Convertemos o tempo para bater com a taxa! ${timeInput} meses = ${time.toFixed(2)} anos.</li>`;
    }

    const rate = rateInput / 100;
    let finalAmount = 0;
    let interest = 0;
    let explanationHTML = '';

    if (type === 'simples') {
        interest = capital * rate * time;
        finalAmount = capital + interest;
        
        explanationHTML = `
            <div class="explanation-box">
                <h4>Como calculamos isso? (Professora Gatinha Explica 🎓🐱)</h4>
                <p>A fórmula dos <strong>Juros Simples</strong> é: <code>J = C × i × t</code></p>
                <ul>
                    <li><strong>C (Capital):</strong> R$ ${capital.toFixed(2)}</li>
                    <li><strong>i (Taxa):</strong> ${(rate * 100).toFixed(2)}% ${rateLabel} (ou ${rate.toFixed(4)} em decimal)</li>
                    <li><strong>t (Tempo):</strong> ${time} ${timeLabel}</li>
                    ${conversionHTML}
                </ul>
                <p>Substituindo na fórmula:<br>
                <code>J = ${capital.toFixed(2)} × ${rate.toFixed(4)} × ${time.toFixed(2)}</code></p>
                <p>O juros gerado é de <strong>R$ ${interest.toFixed(2)}</strong>.</p>
                <p>Para o Montante Final (M), somamos o Capital + Juros:<br>
                <code>M = ${capital.toFixed(2)} + ${interest.toFixed(2)} = R$ ${finalAmount.toFixed(2)}</code></p>
            </div>
        `;
    } else {
        finalAmount = capital * Math.pow((1 + rate), time);
        interest = finalAmount - capital;
        
        explanationHTML = `
            <div class="explanation-box">
                <h4>Como calculamos isso? (Professora Gatinha Explica 🎓🐱)</h4>
                <p>A fórmula dos <strong>Juros Compostos</strong> ("juros sobre juros") é: <code>M = C × (1 + i)<sup>t</sup></code></p>
                <ul>
                    <li><strong>C (Capital):</strong> R$ ${capital.toFixed(2)}</li>
                    <li><strong>i (Taxa):</strong> ${(rate * 100).toFixed(2)}% ${rateLabel} (ou ${rate.toFixed(4)} em decimal)</li>
                    <li><strong>t (Tempo):</strong> ${time} ${timeLabel}</li>
                    ${conversionHTML}
                </ul>
                <p>Substituindo na fórmula:<br>
                <code>M = ${capital.toFixed(2)} × (1 + ${rate.toFixed(4)})<sup>${time.toFixed(2)}</sup></code>
                </p>
                <p>O Montante (Capital + Juros) no final será de <strong>R$ ${finalAmount.toFixed(2)}</strong>.</p>
                <p>Para achar apenas os juros gerados, fazemos Montante - Capital:<br>
                <code>J = R$ ${finalAmount.toFixed(2)} - R$ ${capital.toFixed(2)} = R$ ${interest.toFixed(2)}</code></p>
            </div>
        `;
    }

    calcResult.style.display = 'block';
    calcResult.classList.remove('hidden');
    calcResult.innerHTML = `
        <h3>Resultado Financeiro Festivo 🎉</h3>
        <p><strong>Total Investido:</strong> R$ ${capital.toFixed(2)}</p>
        <p><strong>Juros Rendidos:</strong> R$ ${interest.toFixed(2)}</p>
        <p style="font-size: 1.3rem; margin-top: 1rem; color: var(--primary-color); font-weight: bold;">
            Montante Final: R$ ${finalAmount.toFixed(2)}
        </p>
        ${explanationHTML}
        <p style="margin-top: 1.5rem; opacity: 0.8; font-weight: bold;">Isso daria pra comprar aproximadamente ${Math.floor(finalAmount / 3)} sachês deliciosos (se cada um for R$3,00)! 😻</p>
    `;
    
    // Tiny bounce effect on the calc card
    const calcCard = document.querySelector('.calculator');
    calcCard.style.transform = 'translateY(-5px)';
    setTimeout(() => {
        calcCard.style.transform = 'translateY(0)';
    }, 200);
});
