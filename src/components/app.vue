<template lang="html">
    <div class="fm-images-viewer">
        <canvas id="canvas" width="100%" :height="height"></canvas>

        <button @click="clockwise" class="btn btn-default">Rotate right</button>
        <button @click="counterclockwise" class="btn btn-default">Rotate left</button>
        <button @click="nextImage" class="btn btn-default">Image</button>
    </div>
</template>

<script>
    export default {
        props:{
            background: {
                type: String,
                required: false,
                default: '#eee'
            },
            height: {
                type: Number,
                required:false,
                default: 600
            },
            images: {
                type: Array,
                required: false,
                default: function () {
                    return [
                        {'url':'/dist/6854315974753.jpeg'},
                        {'url':'https://www.ikepo.com.tw/uimages/U4efce419d9868e162a4b1efaea21b850/6854315974753.jpeg'},
                        {'url':'http://www.realty.com.tw/image/data/tw_s1/A3912_5.jpg'},

                    ];
                }
            }
        },
        mounted() {
            console.log('Component mounted.');

            var _this = this;
            this.elm.canvas = document.getElementById("canvas");
            this.context = canvas.getContext("2d");
            this.elm.image = document.createElement("img");



            this.$nextTick(function() {
                setTimeout(function() {
                    _this.imageIndex = 0;

                    _this.loadImage();

                },1500)

            })


        },
        data() {
            return {
                elm: {
                    canvas:{},
                    image:{},
                },
                viewer: {
                    background: '#eee',
                    angle:0
                },
                context:{},
                imageIndex:0,
                image: {
                    direct: true,
                    origin: {
                        width:0,
                        height:0
                    }
                }

            }
        },
        methods: {
            initialize() {

				window.addEventListener('resize', this.resizeCanvas, false);

				this.resizeCanvas();
			},
			nextImage() {
			    this.imageIndex = this.imageIndex + 1;
			    var maxIndex = this.images.length - 1;
			    if (this.imageIndex > maxIndex) {
			        this.imageIndex = maxIndex;
			        return ;
			    }
			    this.image.origin.width = 0;
			    this.image.origin.height = 0;
			    this.context.clearRect(0,0,this.elm.canvas.width, this.elm.canvas.height);

			    this.loadImage();
			},
			resizeCanvas() {
				//this.elm.canvas.width = this.elm.canvas.parentElement.clientWidth;
				//this.canvas.height = this.canvas.parentElement.clientHeight;
                //this.loadImage();
                this.elm.canvas.width = this.image.origin.width;
                this.elm.canvas.height = this.image.origin.height;
			},
			loadImage() {
			    var _this = this;

			    this.elm.image.onload=function(){

			        _this.image.origin.width = _this.elm.image.width;
			        _this.image.origin.height = _this.elm.image.height;
                    _this.initialize();

                    //_this.resizeImage({x:0,y:0});
                    _this.context.drawImage( _this.elm.image,0,0);

                }
                this.elm.image.src = this.images[this.imageIndex].url;
			},
			resizeImage(point) {


                var _this = this;
			    //var maxWidth = _this.elm.canvas.width;
                //var maxHeight = _this.elm.canvas.height;

                var maxWidth = _this.image.direct ? _this.image.origin.width : _this.image.origin.height;
                var maxHeight = _this.image.direct ? _this.image.origin.height : _this.image.origin.width;

                _this.elm.canvas.width = maxWidth;
                _this.elm.canvas.height = maxWidth;

                /*
                var ratio = 0;
                var width = _this.image.direct ? _this.image.origin.width : _this.image.origin.height;
                var height = _this.image.direct ? _this.image.origin.height : _this.image.origin.width;
                var new_width = width;
                var new_height = height;

                var x_center = 0;
                var y_center = 0;

                if(width > maxWidth){
                    ratio = maxWidth / width;
                    new_width = maxWidth;
                    new_height = height * ratio;
                    width = maxWidth;
                    height = height * ratio;
                }

                if(height > maxHeight){
                    ratio = maxHeight / height;
                    new_height = maxHeight;
                    new_width = width * ratio;
                    height = maxHeight;
                    width = width * ratio;
                }

                console.log(_this.image.direct,width,height);*/

                //x_center = maxWidth / 2 - new_width / 2 - point.x;
                //y_center = maxHeight / 2 - new_height / 2 - point.y;

                var x_center = maxWidth / 2;
                var y_center = maxHeight / 2;


                //_this.context.drawImage( _this.elm.image, x_center, y_center, new_width, new_height);


			},
            clockwise() {
                this.viewer.angle += 90;
                this.imageDirect();
                this.drawRotated(this.viewer.angle);
            },
            counterclockwise() {
                this.viewer.angle -= 90;
                this.imageDirect();
                this.drawRotated(this.viewer.angle);
            },
            drawRotated(degrees) {

             this.elm.canvas.width = this.image.direct ? this.elm.image.width : this.elm.image.height;
             this.elm.canvas.height = this.image.direct ? this.elm.image.height : this.elm.image.width;

             this.context.save();
             // you want to rotate around center of canvas
             this.context.translate(this.elm.canvas.width/2,this.elm.canvas.height/2);

             this.context.rotate(degrees*Math.PI/180);
             this.context.drawImage(this.elm.image, -this.elm.image.width*0.5, - this.elm.image.height*0.5);
             this.context.restore();
             return;


            },
            imageDirect() {
                this.image.direct = !this.image.direct
                return this.image.direct;
            }

        },

    }

</script>

<style lang="css">
    .fm-images-viewer {
        text-align: center;
        width: 100%;
        max-height: 600px;
    }
    canvas {
        border: 5px solid #000;
        padding: 5px;
    }

</style>