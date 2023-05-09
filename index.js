(() => {
const agent = navigator.userAgent.toLowerCase();
const mac = agent.indexOf('mac os x');
const windows = agent.indexOf('windows nt');
const width = window.innerWidth;
// html要素を取得
const add = document.getElementById('add')
const reset = document.getElementById('reset');
const display = document.getElementById('display')
const deletion = document.getElementById('deletion');
const textarea = document.getElementById('textarea')
const ul = document.getElementById('ul')
// この3つのブラウザ以外のアクセスを拒否
if(
    // Microsoft Edge
    agent.indexOf("edge") !== -1 || agent.indexOf("edga") !== -1 || agent.indexOf("edgios") !== -1 ||
    // Google Chrome
    agent.indexOf("chrome") !== -1 || agent.indexOf("crios") !== -1 ||
    // Safari
    agent.indexOf("safari") !== -1
){
    if(width > 1500){
        useBoth()
        shortCut1();
    }
    else{
        if(mac !== -1 || windows !== -1){
            useBoth()
            mobile()
            shortCut1()
        } 
        else {
            useBoth()
            mobile();
        } 
    };
    // 共通して使うものをまとめる
    function useBoth(){
        readd();
        addText();
        addNote();
        removeTextAll();
    }
    // 
    window.addEventListener('resize', function(){
        if((width < 1500 && window.innerWidth >= 1500) 
        || (width >= 1500 && window.innerWidth < 1500)){
            this.location.reload()
        }
    })
    
    // リロードしても消えないようにする
    function readd(){
        const boxes = JSON.parse(localStorage.getItem('boxes'));
        if(boxes){
        boxes.forEach(note => {
        addNote(note);
        });
    };
    }
    // テキストを追加する
    function addText(){
        add.addEventListener('click', function(event){
            event.preventDefault();
            addNote();
        });
    }
    // 全削除
    function removeTextAll(){
        deletion.addEventListener('click', function(event){
            event.preventDefault()
            deletionText()
        });
    }
    // 全削除する前に一応確認する
    function deletionText(){
        const conf1 = window.confirm('全てのテキストを削除しますか？')
        if(conf1){
            localStorage.clear();
            location.reload();
        } else {
            ;
        }
    }
    // テキストエリアの文字を表示する＆ローカルストレージに保存
    function addNote(note){
        const li = document.createElement('li');
        let noteText = textarea.value;
        if(note){
            noteText = note
        }
        if(noteText){
            li.innerText = noteText;
            li.classList.add('text');
            if(mac !== -1 || windows !== -1){
                li.addEventListener('contextmenu', function(event){
                    event.preventDefault();
                    conf02();
                });
            } else {
                li.addEventListener('click', function(event){
                    event.preventDefault();
                    conf02();
                });
            }
            function conf02(){
                const conf2 = window.confirm('このテキストを削除しますか？')
                if(conf2){
                    li.remove();
                    save();
                } else {
                    ;
                };
            }
            ul.appendChild(li);
            resetValue();
            reset.addEventListener('click', function(event){
                event.preventDefault();
                resetValue()
            });
            save();
        }
    };
    // テキストエリアの文章を空にする
    function resetValue(){
        textarea.value = "";
    }
    function save(){
        const lis = document.querySelectorAll('li');
        let box = [];
        lis.forEach(list => {
            box.push(list.innerText);
        })
        localStorage.setItem('boxes', JSON.stringify(box));
    }
} else {
    window.location.replace('https://www.example.com/403.html');
}
// ショートカットキーの設定 必要なのはパソコンだけなのでそれ以外でのデバイスでは発動しないようにする。
function shortCut1(){
    if(mac || windows){
        document.addEventListener('keydown', function(event){
            class Mouse{
                constructor(obj){
                    const html = document.getElementById(obj.id);
                    const short = obj.v
                    if(mac !== -1){
                        if(event.metaKey && event.key == short){
                            event.preventDefault()
                            const mE = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            html.dispatchEvent(mE)
                        }
                    }
                    else if(windows !== -1){
                        if(event.ctrlKey && event.key == short){
                            event.preventDefault()
                            const mE = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            html.dispatchEvent(mE)
                        }
                    }
                    else{
                        ;
                    }
                }
            };
            
            // 全削除のショートカットキー
            if(mac !== -1){
                if(event.metaKey && event.key === 'd'){
                    event.preventDefault()
                    deletionText()
                } 
                else if(event.metaKey && event.key === 'a'){
                    event.preventDefault()
                    addNote()
                }
                else if(event.metaKey && event.key === 'i'){
                    event.preventDefault()
                    resetValue();
                }  
            } 
            else if(windows !== -1){
                if(event.ctrlKey && event.key === 'd'){
                    event.preventDefault()
                    deletionText()
                } 
                else if(event.ctrlKey && event.key === 'a'){
                    event.stopPropagation()
                    event.preventDefault()
                    addNote()
                }
                else if(event.ctrlKey && event.key === 'i'){
                    event.stopPropagation()
                    event.preventDefault()
                    resetValue()
                }
            } 
            else {
                ;
            }
            // 
            class hidden{
                constructor(obj){
                    const newDisplay = document.getElementById(obj.dis);
                    const Num = obj.n
                    if(mac !== -1){
                        if(event.metaKey && event.key === Num){
                            event.preventDefault()
                            newDisplay.classList.toggle('none')
                        }
                    }
                    else if(windows !== -1){
                        if(event.ctrlKey && event.key === Num){
                            event.preventDefault()
                            newDisplay.classList.toggle('none')
                        }
                    }
                    else{
                        ;
                    }
                }
            }
            const sameClick = [
                new Mouse({
                    id: 'family1',
                    v: 'f'
                }),
                new Mouse({
                    id: 'family2',
                    v: 'j'
                }),
                new Mouse({
                    id: 'size1',
                    v: '1'
                }),
                new Mouse({
                    id: 'size2',
                    v: '2'
                }),
                new Mouse({
                    id: 'size3',
                    v: '3'
                }),
                new Mouse({
                    id: 'weight1',
                    v: '4'
                }),
                new Mouse({
                    id: 'weight2',
                    v: '5'
                }),
                new Mouse({
                    id: 'weight3',
                    v: '6'
                }),
                new Mouse({
                    id: 'line_height1',
                    v: '7'
                }),
                new Mouse({
                    id: 'line_height2',
                    v: '8'
                }),
                new Mouse({
                    id: 'line_height3',
                    v: '9'
                }),
                new hidden({
                    dis: 'create',
                    n: ','
                }),
                new hidden({
                    dis: 'setting',
                    n: '.'
                }),
            ];
        });
    };
};

function mobile(){
    class clickEvent{
        constructor(obj){
            const button = document.getElementById(obj.b)
            const dis2 = document.getElementById(obj.d)
            button.addEventListener('click', () => {
                dis2.classList.toggle('block');
                button.classList.toggle('display');
                display.classList.toggle('none');
            });
        }
    }
    new clickEvent({
        b: 'other_add',
        d: 'create',
    })
    new clickEvent({
        b: 'other_setting',
        d: 'setting',
    })
};

}) ();
