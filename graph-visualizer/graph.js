const canvasHeight = 200;
const canvasWidth = 400;
const topY = canvasHeight / 3;
const bottomY = canvasHeight - topY;
const nodeRadius = 10;
const xBuffer = 10;

function drawArrow(ctx, x1, y1, x2, y2, arrowHeadLength = 10) {
    // Draw the main line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Compute angle of the line
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
        x2 - arrowHeadLength * Math.cos(angle - Math.PI / 6),
        y2 - arrowHeadLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        x2 - arrowHeadLength * Math.cos(angle + Math.PI / 6),
        y2 - arrowHeadLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(x2, y2);
    ctx.fill();  // or ctx.stroke() for open arrowhead
}


function drawLine(ctx, x1,y1,x2,y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
}

function getNodePos(i, nodeCount) {
    let x = ((2*(canvasWidth - nodeRadius - xBuffer)) / nodeCount) * Math.floor(i/2);
    x += nodeRadius + xBuffer;
    let yOffset = nodeRadius * Math.floor(i/2);
    let y = (i % 2 == 0 ? bottomY + yOffset: topY - yOffset); 
    return [x, y];
}

function createGraph(adj_mat, directed, weighted, output, v_mat = null) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx.canvas.height = canvasHeight; ctx.canvas.width = canvasWidth;

    // Draw graph
    let nodeCount = adj_mat.length;
    for (let i = 0; i < nodeCount; i++) {
        console.log("Drawing node: " + i);

        // Draw this node
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        let [x, y] = getNodePos(i, nodeCount);
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.font = "12px Arial";
        ctx.fillText(i.toString(), x - nodeRadius / 3, y + nodeRadius / 3);
        ctx.stroke();

        // Draw edges
        for (let j = 0; j < adj_mat[i].length; j++) {
            if (adj_mat[i][j] == "0")  
                continue;

            let [xj, yj] = getNodePos(j, nodeCount);
            let d = dist(x,y,xj,yj);
            let [sx, sy] = pointTowards(x,y,xj,yj, nodeRadius);
            let [ex, ey] = pointTowards(x,y,xj,yj, d-nodeRadius);

            let isAnnotatedEdge = v_mat != null && v_mat[i][j] != "0";
            if (isAnnotatedEdge) {
                ctx.fillStyle = "red";
                ctx.strokeStyle = "red";
            } else {
                ctx.fillStyle = "black";
                ctx.strokeStyle = "black";
            }

            if (directed || isAnnotatedEdge) {
                drawArrow(ctx, sx, sy, ex, ey);
            } else {
                drawLine(ctx, sx, sy, ex, ey);
            }
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";

            if (weighted) {
                ctx.stroke();
                ctx.beginPath();

                let weightX = (x + xj) / 2;
                let weightY = (y + yj) / 2;
                ctx.arc(weightX, weightY, nodeRadius / 1.5, 0, 2 * Math.PI);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.font = "8px Arial";
                ctx.fillText(adj_mat[i][j], weightX - nodeRadius / 4.5, weightY + nodeRadius / 4.5);
                ctx.stroke();

                ctx.beginPath();
            }
        }
    }

    // Render and add to output
    ctx.stroke();
    output.appendChild(canvas);
}

function dist(x1,y1,x2,y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function pointTowards(x1, y1, x2, y2, d) {
    let length = dist(x1,y1,x2,y2);

    if (length === 0) {
        return [x1, y1]; // Avoid division by zero; no direction
    }

    const scale = d / length;
    return [
        x1 + (x2 - x1) * scale,
        y1 + (y2 - y1) * scale
    ];
}
