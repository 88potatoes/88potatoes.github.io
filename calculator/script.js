numberButton = document.querySelectorAll('.number');
answerArea = document.querySelector("#answer");
storeArea = document.querySelector("#previous");
deleteButton = document.querySelector("[data-delete]");
clearButton = document.querySelector("[data-clear]");
dotButton = document.querySelector("[data-dot]");
operationButtons = document.querySelectorAll("[data-operation]");
enterButton = document.querySelector("[data-enter]");

//making a calculator class
class Calculator {
    constructor(){
        this.mainString = "";
        this.storeString = "";
        this.storedOperation = "";
    }

    clear() {
        this.mainString = "";
        this.storeString = "";
        this.storedOperation = "";
        this.update();
    }

    addNumber(str) {
        this.mainString += str;
        console.log(this.mainString);
        this.update();
    }

    update(){
        answerArea.innerHTML = this.mainString;
        storeArea.innerHTML = this.storeString;
        
    }

    delete(){
        this.mainString = this.mainString.slice(0, -1);
        this.update();
    }
    
    addDot(){
        if (this.mainString.includes('.')){
            return;
        }else{
            this.mainString += '.';
        }
        this.update();
    }
    
    doOperation(input){
        console.log("input" + input + " stored" + this.storedOperation);
        if(this.storedOperation != ""){
            try {
                switch (this.storedOperation){
                    case "+":
                        console.log("store string:" + this.storeString + " " + typeof this.storeString);
                        console.log("mainstring:" + this.mainString  + " " + typeof this.storeString);
                        this.mainString = String(parseInt(this.storeString) + parseInt(this.mainString));
                        console.log("after calculation:" + this.mainString);
                        break;
                    case "-":
                        this.mainString = String(parseInt(this.storeString) - parseInt(this.mainString));
                        console.log(this.mainString);
                        break;
                    case "x":
                        this.mainString = String(parseInt(this.storeString) * parseInt(this.mainString));
                        break;
                    case "÷":
                        this.mainString = String(parseInt(this.storeString) / parseInt(this.mainString));
                        console.log(this.mainString);
                        break;
                    }  
                }
            catch(error){
                console.log(error);
                this.mainString = "ERROR";
            }
            
            console.log("ok" + this.mainString);

        }
        if(this.mainString != ""){
            this.storeString = this.mainString;
            console.log("storestring : " + this.storeString)
            this.mainString = "";
            console.log("mainstring : " + this.mainString)
            this.storedOperation = input;
            console.log(this.storedOperation);
            this.update();
        }
    }

}

calculator = new Calculator();

numberButton.forEach(
    currentButton => {
        currentButton.addEventListener("click", () => {
            calculator.addNumber(currentButton.innerHTML);
            console.log(calculator.storedOperation);
        });
    }
);

deleteButton.addEventListener("click", () => {
    calculator.delete();
})

clearButton.addEventListener("click", () => {
    calculator.clear();
})

dotButton.addEventListener("click", () => {
    calculator.addDot();
})

operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click", () => {
        calculator.doOperation(operationButton.innerText);
    });
})

enterButton.addEventListener("click", () => {
    calculator.doOperation();
    calculator.storedOperation = "";
})
