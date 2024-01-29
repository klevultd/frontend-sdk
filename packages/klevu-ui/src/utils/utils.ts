import { KlevuRecord } from "@klevu/core"

/**
 * Run callback only if it hasn't been requested in last `delay` milliseconds.
 *
 * @param callback function to call
 * @param wait time to wait in milliseconds
 * @returns
 */
export function debounce<T extends unknown[], U>(callback: (...args: T) => PromiseLike<U> | U, wait: number) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: T): Promise<U> => {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait)
    })
  }
}

/**
 * Strip html tags from string.
 *
 * @param html
 * @returns
 */
export function stripTags(html: string): string {
  if (!document) {
    return html
  }

  const tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}

/**
 * Convert markdown string to html.
 *
 * @param mdstr
 * @returns html
 */
export function markdown(mdstr:string): string {
  let formatTag = function (html:string) { return html.replace(/</g,'&lt;').replace(/\>/g,'&gt;'); };
  // table syntax
  mdstr = mdstr.replace(/\n(.+?)\n.*?\-\-\s?\|\s?\-\-.*?\n([\s\S]*?)\n\s*?\n/g, function (m,p1,p2) {
    var thead = p1.replace(/^\|(.+)/gm,'$1').replace(/(.+)\|$/gm,'$1').replace(/\|/g,'<th>')
    var tbody = p2.replace(/^\|(.+)/gm,'$1').replace(/(.+)\|$/gm,'$1')
    tbody = tbody.replace(/(.+)/gm,'<tr><td>$1</td></tr>').replace(/\|/g,'<td>')
    return '\n<table>\n<thead>\n<th>' + thead + '\n</thead>\n<tbody>' + tbody + '\n</tbody></table>\n\n'
  } )

  // horizontal rule => <hr>
  mdstr = mdstr.replace(/^-{3,}|^\_{3,}|^\*{3,}$/gm, '<hr>').replace(/\n\n<hr\>/g, '\n<br><hr>')

  // header => <h1>..<h5>
  mdstr = mdstr.replace(/^##### (.*?)\s*#*$/gm, '<h5>$1</h5>')
    .replace(/^#### (.*?)\s*#*$/gm, '<h4>$1</h4>')
    .replace(/^### (.*?)\s*#*$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)\s*#*$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)\s*#*$/gm, '<h1>$1</h1>')
    .replace(/^<h(\d)\>(.*?)\s*{(.*)}\s*<\/h\d\>$/gm, '<h$1 id="$3">$2</h$1>')

  // inline code-block: `code-block` => <code>code-block</code>
  mdstr = mdstr.replace(/``(.*?)``/gm, function(m,p){ return '<code>' + formatTag(p).replace(/`/g,'&#96;') + '</code>'} )
  mdstr = mdstr.replace(/`(.*?)`/gm, '<code>$1</code>' )

  // blockquote, max 2 levels => <blockquote>{text}</blockquote>
  mdstr = mdstr.replace(/^\>\> (.*$)/gm, '<blockquote><blockquote>$1</blockquote></blockquote>')
  mdstr = mdstr.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
  mdstr = mdstr.replace(/<\/blockquote\>\n<blockquote\>/g, '\n<br>' )
  mdstr = mdstr.replace(/<\/blockquote\>\n<br\><blockquote\>/g, '\n<br>' )

  // image syntax: ![title](url) => <img alt="title" src="url" />
  mdstr = mdstr.replace(/!\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<img alt="$1" src="$2" $3 />')
  mdstr = mdstr.replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" width="90%" />')

  // links syntax: [title "title"](url) => <a href="url" title="title">text</a>
  mdstr = mdstr.replace(/\[(.*?)\]\((.*?) "new"\)/gm, '<a href="$2" target=_new>$1</a>')
  mdstr = mdstr.replace(/\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<a href="$2" title="$3">$1</a>')
  mdstr = mdstr.replace(/([<\s])(https?\:\/\/.*?)([\s\>])/gm, '$1<a href="$2">$2</a>$3')
  mdstr = mdstr.replace(/\[(.*?)\]\(\)/gm, '<a href="$1">$1</a>')
  mdstr = mdstr.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')

  // unordered/ordered list, max 2 levels  => <ul><li>..</li></ul>, <ol><li>..</li></ol>
  mdstr = mdstr.replace(/^[\*+-][ .](.*)/gm, '<ul><li>$1</li></ul>' )
  mdstr = mdstr.replace(/^\d\d?[ .](.*)/gm, '<ol><li>$1</li></ol>' )
  mdstr = mdstr.replace(/^\s{2,6}[\*+-][ .](.*)/gm, '<ul><ul><li>$1</li></ul></ul>' )
  mdstr = mdstr.replace(/^\s{2,6}\d[ .](.*)/gm, '<ul><ol><li>$1</li></ol></ul>' )
  mdstr = mdstr.replace(/<\/[ou]l\>\n\n?<[ou]l\>/g, '\n' )
  mdstr = mdstr.replace(/<\/[ou]l\>\n<[ou]l\>/g, '\n' )

  // text decoration: bold, italic, underline, strikethrough, highlight
  mdstr = mdstr.replace(/\*\*\*(\w.*?[^\\])\*\*\*/gm, '<b><em>$1</em></b>')
  mdstr = mdstr.replace(/\*\*(\w.*?[^\\])\*\*/gm, '<b>$1</b>')
  mdstr = mdstr.replace(/\*(\w.*?[^\\])\*/gm, '<em>$1</em>')
  mdstr = mdstr.replace(/___(\w.*?[^\\])___/gm, '<b><em>$1</em></b>')
  mdstr = mdstr.replace(/__(\w.*?[^\\])__/gm, '<u>$1</u>')
  // mdstr = mdstr.replace(/_(\w.*?[^\\])_/gm, '<u>$1</u>')  // NOT support!!
  mdstr = mdstr.replace(/\^\^\^(.+?)\^\^\^/gm, '<mark>$1</mark>')
  mdstr = mdstr.replace(/\^\^(\w.*?)\^\^/gm, '<ins>$1</ins>')
  mdstr = mdstr.replace(/~~(\w.*?)~~/gm, '<del>$1</del>')

  // line break and paragraph => <br/> <p>
  mdstr = mdstr.replace(/  \n/g, '\n<br/>').replace(/\n\s*\n/g, '\n<p>\n')

  // indent as code-block
  mdstr = mdstr.replace(/^ {4,10}(.*)/gm, function(m,p) { return '<pre><code>' + formatTag(p) + '</code></pre>'} )
  mdstr = mdstr.replace(/^\t(.*)/gm, function(m,p) { return '<pre><code>' + formatTag(p) + '</code></pre>'} )
  mdstr = mdstr.replace(/<\/code\><\/pre\>\n<pre\><code\>/g, '\n' )

  // Escaping Characters
  return mdstr.replace(/\\([`_~\*\+\-\.\^\\\<\>\(\)\[\]])/gm, '$1' );
}

/**
 * Global settings that modify the way Klevu UI library works.
 */
export type KlevuUIGlobalSettings = {
  /**
   * When user clicks the product
   *
   * @param item Product that was clicked
   * @param event Event that triggered the click
   * @return false if the event should be prevented and stopped
   */
  onItemClick?: (item: Partial<KlevuRecord>, event: MouseEvent) => boolean

  /**
   * Function to generate url for product in case using default klevu-products
   */
  generateProductUrl?: (product: Partial<KlevuRecord>) => string

  /**
   * Generic way to render prices. By default browser currency renderer is used
   */
  renderPrice?: (amount: number | string, currency: string) => string

  /**
   * Replace icons with custom image based ones
   */
  icons?: {
    [key: string]: string
  }

  /**
   * Disables custom scrollbars and uses native browser ones instead.
   */
  useNativeScrollbars?: boolean
}

export function closestElement<T extends Element>(selector: string, base: Element) {
  function __closestFrom(el: Element | Window | Document): T | null {
    if (!el || el === document || el === window) {
      return null
    }
    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot!
    }
    let found: T | null = (el as Element).closest(selector)
    return found ? found : __closestFrom(((el as Element).getRootNode() as ShadowRoot).host)
  }
  return __closestFrom(base)
}
