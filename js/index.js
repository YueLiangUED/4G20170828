/* 
* @Author: Marte
* @Date:   2017-05-26 11:03:33
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-28 22:57:00
*/

$(document).ready(function(){
    // 页面自定义滚动
    
    // 样式计算
    var winH = $(window).height();
    var headerH = $('.header').height();
    var calendarH = $('.calendar').height();
    var hearerInfH = $('.hearer-inf').height();
    $('.wrapper').height(winH + headerH);
    var wraaperH = $('.wrapper').height();
    $('.view-wrap .content').height(wraaperH - headerH - calendarH -hearerInfH);

    // 自定义滚动
    var viewScroll, siderbarScroll, contentScroll;
    
    
    siderbarScroll = new IScroll('.siderbar', {
        bounce: false,
        click: true
        // scrollY: false
    });
    contentScroll = new IScroll('.content-body', {
        bounce: false,
        click: true
        // scrollY: false
    });

    var contentBodyTop;
    $('.content-body').on('touchstart', function () {
        contentBodyTop = contentScroll.y;
    });
    $('.content-body').swipeDown(function () {
        if (contentBodyTop == 0) {
            $('.wrapper').css({
                'transform': 'translate(0,0px)'
            })
        }
        
    });

    var siderbarScrollTop;
    $('.siderbar').on('touchstart', function () {
        siderbarScrollTop = siderbarScroll.y;
    });
    $('.siderbar').swipeDown(function () {
        if (siderbarScrollTop == 0) {
            $('.wrapper').css({
                'transform': 'translate(0,0px)'
            })
        }
        
    });
    
    
    $('body').swipeUp(function () {
            var translateY = $('.wrapper').attr('data-translateY');
            if (translateY) {
                console.log(translateY)
            }
            $('.wrapper').attr('data-translateY',headerH);
            $('.wrapper').css({
                'transform': 'translate(0,-' + headerH + 'px)'
            }) 
        
        
    });
    // siderbar点击事件
    $('.siderbar li').on('tap', function () {
        setTimeout(function () {
            contentScroll.refresh();
        },0);
        var thisIndex = $(this).index();
        $('.siderbar li').removeClass('act');
        $(this).addClass('act');
        $('.content-item').hide();
        var thisContent = $('.content-item')[thisIndex];
        $(thisContent).show();
    });

    // 获取月份时间
    var nowDate = new Date();
    var nowMonth = nowDate.getMonth() + 1;
    var nowDay = nowDate.getDate();
    $('.nowMonth').text(nowMonth);
    $('.nowDay').text(nowDay);

    function getCountDays() {
        var curDate = new Date();
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
    }
    $('.count-day').text( getCountDays() - nowDay);

    // 滑动
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        effect : 'coverflow',
        slidesPerView: 'auto',
        loopedSlides :3,
        centeredSlides: true,
        coverflow: {
            rotate: 0,
            stretch: -6,
            depth: 0,
            modifier: 2,
            slideShadows : false
        }
      })        
});