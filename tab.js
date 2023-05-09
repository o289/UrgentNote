(() => {
    const $doc = document;
    const $tab = $doc.getElementById('js-tab');
    const $nav = $tab.querySelectorAll('[data-nav]');
    const $content = $tab.querySelectorAll('[data-content]');
    const ACTIVE = 'is-active'
    const NavLength = $nav.length

    // 初期化
    const init = () => {
        $content[0].style.display = 'block';
        $nav[0].classList.add(ACTIVE);
    };
    init()
    // クリックイベント
    const handleClick = (e) => {
        e.preventDefault();
        const $this = e.target
        const targetVal = $this.dataset.nav 
        // 
        let index = 0;
        while(index < NavLength){
            $content[index].style.display = 'none';
            $nav[index].classList.remove(ACTIVE);
            index++
        }       
        // 
        $tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.display = 'block';
        $nav[targetVal].classList.add(ACTIVE)
    };
    let navIndex = 0
    while(navIndex < NavLength){
        $nav[navIndex].addEventListener('click', (e) => handleClick(e));
        navIndex++;
    }
}) ();