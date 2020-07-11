type Csv = Array<Array<string|number>>;

function csvToArray(csv: string, delimiter: string): Csv {
    return csv.split('\n').map(l => l.trim().split(delimiter).map(i => isNaN(parseFloat(i.trim()))?i.trim():parseInt(i.trim())));
}

export {
    Csv,
    csvToArray
}
