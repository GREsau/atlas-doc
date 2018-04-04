# Nodes

There are two main types of nodes: block nodes (e.g. `paragraph`) and inline nodes (e.g. `text`).

**Block nodes** can be used directly in a `doc`, and can also contain other nodes or specific types. 

Normally in Atlassian document format, an **inline node** cannot be used directly in a `doc`. But this works in `atlas-doc`, as it will implicitly wrap inline nodes in a `paragraph` whenever they're used where a block node expected.

## applicationCard
Not yet supported by `atlas-doc`, sorry!

## blockquote
```javascript
blockquote(...content)
```

A block node that can contain other block nodes, representing quoted content.

```javascript
blockquote('Some text', blockquote('And they can be nested!'))
```
> > Some text
> > > And they can be nested!

## bulletList
*alias: `ul`*
```javascript
bulletList(...listItems)
```

A block node representing an unordered list with leading bullets.

```javascript
bulletList('First', 'Second', 'Third')
```
> - First
> - Second
> - Third

If you want a single list item to contain multiple nodes, wrap them in a `listItem`/`li`.

```javascript
bulletList(
  listItem('First, ', 'still first')
  listItem('Second, with indented list: ', bulletList('Hi!', 'Hello!'))
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
codeBlock('javascript', 'var x = 1\n', 'alert(x)')
// or
codeBlock.javascript('var x = 1\n', 'alert(x)')
```
> ```javascript
> var x = 1
> alert(x)

If you don't want to specify a language (i.e. you just want monospaced text with no syntax highlighting), give a falsey value as the first argument to `codeBlock()`, or use the `codeBlock.plain()` helper function.

```javascript
codeBlock(null, 'This will be monospaced')
// or
codeBlock.plain('This will be monospaced')
```
> ```
> This will be monospaced

## decisionItem / decisionList
```javascript
decisionItem(isDecided, ...content)
decisionItem(...content)
decisionList(...items)
```
Nodes for creating decisions. Normally in Atlassian document format, the `decisionList` block node can only contain `decisionItem` nodes, but `atlas-doc` will implicitly wrap other content in a `decisionItem` when it occurs directly in a `decisionList`. `atlas-doc` will also implicitly wrap `decisionItem`s in a `decisionList` when necessary.

You can create a task that is already complete with the `isDecided` parameter, which defaults to false. At time of writing, the decided state of a decision doesn't appear to have any effect on how it's presented in the Stride application. A `decisionItem` can contain one or more inline nodes.

```javascript
doc(decisionList(decisionItem(true, 'We decided!'), 'What about...?', 'And...?'))
// equivalent to
doc(decisionItem(true, 'We decided!'), decisionItem(false, 'What about...?'), decisionItem('And...?'))
```
> ![decisionItem example](https://i.imgur.com/z1p8RxN.png)

## emoji
```javascript
emoji(shortName)
emoji(shortName, altText)
```

An inline node representing an emoji. You can give the `shortName` with or without the colons at the start/end. If `altText` is given, then it will be displayed when no matching emoji could be found.

```javascript
paragraph(emoji('poop'), emoji(':poop:'), emoji('non-existent emoji', 'oops'))
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
paragraph('Line 1', hardBreak(), 'Line 2')
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

A block node that can only contain `text` nodes. `level` must be an integer between 1 and 6, where 1 is the largest heading and 6 is the smallest.

```javascript
doc(heading(1, 'Title'), heading(2, 'Subheading'), heading(4, 'Subsubsubheading'), 'Regular text')
```
> # Title
> ## Subheading
> #### Subsubsubheading
> Regular text

## media
```javascript
media(type, id, collection)
media(id, collection)
media.file(id, collection)
media.link(id, collection)
```

A node used to embed a file or image that has been uploaded with the Stride Media API. For more information on uploading files to Stride, see the [Sending Media guide](https://developer.atlassian.com/cloud/stride/learning/sending-media/) from Atlassian.

If the `type` argument is given, it must be either "link" or "file" - if omitted, it defaults to "file".

Normally in Atlassian document format, a `media` node can only occur in a `mediaGroup`, but `atlas-doc` will implicitly wrap `media` in a `mediaGroup` when necessary.

```javascript
doc(media('file-id', 'conversation-id'))
```

## mediaGroup
```javascript
mediaGroup(...content)
```

A block node that can only contain `media` nodes. You'd rarely need to use this directly, unless you want to explicitly group multiple `media` nodes together/separately.

```javascript
doc(mediaGroup(media('file-1a', 'conversation'), media('file-1b', 'conversation')), media('file-2', 'conversation'))
```

## mention
```javascript
mention(userId)
```

An inline node used to mention a user.

```javascript
mention('some-user-id')
```
> @SomeUser

## listItem
*alias: `li`*
```javascript
listItem(...content)
```

A node used to group multiple block nodes into a single item within a list. See `bulletList` and `orderedList` for details.

## orderedList
*alias: `ol`*
```javascript
orderedList(...listItems)
orderedList(startFrom, ...listItems)
```

A block node representing an ordered list with leading numbers. The `startFrom` argument can be used to set the number of the first list item, which defaults to 1.

```javascript
orderedList(3, 'Third', 'Fourth', 'Fifth')
```
> 3. Third
> 4. Fourth
> 5. Fifth

If you want a single list item to contain multiple nodes, wrap them in a `listItem`/`li`.

```javascript
orderedList(
  listItem('First, ', 'still first')
  listItem('Second, with indented list: ', orderedList('Hi!', 'Hello!'))
)
```
> 1. First, still first
> 2. Second, with indented list:
>     1. Hi!
>     2. Hello!

## panel
```javascript
panel(type, ...content)
panel.info(...content)
panel.note(...content)
panel.tip(...content)
panel.warning(...content)
```

A block node that can contain other block nodes to be promoted in a document. If calling `panel()` directly, the `type` argument must be either "info", "note", "tip" or "warning".

```javascript
panel('info', 'Some text', panel.warning('And they can be nested!'))
```
> ![Panel example](https://i.imgur.com/hLWN1ol.png)

## paragraph
*alias: `p`*
```javascript
paragraph(...content)
```

A block node that can contain inline nodes. Whenever any inline nodes are used where a block node is expected (such as directly in a `doc` node), they are implicitly wrapped in a `paragraph`.

```javascript
doc(paragraph('The first paragraph'), paragraph('The ', 'second ', 'paragraph'))
```
> The first paragraph
>
> The second paragraph

## rule
*alias: `hr`*
```javascript
rule()
```

A block node that represents a horizontal divider in the document.

```javascript
doc('The first section', rule(), 'The second section')
```
> The first section
>
> ----------
>
> The second section

## table / tableRow / tableHeader / tableCell
*aliases: `tr` / `th` / `td`*
```javascript
table(...rows)
tableRow(...cells)
tableHeader(...content)
tableCell(...content)
```

Nodes for creating tables. The `table` block node can only contain `tableRow` nodes. Normally in Atlassian document format, a `tableRow` node can only contain `tableHeader` or `tableCell` nodes, but `atlas-doc` will implicitly wrap other content in a `tableCell` when it occurs directly in a `tableRow`. A `tableHeader` or `tableCell` node can contain block nodes.

```javascript
table(
  tableRow(tableHeader('First header'), tableHeader('Second header')),
  tableRow(tableCell('First cell'), tableCell('Second cell')),
  tableRow('First text', 'Second text')
)
```
> | First header | Second header |
> | ------------ | ------------- |
> | First cell   | Second cell   |
> | First text   | Second text   |

## taskItem / taskList
```javascript
taskItem(isDone, ...content)
taskItem(...content)
taskList(...items)
```
Nodes for creating tasks, also called "actions" in the Stride application. Normally in Atlassian document format, the `taskList` block node can only contain `taskItem` nodes, but `atlas-doc` will implicitly wrap other content in a `taskItem` when it occurs directly in a `taskList`. `atlas-doc` will also implicitly wrap `taskItem`s in a `taskList` when necessary.

You can create a task that is already complete with the `isDone` parameter, which defaults to false. A `taskItem` can contain one or more inline nodes.

```javascript
doc(taskList(taskItem(true, 'Already done!'), 'Do this', 'And this'))
// equivalent to
doc(taskItem(true, 'Already done!'), taskItem(false, 'Do this'), taskItem('And this'))
```
> ![taskItem example](https://i.imgur.com/KJf1dRT.png)

## text
```javascript
text(textContent)
```
An inline node representing raw text. You should never need to use this directly, as `atlas-doc` will implicitly wrap a plain string in a `text` node where necessary.

```javascript
doc(text('Hello there'))
// equivalent to
doc('Hello there')
```
> Hello there

Marks can used with `text` nodes (or strings) to apply formatting and hyperlinks - see [Marks](marks.md) for details.