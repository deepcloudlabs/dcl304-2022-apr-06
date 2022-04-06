class Circle {
    constructor(x,y,radius) {
        this.x = x ;
        this.y = y ;
        this.radius = radius ;
    }

    area(){
        return Math.PI * this.radius * this.radius;
    }
    circumference(){
        return 2 * Math.PI * this.radius;
    }
}

let c1 = new Circle(0,0,1);
let c2 = new Circle(100,100,100);
console.log(c1.area());
console.log(c2.circumference());
Circle.prototype.color = "Red";
Circle.prototype.move = function(dx,dy){
    this.x += dx;
    this.y += dy;
}
Circle.prototype.isShorter = function(other){
    return this.radius <= other.radius;
}
Circle.isShorter = function(left,right){
    return left.radius <= right.radius;
}
function isShorter(left,right){
    return left.radius <= right.radius;
}
function isShorter(left,right){
    return left.radius < right.radius;
}
Circle.prototype.radius = 42;