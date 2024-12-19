const node_for_click_trans = document.getElementById("for_click_trans");

let isTrans = false;

function find_trans_all() {
    const paragraphs = document.getElementsByTagName('p');

    if (isTrans) {
        paragraphs[0].innerText = 'Борисов';
        paragraphs[1].innerText = 'Борис';
        paragraphs[2].innerText = 'Борисович';
    } else {
        paragraphs[0].innerText = 'Borisov';
        paragraphs[1].innerText = 'Boris';
        paragraphs[2].innerText = 'Borisovich';
    }
    isTrans = !isTrans;
}

node_for_click_trans.addEventListener("click", find_trans_all);

