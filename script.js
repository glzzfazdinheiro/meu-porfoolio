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
    let isDeleting = false;
    let isFinished = false;

    function typeEffect() {
        const currentText = typingElement.textContent.replace('|', '');
        
        if (!isDeleting && index < text.length) {
            // Digitando
            typingElement.textContent = currentText + text.charAt(index) + '|';
            index++;
            setTimeout(typeEffect, speed);
        } else if (!isDeleting && index >= text.length) {
            // Terminou de digitar
            isFinished = true;
            // Inicia o efeito de piscar no cursor
            cursorElement.style.animation = 'blink 1s infinite';
            // Opcional: esperar 3 segundos e começar a apagar
            // setTimeout(() => {
            //     isDeleting = true;
            //     typeEffect();
            // }, 3000);
        } else if (isDeleting && index > 0) {
            // Apagando
            typingElement.textContent = currentText.slice(0, -1) + '|';
            index--;
            setTimeout(typeEffect, speed / 2);
        } else if (isDeleting && index === 0) {
            // Terminou de apagar, recomeça
            isDeleting = false;
            setTimeout(typeEffect, 1000);
        }
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                setTimeout(typeEffect, 500); // Delay inicial
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(typingElement);
}

// Efeito de revelação ao scroll
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Adiciona um delay progressivo para elementos em grid
            if (entry.target.classList.contains('skill-card') || 
                entry.target.classList.contains('projeto-card')) {
                const index = Array.from(revealElements).indexOf(entry.target);
                entry.target.style.transitionDelay = `${(index % 5) * 0.1}s`;
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
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
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Atualiza URL sem recarregar a página
            history.pushState(null, null, targetId);
        }
    });
});

// Efeito de hover nos botões de contato
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

// Adicionar classe de scroll ao header
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(7, 7, 7, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(7, 7, 7, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Efeito de preloader opcional (pode ser ativado se quiser)
window.addEventListener('load', function() {
    // Remover preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
    
    // Inicializar tooltips para links de contato
    document.querySelectorAll('.contato-card').forEach(card => {
        const span = card.querySelector('.contato-info span');
        if (span && (span.textContent.includes('@') || span.textContent.includes('github') || span.textContent.includes('glzz'))) {
            card.title = 'Clique para copiar';
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function() {
                const textToCopy = span.textContent.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Feedback visual de cópia
                    const originalColor = card.style.backgroundColor;
                    card.style.backgroundColor = 'rgba(19, 163, 255, 0.1)';
                    
                    const originalText = span.textContent;
                    span.textContent = 'Copiado! ✓';
                    span.style.color = '#25D366';
                    
                    setTimeout(() => {
                        span.textContent = originalText;
                        span.style.color = '';
                        card.style.backgroundColor = originalColor;
                    }, 2000);
                });
            });
        }
    });
});

// Adicionar animação de entrada para elementos principais
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos principais após carregamento
    setTimeout(() => {
        document.querySelectorAll('.header > *').forEach((el, index) => {
            el.style.animation = `fadeInDown 0.6s ease ${index * 0.1}s forwards`;
            el.style.opacity = '0';
        });
    }, 100);
    
    // Adicionar animação CSS para fadeInDown
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
        
        .typing-cursor {
            animation: blink 1s infinite;
            color: rgb(19, 163, 255);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});