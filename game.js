let can = document.getElementById("can");
let con = can.getContext("2d");
const BLOCK_SIZE = 45;
const PIECE_SIZE = 2;

//フィールドサイズ
const FIELD_COL = 8;
const FIELD_ROW = 10;

//キャンバスサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

//選択しているブロック
let cur = 1;

//手数
let cnt = 0;

can.width = SCREEN_W;
can.height = SCREEN_H;
const PIECE_COLORS =[
    "#FFFFFF",       //0空
    "#800000",       //1茶
    "#800080",       //2紫
    "#FFFF00",       //3黄
    "#FF0000",       //4赤
    "#006400",       //5緑
    "#00BFFF",       //6水
    
];
const BLOCK_TYPES = [
    [],//空っぽ

    [                 //1.musume
        [1, 1],
        [1, 1]
    ],
    [                 //2
        [1, 1],
        [0, 1]
    ],
    [                 //3
        [1, 0],
        [1, 1]
    ],
    [                 //4
        [1, 1],
        [1, 0]
    ],
    [                 //5
        [0, 1],
        [1, 1]
    ],
    [                 //6
        [0, 0],
        [1, 1]
    ]
]


//フィールド本体
let field = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

let field_cur = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

//ゲームクリアフラグ
let gameClear = false;

//ブロックの座標


let fig_x = [0, 3, 2, 2, 4, 4, 3];
let fig_y = [0, 1, 4, 5, 4, 5, 6];


drawAll();


//ブロックを一つ描画する
function drawBlock(x, y, c){
    let px = x * BLOCK_SIZE;
    let py = y * BLOCK_SIZE;

    con.fillStyle = PIECE_COLORS[c];
    con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    con.strokeStyle = "black";
    con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    
}

function drawBlock2(x, y, c){
    let px = x * BLOCK_SIZE;
    let py = y * BLOCK_SIZE;

    con.fillStyle = PIECE_COLORS[c];
    con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    con.strokeStyle = "black";
    

}

//全部描画する
function drawAll(){
    con.clearRect(0, 0, SCREEN_W, SCREEN_H);
    //con.fillStyle = "#000";
    //con.fillRect(0, 0, SCREEN_W, SCREEN_H);
    //field_cur = field.concat();
    for(let y = 0; y < FIELD_ROW; y++){
        for(let x = 0; x < FIELD_COL; x++){
            if(field[y][x] == 0){
                drawBlock(x, y, field[y][x]);
            }
        }
    }
    
    for(let i = 1; i < BLOCK_TYPES.length; i++){
        for(let y = 0; y < PIECE_SIZE; y++){
            for(let x = 0; x < PIECE_SIZE; x++){
                if(BLOCK_TYPES[i][y][x]){
                    drawBlock2(fig_x[i] + x, fig_y[i] + y, i);
                    field_cur[fig_y[i] + y][fig_x[i] + x] = i + 1;
                }
            }
        }
    } 
    if(gameClear){
        let s = "CLEAR!";
        con.font = "40px 'MS ゴシック'";
        let w = con.measureText(s).width;
        let x = SCREEN_W/2 - w/2;
        let y = SCREEN_H/2 - 20;
        con.lineWidth = 4;
        con.strokeText(s, x, y);
        con.fillStyle = "white";
        con.fillText(s, x, y);
    }
    
}

function checkMove(mx, my, i){
    for(let y = 0; y < PIECE_SIZE; y++){
        for(let x = 0; x < PIECE_SIZE; x++){
            let nx = fig_x[i] + x + mx;
            let ny = fig_y[i] + y + my;
            if(BLOCK_TYPES[i][y][x]){
                if(field_cur[ny][nx] != i + 1 && field_cur[ny][nx] != 0)
                    return false;
            }
        }
    }
    for(let y = 0; y < PIECE_SIZE; y++){
        for(let x = 0; x < PIECE_SIZE; x++){

            if(BLOCK_TYPES[i][y][x])field_cur[fig_y[i] + y][fig_x[i] + x] = 0;
        }
    }
    for(let y = 0; y < PIECE_SIZE; y++){
        for(let x = 0; x < PIECE_SIZE; x++){
            let nx = fig_x[i] + x + mx;
            let ny = fig_y[i] + y + my;
            if(BLOCK_TYPES[i][y][x])field_cur[ny][nx] = i;
        }
    }
    
    cnt++;
    info.innerHTML =  "娘（茶色）を救出して！ 現在：" + cnt + "手";
    return true;
}



document.onkeydown = keydown;


function keydown(e){
    if(gameClear) return;
    switch(e.key){
        case "a":
            if(checkMove(-1, 0, cur))fig_x[cur]--;
            break;
        case "w":
            if(checkMove(0, -1, cur))fig_y[cur]--;
            break;
        case "d":
            if(checkMove(1, 0, cur))fig_x[cur]++;
            break;
        case "s":
            if(checkMove(0, 1, cur))fig_y[cur]++;
            break;   
    }
    if(fig_x[1] == 3 && fig_y[1] == 7)gameClear = true;
    drawAll();
}

can.addEventListener("click",e=>{
    const rect = e.target.getBoundingClientRect();

        // ブラウザ上での座標を求める
    const   viewX = e.clientX - rect.left,
            viewY = e.clientY - rect.top;

        // 表示サイズとキャンバスの実サイズの比率を求める
    const   scaleWidth =  can.clientWidth / can.width,
            scaleHeight =  can.clientHeight / can.height;

        // ブラウザ上でのクリック座標をキャンバス上に変換
    const   canvasX = Math.floor( viewX / scaleWidth ),
            canvasY = Math.floor( viewY / scaleHeight );

    const   realX = Math.floor(canvasX / BLOCK_SIZE);
    const   realY = Math.floor(canvasY / BLOCK_SIZE);

    console.log( realX,realY );

    cur = field_cur[realY][realX] - 1;
});

function reset(){
    location.reload();
}
