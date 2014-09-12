# inflector.js

Transforms words to singular or plural.  
This is a (not complete) js port of [inflector class](http://docs.jboss.org/jbossdna/0.5/apidocs/org/jboss/dna/common/text/Inflector.html) by Randall Hauch.


### Installing
```bash
$ bower install inflector
```
Add this to your HTML file:
```html
<script src="bower_components/inflector/dist/inflector.min.js"></script>
```

Use it like this:
```js
inflector.pluralize("airplane"); // returns airplanes
inflector.singularize("videos"); // returns video

```

### Note:
I'm not a linguist, and there is some errors.  
Use at your own risk, debug me and send pull requests