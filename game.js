var components = {
  numOfRows: 15,
  numOfColumns: 15,
  numOfBombs: 35,
  bomb: '💣',
  alive: true,
  colors: {
    1: 'blue',
    2: 'green',
    3: 'purple',
    4: 'red',
    5: 'red',
    6: 'red',
    7: 'red',
    8: 'red'
  }
}

startGame = () => {
  components.bombs = placeBombs()
  document.getElementById('field').appendChild(createTable())
}

placeSingleBomb = (bombs) => {
  var newRow, newColumn, row, col
  newRow = Math.floor(Math.random() * components.numOfRows)
  newColumn = Math.floor(Math.random() * components.numOfColumns)
  row = bombs[newRow]

  if (!row) {
    row = []
    bombs[newRow] = row
  }

  col = row[newColumn]

  if (!col) {
    row[newColumn] = true
    return
  } else {
    placeSingleBomb(bombs)
  }
}

createTable = () => {
  var table, row, td, i, j
  table = document.createElement('table')

  for (i = 0; i < components.numOfRows; i++) {
    row = document.createElement('tr')
    for (j = 0; j < components.numOfColumns; j++) {
      td = document.createElement('td')
      td.id = cellID(i, j)
      row.appendChild(td)
      CellListeners(td, i, j)
    }
    table.appendChild(row)
  }
  return table
}
