Slider = {
    backgroundSlideId: 0,
    init: function(){
        var width = parseInt($('.custom-slider').find('.embed-video').width());
        $(".custom-slider .embed-video").each(function(){

            if(!$(this).is(".embed-video:first-child")&&!$(this).find('.embed-responsive').length){
                $(this).find('.text-middle').css('right', -width+"px");
            }
            if(!$(this).find('.embed-responsive').length){
                $(this).css('height', '0');
                $(this).addClass('empty');
                var embedHed = $('.embed-video').css('height');
                $(this).find('.text-middle').css('height', embedHed)
            }
        });
        Slider.backgroundSlideId = $('.custom-slider .embed-video:first-child').attr("data-slide");
        $('.custom-slider .embed-video:first-child').addClass('active');
        $('.btn-next').on('click',function () {
            var currentSlide = $('.custom-slider').find('.active');
            var nextSlide = currentSlide.next();

            if($('.custom-slider .embed-video:last-child').hasClass('active')){
              currentSlide.removeClass('active');
              $('.custom-slider .embed-video:first-child').addClass('active');
              nextSlide = $('.custom-slider .embed-video:first-child');
            } else {
                currentSlide.removeClass('active');
                nextSlide.addClass('active');
            }
            if(nextSlide.find('.embed-responsive').length&&Slider.backgroundSlideId != nextSlide.attr("data-slide")){
                Slider.backgroundSlideId = nextSlide.attr("data-slide");
                Slider.slideVideo('next');
            }else{
                Slider.slideText('next', nextSlide, currentSlide, Slider.backgroundSlideId);
            }

        });
        $('.btn-prev').on('click',function () {
            var currentSlide = $('.custom-slider').find('.active');
            var prevSlide = currentSlide.prev();

            if($('.custom-slider .embed-video:first-child').hasClass('active')){
                currentSlide.removeClass('active');
                $('.custom-slider .embed-video:last-child').addClass('active');
                prevSlide = $('.custom-slider .embed-video:last-child');
            } else {
                currentSlide.removeClass('active');
                prevSlide.addClass('active');
            }

            if(prevSlide.find('.embed-responsive').length&&Slider.backgroundSlideId != prevSlide.attr("data-slide")){
                Slider.backgroundSlideId = prevSlide.attr("data-slide");
                Slider.slideVideo('prev');
            }else{
                Slider.slideText('prev', prevSlide, currentSlide, Slider.backgroundSlideId); 
            }
        });

        setInterval(Slider.autoplay, 5000);
    },
    autoplay: function(){
        var currentSlide = $('.custom-slider').find('.active');
        var nextSlide = currentSlide.next();
        
        if($('.custom-slider .embed-video:last-child').hasClass('active')){
          currentSlide.removeClass('active');
          $('.custom-slider .embed-video:first-child').addClass('active');
          nextSlide = $('.custom-slider .embed-video:first-child');
        } else {
            currentSlide.removeClass('active');
            nextSlide.addClass('active');
        }
        if(nextSlide.find('.embed-responsive').length&&Slider.backgroundSlideId != nextSlide.attr("data-slide")){
            Slider.backgroundSlideId = nextSlide.attr("data-slide");
            Slider.slideVideo('next');
        }else{
            Slider.slideText('next', nextSlide, currentSlide, Slider.backgroundSlideId);
        }
    },
    
    slideText: function(direction, next, current, backgroundSlideId){
        var width = current.width();
        var backgroundSlide = $('.embed-video[data-slide='+backgroundSlideId+']');
        if(direction == 'next'){
            var pos = width;
            var backgroundRight = parseInt(backgroundSlide.css('right'));

            if($('.embed-video:first-child').attr('data-slide')==backgroundSlideId&&!current.is('.embed-video:first-child')){
                var length = 0;
                current.prevAll('.embed-video').each(function(){
                    if($(this).find('.embed-responsive').length){
                        length++;
                    }
                });
                pos = width*length;
            }
            if(next.find('.embed-responsive').length||backgroundSlideId>current.attr("data-slide")){
                pos = 0;
            }
            current.find(".text-middle").animate({
                right: pos+width
            }, 500, function(){
                current.find(".text-middle").css('right', -width);
            });
            next.find(".text-middle").animate({
                right: pos
            }, 500);

        }else{
            var pos;
            var length = 0;
            if(!current.is('.embed-video:first-child')){
                current.prevAll('.embed-video').each(function(){
                    if($(this).find('.embed-responsive').length){
                        length++;
                    }
                });
                pos = width*length;
            }else{
                pos = width*$('.embed-responsive').length;
            }
            if(next.find('.embed-responsive').length||parseInt(current.css('right')) > 0){
                pos = '0px';
            }
            if(backgroundSlideId<current.attr("data-slide")&&backgroundSlideId != 0&&backgroundSlideId !=next.attr("data-slide")){
                pos = width;
            }
            current.find(".text-middle").animate({
                right: -width
            }, 500);
            next.find(".text-middle").animate({
                right: pos
            }, 500);
        }
    },
    slideVideo: function (direction){
        var width = parseInt($('.custom-slider').find('.active').width());
        var finish = width*($('.single-item .embed-responsive').length-1);
         $(".custom-slider .embed-video").each(function(){

            var currentPos = parseInt($(this).css('right'));
            var nextPos;
            if(direction=='next'){
                nextPos  = currentPos + width;
                if(nextPos>finish){
                    nextPos = 0;
                }
            }else{
                var nextPos = currentPos - width;
                if(nextPos<0){
                    nextPos = finish;
                }
            }
            var self = this;
            $(this).animate({
                right: nextPos
            }, 500, function(){
                if($(self).hasClass('active')||$(self).find('.embed-responsive').length){
                    $(self).find('.text-middle').css('right', "0px");
                }else{
                    $(self).find('.text-middle').css('right', -finish);
                }

            });
        });
    },
}

$(function(){
    Slider.init();
});