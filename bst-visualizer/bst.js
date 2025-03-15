const nodeRadius = 10;
const baseCanvasWidth = 100;
const baseCanvasHeight = 75;
const nodeDist = 7.5;


let canvasWidth = baseCanvasWidth;
let canvasHeight = baseCanvasHeight;
function createBST(list, output) {
    canvasWidth = Math.log2(list.length+1) * baseCanvasWidth;
    canvasHeight = Math.floor(Math.log2(list.length+1)) * (baseCanvasHeight + nodeDist);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.canvas.height = canvasHeight; ctx.canvas.width = canvasWidth;
    ctx.beginPath();

    let originX = canvasWidth/2;
    let originY = canvasHeight/10;
    drawNode(ctx, list, 0, originX, originY, 0);

    // Render and add to output
    ctx.stroke();
    output.appendChild(canvas);
}

function drawNode(ctx, list, index, x, y, depth) {
    if (index >= list.length) return;

    let element = list[index];

    // Draw the node
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.font = "12px Arial";
    ctx.fillText(element, x - nodeRadius / (3/element.length), y + nodeRadius / 3);

    // Compute child indices
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;

    // Compute positions for children
    let xOffset = canvasWidth / Math.pow(2, depth + 2); // Spacing reduces as depth increases
    let yOffset = 30;

    if (leftIndex < list.length) {
        let newX = x - xOffset;
        let newY = y + yOffset;
        let curEdge = pointOnLine(x, y, (Math.PI / 4), nodeRadius, true);
        drawLine(ctx, curEdge[0], curEdge[1], newX, newY - nodeRadius);
        drawNode(ctx, list, leftIndex, newX, newY, depth + 1);
    }

    if (rightIndex < list.length) {
        let newX = x + xOffset;
        let newY = y + yOffset;
        let curEdge = pointOnLine(x, y, (Math.PI / 4), nodeRadius, false);
        drawLine(ctx, curEdge[0], curEdge[1], newX, newY - nodeRadius);
        drawNode(ctx, list, rightIndex, newX, newY, depth + 1);
    }
}


function drawLine(ctx, x1,y1,x2,y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
}

function pointOnLine(x,y,angle,dist,left) {
    return [x + (left ? -dist : dist) * Math.cos(angle), y + (dist * Math.sin(angle))];
}