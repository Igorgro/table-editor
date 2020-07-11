type Csv = Array<Array<string|number>>;

function csvToArray(csv: string, delimiter: string): Csv {
    return csv.split('\n')
              .map(l => l.trim())
              .filter(l => l&&true)
              .map(l => l.split(delimiter)
                         .map(i => isNaN(parseFloat(i.trim()))?i.trim().replace(/"/, ''):parseInt(i.trim())));
}

export {
    Csv,
    csvToArray
}
