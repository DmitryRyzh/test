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
        
        var background = new cc.Sprite(res.background_jpg);
        background.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        });
        this.addChild(background);

        this.sprite = new cc.Sprite("res/cross.png");
        this.sprite.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.addChild(this.sprite);
        this.sprites.push(this.sprite);

        var newSprite2 = new cc.Sprite("res/cross.png");
        newSprite2.attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2
        });
        this.addChild(newSprite2);
        this.sprites.push(newSprite2);

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var cell = new cc.Sprite("res/cell.png");
                cell.attr({
                    x: cc.winSize.width / 4 + (i * cc.winSize.width / 4),
                    y: cc.winSize.height / 4 + (j * cc.winSize.height / 4)
                });
                this.addChild(cell);
                this.grid.push(cell);
            }
        }

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.processMouseDown.bind(this),
            onMouseMove: this.processMouseMove.bind(this),
            onMouseUp: this.processMouseUp.bind(this)
        }, this);

        return true;
    },

    processMouseDown:function(event){
        var location = event.getLocation();
        for (var i = 0; i < this.sprites.length; i++) {
            if (cc.rectContainsPoint(this.sprites[i].getBoundingBox(), location) && !this.sprites[i].isLocked) {
                this.isDragging = true;
                this.sprite = this.sprites[i];
                break;
            }
        }
    },

    processMouseMove:function(event){
        var location = event.getLocation();
        if(this.isDragging){
            this.sprite.x = location.x;
            this.sprite.y = location.y;
        }
    },

    processMouseUp:function(event){
        this.isDragging = false;
        if(this.isInTarget()){
            this.sprite.isLocked = true;
        }
    },

    isInTarget:function(){
        for (var i = 0; i < this.grid.length; i++) {
            if (cc.rectContainsPoint(this.grid[i].getBoundingBox(), cc.p(this.sprite.x, this.sprite.y))) {
                return true;
            }
        }
        return false;
    }
});
