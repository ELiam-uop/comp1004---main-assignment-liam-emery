const Container=document.getElementById('Container')
const Shufflebutton=document.getElementById('Shufflebutton')
const card_height = 125;
const card_width = 100;
const click_max = 4;
const suits = ['diamond', 'heart', 'club', 'spade']
const suits_colors = {diamond: 'red', heart: 'red', club: 'black', spade: 'black'}
const characters = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];

var cards = [];
var is_being_dragged = null;
var counter = 0;

function create_deck(){
    suits.forEach((suit, i) => {
        characters.forEach((character, j) => {
            const card = build_card(suit, character);
            card.style.left = (20+j*(card_width+8)) + 'px';
            card.style.top = (20+i*(card_height+8)) + 'px';
            card.style.zIndex = counter+1
            Container.appendChild(card)
            cards.push(card);
            card.addEventListener('mousedown', mouse_down);

        });

    });

}

function build_card(suit, character){
    const card = document.createElement('div');
    card.className = 'card';
    card.style.setProperty('--color-img', `url('img/${suits_colors[suit]}.png')`);
    card.style.setProperty('--suit-img', `url('img/${suit}.png')`);
    card.style.setProperty('--rank-img', `url('img/${character}.png')`);
    ['base', 'rank', 'suit', 'color'].forEach((name) => {
        const layer = document.createElement('div');
        layer.className = 'layer '+name;
        card.appendChild(layer);

    });

    return card;

}   


function mouse_down(e){
    e.preventDefault();
    is_being_dragged = {
        card:this,
        starty: e.clientY,
        startx: e.clientX,
        leftorigin: this.offsetLeft,
        rightorigin: this.offsetTop,
        has_moved: false
    };
    this.style.zIndex = counter+1;

    document.addEventListener('mousemove', move_mouse);
    document.addEventListener('mouseup', mouse_up);
}

function move_mouse(e){
    const dx = e.clientX-is_being_dragged.startx;
    const dy = e.clientY-is_being_dragged.starty;
    if(Math.abs(dx)>click_max || Math.abs(dy)>click_max) {
        is_being_dragged.has_moved = true;
    };

    const leftmax = Container.clientWidth - card_width;
    const topmax = Container.clientHeight - card_height;
    const newleft = Math.max(0, Math.min(is_being_dragged.leftorigin+dx, leftmax));
    const newtop = Math.max(0, Math.min(is_being_dragged.rightorigin+dy, topmax));
    is_being_dragged.card.style.left = newleft+'px';
    is_being_dragged.card.style.top = newtop+'px';

}

function mouse_up(){
    document.removeEventListener('mousemove', move_mouse);
    document.removeEventListener('mouseup', mouse_up);
    if (!(is_being_dragged.has_moved)) {
        is_being_dragged.card.classList.toggle('flipped');

    };
    is_being_dragged = null;

}

function shuffle_deck(){
    const leftmax = Container.clientWidth - card_width;
    const topmax = Container.clientHeight - card_height;

    cards.sort(() => Math.random()-0.5);
    cards.forEach((card, i) => {
        card.style.zIndex = i;
        card.style.left = Math.round(Math.random()*leftmax)+'px';
        card.style.top = Math.round(Math.random()*topmax)+'px';
        card.classList.add('flipped');
    });
    counter = cards.length;

}

Shufflebutton.addEventListener('click', shuffle_deck)

create_deck()