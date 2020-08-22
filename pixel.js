const model=(function(){

    let colors=['#000000'];
    let currentColor=colors[0];
    let usingBucket=false;

    const cell=document.createElement('div');
    const screenWidth=document.body.clientWidth;
    const screenHeight=document.body.clientHeight;
    const cellX=Math.floor(screenWidth/30);
    const cellY=Math.floor(screenHeight/30);
    const board=document.querySelector('.board');
    const pixelStack=[]

    let isDrawing=false;

    return{
        colors,
        cell,
        screenHeight,
        screenWidth,
        cellX,
        cellY,
        board,
        isDrawing,
        currentColor,
        usingBucket,
        pixelStack
    }

})()



const ui=(function(){

    function showBoard(cellY,cellX,board){
        for(let i=0;i<cellY;i++){
            const tr=document.createElement('tr');
            for(let j=0;j<cellX;j++){
                const td=document.createElement('td');
                td.classList.add('cell');
                td.id=`[${i},${j}]`;
                tr.appendChild(td);
            }
            board.appendChild(tr);
        }
    }

    function draw(target,color){
        target.style.backgroundColor=color;
    }

    function showHide(){
        // SHOW/HIDE MENU
        document.querySelector('.menu').classList.toggle('menu-expand')

        // REVERSE THE SHOW/HIDE BUTTON
        document.querySelector('.fa-chevron-right').classList.toggle('fa-left')
    }

    function showColor(colors){

        // EMPTY THE CONENT OF UI
        var colorArray=document.querySelector(".color-array");
        colorArray.innerHTML='';

        // ADD EACH COLOR AS DIV WITH CLASS 'COLOR'
        colors.forEach(colorCode=>{

            let div=document.createElement('div');
            div.classList.add('color');
            div.style.backgroundColor=colorCode;

            colorArray.appendChild(div);
        })
    }

    return{
        showBoard,
        draw,
        showHide,
        showColor
    }

})()


const controller=(function(){

    // 1 SHOW BOARD
    window.addEventListener('load',()=>{
        ui.showBoard(model.cellY,model.cellX,model.board)
    })

    // 2 DRAW PIXELS

    // 2.0 SELECT PENCIL TOOL
    document.querySelector(".pencil").addEventListener('click',()=>{
        model.usingBucket=false;
    })

    // 2.1 DRAW BY CLICK
    document.addEventListener('click',(e)=>{
        if(!model.usingBucket){
            if(e.target.classList.contains('cell')){
                ui.draw(e.target,model.currentColor);
            }
        }   
    })

    // 2.2 DRAG DRAW
    
    // 2.2.1 LISTEN FOR MOUSEDOWN
    document.addEventListener('mousedown',()=>{
        model.isDrawing=true;
    })

    // 2.2.2 LISTEN FOR MOUSEDRAG
    document.addEventListener('mousemove',(e)=>{
        if(!model.usingBucket){
            if(model.isDrawing){
                if(e.target.classList.contains('cell')){
                    ui.draw(e.target,model.currentColor)
                }
            }
        }      
    })

    // 2.2.3 LISTEN FOR MOUSEUP
    document.addEventListener('mouseup',()=>{
        if(model.isDrawing) model.isDrawing=false;
    })

    // 3 SHOT/HIDE MENU 
    document.querySelector('.circle').addEventListener('click',()=>{
        ui.showHide();
    })

    // 4 COLORS

    // 4.1 SHOW COLOR ON LOAD
    window.addEventListener('load',()=>{
        ui.showColor(model.colors)
    })

    // 4.2 ADD COLOR
    document.querySelector('button').addEventListener('click',()=>{
        // GET COLOR VALUE
        let newColor=document.querySelector('input').value;

        // ADD COLOR TO THE COLOR ARRAY
        model.colors.push(newColor);

        // MAKE IT THE CURRENT COLOR
        model.currentColor=model.colors[model.colors.length-1];

        // DISPLAY COLORS
        ui.showColor(model.colors)
    })

    // 4.3 SELECT COLOR 

    document.querySelector('.color-array').addEventListener('click',(e)=>{

        const domColors=document.querySelectorAll('.color');

        // LOOP THROUGH COLOR
        for(let i=0;i<domColors.length;i++){
            domColors[i].addEventListener('click',()=>{
                // CHNAGE CURRENT COLOR
                model.currentColor=model.colors[i];
            })
        }

    })


    // 5 ERASER
    document.querySelector('.fa-eraser').addEventListener('click',()=>{
        model.currentColor='transparent';
    })


    // 6 SAVE THE FILE
    document.querySelector('.fa-save').addEventListener('click',()=>{

        const popUp=document.querySelector('.pop-up');
        popUp.style.display='block';

        // 1 CONFIGURE THE TABLE
        const table=document.querySelector('table');
        const td=document.querySelectorAll('td');

        // 1.1 REMOVE BORDER AND SET TABLE COLOR TO WHITE
        td.forEach(t=>{
            t.classList.add('no-border')
        })

        table.style.backgroundColor='white';

        // 2 SAVE THE FILE
        var result=document.querySelector('.result');
        html2canvas(table,{
            onrendered:function(canvas){
                var img=canvas.toDataURL('image/png');
                result.innerHTML='<a class="save-btn" download="Pixels.jpeg" href="'+img+'">Save</a><button class="cancel">Close</button>';
            }
        });

        // 3 SET TABLE TO NORMAL
        td.forEach(t=>{
            t.classList.remove('no-border');
        })

        table.style.backgroundColor='transparent'        

        // 4 CANCEL THE SAVE
        document.querySelector('.pop-up').addEventListener('click',(e)=>{
            if(e.target.classList.contains('cancel')){
                popUp.style.display='none';
            }
        })

    })


    // 7 USING THE BUCKET TOOL
    document.querySelector('.bucket').addEventListener('click',()=>{
        
        // SET USING BUCKET TO TRUE
        if(!model.usingBucket){

            model.usingBucket=true; 


            const td=document.querySelectorAll("td");
            td.forEach(pixel=>{
                pixel.addEventListener('click',(e)=>{
                    
                    // GET ID OF STARTING PIXEL
                    const id=eval(e.target.id);
                    console.log(id,id.length);
                    model.pixelStack.push(id);

                    let pixels=model.pixelStack.pop();

                    let x=id[0];
                    let y=id[1];

                })
            })

        }

    })


})()