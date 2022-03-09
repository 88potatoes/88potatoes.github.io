const answer = document.getElementById("answer");
const matrix = document.getElementById("matrix");
const menu = document.getElementById("menu");

const mat1dim = document.getElementById("mat1dim");
const mat2dim = document.getElementById("mat2dim");

let matrices = [[],[]];
let answer_matrix = [];
let discontinue = false;
let vmin = -5, vmax = 5, smin = 1, smax = 3;

let r = [3,3], c = [3,3];
//making the input matrices
for (let i = 0; i < 2; i++)
{
    matrix.appendChild(make_input_matrix(r[i],c[i]));
}

//calculates the product of matrices
function calculate()
{
    if (r[1] != c[0])
    {
        console.log("size of matrix is invalid");
        return;
    }
    fetch_array();
    if (discontinue)
    {
        discontinue = false;
        return;
    }

    answer_matrix = [];
    for (let i = 0; i < r[0]; i++)
    {
        answer_matrix[i] = [];
    }

    let matrix2t = transpose(matrices[1]);

    for (let i = 0; i < r[0]; i++)
    {
        for (let j = 0; j < c[1]; j++)
        {
            answer_matrix[i][j] = dot_product(matrices[0][i], matrix2t[j]);
        }
    }

    //printing out to the screen
    change_answer(latex_string(answer_matrix));
}

//stores the values in the input matrices into 'matrices' array
function fetch_array()
{
    for (let a = 0, k = matrices.length; a < k; a++)
    {
        matrices[a] = [];
        let current_matrix = matrix.children[a];
        for (let i = 0; i < r[a]; i++)
        {
            let temp = [];
            let current_row = current_matrix.children[i];
            for (let j = 0; j < c[a]; j++)
            {
                let current_entry = current_row.children[j];
                let v = current_entry.value;
                if (!isNaN(+v) && v.trim() != "")
                {
                    temp.push(parseFloat(v));
                }
                else
                {
                    console.log("invalid entry");
                    discontinue = true;
                    return;
                }
            }
            matrices[a].push(temp);
        }
    }
}

//transposes a matrix and returns it -
function transpose(old_matrix)
{
    let new_matrix = [];

    for (let j = 0, c = old_matrix[0].length; j < c; j++)
    {
        let temp_row = [];
        for (let i = 0, r = old_matrix.length; i < r; i++)
        {
            temp_row.push(old_matrix[i][j]);
        }
        new_matrix.push(temp_row);
    }
    return new_matrix;
}

//perform the dot product -
function dot_product(arr1, arr2)
{
    if (arr1.length != arr2.length) return;

    let a = 0;
    for (let i = 0, l = arr1.length; i < l; i++)
    {
        a += arr1[i] * arr2[i];
    }

    return a;
}

//returns a latex string -
function latex_string(smat)
{
    let s = "\\begin{bmatrix}";
    for (let i = 0, r = smat.length; i < r; i++)
    {
        for (let j = 0, c = smat[i].length; j < c; j++)
        {
            s += smat[i][j];
            if (j < c - 1)
            {
                s +="&";
            }
            else
            {
                s += " \\\\ ";
            }
        }
    }
    s += "\\end{bmatrix}";
    return s;
}

//randomizes values of the visible input matrices
function randomize_values()
{
    if(vmin > vmax)
    {
        console.log("min value is greater than max value");
        return;
    }

    for (let i = 0, n = matrix.children.length; i < n; i++)
    {
        let temp_matrix = matrix.children[i];
        for (let j = 0, m = temp_matrix.children.length; j < m; j++)
        {
            let temp_row = temp_matrix.children[j];
            for (let k = 0, o = temp_row.children.length; k < o; k++)
            {
                temp_ent = temp_row.children[k];
                temp_ent.value = rr_int(vmin, vmax);
            }
        }
    }
    change_answer("");
}

//randomize values and size of input matrices
function randomize_values_all()
{
    if (smin > smax)
    {
        console.log("error: smin > smax");
        return;
    }

    for (let i = 0; i < 2; i++)
    {
        r[i] = rr_int(smin, smax);
    }
    c[0] = r[1];
    c[1] = rr_int(smin, smax);

    generate_matrices();
    randomize_values();
}

//returns a random integer between a min and max value -
function rr_int(min, max)
{
    if (vmin > vmax)
    {
        console.log("error: vmin > vmax");
        return;
    }

    let range = max - min;
    return Math.floor(Math.random() * (range + 1)) + min;
}

//returns an input matrix (div object) of a given size -
function make_input_matrix(rows, columns)
{
    let current_matrix = document.createElement("div");
    current_matrix.classList.add("matrix_children");

    for (let i = 0; i < rows; i++)
    {
        let temp_row = document.createElement("div");
        for (let j = 0; j < columns; j++)
        {
            let temp_ent = document.createElement("input");
            temp_ent.setAttribute("type", "text");
            temp_ent.classList.add("inputs");
            temp_row.appendChild(temp_ent);
        }
        current_matrix.appendChild(temp_row);
    }
    return current_matrix;
}

//generates new matrixes of a new size
function generate_matrices()
{
    let child = matrix.lastElementChild;
    while(child)
    {
        matrix.removeChild(child);
        child = matrix.lastElementChild;
    }

    for (let i = 0; i < 2; i++)
    {
        matrix.appendChild(make_input_matrix(r[i], c[i]));
    }


}

//stores matrix dimension values in arrays 'r' and 'c'
function get_dim()
{
    r[0] = mat1dim.children[0].value;
    c[0] = mat1dim.children[1].value;

    r[1] = mat2dim.children[0].value;
    c[1] = mat2dim.children[1].value;
}

//changes the answer value
function change_answer(str)
{
    answer.innerText = str;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, answer]);
}

//returns the trace of an array
function get_trace(smat){
    //first check if the matrix is square
    if (smat.length != smat[0].length){
        console.log("requires a suare matrix");
        return;
    }

    let total = 0;

    for (let i = 0, n = smat.length; i < n; i++)
    {
        total += smat[i][i];
    }
    return total;
}

//displays trace (matrix 1) onto answer
function display_trace(){
    fetch_array();
    change_answer(`trace: ${get_trace(matrices[0])}`);
}

//displays transpose (matrix 1) onto answer
function display_transpose()
{
    fetch_array();

    change_answer(latex_string(transpose(matrices[0])));
}

//returns a row swapped matrix if needed - also makes a leading 1
//smat = matrix, col = column being checked, k = row up to
function swap_row(smat, col, k)
{
    //if top left digit is not 0
    if (smat[k][col] != 0){
        if (smat[k][col] == 1)
        {
            return smat;
        }
        else
        {
            let temp = smat[k][col];
            for (let i = 0, n = smat[k].length; i < n; i++)
            {
                smat[k][i] /= temp;
            }
            return smat;
        }
    }

    //if top left digit is 0
    for (let i = k + 1, n = smat.length; i < n; i++)
    {
        if (smat[i][col] != 0)
        {
            [smat[k], smat[i]] = [smat[i], smat[k]];
            let temp = smat[k][col];

            if (temp == 1)
            {
                return smat;
            }

            for (let i = col, n = smat[k].length; i < n; i++)
            {
                smat[k][i] /= temp;
            }

            return smat;
        }

        //if the column is all zeros below k
        return smat;
    }
}

//returns a b*line added to the original line
function add_line(hline, mult, aline)
{
    for (let i = 0, n = hline.length; i < n; i++)
    {
        hline[i] += mult*aline[i];
    }

    return hline;
}

//returns a matrix in ref
function g_elim(smat)
{
    if (!smat) return;
    
    let rows = smat.length, cols = smat[0].length, k = 0;
    
    for (let i = 0; i < cols; i++)
    {
        smat = swap_row(smat, i, k);

        if (smat[k][i] == 0)
        {
            continue;
        }

        for (let j = k + 1; j < rows; j++)
        {
            smat[j] = add_line(smat[j], -smat[j][i], smat[k]);
        }
        if (k == rows - 1) break;
        k++;
    }

    return smat;
}

//returns a matrix in rref
function gj_elim(smat)
{
    console.log("START");
    smat = g_elim(smat);
    
    let k = smat.length - 1;

    for (let i = k; i >= 0; i--)
    {
        for(let j = 0, l = smat[0].length; j < l; j++)
        {
            if(smat[i][j] == 1)
            {
                for (let m = 0; m < i; m++)
                {
                    smat[m] = add_line(smat[m], -smat[m][j], smat[i])
                }
                break;
            }
        }
    }
    console.table(smat);
    return smat;
}

//does gj elim
function do_gj_elim(){
    fetch_array();
    change_answer(latex_string(gj_elim(matrices[0])));
}

function do_g_elim()
{
    fetch_array();
    change_answer(latex_string(g_elim(matrices[0])));
}