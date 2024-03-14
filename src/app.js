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
    ctor:function () {
        this._super();
        this.setColor(cc.color(255,255,255)); 

       
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.addChild(this.sprite);

        // Создаем целевую область
        this.target = new cc.Sprite("res/cell.png"); // предполагается, что у вас есть изображение для целевой области
        this.target.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.addChild(this.target);

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
        return cc.rectContainsPoint(this.target.getBoundingBox(), cc.p(this.sprite.x, this.sprite.y));
    }
});
