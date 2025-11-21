const btns = document.querySelectorAll("button")

// helper functions

function playSound(key){
    let audio = document.querySelector(`audio[data-key="${key}"]`)
    let btn = document.querySelector(`button[data-key="${key}"]`)

    if(!audio) return
    audio.currentTime = 0
    audio.play()

    btn.classList.add('playing')
    setTimeout(() => btn.classList.remove("playing"), 300);
    // change time to fit transform animation
}

function removeEffects(){} //for transformend event - no need for time


function spawnEmojiAt(btn) {
    const emojiType = btn.getAttribute('data-emoji');
    
    //1. create element <span>
    let spanEle = document.createElement('span')
    spanEle.className = 'emoji'
    spanEle.textContent = emojiType

    //- Calc btn position (center)
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + 8;

    //2. set starting position
    spanEle.style.left = x + 'px';
    spanEle.style.top = y + 'px';

    //3. append to parent
    document.getElementById('key-list').appendChild(spanEle)

    /* 
    * 4) Animate using 'Web Animations API'
    *     from: visible at start
    *     to: translate up -40px, scale bigger, and opacity -> 0
    */
    const anim = spanEle.animate([
      { transform: 'translate(-50%, 0) scale(1)', opacity: 1 },
      { transform: 'translate(-50%, -40px) scale(1.4)', opacity: 0 }
    ], {
      duration: 700,
      easing: 'cubic-bezier(.22,.9,.3,1)',
      fill: 'forwards'
    });

    // 5) Remove element after animation finishes
    anim.onfinish = () => spanEle.remove();

    // fallback safety: remove after a bit even if animation doesn't fire
    setTimeout(() => spanEle.remove(), 1000);
}

window.addEventListener('keydown', (e) => {
    let key = e.key.toUpperCase()
    playSound(key)
    //emoji pop
    let el = document.querySelector(`button[data-key="${key}"]`)

    spawnEmojiAt(el)
})
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        playSound(btn.dataset.key)

        //emoji pop
        spawnEmojiAt(btn)
    })
})
