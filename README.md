# atlas-doc

[![Build Status](https://img.shields.io/travis/GREsau/atlas-doc.svg?style=flat)](https://travis-ci.org/GREsau/atlas-doc)
[![Code Coverage](https://img.shields.io/codecov/c/github/GREsau/atlas-doc.svg?style=flat)](https://codecov.io/gh/GREsau/atlas-doc)
[![License](https://img.shields.io/github/license/GREsau/atlas-doc.svg?style=flat)](https://github.com/GREsau/atlas-doc/blob/master/LICENSE)

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

# Nodes

There are two main types of nodes: block nodes (e.g. `paragraph`) and inline nodes (e.g. `text`).

**Block nodes** can be used directly in a `doc`, and can also contain other nodes or specific types. 

Normally in Atlassian document format, an **inline node** cannot be used directly in a `doc` But you can in `atlas-doc`, as it will implicitly wrap inline nodes in a `paragraph` whenever they're used where a block node expected.

## applicationCard
Not yet supported by `atlas-doc`, sorry!

## blockquote
```javascript
blockquote(...content)
```

A block node that can contain other block nodes, representing quoted content.

```javascript
blockquote("Some text", blockquote("And they can be nested!"))
```
> > Some text
> > > And they can be nested!

## bulletList
*alias: `ul`*
```javascript
bulletList(...listItems)
```

A block node that can contain other block nodes, representing quoted content.

```javascript
bulletList("First", "Second", "Third")
```
> - First
> - Second
> - Third

If you want a single list item to contain multiple nodes, wrap them in a `listItem`/`li`.

```javascript
bulletList(
  listItem("First, ", "still first")
  listItem("Second, with indented list: ", bulletList("Hi!", "Hello!"))
)
```
> - First, still first
> - Second, with indented list:
>   - Hi!
>   - Hello!

## codeBlock
```javascript
codeBlock(language, ...content)
codeBlock.plain(...content)
codeBlock.csharp(...content)
codeBlock.javascript(...content) // etc.
```

A block node that can only contain unmarked text nodes. To specify the language, give it as the first argument to `codeBlock()`, or use one of the helper functions on the `codeBlock` object.

```javascript
codeBlock("javascript", "var x = 1\n", "alert(x)")
codeBlock.javascript("var x = 1\n", "alert(x)")
```
> ```javascript
> var x = 1
> alert(x)

If you don't want to specify a language (i.e. you just want monospaced text with no syntax highlighting), give a falsey value as the first argument to `codeBlock()`, or use the `codeBlock.plain()` helper function.

```javascript
codeBlock(null, "This will be monospaced")
codeBlock.plain("This will be monospaced")
```
> ```
> This will be monospaced

## decisionItem / decisionList
Not yet supported by `atlas-doc`, sorry!

## emoji
```javascript
emoji(shortName)
emoji(shortName, altText)
```

An inline node representing an emoji. You can give the `shortName` with or without the colons at the start/end. If `altText` is given, then it will be displayed when no matching emoji could be found.

```javascript
paragraph(emoji("poop"), emoji(":poop:"), emoji("non-existent emoji", "oops"))
```
> :poop: :poop: oops

## doc
```javascript
doc(...content)
```

A special node that must be used at the very top-level, and contains block nodes. It cannot be contained within any other node.

## hardBreak
*alias: `br`*
```javascript
hardBreak()
```

An inline node representing a new line.

```javascript
paragraph("Line 1", hardBreak(), "Line 2")
```
> Line 1  
> Line 2

## heading
```javascript
heading(level, ...content)
h1(...content)
h2(...content)
h3(...content)
h4(...content)
h5(...content)
h6(...content)
```

A block node that can only contain text nodes. `level` must be an integer between 1 and 6, where 1 is the largest heading and 6 is the smallest.

```javascript
doc(heading(1, "Title"), heading(2, "Subheading"), heading(4, "Subsubsubheading"), "Regular text")
```
> # Title
> ## Subheading
> #### Subsubsubheading
> Regular text

## media / mediaGroup

## mention

## listItem
*alias: `li`*

## orderedList
*alias: `ol`*

## panel

## paragraph
*alias: `p`*

## rule
*alias: `hr`*

## table / tableRow / tableHeader / tableCell
*aliases: `tr` / `th` / `td`*

## taskItem / taskList
Not yet supported by `atlas-doc`, sorry!

## text

### code

### emphasis
*aliases: `em` or `i`*

### link
*alias: `a`*

### strike
*alias: `s`*

### strong
*alias: `b`*

### subscript
*alias: `sub`*

### supscript
*alias: `sup`*

### textColor

### underline
*alias: `u`*

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details