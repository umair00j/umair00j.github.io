/* ------------------ HEART RAIN ------------------ */
const heartsArea = document.getElementById("hearts");

for (let i = 0; i < 25; i++) {
    let h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "%";
    h.style.animationDelay = Math.random() * 5 + "s";
    heartsArea.appendChild(h);
}

/* ------------------ FIREWORKS ------------------ */
const fw = document.getElementById("fireworks");
const ctx = fw.getContext("2d");
fw.width = innerWidth;
fw.height = innerHeight;
let rockets = [], sparks = [];

function rand(min, max) { return Math.random() * (min - max) + max; }

function Rocket() {
    this.x = Math.random() * fw.width;
    this.y = fw.height;
    this.tx = Math.random() * fw.width;
    this.ty = Math.random() * fw.height / 2;
    this.speed = 3 + Math.random() * 3;
    this.boom = false;

    this.update = function() {
        let dx = this.tx - this.x;
        let dy = this.ty - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 8) {
            this.boom = true;
            explode(this.x, this.y);
        } else {
            this.x += dx / dist * this.speed;
            this.y += dy / dist * this.speed;
        }
    };

    this.draw = function() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
        ctx.fill();
    };
}

function explode(x, y) {
    for (let i = 0; i < 80; i++) {
        sparks.push({
            x, y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5,
            alpha: 1,
            color: `hsl(${Math.random()*360},100%,50%)`
        });
    }
}

function animateFW() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,fw.width,fw.height);

    if (Math.random() < 0.15) rockets.push(new Rocket());

    rockets.forEach((r, i) => {
        r.update();
        r.draw();
        if (r.boom) rockets.splice(i,1);
    });

    sparks.forEach((s,i) => {
        s.x += Math.cos(s.angle)*s.speed;
        s.y += Math.sin(s.angle)*s.speed;
        s.alpha -= 0.015;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, 4, 4);
        ctx.globalAlpha = 1;
        if (s.alpha <= 0) sparks.splice(i,1);
    });

    requestAnimationFrame(animateFW);
}
animateFW();

/* ------------------ CONFETTI / POPPER RAIN ------------------ */
const cf = document.getElementById("confetti");
const cfx = cf.getContext("2d");

cf.width = innerWidth;
cf.height = innerHeight;

let confetti = [];

for (let i = 0; i < 200; i++) {
    confetti.push({
        x: Math.random() * cf.width,
        y: Math.random() * -500,
        size: 5 + Math.random() * 6,
        speed: 2 + Math.random() * 4,
        color: `hsl(${Math.random()*360},100%,60%)`
    });
}

function animateConfetti() {
    cfx.clearRect(0,0,cf.width,cf.height);

    confetti.forEach((p) => {
        p.y += p.speed;
        if (p.y > cf.height) p.y = -20;
        cfx.fillStyle = p.color;
        cfx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(animateConfetti);
}
animateConfetti();
