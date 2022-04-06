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

c1 = new Circle(0,0,100);

for (let prop in c1){
    console.log(`${prop} :: ${c1[prop]}`);
    console.log(prop + ": " + c1[prop]);
}