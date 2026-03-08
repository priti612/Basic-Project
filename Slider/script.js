const nexte1 = document.querySelector(".next")

const imgs = document.querySelectorAll('img')

const preve1 = document.querySelector(".prev")

const imgconte1 = document.querySelector(".image-container")

let currimg = 1
let timeout;

nexte1.addEventListener("click", () => {
    currimg++
    clearTimeout(timeout)
    updateimg()
})

preve1.addEventListener("click", () => {
    currimg--
    clearTimeout(timeout)
    updateimg()
})

function updateimg() {
    if (currimg > imgs.length) {
        currimg = 1;
    }
    else if (currimg < 1) {
        currimg = imgs.length;
    }

    imgconte1.style.transform = `translateX(-${(currimg - 1) * 500}px)`;

    timeout = setTimeout(() => {
        currimg++
        updateimg()
    }, 3000)   // changed 300 → 3000 so arrows can be seen
}