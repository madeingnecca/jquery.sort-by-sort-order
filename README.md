# The problem

When it comes to sort a list of data a simple solution is to use two select elements: one for the sort criteria (e.g date, name, number of reviews) and one for the sort order (ascending/descending).

This technique is simple and accessibility ready, however certain types of data can benefit from a different UI which lets users sort "by column", like in a spreadsheet software or in Finder/File Explorer.

This jQuery plugin will create the necessary html needed to implement this pattern, while keeping in sync the two select elements required to preserve the semplicity of the form.

The plugin is particularly indicated for Drupal sites using the Views module with exposed sorts.

# Basic Usage

This jQuery plugin must be used in a jQuery collection of two elements, where the first one holds the "sort by" element and the second holds the "sort order" element.

<code>
$('[name=sort_by],[name=sort_order]').sortBySortOrder(options);
</code>

# Advanced Options

This codepen http://codepen.io/madeingnecca/pen/HriIf shows how to integrate with Bootstrap framework along with other advanced options.
