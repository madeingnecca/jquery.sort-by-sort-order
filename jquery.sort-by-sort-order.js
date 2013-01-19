(function($) {
  $.fn.sortBySortOrder = function (opts) {
    opts = $.extend({}, opts || {});
    var $selects = $(this);
    var $sortBy = $(this[0]);
    var $sortOrder = $(this[1]);
    var $parent = $(opts.parent || $sortBy.parent());
    var $items;
    var orderings = (function() {
      var $opts = $('option', $sortOrder);
      var list = $opts.map(function() {
        return $(this).val();
      }).get();

      return {
        next: function(val) {
          var index = list.indexOf(val);
          return $($opts[(index + 1) % list.length]);
        },
        list: function() {
          return list;
        }
      };
    }());

    $parent.addClass('sort-by-sort-order');

    var renderItem = opts.renderItem || function($sortByOpt) {
      return $sortByOpt.text();
    };

    $('option', $sortBy)
    .each(function() {
      var $sortByOpt = $(this);
      var $item = $('<span class="sort-by">' + renderItem($sortByOpt) + '</span>');

      $item.data('sort-by', $sortByOpt.val());
      $parent.append($item);

      $item.click(function(ev) {
        ev.preventDefault();

        $sortBy
        .val($item.data('sort-by'));

        // Go to the next ordering.
        $sortOrder
        .val(orderings.next($item.data('sort-order')).val());

        // Notify original dom elements.
        $selects.change();
      });
    });

    // Cache all items for faster re-use.
    $items = $('.sort-by', $parent);

    var updateSortBy = function(ev) {
      var sel = $(this).val();
      var $item;

      $items
      .removeClass('sort-by-selected')
      .each(function() {
        if ($(this).data('sort-by') == sel) {
          $item = $(this);
          $(this).addClass('sort-by-selected');
          return false;
        }
      });

      $(this).data('sort-by-item', $item);

      $(this)
      .trigger('sort-by:change', [$sortBy, $sortOrder, $items]);

      updateSortOrder.call($sortOrder);
    };

    var updateSortOrder = function(ev) {
      var sel = $(this).val();
      var $next = orderings.next(sel);
      var $opt = $('option:selected', this);

      $items.data('sort-order', sel);

      $.each(orderings.list(), function() {
        $items.removeClass('sort-order-' + this);
      });

      $items.addClass('sort-order-' + sel);
      $items.attr('title', $.trim($opt.text()));

      $(this)
      .trigger('sort-order:change', [$sortBy, $sortOrder, $items, $next]);
    };

    $sortBy
    .change(updateSortBy);

    $sortOrder
    .change(updateSortOrder);

    updateSortBy.call($sortBy);

    return $(this);
  };
}(jQuery));