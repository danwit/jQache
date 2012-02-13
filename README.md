jQache - A simple jQuery Selector (object) cache
===============================
jQache is a simple jQuery selector (object) cache. Simply add ".q" after "$" when selecting elements and you should be good to go.   

Don't wrap jQuery again and again and again... on DOM-elements. Use a selector cache in combination with carefully chaining.

# Performance

jQache comes with a little performance test. Wanna see some results? Here you go:

<pre>
10 Times
Without cache: 13 ms
With jQache: 5 ms
Performance increase: 61.54 %

100 Times
Without cache: 58 ms
With jQache: 18 ms
Performance increase: 68.97 %

1000 Times
Without cache: 421 ms
With jQache: 176 ms
Performance increase: 58.19 %

10000 Times
Without cache: 3982 ms
With jQache: 1786 ms
Performance increase: 55.15 %
</pre>

# Setup

Just load ``` <script src="path/to/js/jqache-0.1.1.min.js"></script>
``` after jQuery.

# Usage

### $.q( *string* selector, [*bool* clear] )

```javascript
// copy $(".item") into jQache and do stuff
$.q(".item").css("display", "none");

// fetch a fresh copy of $(".item") into jQache and do stuff
$.q(".item", true).css("display", "none");
```

### $.q.assign( *object* options )

##### Single

```javascript
// equivalent to $.q(".item")
$.q.assign({
    selector: ".item"
});

// assign name "inventory" to $(".item")
$.q.assign({
    selector: ".item",
    name: "inventory"
});

// get assigned objects
$.q("inventory");

// refresh this object every 60 seconds
$.q.assign({
    selector: ".item",
    name: "inventory",
    interval: 60
});
```

##### Namespaces
```javascript
// assign a namespace
$.q.assign({
    selector: ".item",
    name: "inventory",
    namespace: "lists"
});

// get objects from namespace
$.q.lists("inventory");

// get fresh objects from namespace
$.q.lists("inventory", true);

// get everything from namespace
$.q.lists();
```
### .q.clear( [*string* namespace] )
```javascript
//clear everything
$.q.clear();

//clear namespace
$.q.clear("inventory");
```
### Example

##### Markup
```html
    <ul>
        <li class="list"></li>
    </ul>
```
##### Script
```javascript
$.fn.ready( function(){

    console.log ( $.q(".list") ); // 1 element

    $("ul").append("<li class='list'> item </li>");
    $("ul").append("<li class='list'> item </li>");

    console.log ( $.q(".list") ); // still 1 element
    console.log ( $.q(".list", true) ); // 3 elements
});
```
