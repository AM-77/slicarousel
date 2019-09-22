(function ($) {

    $.fn.slicarousel = function (options) {

        let default_options = {
            "nbr_slides": 5, // The number of slides 
            "class_name_prefix": "s_", // Avoid CSS classes mixed up
            "arrows": true, // Enable the arrows navigation 
            "dot_nav": true, // Enable the dots navigation
            "full_width": true, // width: 100%
            "autoplay": {
                "enabled": true, // Enable autoplay slider
                "direction": "ltr" // direction right to left rtl or left to right ltr
            },
            "delay": 2500, // The sliding delay in milliseconds
            "speed": 500 // The sliding speed can be slow, normal, fast or customized in milliseconds
        }

        // Handling the speed option
        switch (default_options.speed) {
            case "fast":
                default_options.speed = 250
                break;

            case "normal":
                default_options.speed = 500
                break;

            case "slow":
                default_options.speed = 1000
                break;
        }

        let params = $.extend(default_options, options);
        this.append("<div class='" + params.class_name_prefix + "slider_container'></div>")
        $(this.children()[0]).css({
            "width": ((params.nbr_slides + 1) * 100) + "%"
        })

        let i = 0
        while (i < params.nbr_slides) {
            $(this.children()[0]).append("<div class='" + params.class_name_prefix + "slide " + params.class_name_prefix + "slide_" + i + "'></div>")
            i++
        }

        $(this.children()[0]).append("<div class='" + params.class_name_prefix + "slide " + params.class_name_prefix + "slide_0'></div>")
        $("." + params.class_name_prefix + "slide").css({
            "width": (100 / (params.nbr_slides + 1)) + "%"
        })

        let current_slide = 0 // the slide number where the mouse is in 
        let mousedown_position = 0 // the silde number where the mouse starts grabbing 
        let mouseup_position = 0 // the slide number where the mouse finished grabbing
        let direction = true // false: from the left to the right // true: means from the right to the left
        let parent_offset_left = 0

        $(this.children()[0]).mousedown((e) => {
            is_down = true
            parent_offset_left = $(this).offset().left
            mousedown_position = e.pageX - parent_offset_left
        }).mouseup((e) => {
            is_down = false
            parent_offset_left = $(this).offset().left
            mouseup_position = e.pageX - parent_offset_left

            if ((mouseup_position - mousedown_position) > 0) {
                // test if the user really wants to swip
                if ((mouseup_position - mousedown_position) > 30)
                    direction = true
                else
                    direction = null
            } else {
                // test if the user really wants to swip
                if ((mouseup_position - mousedown_position) < -30)
                    direction = false
                else
                    direction = null
            }
            if (direction != null) {
                if (!direction) {
                    if (current_slide < params.nbr_slides) {
                        current_slide++
                        if (current_slide == params.nbr_slides) {
                            $(this.children()[0]).animate({
                                "left": -(current_slide * 100) + "%"
                            }, params.speed, function () {
                                $(this).css({
                                    "left": "0%"
                                })
                            })
                            current_slide = 0
                        } else {
                            $(this.children()[0]).animate({
                                "left": -(current_slide * 100) + "%"
                            }, params.speed)
                        }
                    }
                } else {
                    if (current_slide >= 0) {
                        current_slide--
                        if (current_slide == -1) {
                            $(this.children()[0]).css({
                                "left": "-" + (params.nbr_slides * 100) + "%"
                            })
                            current_slide = params.nbr_slides - 1

                            $(this.children()[0]).animate({
                                "left": -(current_slide * 100) + "%"
                            }, params.speed)

                        } else {
                            $(this.children()[0]).animate({
                                "left": -(current_slide * 100) + "%"
                            }, params.speed)
                        }
                    }
                }
            }
            // If the dots navigation is enabled
            if (params.dot_nav) {
                $(".dot").each(function () {
                    if ($(this).hasClass('active'))
                        $(this).removeClass('active')
                })
                $(".dot-" + current_slide).addClass("active")
            }
        })

        // the slider
        let _this = $(".the_slider")

        // go to the next slide 
        let next_slide = (_this) => {
            if (current_slide < params.nbr_slides) {
                current_slide++
                if (current_slide == params.nbr_slides) {
                    $(_this.children()[0]).animate({
                        "left": -(current_slide * 100) + "%"
                    }, params.speed, function () {
                        $(this).css({
                            "left": "0%"
                        })
                    })

                    current_slide = 0
                } else {
                    $(_this.children()[0]).animate({
                        "left": -(current_slide * 100) + "%"
                    }, params.speed)
                }

                // If the dots navigation is enabled
                if (params.dot_nav) {
                    $(".dot").each(function () {
                        if ($(this).hasClass('active'))
                            $(this).removeClass('active')
                    })

                    $(".dot-" + current_slide).addClass("active")
                }
            }
        }

        // go to the prevouis slide
        let prev_slide = (_this) => {
            if (current_slide >= 0) {
                current_slide--
                if (current_slide == -1) {
                    $(_this.children()[0]).css({
                        "left": "-" + (params.nbr_slides * 100) + "%"
                    })
                    current_slide = params.nbr_slides - 1
                    $(_this.children()[0]).animate({
                        "left": -(current_slide * 100) + "%"
                    }, params.speed)

                } else {
                    $(_this.children()[0]).animate({
                        "left": -(current_slide * 100) + "%"
                    }, params.speed)
                }
                // If the dots navigation is enabled
                if (params.dot_nav) {
                    $(".dot").each(function () {
                        if ($(this).hasClass('active'))
                            $(this).removeClass('active')
                    })
                    $(".dot-" + current_slide).addClass("active")
                }
            }
        }

        // Adding the arrows functionality.
        if (params.arrows) {
            let next = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"> <g> <g> <path d="M64.5,122.6c32,0,58.1-26,58.1-58.1S96.5,6.4,64.5,6.4S6.4,32.5,6.4,64.5S32.5,122.6,64.5,122.6z M64.5,14.6 c27.5,0,49.9,22.4,49.9,49.9S92,114.4,64.5,114.4S14.6,92,14.6,64.5S37,14.6,64.5,14.6z"/> <path d="m51.1,93.5c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l26.4-26.4c0.8-0.8 1.2-1.8 1.2-2.9 0-1.1-0.4-2.1-1.2-2.9l-26.4-26.4c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l23.5,23.5-23.5,23.5c-1.6,1.6-1.6,4.2 0,5.8z"/> </g> </g></svg>'
            let prev = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129"> <g> <g> <path d="m64.5,122.6c32,0 58.1-26 58.1-58.1s-26-58-58.1-58-58,26-58,58 26,58.1 58,58.1zm0-108c27.5,5.32907e-15 49.9,22.4 49.9,49.9s-22.4,49.9-49.9,49.9-49.9-22.4-49.9-49.9 22.4-49.9 49.9-49.9z"/> <path d="m70,93.5c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-23.5-23.5 23.5-23.5c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-26.4,26.4c-0.8,0.8-1.2,1.8-1.2,2.9s0.4,2.1 1.2,2.9l26.4,26.4z"/> </g> </g></svg>'
            this.append("<div class='" + params.class_name_prefix + "arrows arrows'><span class='prev'>" + prev + "</span><span class='next'>" + next + "</span></div>")

            $(".arrows .next").on("click", () => {
                next_slide(_this)
            })

            $(".arrows .prev").on("click", () => {
                prev_slide(_this)
            })

        }

        // Adding the dots navigation 
        if (params.dot_nav) {
            this.append("<div class='dot_nav'></div>")
            for (let i = 0; i < params.nbr_slides; i++) {
                if (i == 0)
                    $(".dot_nav").append("<span class='dot dot-" + i + " active' slide-nbr='" + i + "'></span>")
                else
                    $(".dot_nav").append("<span class='dot dot-" + i + "' slide-nbr='" + i + "'></span>")
            }
            $(".dot").each(function () {
                $(this).on("click", function () {
                    if (!$(this).hasClass()) {
                        $(".dot").each(function () {
                            if ($(this).hasClass('active'))
                                $(this).removeClass('active')
                        })
                        $(this).addClass("active")
                        if (current_slide != $(this).attr('slide-nbr')) {
                            ($(".s_slider_container")).animate({
                                "left": -($(this).attr('slide-nbr') * 100) + "%"
                            }, Math.abs(current_slide - $(this).attr('slide-nbr')) * params.speed)
                            current_slide = $(this).attr('slide-nbr')
                        }
                    }
                })
            })
        }

        // Adding the autoplay functionality.
        if (params.autoplay.enabled) {

            if (params.autoplay.direction === "ltr" || params.autoplay.direction === "rtl") {
                let interval = setInterval(() => {
                    if (params.autoplay.direction === "ltr")
                        prev_slide(_this)
                    else
                        next_slide(_this)

                }, params.delay)

                _this.on("mouseenter", () => {
                    clearInterval(interval)
                })

                _this.on("mouseleave", () => {
                    interval = setInterval(() => {
                        if (params.autoplay.direction === "ltr")
                            prev_slide(_this)
                        else
                            next_slide(_this)

                    }, params.delay)
                })
            } else {
                console.error("Error: options.autoplay.direction should be \"ltr\" or \"rtl\".")
            }


        }

        // handling the full width option
        if (!params.full_width) {
            $(this).css({
                "width": "100%"
            })
            $(".s_slide").css({
                "width": "12%",
                "margin": "0 2.333%"
            })
        }
    }
    return this;
})(jQuery);