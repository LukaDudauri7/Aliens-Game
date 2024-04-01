class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height * 0.8 - this.height;
        this.speed = 20;
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        if(this.game.keys.indexOf('ArrowLeft') > - 1) this.x -= this.speed;
        if(this.game.keys.indexOf('ArrowRight') > - 1) this.x += this.speed;
        // horizontal boundaries
        if(this.x < 0) this.x = 0;
        else if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    }
    shoot(){
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x, this.y);
    }
}

class Projectile {
    constructor() {
        this.width = 4;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }
    draw(context){
        if(!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    update() {
        if(!this.free) {
            this.y -= this.speed;
        }
    }
    start(x, y){
        this.x = x;
        this.y = y;
        this.free = false;
    }
    reset(){
        this.free = true;
    }
}

class Enemy {

}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);

        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectile();
        console.log(this.projectilesPool);

        //event listeners
        window.addEventListener('keydown', e => {
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if(e.key === '1') this.player.shoot();
        });

        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key); 
            if(index > -1) this.keys.splice(index, 1);
        });
    }
    render(context) {
        this.player.draw(context);
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })
    }
    createProjectile(){
        for(let i = 0; i < this.numberOfProjectiles; i++){
            this.projectilesPool.push(new Projectile());
        }
    }
    getProjectile(){
        for(let i = 0; i < this.numberOfProjectiles; i++){
            if(this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }
}

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

    const game = new Game(canvas)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})