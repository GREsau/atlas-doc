
export class DocFormatError extends Error {
    constructor(message: any, ...rest: any[]);

}

export function a(content: any, url: string): any;

export function b(content: any): any;

export function blockquote(...content: any[]): any;

export function br(): any;

export function bulletList(...items: any[]): any;

export function code(content: any): any;

export function codeBlock(language?: string, ...content: any[]): any;

export function color(content: any, color: string): any;

export function doc(...content: any[]): any;

export function em(content: any): any;

export function emoji(shortName: string, altText?: string): any;

export function emphasis(content: any): any;

export function h1(...content: any[]): void;

export function h2(...content: any[]): void;

export function h3(...content: any[]): void;

export function h4(...content: any[]): void;

export function h5(...content: any[]): void;

export function h6(...content: any[]): void;

export function hardBreak(): any;

export function heading(level: number, ...content: any[]): any;

export function hr(): any;

export function i(content: any): any;

export function li(...content: any[]): any;

export function link(content: any, url: string): any;

export function listItem(...content: any[]): any;

export function media(type: string, id: string, collection: string): any;

export function mediaGroup(...media: any[]): any;

export function mention(userId: string): any;

export function ol(startFrom: number, ...items: any[]): any;
export function ol(...items: any[]): any;

export function orderedList(startFrom: number, ...items: any[]): any;
export function orderedList(...items: any[]): any;

export function p(...content: any[]): any;

export function panel(type: string, ...content: any[]): any;

export function paragraph(...content: any[]): any;

export function rule(): any;

export function s(content: any): any;

export function strike(content: any): any;

export function strong(content: any): any;

export function sub(content: any): any;

export function subscript(content: any): any;

export function sup(content: any): any;

export function superscript(content: any): any;

export function table(...rows: any[]): any;

export function tableCell(...content: any[]): any;

export function tableHeader(...content: any[]): any;

export function tableRow(...cells: any[]): any;

export function taskItem(isDone: boolean, ...content: any[]): any;
export function taskItem(...content: any[]): any;

export function taskList(...items: any[]): any;

export function td(...content: any[]): any;

export function text(content: any): any;

export function th(...content: any[]): any;

export function tr(...cells: any[]): any;

export function u(content: any): any;

export function ul(...items: any[]): any;

export function underline(content: any): any;

export namespace codeBlock {
    function abap(...content: any[]): void;

    function actionscript(...content: any[]): void;

    function ada(...content: any[]): void;

    function arduino(...content: any[]): void;

    function autoit(...content: any[]): void;

    function c(...content: any[]): void;

    function clojure(...content: any[]): void;

    function coffeescript(...content: any[]): void;

    function cpp(...content: any[]): void;

    function csharp(...content: any[]): void;

    function css(...content: any[]): void;

    function cuda(...content: any[]): void;

    function d(...content: any[]): void;

    function dart(...content: any[]): void;

    function delphi(...content: any[]): void;

    function elixir(...content: any[]): void;

    function erlang(...content: any[]): void;

    function fortran(...content: any[]): void;

    function foxpro(...content: any[]): void;

    function go(...content: any[]): void;

    function groovy(...content: any[]): void;

    function haskell(...content: any[]): void;

    function haxe(...content: any[]): void;

    function html(...content: any[]): void;

    function java(...content: any[]): void;

    function javascript(...content: any[]): void;

    function json(...content: any[]): void;

    function julia(...content: any[]): void;

    function kotlin(...content: any[]): void;

    function latex(...content: any[]): void;

    function livescript(...content: any[]): void;

    function lua(...content: any[]): void;

    function mathematica(...content: any[]): void;

    function matlab(...content: any[]): void;

    function objectivec(...content: any[]): void;

    function objectivej(...content: any[]): void;

    function objectpascal(...content: any[]): void;

    function ocaml(...content: any[]): void;

    function octave(...content: any[]): void;

    function perl(...content: any[]): void;

    function php(...content: any[]): void;

    function plain(...content: any[]): void;

    function powershell(...content: any[]): void;

    function prolog(...content: any[]): void;

    function puppet(...content: any[]): void;

    function python(...content: any[]): void;

    function qml(...content: any[]): void;

    function r(...content: any[]): void;

    function racket(...content: any[]): void;

    function restructuredtext(...content: any[]): void;

    function ruby(...content: any[]): void;

    function rust(...content: any[]): void;

    function sass(...content: any[]): void;

    function scala(...content: any[]): void;

    function scheme(...content: any[]): void;

    function shell(...content: any[]): void;

    function smalltalk(...content: any[]): void;

    function sql(...content: any[]): void;

    function standardml(...content: any[]): void;

    function swift(...content: any[]): void;

    function tcl(...content: any[]): void;

    function tex(...content: any[]): void;

    function typescript(...content: any[]): void;

    function vala(...content: any[]): void;

    function vbnet(...content: any[]): void;

    function verilog(...content: any[]): void;

    function vhdl(...content: any[]): void;

    function xml(...content: any[]): void;

    function xquery(...content: any[]): void;

}

export namespace media {
    function file(id: string, collection: string): void;

    function link(id: string, collection: string): void;

}

export namespace panel {
    function info(...content: any[]): void;

    function note(...content: any[]): void;

    function tip(...content: any[]): void;

    function warning(...content: any[]): void;

}
