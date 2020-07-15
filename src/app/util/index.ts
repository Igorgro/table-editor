type Table = Array<Array<string|number>>;

function csvToTable(csv: string, delimiter: string): Table {
    return csv.split('\n')
              .map(l => l.trim())
              .filter(l => l&&true)
              .map(l => l.split(delimiter)
                         .map(i => isNaN(parseFloat(i.trim()))?i.trim()
                                                                .replace(/"/g, ''):parseInt(i.trim())));
}

function tableToCsv(table:Table): string {
    let csv: string = '';
    table.forEach(line => {
        line.forEach((item, i) => {
            if (typeof item == 'string') csv += `"${item}"`
            else                         csv += `${item}`
            if (i < line.length - 1) csv += ', '
        });
        csv += '\n';
    });
    return csv;
}

export {
    Table,
    csvToTable,
    tableToCsv
}
