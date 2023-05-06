export function dedent (text: string, preservedIndent = 0): string {
    const trimmedFirstLineBreak = text.replace(/^\n/, '')
    const trimmedLastLineBreak = trimmedFirstLineBreak.replace(/\n$/, '')
    const lines = trimmedLastLineBreak.split('\n')
    const rawIndent = Math.min(...lines.filter(line => line !== '').map(line => line.search(/[^ ]|$/)))

    const toTrimIndentText = ' '.repeat(Math.max(rawIndent, 0))
    const indentText = ' '.repeat(Math.max(preservedIndent, 0))

    return lines.map(line => line === '' ? line : line.replace(toTrimIndentText, indentText)).join('\n')
}
