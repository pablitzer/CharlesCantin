/*
var gallerySelector = '';

bootstrapGallery = function (selector) {
  // Install click event on links
  if (gallerySelector != '') gallerySelector += ', ';
  gallerySelector += selector;

  $(selector).on('click', function () {
    ExpandImage(this);
    return false;
  });
};

jQuery(function () {
  // Install events for left / right keys navigation
  $(document).on('keydown', function (e) {
    if ($('#bootstrap-gallery').length != 0 && $('#bootstrap-gallery').is(':visible')) {
      if (e.which == 37 && $('#bootstrap-gallery-prev').is(':visible')) $('#bootstrap-gallery-prev').trigger('click');
      else if (e.which == 39 && $('#bootstrap-gallery-next').is(':visible')) $('#bootstrap-gallery-next').trigger('click');
      else return;

      e.preventDefault();
    }
  });
});

function ExpandImage(link) {
  // Add modal gallery HTML if not present in DOM
  if ($('#bootstrap-gallery').length == 0) {
    $(GetGalleryHTML()).appendTo(document.body);

    // Delete modal gallery HTML when gallery is closed
    $('#bootstrap-gallery').on('hidden.bs.modal', function () {
      $(this).remove();
    });
  }

  var url = $(link).attr('href');
  var title;

  // This is a simply link, just open the gallery
  if ($(link).find('img').length == 0) {
    // Title is the "title" attribute of link
    title = $(link).attr('title');

    // If not found, title is the "alt" attribute of image in existing thumbnail link
    if (!title)
      title = $('a[href="' + url + '"]')
        .filter(gallerySelector)
        .has('img')
        .find('img')
        .attr('alt');

    // If not found, title is the "alt" attribute of existing image in page
    if (!title) title = $('img[src="' + url + '"]').attr('alt');

    // If link is a simply link, we can't define previous and next links
    $('a#bootstrap-gallery-prev').hide();
    $('a#bootstrap-gallery-next').hide();
  } else {
    // Title is "alt" attribute of thumbnail
    title = $(link).find('img').attr('alt');

    // Get all thubnails links with same data-gallery attribute
    var thumbnails = $(gallerySelector);
    var gallery = $(link).attr('data-gallery');
    if (gallery) thumbnails = thumbnails.filter('[data-gallery="' + gallery + '"]');
    else thumbnails = thumbnails.filter(':not([data-gallery])');

    // Remove elements which don't contain image
    thumbnails = $.grep(thumbnails, function (elem) {
      return $(elem).has('img').length != 0;
    });

    thumbnails = $(thumbnails);

    // Getting position of current link
    var pos = thumbnails.index(link);

    // If there are a previous thumbnail, we display the link
    if (pos > 0) {
      var prev = thumbnails.get(pos - 1);

      $('a#bootstrap-gallery-prev').show();
      $('a#bootstrap-gallery-prev')
        .off('click')
        .on('click', function () {
          ExpandImage(prev);
          return false;
        });
    } else {
      $('a#bootstrap-gallery-prev').hide();
    }

    // If there are a next thumbnail, we display the link
    if (pos < thumbnails.length - 1) {
      var next = thumbnails.get(pos + 1);

      $('a#bootstrap-gallery-next').show();
      $('a#bootstrap-gallery-next')
        .off('click')
        .on('click', function () {
          ExpandImage(next);
          return false;
        });
    } else {
      $('a#bootstrap-gallery-next').hide();
    }
  }

  // Setting values
  $('#bootstrap-gallery .modal-body img')
    .off('load')
    .on('load', function () {
      // Get real image width
      var image = new Image();
      image.src = url;
      var real_width = image.width;

      // Set max-width of container to image width
      //$('#bootstrap-gallery .modal-dialog').css('max-width', real_width);
    });

  $('#bootstrap-gallery .modal-body img').attr('src', url);

  if (typeof title === typeof undefined || title === false) title = '';
  $('#bootstrap-gallery .modal-header .modal-title').text(title);

  $('#bootstrap-gallery a#bootstrap-gallery-extend').attr('href', url);
  $('#bootstrap-gallery').modal('show');
}

// Getting modal gallery HTML
function GetGalleryHTML() {
  return (
    "<div class='modal fade' id='bootstrap-gallery' tabindex='-1' role='dialog' aria-hidden='true'>" +
    "<div class='modal-dialog modal-xl'>" +
    "<div class='modal-content'>" +
    "<div class='modal-header'>" +
    "<a href='' class='modal-button' data-dismiss='modal'><i class='fas fa-times'></i></a>" +
    "<a href='' id='bootstrap-gallery-extend' class='modal-button' target='_blank'><i class='fas fa-expand-alt'></i></a>" +
    "<h5 class='modal-title'></h5>" +
    '</div>' +
    "<div class='modal-body'>" +
    "<img src='' />" +
    "<a id='bootstrap-gallery-prev' class='carousel-control-prev' href='#' data-slide='prev'><i class='fas fa-chevron-left'></i></a>" +
    "<a id='bootstrap-gallery-next' class='carousel-control-next' href='#' data-slide='next'><i class='fas fa-chevron-right'></i></a>" +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  );
}
*/

// Init
/*
jQuery(function () {
  bootstrapGallery('a.thumbnail, a.show-gallery');
  
});
*/

jQuery(function () {
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
  function setSrcFromLazzy(current) {
    const image = current.children('img');
    const src = image.attr('src-lazzy');
    if (src) {
      image.attr('src', src);
      image.removeAttr('src-lazzy');
    }
  }
  function setNextSrcfromLazzy(current, direction) {
    // direction is sliding direction not arrow direction
    const next = direction === 'right' ? current.prevWrap() : current.nextWrap();
    setSrcFromLazzy(next);
  }
  function getCarousel(currentElement) {
    const content = $('<div></div>');
    const currentIndex = $(currentElement).parent().attr('item-index');
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

  $('.thumbnail').on('click', function (event) {
    $('.carousel-inner').html(getCarousel(this));
    $('#carousel-gallery').carousel();
    $('#ModalCarousel').modal('show');
    return event.preventDefault();
  });

  $('#carousel-gallery').on('slide.bs.carousel', function (event) {
    // do something...
    // event.direction "left" "right"
    // related target
    // from
    // to
    const cible = $(event.relatedTarget);
    setNextSrcfromLazzy(cible, event.direction);
  });

  const defCode = 'all';
  const defLabel = $('.filter-category[data-filter="' + defCode + '"]')
    .first()
    .text();

  filtercategory(defCode, defLabel);

  $('.filter-category').on('click', function () {
    var catCode = $(this).attr('data-filter');
    var catLabel = $(this).text();

    filtercategory(catCode, catLabel);
  });
});
