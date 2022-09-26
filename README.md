**Fast JS Carousel**: ExS Carousel - Extra Small and fast JavaScript Carousel
=============================================================================

It has a very small size: 2kB of JavaScript and 1kB of CSS.

Main Features
-------------

*   1kb of CSS code and 2kb of JavaScript code (minified version)
*   Working with Mouse and Touch events
*   Auto rewind
*   Custom or default CSS selector supported
*   Optional dots navigation auto added by script - no need to manually add your dot buttons in your HTML markup
*   Optional arrows navigation auto added by script - no need to manually add your arrow buttons in your HTML markup
*   Auto init with appropriate [class attribute values](#class-attribute-values) from the HTML code or manually initialized with the [config](#javascript-initialization-code) from the JavaScript code.

Quick Start
-----------

*   Clone or download this repository.
*   Include your [CSS and JavaScript files](#inlucde-your-assets).
*   Add your [Carousel HTML Markup](#carousel-html-markup)

### Inlucde your assets:

    <link rel="stylesheet" href="dist/css/exs-carousel.css">
    <script src="dist/js/exs-carousel.js"></script>

Basic example with auto init:
-----------------------------

Sometimes you have a control on your HTML markup but have no control on your JavaScript code. Auto initialization feature will be very useful in this situation.

### Carousel HTML Markup
```
<div class="exs-carousel autoinit autoplay dots arrows">
    <div>
        <img src="demo/img/carousel1.jpg">
    </div>
    <div>
        <img src="demo/img/carousel2.jpg">
    </div>
    <div>
        <img src="demo/img/carousel3.jpg">
    </div>
</div>
```
### Class attribute values

`autoinit` Add 'autoinit' class to your '.exs-carousel' element for automatic initialization without writting any line of additional JS code.

`autoplay` Add 'autoplay' class for your '.exs-carousel' element to enable auto slide. Default interval is 5 seconds.

`dots` Add 'dots' class for your '.exs-carousel' element to auto create your dots carousel navigation.

`arrows` Add 'arrows' class for your '.exs-carousel' element to auto create your arrows carousel navigation.

Manual initialization from the JavaScript code with config a object
-------------------------------------------------------------------

In the opposite of the example above you can have some cusotm HTML markup that you cannot control. You can use JavaScript initialization in this case.

### Custom element with init in the JavaScript code

#### Custom carousel HTML markup

```
<div class="custom-carousel-class">
    <div class="example-slide">
        Slide 1
    </div>
    <div class="example-slide">
        Slide 2
    </div>
    <div class="example-slide">
        Slide 3
    </div>
</div>
```

#### JavaScript initialization code
```
<script>
    exsCarousel({
        selector:'.custom-carousel-class',
        dots:true,
        arrows:true,
        autoplay:true,
        interval:3000
    });
</script>
```
JavaScript initialization object properties are very similar to CSS class values:

`selector` Custom CSS selector for your carousel HTML element.

`autoplay` Add 'autoplay' object property to enable automatic carousel sliding. (true or false, default - false).

`dots` Add 'dots' object property to add a dots navigation for your carousel. (true or false, default - false).

`arrows` Add 'arrows' object property to add a arrows navigation for your carousel. (true or false, default - false).

`interval` Custom interval if you're using autoplay option. Default is 5000 milliseconds (5 seconds).

Changing default interval:
--------------------------

### From the HTML code

Add `data-interval="3000"` custom HTML attribute. `autoplay` class can be omitted in this case.

    <div class="exs-carousel autoinit dots arrows" data-interval="6000">

### From the JavaScript code

Add `interval` object property to your initialization object when calling the `exsCarousel` function. Value should be a number of milliseconds.
```
<script>
    exsCarousel({
        ...
        interval:3000,
        ...
    });
</script>
```
Limitations
-----------

*   Images should be same height for the better UX.
*   Only one slide is visible (no columns).
*   Arrows and dots cannot be moved outside of slides.

Development
-----------

*   Clone repository.
*   Open your repository directory into your terminal.
*   Run `npm i` command.
*   To start your dev server run `gulp` command.
*   Make changes into your _dist_ directory.
*   To build your project run `gulp build` command.

Copyright and license
---------------------

Copyright 2020–2022 the [ExS WordPress Theme](https://exsthemewp.com). Code released under the MIT License

### Demo images

Copyright [pxhere.com](https://pxhere.com):

*   [https://pxhere.com/en/photo/919919](https://pxhere.com/en/photo/919919)
*   [https://pxhere.com/en/photo/919915](https://pxhere.com/en/photo/919915)
*   [https://pxhere.com/en/photo/765310](https://pxhere.com/en/photo/765310)