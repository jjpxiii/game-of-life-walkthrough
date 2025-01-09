const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 10;
const FRAME_INTERVAL = 500; // 0.5s between frames
const COLORS = ['#9be9a8', '#40c463', '#30a14e', '#216e39'];

let grid = [];
let cols, rows;
let lastDrawTime = 0;

/**
 * @description Resize the canvas and initialize the grid
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / CELL_SIZE);
    rows = Math.floor(canvas.height / CELL_SIZE);
    initializeGrid();
}

/**
 * @description Initialize the grid with random live cells
 */
function initializeGrid() {
    grid = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => Math.random() > 0.7)
    );
}

/**
 * @description Draw the grid on the canvas
 */
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
                const neighbors = countLiveNeighbors(i, j);
                ctx.fillStyle = COLORS[Math.min(3, neighbors)];
                drawCell(i, j);
            }
        }
    }
}

/**
 * @description Draw a single cell
 * @param {number} x - The x-coordinate of the cell
 * @param {number} y - The y-coordinate of the cell
 */
function drawCell(x, y) {
    ctx.beginPath();
    ctx.roundRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1, 2);
    ctx.fill();
}

/**
 * @description Count the number of live neighbors for a cell
 * @param {number} x - The x-coordinate of the cell
 * @param {number} y - The y-coordinate of the cell
 * @returns {number} The number of live neighbors
 */
/**
 * Counts the number of live neighbors for a cell at position (x, y) in the grid.
 * Implements a toroidal (wrapping) grid where edges connect to opposite sides.
 * 
 * @param {number} x - The x-coordinate (column) of the cell
 * @param {number} y - The y-coordinate (row) of the cell
 * @returns {number} The count of live neighbors (0-8) surrounding the cell
 * 
 * The function:
 * 1. Checks all 8 surrounding cells (-1,-1 to 1,1)
 * 2. Skips the center cell (0,0) which is the cell itself
 * 3. Handles edge wrapping using modulo operator
 * 4. Adds up the state of each neighbor (1 for alive, 0 for dead)
 */
function countLiveNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const col = (x + i + cols) % cols;
            const row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    return sum;
}

/**
 * @description Update the grid based on the rules of Conway's Game of Life
 */
function updateGrid() {
    const nextGrid = grid.map((arr, i) =>
        arr.map((cell, j) => {
            const neighbors = countLiveNeighbors(i, j);
            if (cell && (neighbors < 2 || neighbors > 3)) return false;
            if (!cell && neighbors === 3) return true;
            return cell;
        })
    );
    grid = nextGrid;
}

/**
 * @description Animation loop
 * @param {number} currentTime - The current time
 */
function animate(currentTime) {
    if (currentTime - lastDrawTime >= FRAME_INTERVAL) {
        drawGrid();
        updateGrid();
        lastDrawTime = currentTime;
    }
    requestAnimationFrame(animate);
}

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
animate(0);
