jQuery(function () {
  // functions for cycling  next-previous images for   carousel
  $.fn.nextWrap = function () {
    var $next = this.next();
    if ($next.length) return $next;
    return this.siblings().first();
  };

  $.fn.prevWrap = function () {
    var $prev = this.prev();
    if ($prev.length) return $prev;
    return this.siblings().last();
  };

  // lazy load management set image source from data parameter - remove data parameter when done
  function setSrcFromLazzy(current) {
    const image = current.children('img');
    const src = image.attr('src-lazzy');
    if (src) {
      image.attr('src', src);
      image.removeAttr('src-lazzy');
    }
  }

  // lazy load next image for carousel sliding
  function setNextSrcfromLazzy(current, direction) {
    // direction is sliding direction not arrow direction
    const next = direction === 'right' ? current.prevWrap() : current.nextWrap();
    setSrcFromLazzy(next);
  }

  // construct carousel from visible thumnails picture
  // initialize current carousel image from clicked thumbnails
  function getCarousel(clickedElement) {
    const content = $('<div></div>');
    const currentIndex = $(clickedElement).parent().attr('item-index');
    const items = $('.gallery-item').filter(':visible');

    items.each(function (index, element) {
      const source = $(element);
      const sourceLink = source.children('a');
      const sourceImg = sourceLink.children('img');

      const img = $('<img></img>').addClass('d-block w-100').attr('src', '').attr('src-lazzy', sourceLink.attr('href')).attr('alt', sourceImg.attr('alt'));
      content.append(
        $('<div></div>')
          .addClass('carousel-item' + (source.attr('item-index') === currentIndex ? ' active' : ''))
          .append(img)
      );
    });
    const current = content.find('.active');
    setSrcFromLazzy(current);
    setNextSrcfromLazzy(current, 'left');
    setNextSrcfromLazzy(current, 'right');

    return content.html();
  }
  // get specified category from url parameter or default
  function getCurrentCategory(defCat) {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('categorie')) {
      const paramCategory = searchParams.get('categorie');
      if ($('.filter-category[data-filter="' + paramCategory + '"]')) {
        return paramCategory;
      }
    }
    return defCat;
  }
  // udpate url history to take new parameter value
  function setQueryStringParameter(name, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));
  }

  // Filter gallery with category
  function filtercategory(code, label) {
    $('.category-box .chosen-category').text(label.charAt(0).toUpperCase() + label.slice(1));
    $('.filter-category').removeClass('current');
    $('.filter-category[data-filter="' + code + '"]').addClass('current');

    if (code === 'all') {
      $('.gallery-item').show('1000');
    } else {
      $('.gallery-item[item-cat!="' + code + '"]').hide('3000');
      $('.gallery-item[item-cat="' + code + '"]').show('3000');
    }
  }

  $('a.thumbnail img').addClass('img-thumbnail');

  // add event on thumbnail to open carousel
  $('.thumbnail').on('click', function (event) {
    $('.carousel-inner').html(getCarousel(this));
    $('#carousel-gallery').carousel();
    $('#ModalCarousel').modal('show');
    return event.preventDefault();
  });

  // lazy load images when carousel slide
  $('#carousel-gallery').on('slide.bs.carousel', function (event) {
    const cible = $(event.relatedTarget);
    setNextSrcfromLazzy(cible, event.direction);
  });

  // add event to manage category change
  $('.filter-category').on('click', function () {
    var catCode = $(this).attr('data-filter');
    var catLabel = $(this).text();
    setQueryStringParameter('categorie', catCode);

    filtercategory(catCode, catLabel);
  });

  // initialize page category and filter images
  const defCode = getCurrentCategory('all');
  const defLabel = $('.filter-category[data-filter="' + defCode + '"]')
    .first()
    .text();

  filtercategory(defCode, defLabel);
});
