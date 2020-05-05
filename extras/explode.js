//	This module needs lQuery.js to work
var minefield = document.getElementById("minefield");
var boomer = imageHandlerHandler.add(new ImageHandler("Boomer"));
var explosionSprite = new Image();
explosionSprite.src = "https://opengameart.org/sites/default/files/boom3.png";
function explode(x,y){
	if(!boomer) boomer = imageHandlerHandler.add(new ImageHandler("Boomer"));
	let newPic = boomer.makeImage(
		{
			attributes:{
				src:"https://opengameart.org/sites/default/files/boom3.png"
			},
			properties:{
				// top:(Math.random() * 100.0) + "%",		random placement
				// left:(Math.random() * 100.0) + "%"});
				top:y + "px",
				left:x + "px",
				position: "absolute"
			},
			variables:{
				rows:8,
				cols:	8,
				frame:	0,
				offsetX:	.5,
				offsetY:	.75,
				animationFrame:	function(frame){
					if(frame) this.frame = frame;
					else this.frame++;
					if(this.frame > 64) return false;
					let currentRow = Math.floor(this.frame/this.rows);
					let currentCol = this.frame % this.rows;
					this.style.setProperty('transform',"translate(" + (-(explosionSprite.width*((currentCol+this.offsetX)/this.cols))) + "px," + (-(explosionSprite.height*((currentRow+this.offsetY)/this.rows))) + "px) scale("+ 1 +")");
					this.style.setProperty("clip", "rect(" + (explosionSprite.height*(currentRow/this.rows)) + "px," //top    lower is more
					+ (explosionSprite.width*((currentCol+1)/this.cols)) + "px," //right   more is more
					+ (explosionSprite.height*((currentRow+1)/this.rows)) + "px,"//bottom more is more
					+ (explosionSprite.width*(currentCol/this.cols)) + "px)");
					return true;
				}
			}
		}
	,minefield);
	boomer.add(newPic);
}
imageHandlerHandler.startAnimationFrame();