type Table = Array<Array<string|number>>;

function csvToArray(csv: string, delimiter: string): Table {
    return csv.split('\n')
              .map(l => l.trim())
              .filter(l => l&&true)
              .map(l => l.split(delimiter)
                         .map(i => isNaN(parseFloat(i.trim()))?i.trim()
                                                                .replace(/"/g, ''):parseInt(i.trim())));
}

export {
    Table,
    csvToArray
}
