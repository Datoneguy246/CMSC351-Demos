// G is the graph stored as an adjacency matrix,
// S is the starting vertex of the algorithm
function ShortestPathAlgorithm(G, S) {
    // Initialize the distance array with all the distances as infinity (except for the start node)
    let distances = new Array(G.length);
    for (let i = 0; i < G.length; i++) {
        distances[i] = i == S ? 0 : Infinity;
    }

    // Initialize the predecessor array with all the predecessors as NULL
    let pred = new Array(G.length);
    for (let i = 0; i < G.length; i++) {
        pred[i] = null;
    }

    // Traversal queue starts off with only the starting node
    let queue = [S];

    // DISPLAY
    display(G, queue, distances, pred, 0, 0);

    while (queue.length > 0) { // Loop while the queue is not empty
        let currentVertex = queue.shift(); // .shift() is the same as .dequeue() in this example

        let updated = false; // DISPLAY

        // Iterate through all the edges from this vertex
        let edges = G[currentVertex];
        for (let e = 0; e < edges.length; e++) {
            if (G[currentVertex][e] == 0) {
                // No edge here
                continue;
            }
            // There exists an edge from currentVertex --> e

            // Check if the distance is currently infinity or not
            if (distances[e] == Infinity) {
                updated = true; // DISPLAY

                // This is the first time this node is visited, update distance and pred
                pred[e] = currentVertex;
                distances[e] = distances[currentVertex] + 1;

                // Enqueue this vertex for future visiting
                queue.push(e); // .push() is the same as .enqueue() in this example

                // DISPLAY
                display(G, queue, distances, pred, currentVertex, e);
            }
        }

        // DISPLAY
        if (!updated)
            display(G, queue, distances, pred, 0, 0);
    }

    // Return updated distance and predecessor arrays as a tuple
    return [distances, pred];
}

// HTML DISPLAY ONLY
const out = document.getElementById("out");
let a = [];
function cleara(G) {a = []; for (let x = 0; x < G.length; x++) { let r = []; for (let y = 0; y < G[x].length; y++) { r.push("0"); } a.push(r); }}
function adda(i,j) {a[i][j] = "1";}
function display(G, q, d, p, i, j) {
    adda(i,j);
    let div = document.createElement("div");
    let gid = ("g" + Math.pow((i+1) * (j+1), q.length));
    let graph = document.createElement("div"); graph.id = gid; graph.className = "inline";
    let data = document.createElement("div"); data.className = "inline";
    let qtxt = "<strong>Q:</strong> [ "; for (let i = q.length-1; i >= 0; i--) {qtxt += q[i] + " ";} qtxt += "]<br>";
    let dtxt = "<strong>D:</strong> [ "; for (let i = 0; i < d.length; i++) {dtxt += (d[i] == Infinity ? "&infin;" : d[i]) + " ";} dtxt += "]<br>";
    let ptxt = "<strong>P:</strong> [ "; for (let i = 0; i < p.length; i++) {ptxt += (p[i] == null ? "N" : p[i]) + " ";} ptxt += "]<br>";
    data.innerHTML = qtxt + dtxt + ptxt;
    div.appendChild(graph); div.appendChild(data);
    out.appendChild(div); createGraph(G, false, false, graph, a);
}