// Efeito de digitação com melhorias
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    const cursorElement = document.createElement('span');
    cursorElement.className = 'typing-cursor';
    cursorElement.textContent = '|';
    typingElement.appendChild(cursorElement);

    let index = 0;
    const speed = 35;
    let started = false;

    function typeEffect() {
        if (index < text.length) {
            typingElement.textContent = text.substring(0, index + 1) + '|';
            index++;
            setTimeout(typeEffect, speed);
        } else {
            // Remove o cursor quando terminar (opcional)
            cursorElement.style.animation = 'blink 1s infinite';
        }
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                setTimeout(typeEffect, 500);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(typingElement);
}

// Efeito de revelação ao scroll
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));

// Atualizar ano no footer
const yearElement = document.getElementById('ano');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se existir
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Botão Voltar ao Topo
const backToTopButton = document.getElementById('back-to-top');

// Mostrar/ocultar botão conforme scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Função para voltar ao topo
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efeito de hover nos cards de contato
document.querySelectorAll('.contato-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contato-icon i');
        if (icon) {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contato-icon i');
        if (icon) {
            icon.style.transform = 'rotate(0deg) scale(1)';
        }
    });
});

// Função para copiar informações de contato
document.querySelectorAll('.contato-card').forEach(card => {
    const span = card.querySelector('.contato-info span');
    if (span && (span.textContent.includes('@') || span.textContent.includes('glzz'))) {
        card.style.cursor = 'pointer';
        card.title = 'Clique para copiar';
        
        card.addEventListener('click', function() {
            const textToCopy = span.textContent.trim();
            
            // Usar Clipboard API se disponível
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyFeedback(card, span);
                });
            } else {
                // Fallback para navegadores antigos
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyFeedback(card, span);
            }
        });
    }
});

function showCopyFeedback(card, span) {
    const originalText = span.textContent;
    const originalColor = span.style.color;
    
    span.textContent = 'Copiado! ✓';
    span.style.color = '#25D366';
    
    setTimeout(() => {
        span.textContent = originalText;
        span.style.color = originalColor;
    }, 2000);
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .typing-cursor {
        animation: blink 1s infinite;
        color: rgb(19, 163, 255);
        font-weight: bold;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Animar elementos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Animar header
    setTimeout(() => {
        document.querySelectorAll('.header > *').forEach((el, index) => {
            el.style.animation = `fadeInDown 0.6s ease ${index * 0.1}s forwards`;
            el.style.opacity = '0';
        });
    }, 100);
    
    // Animar seção sobre
    setTimeout(() => {
        const sobreContainer = document.querySelector('.sobre-container');
        if (sobreContainer) {
            sobreContainer.style.animation = 'fadeInUp 0.8s ease forwards';
            sobreContainer.style.opacity = '0';
        }
    }, 300);
});