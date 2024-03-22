var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    target:null,
    isDragging:false,
    isLocked:false,
    sprites: [], // массив для спрайтов
    grid: [], // массив для ячеек сетки

    ctor:function () {
        this._super();
        
        var background = new cc.Sprite(res.background_jpg); // фон
        background.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        });
        this.addChild(background);

        var red_circle = new cc.Sprite("res/circle.png"); // красный круг
        red_circle.attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 + 270
        });
        this.addChild(red_circle);
        this.sprites.push(red_circle);

        var red_cross = new cc.Sprite("res/cross.png"); // красный крест
        red_cross.attr({
            x: cc.winSize.width / 2 - 0,
            y: cc.winSize.height / 2 + 270
        });
        this.addChild(red_cross);
        this.sprites.push(red_cross);

        var red_triangle = new cc.Sprite("res/triangle.png"); // красный треугольник
        red_triangle.attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 + 270
        });
        this.addChild(red_triangle);
        this.sprites.push(red_triangle);


        var blue_circle = new cc.Sprite("res/blue_circle.png");// синий круг
        blue_circle.attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 - 270
        });
        this.addChild(blue_circle);
        this.sprites.push(blue_circle);

        var blue_cross = new cc.Sprite("res/blue_cross.png"); // синий крест
        blue_cross.attr({
            x: cc.winSize.width / 2 + 0,
            y: cc.winSize.height / 2 - 270
        });
        this.addChild(blue_cross);
        this.sprites.push(blue_cross);

        var blue_traingle = new cc.Sprite("res/blue_triangle.png"); // синий треугольник
        blue_traingle.attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 - 270
        });
        this.addChild(blue_traingle);
        this.sprites.push(blue_traingle);
        

        for (var i = 0; i < 3; i++) { // размтека сетки
            for (var j = 0; j < 3; j++) {
                var cell = new cc.Sprite("res/cell.png");
                cell.attr({
                    x: cc.winSize.width / 3.5 + (i * cc.winSize.width / 5),
                    y: cc.winSize.height / 3.5 + (j * cc.winSize.height / 5)
                });
                this.addChild(cell);
                this.grid.push(cell);
            }
        }

        cc.eventManager.addListener({ // обработчик драго эн дроп
            event: cc.EventListener.MOUSE,
            onMouseDown: this.processMouseDown.bind(this),
            onMouseMove: this.processMouseMove.bind(this),
            onMouseUp: this.processMouseUp.bind(this)
        }, this);

        return true;
    },

    processMouseDown:function(event){ // мышь вниз
        var location = event.getLocation();
        for (var i = 0; i < this.sprites.length; i++) {
            if (cc.rectContainsPoint(this.sprites[i].getBoundingBox(), location) && !this.sprites[i].isLocked) {
                this.isDragging = true;
                this.sprite = this.sprites[i];
                break;
            }
        }
    },

    processMouseMove:function(event){ // движение по горизонтали
        var location = event.getLocation();
        if(this.isDragging){
            this.sprite.x = location.x;
            this.sprite.y = location.y;
        }
    },

    processMouseUp:function(event){ // движение вверх
        this.isDragging = false;
        if(this.isInTarget()){
            this.sprite.isLocked = true;
        }
    },

    isInTarget:function(){ // в клетке или нет
        for (var i = 0; i < this.grid.length; i++) {
            if (cc.rectContainsPoint(this.grid[i].getBoundingBox(), cc.p(this.sprite.x, this.sprite.y))) {
                return true;
            }
        }
        return false;
    }
});
