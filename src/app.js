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
        this.grid = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        
        
        var background = new cc.Sprite(res.background_jpg); // фон
        background.attr({
            x: cc.winSize.width/2,
            y: cc.winSize.height/2
        });
        this.addChild(background);

        // команда красных
        var redCircle  = new cc.Sprite("res/circle.png"); // красный круг
        redCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 + 270,
            value: 1,
            team: 'red'
            
        });
        this.addChild(redCircle );
        this.sprites.push(redCircle );

        var redCircle  = new cc.Sprite("res/circle.png"); // красный круг
        redCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 + 270,
            value: 1,
            team: 'red'
            
        });
        this.addChild(redCircle );
        this.sprites.push(redCircle );

        var redCross  = new cc.Sprite("res/cross.png"); // красный крест
        redCross .attr({
            x: cc.winSize.width / 2 - 0,
            y: cc.winSize.height / 2 + 270,
            value: 2,
            team: 'red'
        });
        this.addChild(redCross );
        this.sprites.push(redCross );

        var redCross  = new cc.Sprite("res/cross.png"); // красный крест
        redCross .attr({
            x: cc.winSize.width / 2 - 0,
            y: cc.winSize.height / 2 + 270,
            value: 2,
            team: 'red'
        });
        this.addChild(redCross );
        this.sprites.push(redCross );


        var redTriangle  = new cc.Sprite("res/triangle.png"); // красный треугольник
        redTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 + 270,
            value: 3,
            team: 'red'
        });
        this.addChild(redTriangle );
        this.sprites.push(redTriangle );

        var redTriangle  = new cc.Sprite("res/triangle.png"); // красный треугольник
        redTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 + 270,
            value: 3,
            team: 'red'
        });
        this.addChild(redTriangle );
        this.sprites.push(redTriangle );

        // команда синих
        var blueCircle  = new cc.Sprite("res/blue_circle.png");// синий круг
        blueCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 - 270,
            value: 1,
            team: 'blue'

        });
        this.addChild(blueCircle );
        this.sprites.push(blueCircle );

        var blueCircle  = new cc.Sprite("res/blue_circle.png");// синий круг
        blueCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 - 270,
            value: 1,
            team: 'blue'

        });
        this.addChild(blueCircle );
        this.sprites.push(blueCircle );


        var blueCross  = new cc.Sprite("res/blue_cross.png"); // синий крест
        blueCross .attr({
            x: cc.winSize.width / 2 + 0,
            y: cc.winSize.height / 2 - 270,
            value: 2,
            team: 'blue'
        });
        this.addChild(blueCross );
        this.sprites.push(blueCross );

        var blueCross  = new cc.Sprite("res/blue_cross.png"); // синий крест
        blueCross .attr({
            x: cc.winSize.width / 2 + 0,
            y: cc.winSize.height / 2 - 270,
            value: 2,
            team: 'blue'
        });
        this.addChild(blueCross );
        this.sprites.push(blueCross );

        var blueTriangle  = new cc.Sprite("res/blue_triangle.png"); // синий треугольник
        blueTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 - 270,
            value: 3,
            team: 'blue'
        });
        this.addChild(blueTriangle );
        this.sprites.push(blueTriangle );

        var blueTriangle  = new cc.Sprite("res/blue_triangle.png"); // синий треугольник
        blueTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 - 270,
            value: 3,
            team: 'blue'
        });
        this.addChild(blueTriangle );
        this.sprites.push(blueTriangle );
        

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

    processMouseUp:function(event){
        this.isDragging = false;
        var x = Math.floor(this.sprite.x / (cc.winSize.width / 3));
        var y = Math.floor(this.sprite.y / (cc.winSize.height / 3));
        if(x >= 0 && x < 3 && y >= 0 && y < 3){
            // Проверяем, есть ли в этой ячейке другой спрайт с меньшим значением и другой командой
            for (var i = 0; i < this.sprites.length; i++) {
                if (this.sprites[i] !== this.sprite && cc.rectContainsPoint(this.sprites[i].getBoundingBox(), cc.p(this.sprite.x, this.sprite.y)) && this.sprites[i].team !== this.sprite.team) {
                    if (this.sprites[i].value < this.sprite.value) {
                        // Если есть, удаляем его
                        this.removeChild(this.sprites[i]);
                        this.sprites.splice(i, 1);
                        break;
                    } else {
                        // Если спрайт с большим или равным значением уже находится в ячейке, не делаем ничего
                        return;
                    }
                }
            }
            // Обновляем this.grid
            this.grid[y][x] = { team: this.sprite.team, value: this.sprite.value };
            this.sprite.isLocked = true;
            this.checkForWin(this.sprite);
        }
    },

    checkForWin: function(sprite) {
        var team = sprite.team;
        // Проверяем горизонтальные линии
        for (var i = 0; i < 3; i++) {
            if (this.grid[i][0] && this.grid[i][0].team === team &&
                this.grid[i][1] && this.grid[i][1].team === team &&
                this.grid[i][2] && this.grid[i][2].team === team) {
                console.log(team + " wins!");
                return;
            }
        }
        // Проверяем вертикальные линии
        for (var i = 0; i < 3; i++) {
            if (this.grid[0][i] && this.grid[0][i].team === team &&
                this.grid[1][i] && this.grid[1][i].team === team &&
                this.grid[2][i] && this.grid[2][i].team === team) {
                console.log(team + " wins!");
                return;
            }
        }
        // Проверяем диагонали
        if ((this.grid[0][0] && this.grid[0][0].team === team && this.grid[1][1] && this.grid[1][1].team === team && this.grid[2][2] && this.grid[2][2].team === team) ||
            (this.grid[0][2] && this.grid[0][2].team === team && this.grid[1][1] && this.grid[1][1].team === team && this.grid[2][0] && this.grid[2][0].team === team)) {
            console.log(team + " wins!");
            return;
        }
        if ((this.grid[0][0] && this.grid[0][0].team === team && this.grid[1][1] && this.grid[1][1].team === team && this.grid[2][2] && this.grid[2][2].team === team) ||
            (this.grid[0][2] && this.grid[0][2].team === team && this.grid[1][1] && this.grid[1][1].team === team && this.grid[2][0] && this.grid[2][0].team === team)) {
            console.log(team + " wins!");
            this.scheduleOnce(this.resetGame, 2); // Сбрасываем игру после победы через 2 секунды
            return;
        }
    },
    

    resetGame: function() {
        // Удаляем все спрайты
        for (var i = 0; i < this.sprites.length; i++) {
            this.removeChild(this.sprites[i]);
        }
        // Очищаем массив спрайтов и сетку
        this.sprites = [];
        this.grid = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        var redCircle  = new cc.Sprite("res/circle.png"); // красный круг
        redCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 + 270,
            value: 1,
            team: 'red'
            
        });
        this.addChild(redCircle );
        this.sprites.push(redCircle );

        var redCircle  = new cc.Sprite("res/circle.png"); // красный круг
        redCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 + 270,
            value: 1,
            team: 'red'
            
        });
        this.addChild(redCircle );
        this.sprites.push(redCircle );

        var redCross  = new cc.Sprite("res/cross.png"); // красный крест
        redCross .attr({
            x: cc.winSize.width / 2 - 0,
            y: cc.winSize.height / 2 + 270,
            value: 2,
            team: 'red'
        });
        this.addChild(redCross );
        this.sprites.push(redCross );

        var redCross  = new cc.Sprite("res/cross.png"); // красный крест
        redCross .attr({
            x: cc.winSize.width / 2 - 0,
            y: cc.winSize.height / 2 + 270,
            value: 2,
            team: 'red'
        });
        this.addChild(redCross );
        this.sprites.push(redCross );


        var redTriangle  = new cc.Sprite("res/triangle.png"); // красный треугольник
        redTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 + 270,
            value: 3,
            team: 'red'
        });
        this.addChild(redTriangle );
        this.sprites.push(redTriangle );

        var redTriangle  = new cc.Sprite("res/triangle.png"); // красный треугольник
        redTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 + 270,
            value: 3,
            team: 'red'
        });
        this.addChild(redTriangle );
        this.sprites.push(redTriangle );

        // команда синих
        var blueCircle  = new cc.Sprite("res/blue_circle.png");// синий круг
        blueCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 - 270,
            value: 1,
            team: 'blue'

        });
        this.addChild(blueCircle );
        this.sprites.push(blueCircle );

        var blueCircle  = new cc.Sprite("res/blue_circle.png");// синий круг
        blueCircle .attr({
            x: cc.winSize.width / 2 - 100,
            y: cc.winSize.height / 2 - 270,
            value: 1,
            team: 'blue'

        });
        this.addChild(blueCircle );
        this.sprites.push(blueCircle );


        var blueCross  = new cc.Sprite("res/blue_cross.png"); // синий крест
        blueCross .attr({
            x: cc.winSize.width / 2 + 0,
            y: cc.winSize.height / 2 - 270,
            value: 2,
            team: 'blue'
        });
        this.addChild(blueCross );
        this.sprites.push(blueCross );

        var blueCross  = new cc.Sprite("res/blue_cross.png"); // синий крест
        blueCross .attr({
            x: cc.winSize.width / 2 + 0,
            y: cc.winSize.height / 2 - 270,
            value: 2,
            team: 'blue'
        });
        this.addChild(blueCross );
        this.sprites.push(blueCross );

        var blueTriangle  = new cc.Sprite("res/blue_triangle.png"); // синий треугольник
        blueTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 - 270,
            value: 3,
            team: 'blue'
        });
        this.addChild(blueTriangle );
        this.sprites.push(blueTriangle );

        var blueTriangle  = new cc.Sprite("res/blue_triangle.png"); // синий треугольник
        blueTriangle .attr({
            x: cc.winSize.width / 2 + 100,
            y: cc.winSize.height / 2 - 270,
            value: 3,
            team: 'blue'
        });
        this.addChild(blueTriangle );
        this.sprites.push(blueTriangle );      
    },


    processMouseMove:function(event){ // движение по горизонтали
        var location = event.getLocation();
        if(this.isDragging){
            this.sprite.x = location.x;
            this.sprite.y = location.y;
        }
    },
    isInTarget:function(){
        var x = Math.floor(this.sprite.x / (cc.winSize.width / 3));
        var y = Math.floor(this.sprite.y / (cc.winSize.height / 3));
        return this.grid[y][x] === null;
    },
    
});
