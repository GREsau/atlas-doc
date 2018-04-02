# Marks

Marks can used with `text` nodes (or strings) to apply formatting and hyperlinks.

Most (but not all) marks can be combined, e.g.
```javascript
emphasis(link(strong('wow'), 'http://example.com')))
```
> [***wow***](http://example.com)

## code
```javascript
code(textContent)
```
```javascript
code('var x = 1;')
```
> `var x = 1;`

## color
```javascript
color(textContent, color)
```
```javascript
color('colorful', '#cc00ee')
```
> ![Text color example](https://i.imgur.com/8n9YOd2.png)

## emphasis
*aliases: `em` or `i`*
```javascript
emphasis(textContent)
```
```javascript
emphasis('wow')
```
> *wow*

## link
*alias: `a`*
```javascript
link(textContent, url)
```
```javascript
link('Click here', 'http://example.com')
```
> [Click here](http://example.com)

## strike
*alias: `s`*
```javascript
strike(textContent)
```
```javascript
strike('wrong')
```
> ~~wrong~~

## strong
*alias: `b`*
```javascript
strong(textContent)
```
```javascript
strong('important')
```
> **important**

## subscript
*alias: `sub`*
```javascript
subscript(textContent)
```
```javascript
subscript('down here')
```
> <sub>down here</sub>

## superscript
*alias: `sup`*
```javascript
superscript(textContent)
```
```javascript
superscript('up here')
```
> <sup>up here</sup>

## underline
*alias: `u`*
```javascript
underline(textContent)
```
```javascript
underline('underlined')
```
> ![Underline example](https://i.imgur.com/MkcsRtg.png)
