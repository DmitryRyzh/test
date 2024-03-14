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
    isLocked:false, // 
    grid: [],

    ctor:function () {
        this._super();
        

        var background = new cc.Sprite(res.background_jpg);
        background.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        });
        this.addChild(background);



       
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.addChild(this.sprite);
        this.grid = []; // Инициализация массива

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



        // Добавляем слушатель событий мыши
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                    event.getCurrentTarget().processMouseDown(event);
                }
            },
            onMouseMove: function(event){
                if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                    event.getCurrentTarget().processMouseMove(event);
                }
            },
            onMouseUp: function(event){
                if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
                    event.getCurrentTarget().processMouseUp(event);
                }
            }
        }, this);

        return true;
    },

    processMouseDown:function(event){
        var location = event.getLocation();
        if(cc.rectContainsPoint(this.sprite.getBoundingBox(), location) && !this.isLocked){
            this.isDragging = true; // устанавливаем флаг в true
        }
    },

    processMouseMove:function(event){
        var location = event.getLocation();
        if(this.isDragging){ // проверяем флаг
            this.sprite.x = location.x;
            this.sprite.y = location.y;
        }
    },

    processMouseUp:function(event){
        this.isDragging = false; // устанавливаем флаг в false
        if(this.isInTarget()){
            this.isLocked = true; // блокируем спрайт, если он находится в целевой области
        }
    },

    isInTarget:function(){
        for (var i = 0; i < this.grid.length; i++) {
            if (cc.rectContainsPoint(this.grid[i].getBoundingBox(), cc.p(this.sprite.x, this.sprite.y))) {
                return true; // Если спрайт находится внутри хотя бы одного квадрата, возвращаем true
            }
        }
        return false; // Если спрайт не находится ни в одном квадрате, возвращаем false
    }
    
});
