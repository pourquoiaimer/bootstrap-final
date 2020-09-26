$(document).ready(function () {


  //購物車愛心空心實心切換-index和product
  $('.fa-heart').on('click', function (event) {
    $(this).toggleClass("far");
    $(this).toggleClass("fas");
  });

  // 通過data-title屬性，找尋符合的商品項-index
  $('.banner-list-section').on('click', function (event) {
    event.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    var title1 = $(this).data('title');
    $(".item-card").hide();
    $(".item-card[data-title=" + title1 + "]").show(800,);
    var offset = $('#item-list').offset();
    var top = offset.top;
    console.log(top);
    $('html,body').animate({
      scrollTop: top - 100
    }, 500);
  });

  //cart頁面的商品數量加減-cart---（應該還是要考慮將之合併，用if?）
  // 先減
  $(".btn-remove").click(function (events) {
    var i = parseInt($(this).parents('.cart-input-group').find(".product-qty").val());
    var price = parseInt($(this).parents('.cart-item').find('.product-price').text());
    console.log(i);
    console.log(price);
    $(this).parents('.cart-input-group').find(".product-qty").val(--i);
    $(this).parents(".cart-item").find(".product-subtotal").text(i * price);
    if (i <= 0) {
      $(this).parents(".cart-item").remove();
    }

    // 右側計算欄位計算-cart---(應考慮整合)
    $(function () {
      var allsubtotal = 0;
      $(".product-subtotal").each(function () {
        allsubtotal += parseInt($(this).text());
      })
      $('main').find('.all-subtotal').text(allsubtotal);

      if (allsubtotal < 500) {
        $('.cart-Summary').find('.shipping').text("60")
      }
      var shipping = $('.cart-Summary').find('.shipping').text();
      $('.cart-Summary').find('.total').text(parseInt(allsubtotal) + parseInt(shipping));
    })

  });
  // 然後是加
  $(".btn-add").click(function (events) {
    var i = parseInt($(this).parents('.cart-input-group').find(".product-qty").val());
    var price = parseInt($(this).parents('.cart-item').find('.product-price').text());
    // console.log(i);
    // console.log(price);
    $(this).parents('.cart-input-group').find(".product-qty").val(++i);
    $(this).parents(".cart-item").find(".product-subtotal").text(i * price);

    // 右側計算欄位計算-cart---(應考慮整合)
    $(function () {
      var allsubtotal = 0;
      $(".product-subtotal").each(function () {
        allsubtotal += parseInt($(this).text());
      })
      $('main').find('.all-subtotal').text(allsubtotal);

      if (allsubtotal >= 500) {
        $('.cart-Summary').find('.shipping').text("0")
      }

      var shipping = $('.cart-Summary').find('.shipping').text();
      $('.cart-Summary').find('.total').text(parseInt(allsubtotal) + parseInt(shipping));
    })

  });
  // 點垃圾筒刪除-card---(考慮是否用跳出視窗再做確認？)
  $('.btn-delete').on('click', function (event) {
    event.preventDefault();
    $(this).parents(".cart-item").remove();

    // 右側計算欄位計算-cart---(應考慮整合)
    $(function () {
      var allsubtotal = 0;
      $(".product-subtotal").each(function () {
        allsubtotal += parseInt($(this).text());
      })
      $('main').find('.all-subtotal').text(allsubtotal);

      if (allsubtotal >= 500) {
        $('.cart-Summary').find('.shipping').text("0")
      }

      var shipping = $('.cart-Summary').find('.shipping').text();
      $('.cart-Summary').find('.total').text(parseInt(allsubtotal) + parseInt(shipping));
    })
  });

  // 滾動回到首頁最上方
  $('.btn-backtop a').click(function (event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
  });

  // 滾動監測backtop按鈕是否出現
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    console.log(scrollPos, windowHeight);
    if (scrollPos>=(windowHeight*0.8)) {
      $('.btn-backtop').show();
      console.log("show");
    } else {
      $('.btn-backtop').hide();
      console.log("hide");
    }

  });


});

