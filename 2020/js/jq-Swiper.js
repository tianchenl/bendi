(function($) {
	$.fn.slide=function(options){
       $.fn.slide.defaults={
       	offslide:true,//是否开启滑动
       	lunb_time:5000,
       	toum_time:300,
       	huad_time:500,
       	huadlunb_time:1500,
       	slidechange:true,//滑动释放后是否需要改变transform的值
       	speed:0.1,//滑动的速度
       	prev:".swiper-button-prev",
       	next:".swiper-button-next",
       	activeclass:'swiper-active',//当前子元素的类
       	fatherelm:".swiper-wrapper",//当前需要滑动的元素，也是transform属性作用的类
        chlidelm:".swiper-slide",//当前滑动的父元素下面的所有子元素的类
        navli:".inbanner-pagination .swiper-pagination-bullet",//所有轮播导航点的类
        navliactive:"swiper-pagination-bullet-active",//轮播导航点的当前类
        fontchange:true,//里面的文字是否需要发生改变
        offsettime:true,//是否需要给定时器设置一个开关
        settimeclass:".inbswiperbox .function .stop",//定时器开关按钮的类
        offlunbo:true,//是否开启轮播
        jianduan:true,//是否是间断滑动
        toum:false,//透明滑动效果
        s:0//页面刷新时当前子元素的索引值
       }
       return this.each(function(index,el) {
       	var opts = $.extend({}, $.fn.slide.defaults, options);
       	var slider = $(this);
       	var settimeclass = $(opts.settimeclass,slider);
       	var navli = $(opts.navli,slider);
       	var father = ($(opts.fatherelm,slider).length>0)?$(opts.fatherelm,slider):$(opts.fatherelm);
       	var chlid = $(opts.chlidelm,father);
       	var speeds = parseFloat(opts.speed);
       	var lunb_time = parseFloat(opts.lunb_time)
       	var toum_time = parseFloat(opts.toum_time)
       	var huad_time = parseFloat(opts.huad_time)
       	var huadlunb_time = parseFloat(opts.huadlunb_time)
       	var activeclass = opts.activeclass;
       	var navliactive = opts.navliactive;
       	var prev = $(opts.prev);
       	var next = $(opts.next);
       	var slidechanges = (opts.slidechange==false||opts.slidechange=="false")?false:true;
       	var fontchange = (opts.fontchange==false||opts.fontchange=="false")?false:true;
       	var offsettime = (opts.offsettime==false||opts.offsettime=="false")?false:true;
       	var offslides = (opts.offslide==false||opts.offslide=="false")?false:true;
        var jianduan = (opts.jianduan==false||opts.jianduan=="false")?false:true;
        var offlunbo = (opts.offlunbo==false||opts.offlunbo=="false")?false:true;
        var toum = (opts.toum==false||opts.toum=="false")?false:true;

       	var oldlenght = parseInt(chlid.length);
       	if(jianduan){
       		var slidelength = chlid.length;
       	}else{
       		if(toum){
       			var slidelength = chlid.length;
       		}else{
       			var slidelength = chlid.length*2;
       		}
       	}
	    var s=parseInt(opts.s);
	    var lunbo_w = father.width();//父元素的宽度
	    //var dong1 = 0;//第一个父元素的宽度倍数距离
	    //var dong2 = 0;//第二个父元素的宽度倍数距离
	    var n= toum?0:-(s * lunbo_w);//负责传递父元素宽度倍数的中间变量
	    var click_x;//鼠标点击时x坐标
	    var move_x;//鼠标移动时的x坐标
	    var jqmove;  //被移动的子元素
	    //var huadong = false;//判断元素是否是需要改变距离的元素
	    var huad_num;//滑动时元素被改变的距离大小，huad_num = huad_juli + chushi;
	    var text_num ;//滑动时文字元素被改变的距离大小，text_num = text_juli + chushi;
	    var huad_width;//父元素的宽度的一半，432/2
	    var chushi = 0;//子元素被滑动过去的x轴坐标大小，总是父元素宽度的倍数
	    var text_chushi;
	    var jatext_chushi;
	    var jiantext_chushi;
	    var huad_juli;//鼠标滑过的距离大小 等于-(click_x - move_x)/2.8
	    //var $huad = $(".content-move");   //父元素  
	    /*var star = true;*///点击事件启动变量
	    var onmove = false;//判断移动事件是否发生
	    var jqmove_box_num;//父元素里面的子元素的个数减1
	    var a;//判断当前点击的是第一个父元素还是第二个
	    var tip_index = 0;//tip栏的索引
	    var type_tip;//保存子元素里面dong_的变量
	    //var sudu;//定义速度
	    var j=1,k=1;l=1;i=1;//定义滑动方向开关
	    var o,q,c;
	    var text_juli;//文字的滑动距离
	    var huajuli;
	    var array_n = []; 
	    var opacity=0;//透明滑动效果里的透明度
	    var sum;//透明效果里面的每一个子元素的transform值
        
        if(!jianduan){
	        if(!toum){
	        	father.append(father.html());
	        	father.css({
		        	"transform":"translate3d("+n+"px,0px,0px)",
			        "transition-duration":"0ms"
			    });//页面初始化时添加另一部分子元素到页面，将父元素移动到默认的初始点
	        }else{
	        	for(i=s;i<slidelength;i++){
            		chlid.eq(i).css({
            			"opacity":"0",
            			"transition-duration":"0ms"
    		        })
            	}
            	for(i=0;i<=s;i++){
            		chlid.eq(i).css({
            			"opacity":"1",
            			"transition-duration":"0ms"
    		        })
            	}
	        }
        }
	    chlid = $(opts.chlidelm, father);//初始化子元素
	    function changeclass(){
	    	chlid.removeClass(activeclass).eq(s).addClass(activeclass);
	        navli.removeClass(navliactive).eq(s%oldlenght).addClass(navliactive);
	    }//给导航点添加类和给子元素添加类
        function changefonts(){
        	if(fontchange){
        		changefont();
        	}
        }//是否需要改变文字
	    setTimeout(function(){
		    changeclass();
		    changefonts();
	    }, 10)//初始化页面导航点和子元素的类和文字的类
	    

	    //定时轮播
	    function toumjia(){
	    	chlid.eq(s).css({
    			"opacity":"1",
    			"transition-duration":""+toum_time+"ms"
    		})
	    }
	    function toumjian(){
	    	chlid.eq(s).css({
    			"opacity":"0",
    			"transition-duration":""+toum_time+"ms"
    		})
	    }
	    function lunbofanzhuang(){
	    	if(s>slidelength-1){
            	s=2;
            	for(i=s;i<slidelength;i++){
            		chlid.eq(i).css({
            			"opacity":"0",
            			"transition-duration":"0ms"
    		        })
            	}
            }
            if(s==0){
            	s=slidelength-2;
            	for(i=0;i<slidelength-1;i++){
            		chlid.eq(i).css({
            			"opacity":"1",
            			"transition-duration":"0ms"
    		        })
            	}
            }
	    }
	     function changeslide(){
	     	if(toum){
	     		lunbofanzhuang()
		        lunbo_w = slider.width();
	     	}else{
		     	if(s>slidelength-1){
		        	if(jianduan){
			     		s=0;
			     	}else{
			     		s=oldlenght-1;
			            n = -(s * lunbo_w);
			            father.css({
			              "transform": "translate3d("+(n)+"px,0px,0px)",
			              "transition-duration":"0ms"
			            });
		                $("#active-0-a").css({"transition-duration":"0ms"});
			            changeclass();
			            changefonts();
			            s++;
			     	}
		        }
		        lunbo_w = slider.width();
		        n = -(s * lunbo_w);
		        father.css({
		            "transform": "translate3d("+(n)+"px,0px,0px)",
		            "transition-duration":""+huadlunb_time+"ms"
		        });
	            $("#active-0-a").css({"transition-duration":"2s"});
		        changeclass();
		        changefonts();	
	     	}
	        
	    }
	    function changefont(){
	    	if(jianduan){
	    		chlid.eq(s-1).find(".title .cn").css({
	                "transform":"translate3d(-2000px,0,0)",
	                "transition":"transform 1.8s"
	            });
	            chlid.eq(s-1).find(".title .en").css({
	                "transform":"translate3d(-2100px,0,0)",
	                "transition":"transform 1.8s"
	            });
	            chlid.eq(s).find(".title .cn").css({
	                "transform":"translate3d(0,0,0)",
	                "transition":"transform 1.8s"
	            });
	            chlid.eq(s).find(".title .en").css({
	                "transform":"translate3d(0,0,0)",
	                "transition":"transform 1.8s"
	            });
	            chlid.eq(s+1).find(".title .en").css({
	                "transform":"translate3d(2000px,0,0)",
	                "transition-duration":"0ms"
	            });
	            chlid.eq(s+1).find(".title .cn").css({
	              "transform":"translate3d(2100px,0,0)",
	              "transition-duration":"0ms"
	            });
	    	}else{
	    		if(s==oldlenght-1){
		            chlid.eq(s+1).find(".title .en").css({
		                "transform":"translate3d(2000px,0,0)",
		                "transition-duration":"0ms"
		            });
		            chlid.eq(s+1).find(".title .cn").css({
		                "transform":"translate3d(2100px,0,0)",
		                "transition-duration":"0ms"
		            });
		            chlid.eq(s).find(".title .en").css({
		                "transform":"translate3d(0px,0,0)",
		                "transition-duration":"0ms"
		            });
		            chlid.eq(s).find(".title .cn").css({
		                "transform":"translate3d(0px,0,0)",
		                "transition-duration":"0ms"
		            });
		            chlid.eq(slidelength-1).find(".title .en").css({
		                "transform":"translate3d(-2000px,0,0)",
		                "transition-duration":"0ms"
		            });
		            chlid.eq(slidelength-1).find(".title .cn").css({
		                "transform":"translate3d(-2100px,0,0)",
		                "transition-duration":"0ms"
		            });
		        }else{
		            chlid.eq(s-1).find(".title .cn").css({
		                "transform":"translate3d(-2000px,0,0)",
		                "transition":"transform 1.8s"
		            });
		            chlid.eq(s-1).find(".title .en").css({
		                "transform":"translate3d(-2100px,0,0)",
		                "transition":"transform 1.8s"
		            });
		            chlid.eq(s).find(".title .cn").css({
		                "transform":"translate3d(0,0,0)",
		                "transition":"transform 1.8s"
		            });
		            chlid.eq(s).find(".title .en").css({
		                "transform":"translate3d(0,0,0)",
		                "transition":"transform 1.8s"
		            });
		            chlid.eq(s+1).find(".title .en").css({
		                "transform":"translate3d(2000px,0,0)",
		                "transition-duration":"0ms"
		            });
		            chlid.eq(s+1).find(".title .cn").css({
		              "transform":"translate3d(2100px,0,0)",
		              "transition-duration":"0ms"
		            });
	            }
	    	}
	        
	    }
	    function swiper(){
	        s = s+1;
	        changeslide();
            toumjia()
	    }
	    if(offlunbo){
	    	var inter = setInterval(swiper, lunb_time);
	    }
        prev.click(function(){
        	clearInterval(inter)
        	changeslide();
        	toumjian()
        	s--;
        });
        next.click(function(){
        	clearInterval(inter)
        	s++;
        	changeslide();
        	toumjia();
        })
	    var cleartime;
	    $(window).resize(function(event) {
	    	if(offlunbo){
	    		clearInterval(inter);
	            clearTimeout(cleartime);
	    	}
	    	if(toum){
		    	lunbo_w = father.width();
		    	chlid.each(function(i, el) {
		            sum = -i*lunbo_w;
		    		$(this).css("transform","translate3d(" +sum+ "px,0px,0px)");
		    		console.log(i);
		    	});
	    	}else{
		    	lunbo_w = father.width();
		        n = -(s*lunbo_w)
		        father.css({
		            "transform": "translate3d("+(n)+"px,0px,0px)",
		            "transition-duration":"0ms"
		        });	
	    	}
	        
	        if(offlunbo){
	        	if(offsettime){
	        		if((settimeclass.attr("data-on") != "on")){
			        	cleartime = setTimeout(function(){
				           inter = setInterval(swiper, lunb_time);
				        },500);
			        }
	        	}else{
	        		cleartime = setTimeout(function(){
			           inter = setInterval(swiper, lunb_time);
			        },500);
	        	}
	        }
	    });
	    if(offlunbo){
		    if(offsettime){
		    	settimeclass.click(function(event) {
			        if(settimeclass.attr("data-on") == "on"){
			            settimeclass.attr({"data-on":""});
			            inter = setInterval(swiper(), lunb_time);
			            inter = setInterval(swiper, lunb_time);
			            i=1;
			        }else{
			            settimeclass.attr({"data-on":"on"});
			            clearInterval(inter);
			            i=0;
			        }
			    });
		    }
	    }
	    var timeout;
	    if(offlunbo){
	    	document.addEventListener("visibilitychange", () => { 
			    if(document.hidden) {
			        if(i == 1){
			            timeout = setTimeout(function(){
				            clearInterval(inter); 
				            i=2;
			            },lunb_time); 
			        }
				    }else {
				        clearTimeout(timeout);
				        if(i == 2){
				            i=1;
				            inter = setInterval(swiper, lunb_time);
				        }
				    }
			}); 
	    }
	    
        //滑动
        if(offslides){
	        el.onpointerdown = handledown;
        }
	    function handledown(event){
	        click_x = event.clientX;
	        l=1;
            lunbo_w = father.width();
            huad_width = lunbo_w/2;
	        handel_move(father);
	        handel_up(father);
	        if(!toum){
	            father.css({"transition": "all 0s"});	
	        }
	       /* $(".swiper-slide .title .en").css({"transition": "all 0s"});
	        $(".swiper-slide .title .cn").css({"transition": "all 0s"});*/
	        
	        event.preventDefault();
	        return false;
        }
        function handel_move(jqmove){
	        document.onpointermove = handlemove;
	        function handlemove(event){
	        	if(offlunbo){
	        		clearInterval(inter);
	        	}
	            onmove = true;
	            document.body.onselectstart = function(){
	                return false;
	            }
                lunbo_w = father.width();
                huad_width = lunbo_w/2;
	            move_x = event.clientX; 
	            if(l==1){
	            	if (!(father.css("transform")==undefined)) {
	            		chushi = parseFloat(father.css("transform").replace(/[^0-9\-,.]/g,'').split(',')[4]);
	                }else{
	                	chushi=0;
	                }
	              //  if($(".swiper-slide[data-id="+(s)+"]").find(".title").length > 0){
	              //   text_chushi = parseFloat($(".swiper-slide[data-id="+(s)+"] .title .en").css("transform").replace(/[^0-9\-,.]/g,'').split(',')[4]);
	              // }
	              // if($(".swiper-slide[data-id="+(s+1)+"]").find(".title").length > 0){
	              //   jatext_chushi = parseFloat($(".swiper-slide[data-id="+(s+1)+"] .title .en").css("transform").replace(/[^0-9\-,.]/g,'').split(',')[4]);
	              // }
	              // if($(".swiper-slide[data-id="+(s-1)+"]").find(".title").length > 0){
	              //   jiantext_chushi = parseFloat($(".swiper-slide[data-id="+(s-1)+"] .title .en").css("transform").replace(/[^0-9\-,.]/g,'').split(',')[4]);
	              // }
	              l=0;
	            }
	            huad_juli = -(click_x - move_x)/speeds;
	            huad_num = huad_juli + chushi;
	            // text_juli = -(click_x - move_x)/0.5;
	            
	            // text_num = text_juli + text_chushi;
	            // jatext_num = text_juli + jatext_chushi+0;
	            // jiantext_num = text_juli + jiantext_chushi;
	            if(!toum){
	            	for(i=0;i<slidelength;i++){
	                	array_n[i] = -(i * lunbo_w)-huad_width;
	                }
	                for(i=0;i<array_n.length;i++){
	                    if(!((i+1) > array_n.length-1)){
	                        if(0>huad_num && array_n[0]<huad_num){
	                        	s=0;n=-(s*lunbo_w);
	                        	changeclass();
	                        }
	                        if(array_n[i]>huad_num && array_n[i+1]<huad_num){
	                        	s=i+1;
	                        	n=-(s*lunbo_w);
	                        	changeclass();
	                        }
	                    }
	                }
	            }
	            o = n + huad_width;
	            q = n - huad_width;
	            opacity = Math.abs(huad_num / lunbo_w);
	            if(jianduan){
	            	father.css({
	                  "transform": "translate3d("+huad_num+"px,0px,0px)",
	                  "transition-duration":"0ms"
	                });
	            }else{
	            	if(toum){
	            		//透明效果
	            		if(huad_num>n){
			                //从左向右滑动
			                if(s==0){
			                	s=slidelength-2;
			                	for(i=0;i<slidelength-1;i++){
			                		chlid.eq(i).css({
				            			"opacity":"1",
				            			"transition-duration":"0ms"
		            		        })
			                	}
			                }
			                chlid.eq(s).css({
		            			"opacity":""+(1-opacity)+"",
		            			"transition-duration":"0ms"
		            		})
			            }else{
			                //从右往左滑动
			                if(s==slidelength-1){
			                	s=1;
			                	for(i=s+1;i<slidelength;i++){
			                		chlid.eq(i).css({
				            			"opacity":"0",
				            			"transition-duration":"0ms"
		            		        })
			                	}
			                }
			                chlid.eq(s+1).css({
		            			"opacity":""+(opacity)+"",
		            			"transition-duration":"0ms"
		            		})
			            }
	            		
	            	}else{
	            		bujianduan();
	            	}
	            }
	            
	            return false;
	        }
        }
        function handel_up(jqmove){
            document.onpointerup = handleup;
	        function handleup(event){
	            document.body.onclick = function(){
	                return false;
	            }
	            if(onmove){
	                onmove= false;
	                donghua()
	            huad_juli = 0;
	            }
	            
	            document.onpointermove = null;
	            document.onpointerup = null;

	            return false;
	        }
        }
        function donghua(){
	        if(slidechanges){
	            if(huad_num>n){
	                //从左向右滑动
	                if(huad_num>o){
	                    //从左向右滑动过半
	                    if(!jianduan){
	                        s--;
	                    }
	                    if(toum){
	                    	console.log("sss:"+s)
	                    	chlid.eq(s+1).css({
		            			"opacity":"0",
		            			"transition-duration":"0ms"
		            		});
	                    	chlid.eq(s).css({
		            			"opacity":"1",
		            			"transition-duration":"0ms"
		            		});
	                    }else{
	                        n = -(s * lunbo_w);
	                    	father.css({
		                      "transform": "translate3d("+n+"px,0,0)",
		                      "transition":"all "+huad_time+"ms"
		                    });
	                    }
	                    //hua_xifang();
	                }else{
	                    //从左向右滑动不过半
	                    if(toum){
	                    	chlid.eq(s).css({
		            			"opacity":"1",
		            			"transition-duration":"0ms"
		            		});
	                    }else{
	                        n = -(s * lunbo_w);
	                    	father.css({
		                      "transform": "translate3d("+n+"px,0,0)",
		                      "transition":"all "+huad_time+"ms"
		                    });
	                    }
	                    //hua_xifang();
	                }
	            }else{
	                //从右往左滑动
	                if(huad_num<q){
	                    //从右向左滑动过半
	                    if(!jianduan){
	                        s++;
	                    }
	                    if(toum){
	                    	chlid.eq(s).css({
		            			"opacity":"1",
		            			"transition-duration":"0ms"
		            		});
	                    }else{
	                        n = -(s * lunbo_w);
	                    	father.css({
		                      "transform": "translate3d("+n+"px,0,0)",
		                      "transition":"all "+huad_time+"ms"
		                    });
	                    }
	                    //hua_xifang();
	                }else{
	                    //从右向左滑动不过半
	                    if(toum){
	                    	chlid.eq(s).css({
		            			"opacity":"1",
		            			"transition-duration":"0ms"
		            		});
			                chlid.eq(s+1).css({
		            			"opacity":"0",
		            			"transition-duration":"0ms"
		            		})
	                    }else{
	                        n = -(s * lunbo_w);
	                    	father.css({
		                      "transform": "translate3d("+n+"px,0,0)",
		                      "transition":"all "+huad_time+"ms"
		                    });
	                    }
	                    //hua_xifang();
	                }
	            }
	        }else{
                father.css({
                "transform": "translate3d(0px,0px,0px)",
                "transition": "all "+huad_time+"ms"
                });
	        };
	    };
	    function bujianduan(){
	    	if(huad_num < (-(slidelength-1)*lunbo_w)){
            	huad_num = huad_num - (-(slidelength-1) * lunbo_w);
                n= -((oldlenght-1) * lunbo_w);
                s=oldlenght-1;
                huad_num = n + huad_num;
                chushi = huad_num;
                click_x = move_x;
                father.css({
                  "transform": "translate3d("+huad_num+"px,0px,0px)",
                  "transition-duration":"0ms"
                });
            }else if(s>=slidelength-1){
            	huad_num = huad_num - (-(slidelength-1) * lunbo_w);
                n= -((oldlenght-1)*lunbo_w);
                s=oldlenght-1;
                huad_num = n + huad_num;
                chushi = huad_num;
                click_x = move_x;
                father.css({
                  "transform": "translate3d("+huad_num+"px,0px,0px)",
                  "transition-duration":"0ms"
                });
            }else if(huad_num > 0){
                n= -((oldlenght)*lunbo_w);
                s=oldlenght;
                huad_num = n + huad_num;
                chushi = huad_num;
                click_x = move_x;
                father.css({
                  "transform": "translate3d("+huad_num+"px,0px,0px)",
                  "transition-duration":"0ms"
                });
            }else if(s<=0){
                n= -((oldlenght)*lunbo_w);
                s=oldlenght;
                huad_num = n + huad_num;
                chushi = huad_num;
                click_x = move_x;
                father.css({
                  "transform": "translate3d("+huad_num+"px,0px,0px)",
                  "transition-duration":"0ms"
                });
            }else{
                father.css({
                "transform": "translate3d("+huad_num+"px,0,0)",
                "transition-duration":"0ms"
                });
            }
	    }
       });
	};
})(jQuery);