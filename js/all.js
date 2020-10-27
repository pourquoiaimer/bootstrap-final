$(document).ready(function () {
  //購物車愛心空心實心切換-index和product//
  $('.fa-heart').on('click', function () {
    $(this).toggleClass("far");
    $(this).toggleClass("fas");
  });

  // 通過data-title屬性，找尋符合的商品項-index//
  $('.banner-list-section').on('click', function (event) {
    event.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    var title1 = $(this).data('title');
    $(".item-card").hide();
    $(`.item-card[data-title=${title1}]`).show(800,);
    var offset = $('#item-list').offset();
    var top = offset.top;
    $('html,body').animate({
      scrollTop: top - 100
    }, 500);
  });

  //cart頁面的商品數量加減-cart---
  const cartInpuGroup = $('.cart-input-group');
  cartInpuGroup.click(event => {
    let i = parseInt($(event.target).parents('.cart-input-group').find('.product-qty').val());
    let price = parseInt($(event.target).parents('.cart-item').find('.product-price').text());
    switch (true) {
      case ($(event.target).text() == 'add'): //按加號時的動作
        $(event.target).parents('.cart-input-group').find('.product-qty').val(i + 1);
        $(event.target).parents(".cart-item").find(".product-subtotal").text(((i + 1) * price).toLocaleString('en-US'));//計算小計值用此函數增加千分位號
        console.log(i, price);
        break;
      case ($(event.target).text() == 'remove'): //按減號時的動作
        if (i == 1) { //用了js裡面的confirm
          if (confirm('確定要刪除這筆紀錄嗎？')) {
            $(this).parents(".cart-item").remove();
          } else {
            return
          }
        }
        $(event.target).parents('.cart-input-group').find('.product-qty').val(i - 1);
        $(event.target).parents(".cart-item").find(".product-subtotal").text(((i - 1) * price).toLocaleString('en-US'));//計算小計值用此函數增加千分位號
        break;
      default:
        break;
    }
    countAll ()
  })

  //cart頁面的商品的小計-cart---
  const productQty = $('.product-qty'); //中間數量欄位的輸入時改變
  productQty.on('change', event => {
    let i = parseInt($(event.target).parents('.cart-input-group').find('.product-qty').val());
    let price = parseInt($(event.target).parents('.cart-item').find('.product-price').text());
    $(event.target).parents(".cart-item").find(".product-subtotal").text((i * price).toLocaleString('en-US'));
  })

  // 右側計算欄位計算-cart---(應考慮整合)
  function countAll () {
    let allSubtotal = 0;    
    $(".product-subtotal").each(function () {
      let i = parseInt($(this).text().split(",").join(''));
      console.log(i);
      allSubtotal += i;
    })
    let allSubtotalInner = allSubtotal.toLocaleString('en-US');
    if (allSubtotal < 500) {
      $('.cart-Summary').find('.shipping').text("60");
    }else{
      $('.cart-Summary').find('.shipping').text("0");
    }
    $('main').find('.all-subtotal').text(allSubtotalInner);
    let shipping = $('.cart-Summary').find('.shipping').text();
    $('.cart-Summary').find('.total').text((parseInt(allSubtotal) + parseInt(shipping)).toLocaleString('en-US'));
  }




  // 點垃圾筒刪除-card---(考慮是否用跳出視窗再做確認？)
  $('.btn-delete').on('click', function (event) {
    event.preventDefault();
    if (confirm('確定要刪除這筆紀錄嗎？')) { //用了js裡面的confirm
      $(this).parents(".cart-item").remove();
      countAll ();
    }
  });

  // 滾動回到首頁最上方//
  $('.btn-backtop a').click(function (event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
  });

  // 滾動監測backtop按鈕是否出現//
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scrollPos >= (windowHeight * 0.8)) {
      $('.btn-backtop').show();
      console.log("show");
    } else {
      $('.btn-backtop').hide();
      console.log("hide");
    }
  });
}); ////結束////

