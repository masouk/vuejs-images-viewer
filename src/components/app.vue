<template lang="html">
    <div class="fm-images-viewer" v-bind:style="{ 'width': max_width, 'height': max_height }">
        <canvas id="canvas"></canvas>

        <div>
            <button @click="clockwise" class="btn btn-default">Rotate right</button>
            <button @click="counterclockwise" class="btn btn-default">Rotate left</button>
            <button @click="nextImage" class="btn btn-default">Image</button>
        </div>

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
            max_height: {
                type: Number,
                required:false,
                default: 600
            },
            max_width: {
                type: [String, Number],
                required: false,
                default: '100%'
            },
            images: {
                type: Array,
                required: false,
                default: function () {
                    return [
                        {'url':'https://www.ikepo.com.tw/uimages/U4efce419d9868e162a4b1efaea21b850/6854315974753.jpeg'},
                        {'url':'/dist/6854315974753.jpeg'},
                        {'url':'http://www.realty.com.tw/image/data/tw_s1/A3912_5.jpg'},
                    ];
                }
            },
            rotate_callback: {
                type: Function,
                required: false,
                default: function() {
                    return true;
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

                    _this.initialize();

                },300)

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
			resizeCanvas() {
				//this.elm.canvas.width = this.elm.canvas.parentElement.clientWidth;
				//this.canvas.height = this.canvas.parentElement.clientHeight;
                this.loadImage();
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

			loadImage() {
			    var _this = this;

			    this.elm.image.onload=function(){

			        _this.image.origin.width = _this.elm.image.width;
			        _this.image.origin.height = _this.elm.image.height;

                    _this.resizeImage(false);

                }
                this.elm.image.src = this.images[this.imageIndex].url;
			},
			resizeImage(isRotate=false) {

			     var maxWidth = this.max_width == '100%' ? this.elm.canvas.parentElement.clientWidth : this.max_width;
			     var maxHeight = this.max_height;
			     var img_origin_w = this.image.origin.width;
			     var img_origin_h = this.image.origin.height;



                //image ration from origin size
			     var newWidth = img_origin_w;
			     var newHeight = img_origin_h;


			     if (maxWidth < img_origin_w) {
			        newHeight = newHeight * (maxWidth / img_origin_w);
                    newWidth = maxWidth;
                 }

                 if (maxHeight < img_origin_h) {
                    newWidth = newWidth * (maxHeight / img_origin_h);
                    newHeight = maxHeight
                 }

                var rotateWidth = this.image.direct ? newWidth : newHeight;
                var rotateHeight = this.image.direct ? newHeight : newWidth;

                 this.elm.canvas.width = rotateWidth;
                 this.elm.canvas.height = rotateHeight

                 console.log(maxWidth,maxHeight);


                 this.context.save();

                 this.context.translate(this.elm.canvas.width/2,this.elm.canvas.height/2);


                 this.context.rotate(this.viewer.angle * Math.PI/180);


                 this.context.drawImage(    this.elm.image, 0, 0,
                                            img_origin_w, img_origin_h,
                                            -newWidth*0.5, -newHeight*0.5,
                                            newWidth,newHeight);



                 this.context.restore();
			},

            drawRotated(degrees) {
                this.resizeImage(true);
            },
            imageDirect() {
                this.image.direct = !this.image.direct
                return this.image.direct;
            },
            clockwise() {
                this.viewer.angle += 90;
                this.imageDirect();
                this.drawRotated(this.viewer.angle);

                this.rotate_callback();
            },
            counterclockwise() {
                this.viewer.angle -= 90;
                this.imageDirect();
                this.drawRotated(this.viewer.angle);

                this.rotate_callback();
            },

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