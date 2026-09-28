let roomRootDiv =document.querySelector("#roomRoot")

let rooms = {
    court: {
        name: "Court",
        description: "The main court is empty and dark",
        linkedRooms: ["lockerRoom"]
    },
    lockerRoom: {
        name: "Locker  Room",
        description: "A silent room lined with lockers and gym bags",
        linkedRooms:["court", "trainingRoom", "exitGate"]
    },
    trainingRoom: {
        name: "Training Room",
        description: "A photo is taped to the locker: Enter the King's name to unlock the gate",
        img: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
        linkedRooms:["lockerRoom"]
    },
    exitGate: {
        name: "Exit Gate",
        description: "Locked gate with a keypad",
        linkedRooms: ["lockerRoom"]
    }

}
let currentRoom = rooms["court"];

function navButtonClicked(e) {
    currentRoom =rooms[e.target.innerHTML]
    visualizeRoom(currentRoom);
}

function visualizeRoom(room) {
    roomRootDiv.innerHTML ="";

    let roomTitle= document.createElement("h1");
    roomTitle.innerHTML = room.name;
    roomRootDiv.append(roomTitle);

    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = room.description;
    roomRootDiv.append(descriptionP);
    
    if (room.img){
        let roomImg = document.createElement("img")
        roomImg.src= room.img;
        roomRootDiv.append(roomImg);
    }

    for (let i = 0; i < room.linkedRooms.length; i++) {
        let navButton = document.createElement("button");
        navButton.innerHTML =room.linkedRooms[i];
        navButton.addEventListener("click", navButtonClicked)
        roomRootDiv.append(navButton);
    }
    if (room === rooms["exitGate"]) {
        let inputElement = document.createElement("input");
        inputElement.id = "inputElement";
        inputElement.type ="text";
        roomRootDiv.append(inputElement);

        let buttonObj = document.createElement("button")
        buttonObj.innerHTML = "Enter"
        buttonObj.addEventListener("click", checkPassword)
        roomRootDiv.append(buttonObj);

        let message =document.createElement("p")
        message.id ="message";
        roomRootDiv.append(message);
    }
}
visualizeRoom(currentRoom);


function checkPassword(e) {
    let inputElement = document.querySelector("#inputElement");
    let message= document.querySelector("#message");

    if (inputElement.value.toLowerCase() === "lebron") {
        console.log("Correct");
        message.innerHTML = "Access granted. You escaped";
    } else {
        console.log("Not correct");
     }
}