(function($){
    
    $.fn.my_slider=function(options){
        
        var default_options = {
            "nbr_slides" : 5,
            "class_name_prefix" : "s_",      // So that the user wont have to change the name of the classes already defined
            "arrows" : true
        }

        var params = $.extend(default_options, options);
        
        this.append("<div class='" + params.class_name_prefix + "slider_container'></div>")
        $(this.children()[0]).css({
            "width": ((params.nbr_slides+1)*100) + "%"
        })
        var i = 0
        while(i < params.nbr_slides){
            $(this.children()[0]).append("<div class='" + params.class_name_prefix + "slide " + params.class_name_prefix + "slide_"+ i +"'></div>")
            i++
        }
        $(this.children()[0]).append("<div class='" + params.class_name_prefix + "slide " + params.class_name_prefix + "slide_0'></div>")

        $("." + params.class_name_prefix + "slide").css({
            "width": (100/(params.nbr_slides+1))+"%"
        })

        var is_down = false
        var current_slide = 0
        var mousedown_position = 0
        var mouseup_position = 0
        var direction = true  // false: from the left to the right // true: means from the right to the left
        var parent_offset_left = 0
        $(this.children()[0]).mousedown((e)=>{
            is_down = true

            parent_offset_left = $(this).offset().left            
            mousedown_position = e.pageX - parent_offset_left
        }).mouseup((e)=>{
            is_down = false

            parent_offset_left = $(this).offset().left            
            mouseup_position = e.pageX - parent_offset_left

            if((mouseup_position - mousedown_position) >  0){

                if((mouseup_position - mousedown_position) > 30) // test if the user really wants to smipe  
                    direction = true
                else
                    direction = null
            }else{
                
                if((mouseup_position - mousedown_position) < -30) // test if the user really wants to smipe  
                    direction = false
                else
                    direction = null
            }
  
            if(direction != null){
                if(!direction){

                    if(current_slide < params.nbr_slides){

                        current_slide++ 
                        if (current_slide == params.nbr_slides ){
                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, "fast", function(){
                                $(this).css({"left" : "0%"})
                            })

                            current_slide = 0
                        }else{
                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, "fast")
                        }

                    }
    
                }else{

                    if(current_slide >= 0){
                        
                        current_slide-- 
                        if (current_slide == -1 ){
                            $(this.children()[0]).css({"left" : "-500%"})
                            current_slide = params.nbr_slides - 1 

                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, "fast")

                        }else{
                            $(this.children()[0]).animate({
                                "left": - (current_slide * 100) + "%"
                            }, "fast")
                        }
                        
                    }

                }
            }       
        })


        console.log(params.arrows)
        // Adding the arrows functionality.
        if(params.arrows) {
            this.append("<div class='"+params.class_name_prefix +"arrows arrows'><span class='prev'><</span><span class='next'>></span></div>")
        }

    }




    

    return this;
})(jQuery);