// G is the graph stored as an adjacency matrix,
// S is the starting vertex of the algorithm
function BFS(G, S) {
    // Initialize the visited array with all false (except the starting vertex)
    let visited = new Array(G.length);
    for (let i = 0; i < G.length; i++) {
        visited[i] = i == S ? true : false;
    }

    // List to keep track of the visit order
    let vorder = [S];

    // Traversal queue starts off with only the starting node
    let queue = [S];

    // DISPLAY
    display(G, queue, visited, vorder, 0, 0);

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

            // Check if we've visited this node before
            if (visited[e] == false) {
                updated = true; // DISPLAY

                // Enqueue this vertex for future visiting
                queue.push(e); // .push() is the same as .enqueue() in this example

                // Mark as visited, and add to the visit order
                visited[e] = true;
                vorder.push(e); // .push() is not necessarily the same as .enqueue() here. It just appends the element to the end of the list

                // DISPLAY
                display(G, queue, visited, vorder, currentVertex, e);
            }
        }

        // DISPLAY
        if (!updated)
            display(G, queue, visited, vorder, 0, 0);
    }

    // Return vorder
    return vorder;
}

// HTML DISPLAY ONLY
const out = document.getElementById("out");
let a = [];
function cleara(G) {a = []; for (let x = 0; x < G.length; x++) { let r = []; for (let y = 0; y < G[x].length; y++) { r.push("0"); } a.push(r); }}
function adda(i,j) {a[i][j] = "1";}
function display(G, q, v, vo, i, j) {
    adda(i,j);
    let div = document.createElement("div");
    let gid = ("g" + Math.pow((i+1) * (j+1), q.length));
    let graph = document.createElement("div"); graph.id = gid; graph.className = "inline";
    let data = document.createElement("div"); data.className = "inline";
    let qtxt = "<strong>Q:</strong> [ "; for (let i = q.length-1; i >= 0; i--) {qtxt += q[i] + " ";} qtxt += "]<br>";
    let vtxt = "<strong>V:</strong> [ "; for (let i = 0; i < v.length; i++) {vtxt += (v[i] ? "T" : "F") + " ";} vtxt += "]<br>";
    let otxt = "<strong>ORDER:</strong> [ "; for (let i = 0; i < vo.length; i++) {otxt += vo[i] + " ";} otxt += "]<br>";
    data.innerHTML = qtxt + vtxt + otxt;
    div.appendChild(graph); div.appendChild(data);
    out.appendChild(div); createGraph(G, false, false, graph, a);
}