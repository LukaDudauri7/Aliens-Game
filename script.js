class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 200;
        this.y = 200;
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Projectile {

}

class Enemy {

}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    render() {
        // console.log(this.width, this.height);
    }
}

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

    const game = new Game(canvas)
   game.render();
})