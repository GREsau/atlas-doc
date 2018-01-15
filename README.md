# atlas-doc

[![npm version](https://img.shields.io/npm/v/atlas-doc.svg)](https://www.npmjs.com/package/atlas-doc)
[![Build status](https://img.shields.io/travis/GREsau/atlas-doc.svg)](https://travis-ci.org/GREsau/atlas-doc)
[![Code coverage](https://img.shields.io/codecov/c/github/GREsau/atlas-doc.svg)](https://codecov.io/gh/GREsau/atlas-doc)

Easily create [Atlassian Documents](https://developer.atlassian.com/cloud/stride/apis/document/structure/) for use with the Stride API.

## Installing

```sh
$ npm install atlas-doc
```

## Basic Usage

```javascript
// ES6:
import { doc, sup, emoji } from 'atlas-doc'

doc('The 1', sup('st'), ' example', emoji('grinning'))

// ES5:
var atlas = require('atlas-doc')

atlas.doc('The 1', atlas.sup('st'), ' example', atlas.emoji('grinning'))
```

This would produce a javascript object representing the document:
> The 1<sup>st</sup> example :grinning:


A document is created with the `doc` function, which takes any number of strings and/or child nodes as arguments.

Most nodes type have their own function, many of which have an alias corresponding to their HTML tag. e.g. all of the following do the same:
```javascript
import { doc, bulletList, listItem, strong, underline, ul, li, b, u } from 'atlas-doc'

doc(bulletList(listItem(strong('foo')), listItem(underline('bar'))))
// or
doc(ul(li(b('foo')), li(u('bar'))))
// or even
doc(ul(b('foo'), u('bar'))) // nodes in a list are implicitly wrapped in a listItem where necessary
```
Resulting in the document:
> - **foo**
> - _bar_

## Nodes

Nodes are the components of a document - see [Nodes](nodes.md) for details.

## Marks

Marks can used with `text` nodes (or strings) to apply formatting and hyperlinks - see [Marks](marks.md) for details.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details
