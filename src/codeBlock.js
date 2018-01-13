import DocFormatError from './DocFormatError'
import text from './text'

const languages = ['abap', 'actionscript', 'ada', 'arduino', 'autoit', 'c', 'c++', 'clojure', 'coffeescript', 'csharp', 'css', 'cuda', 'd', 'dart', 'delphi', 'elixir', 'erlang', 'fortran', 'foxpro', 'go', 'groovy', 'haskell', 'haxe', 'html', 'java', 'javascript', 'json', 'julia', 'kotlin', 'latex', 'livescript', 'lua', 'mathematica', 'matlab', 'objective-c', 'objective-j', 'objectpascal', 'ocaml', 'octave', 'perl', 'php', 'powershell', 'prolog', 'puppet', 'python', 'qml', 'r', 'racket', 'restructuredtext', 'ruby', 'rust', 'sass', 'scala', 'scheme', 'shell', 'smalltalk', 'sql', 'standardml', 'swift', 'tcl', 'tex', 'typescript', 'vala', 'vbnet', 'verilog', 'vhdl', 'xml', 'xquery']
const languageAliases = { cpp: 'c++', 'c#': 'csharp', objectivec: 'objective-c', objectivej: 'objective-j' }

export default function codeBlock (language, ...content) {
  language = languageAliases[language] || language
  if (language && languages.indexOf(language) === -1) {
    throw new DocFormatError(`Invalid codeBlock language '${language}' - must be one of ${languages.join(',')}`)
  }

  const textContent = content.map(c => typeof c === 'string' ? text(c) : c)

  for (const node of textContent) {
    if (!node || node.type !== 'text') {
      throw new DocFormatError(`codeBlock can only contain text, but found: ${JSON.stringify(node)}`)
    }
    if (node.marks && node.marks.length) {
      throw new DocFormatError(`codeBlock text must not have marks, but found: ${JSON.stringify(node.marks)}`)
    }
  }

  const node = {
    type: 'codeBlock',
    content: textContent
  }
  if (language) {
    node.attrs = { language }
  }
  return node
}

for (const language of languages) {
  codeBlock[language] = (...content) => codeBlock(language, ...content)
}
for (const alias of Object.keys(languageAliases)) {
  const language = languageAliases[alias]
  codeBlock[alias] = (...content) => codeBlock(language, ...content)
}
codeBlock.plain = (...content) => codeBlock(null, ...content)
