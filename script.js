window.onload = function() {
    const carouselList = document.getElementById('carousel-list');
    const items = carouselList.querySelectorAll('li');

    items.forEach(item => {
        const clone = item.cloneNode(true);
        carouselList.appendChild(clone);
    });
};

document.querySelectorAll('.elt').forEach(function (elt) {
    const paragraph = elt.querySelector('p');
    const fullText = paragraph.textContent;
    const summary = fullText.substring(0, 200) + ' ...';

    paragraph.textContent = '';
    paragraph.textContent = summary;

    const fullTextElement = document.createElement('p');
    fullTextElement.classList.add('full-text');
    fullTextElement.textContent = fullText;

    const showMore = document.createElement('span');
    showMore.classList.add('show-more');
    showMore.textContent = 'Show more';
    showMore.addEventListener('click', function () {
        paragraph.style.display = 'none';
        fullTextElement.style.display = 'block';
        showMore.style.display = 'none';
    });

    elt.appendChild(fullTextElement);
    elt.appendChild(showMore);
});

document.getElementById('scrollButton').addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// copied code from chat GPT but understand

const iconContainer = document.querySelector('.icon-container');
const icons = [
    'fa-camera', 'fa-video', 'fa-desktop', 'fa-gear'
];

const numberOfIcons = 40;
const iconSize = 60;
const minDistance = 20;

const positions = [];

function isCollision(newX, newY) {
    for (const pos of positions) {
        const distance = Math.sqrt((newX - pos.x) ** 2 + (newY - pos.y) ** 2);
        if (distance < minDistance + iconSize) {
            return true;
        }
    }
    return false;
}

function placeIcons() {
    let attempts = 0;
    while (positions.length < numberOfIcons && attempts < 1000) {
        const x = Math.random() * (iconContainer.clientWidth - iconSize);
        const y = Math.random() * (iconContainer.clientHeight - iconSize);

        if (!isCollision(x, y)) {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            const iconElement = document.createElement('div');
            iconElement.classList.add('icon');
            iconElement.innerHTML = `<i class="fas ${randomIcon}"></i>`;
            
            iconElement.style.left = `${x}px`;
            iconElement.style.top = `${y}px`;
            
            const rotation = Math.random() * 90 - 45;
            iconElement.style.transform = `rotate(${rotation}deg)`;
            
            const initialScale = 0.8 + Math.random() * 0.4;
            iconElement.style.transform += ` scale(${initialScale})`;
            
            positions.push({ x, y, rotation });
            iconContainer.appendChild(iconElement);
            
            animateIconScaling(iconElement, rotation, initialScale);
        }
        attempts++;
    }
}

placeIcons();

function animateIconScaling(iconElement, rotation, initialScale) {
    const minScale = 0.8;
    const maxScale = 1.2;
    const scaleSpeed = 0.005;
    let scaleDirection = 1;
    let currentScale = initialScale;

    function scaleIcon() {
        currentScale += scaleSpeed * scaleDirection;

        if (currentScale >= maxScale) {
            scaleDirection = -1;
        } else if (currentScale <= minScale) {
            scaleDirection = 1;
        }

        iconElement.style.transform = `rotate(${rotation}deg) scale(${currentScale})`;

        requestAnimationFrame(scaleIcon);
    }

    scaleIcon();
}