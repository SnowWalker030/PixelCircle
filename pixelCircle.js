const inp = document.querySelector('#inpR');
const ls = document.querySelector('#ls');
const mat = document.querySelector('#matrix');
const pix = document.querySelector('#pixel');
let r, intR, r_2, limit, Rx, dx;
let Arr1 = [];
let Arr2 = [];

function draw(){
    intR = r%1;
    r_2 = r**2;
    limit = Math.floor(r / 2**.5 - intR);
    Rx = Math.floor(r) * (Math.ceil(r)-1);
    dx = r*2 - 2;
    Arr1 = [];
    Arr2 = [];

    for(i=r-0.5;i>limit;i--){
        if(intR){
            Arr1.push(
                Math.floor((r_2-Rx)**.5) + 0.5
            );
        }else{
            Arr1.push(
                Math.round((r_2-Rx-0.25)**.5)
            );
        };
        Rx -= dx;
        dx -= 2;
    };

    for(i=Arr1.length-1;i>0;){
        Arr2[i] = Arr1[i] - Arr1[--i];
    };
    Arr2[0] = Arr1[0];
    console.log(Arr2);
};
function checkC(){
    r = Number(inp.value);
    if(r>=0.5 && r%0.5==0){
        if(r <= 10000000){
            draw();
        }else if(r > 10000000 && confirm(`你输入的半径( ${r})已超过 1千万，\n继续操作可能造成设备停顿。\n是否继续？`)){
            draw();
        };
    }else{
        alert('请输入 ≥0.5 ，且小数为 0 或 5 的半径\n(如：0.5，2.0，7)');
    };
};
function checkL(){
    if(r>=0.5 && r%0.5==0){
        if(r <= 100000){
            renderL();
        }else if(r > 100000 && confirm(`你输入的半径( ${r})已超过 10万，\n继续操作可能造成设备停顿。\n是否继续？（ 建议尝试生成Array ）`)){
            renderL();
        };
    }else{
        alert('请先点击Generated生成数据');
    };
};
function checkM(){
    if(r>=0.5 && r%0.5==0){
        if(r <= 5000000){
            renderM();
        }else if(r > 5000000 && confirm(`你输入的半径( ${r})已超过 500万，\n继续操作可能造成设备停顿。\n是否继续？（ 建议Ctrl+Shift+J直接查看Console面板 ）`)){
            renderM();
        };
    }else{
        alert('请先点击Generated生成数据');
    };
};
function checkP(){
    if(r>=0.5 && r%0.5==0){
        if(r <= 5000){
            renderP();
        }else if(r > 5000 && confirm(`你输入的半径( ${r})已超过 5000，\n继续操作可能造成设备停顿。\n是否继续？（ 建议尝试使用Excel生成器 ）`)){
            renderP();
        };
    }else{
        alert('请先点击Generated生成数据');
    };
};
function renderL(){
    ls.style.display = '';
    mat.style.display = 'none';
    pix.style = 'none';
    ls.innerHTML = "<tr><th id='no'>No</th><th id='y'>Radius_Y</th></tr>"
    for(i=0;i<Arr2.length;i++){
        li = document.createElement('tr');
        li.innerHTML = `<td>${i+1}</td><td>${Arr2[i]}</td>`;
        ls.appendChild(li);
    };
};
function renderM(){
    ls.style.display = 'none';
    mat.style.display = '';
    pix.style = 'none';
    max = Arr2[0].toString().length;
    regSpace = RegExp(`^.*(.{${max}})$`,'g');
    link = JSON.stringify(Arr2).replace(/\[|\]/g,'');
    console.log(link)
    link = link.replace(/,\d+/g,addSpace);
    mat.innerHTML = link;
};
function renderP(){
    ls.style.display = 'none';
    mat.style.display = 'none';
    pix.style = '';
    map = '';
    a = Math.floor(Arr1[Arr1.length-1]) - limit;
    b = Arr1[Arr1.length-1] + Arr1.length - a;
    for(i=0;i<Arr2.length-a;i++){
        map += '&emsp;'.repeat(b-Arr1[i]) + '&block;'.repeat(Arr2[i]) + '<br>'
    };
    for(i=Arr2.length-1;i>-1;i--){
        map += ('&emsp;'.repeat(i)+'&block;<br>').repeat(parseFloat(Arr2[i]))
    };
    pix.innerHTML = map;
};
function addSpace(v){
    vNew = v.replace(/,(\d+)/g,'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0$1');
    return vNew.replace(regSpace,' $1');
};