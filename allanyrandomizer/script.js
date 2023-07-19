buttonList = [];
roleList = [];
playersToggled = [];
rolesToggled = [];

players = document.querySelectorAll("[data-player]");
roles = document.querySelectorAll("[data-role]");
results = document.querySelector('.results');

class Toggleable {
    constructor() {
        this.toggle = true;
        this.canToggle = true;
    }
    
    togglef() {
        if(this.canToggle){
            if(this.toggle) {
                this.toggle = false;
            }else{
                this.toggle = true;
            }
        }
    }
}

players.forEach((player, index) => {
    buttonList.push(new Toggleable());
    player.addEventListener("click", () => {
        if(document.activeElement === player.firstElementChild){
            buttonList[index].canToggle = false;
            console.log(buttonList[index].canToggle);
        }else{
            buttonList[index].canToggle = true;
            console.log(buttonList[index].canToggle);
        }

        buttonList[index].togglef();
        if(buttonList[index].toggle){
            player.style.background = "#D28556";
            player.style.boxShadow = "0.1em 0.1em #FCF0C5";
        }else{
            player.style.background = "#4B3E3D";
            player.style.boxShadow = "0.1em 0.1em black";
        }
    });
});

roles.forEach((role, index) => {
    roleList.push(new Toggleable());
    role.addEventListener("click", () => {
        roleList[index].togglef();

        if(roleList[index].toggle) {
            role.style.background = "#D28556";
            role.style.boxShadow = "0.1em 0.1em #FCF0C5";
        }else{
            role.style.background = "#4B3E3D";
            role.style.boxShadow = "0.1em 0.1em black";
        }
    })
});

function randomize(){
    //reseting everything from before
    playersToggled = [];
    rolesToggled = [];
    
    for(let i = results.childNodes.length; i > 0; i--){
        results.childNodes[0].remove();
    }


    for(let i = 0; i < 5; i++){
        if(buttonList[i].toggle){
            playersToggled.push(i);
        }
        if(roleList[i].toggle){
            rolesToggled.push(i);
        }
    }

    if(rolesToggled.length == playersToggled.length){
        let u = document.createElement("div");
        u.innerHTML = "Professor Heimerdinger suggests:";
        results.appendChild(u);
        
        let n = rolesToggled.length;
        
        while (n != 0) {
            let j = Math.floor(Math.random() * n);
            n--;
            
            [playersToggled[j], playersToggled[n]] = [playersToggled[n], playersToggled[j]];
        }
        for (let i = 0; i < playersToggled.length; i++){
            let element = document.createElement('div');
            element.innerHTML = players[playersToggled[i]].firstElementChild.value + " - " + roles[rolesToggled[i]].innerHTML;
            results.appendChild(element);
        }
    }else{
        let element = document.createElement("div");
        element.innerHTML = "Professor Heimerdinger says the number of players and positions do not match.";
        results.appendChild(element);
    }
    console.log(rolesToggled + " and " + playersToggled + " and type of rolesToggled: " + typeof rolesToggled);

}