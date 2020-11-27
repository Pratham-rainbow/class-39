class Game{
    constructor(){
        
    }
    getState(){
        var gameStateref = database.ref("gameState");
        gameStateref.on("value",function(data){
            gameState = data.val()});
    }
    update(state){
        database.ref("/").update({gameState:state});
    }
    async start(){
        if(gameState===0){
            player = new Player();
            var playerCountref = await database.ref("playerCount").once("value");
            if(playerCountref.exists()){
               playerCount = playerCountref.val();
               player.getCount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(100, 200);
        car1.addImage(car1Img);
        car1.visible = false;
        car2 = createSprite(300, 200);
        car2.addImage(car2Img);
        car2.visible = false;
        car3 = createSprite(500, 200);
        car3.addImage(car3Img);
        car3.visible = false;
        car4 = createSprite(700, 200);
        car4.addImage(car4Img);
        car4.visible = false;
        cars = [car1, car2, car3, car4];
    }
    play(){
        form.hide();
        textSize(30);
        text("GAME START", width/2-100, height/2-60);
        Player.getPlayerInfo();
        if(allplayers!==undefined){
            background(255, 0, 255);
            image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
            var displayPosition = height/2;
            var x = 175, y, index = 0;
            for(var plr in allplayers){
                index = index+1;
                x = x + 200;
                y = displayHeight-allplayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index===player.index){
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
            } 
        }
        if(keyIsDown(UP_ARROW) && player.index!=null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>4400){
            gameState=2;
        }
    }
    end(){
        console.log("GAME ENDED");
    }
}