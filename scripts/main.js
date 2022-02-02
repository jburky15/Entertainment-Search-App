const left = document.querySelector('.left')
const right = document.querySelector('.right')
const container = document.querySelector('.container')

//Shift the images of the landing page left and right based on where the user hovers their mouse
left.addEventListener('mouseenter', () => container.classList.add('hover-left'))
left.addEventListener('mouseleave', () => container.classList.remove('hover-left'))
right.addEventListener('mouseenter', () => container.classList.add('hover-right'))
right. addEventListener('mouseleave', () => container.classList.remove('hover-right'))
