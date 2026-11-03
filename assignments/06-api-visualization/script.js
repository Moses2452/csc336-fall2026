let characters= [];
//How many characters to show and how fast they move
let numberOfCharacters = 10;
let randSpeedRange =0.5;

class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.velX = random(-randSpeedRange, randSpeedRange);
        this.velY = random(-randSpeedRange, randSpeedRange);
    }
    //moves the characters and makes older ones bigger
    update() {
        this.x += this.velX;
        this.y += this.velY;

        if (this.data.yearOfBirth < 1970) {
            image(this.image, this.x, this.y, 80,120);
        } else {
            image(this.image, this.x, this.y, 60,90);
        }
    }
}
// Gets the character data from the Harry Potter API
async function getCharacters() {
    let response = await fetch("https://hp-api.onrender.com/api/characters");
    let json = await response.json();
    return json;
}
// Sets up canvas
async function setup() {
    createCanvas(600,400);
    imageMode(CENTER);

    let characterData = await getCharacters();
    //picks the first 10 characters
    let selectedCharacters = characterData.slice(0, numberOfCharacters);
    //Creates each character at a random starting spot
    for (let i = 1; i <= numberOfCharacters; i++) {
        let x = random(100,500);
        let character = new Character(x,height/2);

        character.data = selectedCharacters[i-1];
        // Slytherin moves left and everyone else moves right
        if (character.data.house === "Slytherin") {
            character.velX = -0.5;
        } else {
            character.velX = 0.5;
        }
        character.image = await loadImage(character.data.image);

        characters.push(character);
    }
}
// Draws the background and keeps the characters moving
function draw() {
    background(0,0,0);

    for(let character of characters){
        character.update();
    }
}
