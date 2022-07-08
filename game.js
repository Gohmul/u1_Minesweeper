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

placeBombs = () => {
  var i,
    rows = []

  for (i = 0; i < components.numOfBombs; i++) {
    placeSingleBomb(rows)
  }
  return rows
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

cellID = (i, j) => {
  return 'cell-' + i + '-' + j
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

function CellListeners(td, i, j) {
  td.addEventListener('mousedown', function (event) {
    if (!components.alive) {
      return
    }
    components.mousewhiches += event.which
    if (event.which === 3) {
      return
    }
    if (this.warned) {
      return
    }
    this.style.backgroundColor = 'lightGrey'
  })

  td.addEventListener('mouseup', function (event) {
    if (!components.alive) {
      return
    }

    if (this.clicked && components.mousewhiches == 4) {
      performMassClick(this, i, j)
    }

    components.mousewhiches = 0

    if (event.which === 3) {
      if (this.clicked) {
        return
      }
      if (this.warned) {
        this.warned = false
        this.textContent = ''
      } else {
        this.warned = true
        this.textContent = components.flag
      }

      event.preventDefault()
      event.stopPropagation()

      return false
    } else {
      handleCellClick(this, i, j)
    }
  })

  td.oncontextmenu = function () {
    return false
  }
}

handleCellClick = (cell, i, j) => {
  if (!components.alive) {
    return
  }

  if (cell.warned) {
    return
  }

  cell.clicked = true

  if (components.bombs[i][j]) {
    cell.style.color = 'red'
    cell.textContent = components.bomb
    gameOver()
  } else {
    cell.style.backgroundColor = 'lightGrey'
    numOfBombs = adjacentBombs(i, j)
    if (numOfBombs) {
      cell.style.color = components.colors[numOfBombs]
      cell.textContent = numOfBombs
    } else {
      AdjacentBombs(i, j)
    }
  }
}

adjacentBombs = (row, col) => {
  var i, j, numOfBombs
  numOfBombs = 0

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      if (components.bombs[row + i] && components.bombs[row + i][col + j]) {
        numOfBombs++
      }
    }
  }
  return numOfBombs
}

adjacentWarnings = (row, col) => {
  var i, j, numWarnings
  numWarnings = 0

  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      cell = document.getElementById(cellID(row + i, col + j))
      if (!!cell && cell.warned) {
        numWarnings++
      }
    }
  }
  return numWarnings
}
