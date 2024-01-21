const randomNumber = parseInt(Math.random()*100+1); //  because we need 1-100 so by default woh 0.7289 aise mil raha hai so for that we did *100 + 1 because 0 bhi ho sakt hai

const userInput = document.querySelector("#guessField")
const submit = document.querySelector("#subt")
const guessSlot = document.querySelector(".guesses")
const remaining = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")
// now suppose user used his all of the chances then tell user to start again 
const startOver = document.querySelector("resultParas")

const p = document.createElement("p")

//now we will create one array in which guessed number will be stored so that user firse woh value na input kare
let prevGuess=[]
// track kitne attempts kar chuka hai woh
let numGuess=1 // by default start wwith one guess 7 jaise 10 attempts hue we will disable th button so further user cant press he button
let playGame=true // whenever you make the game this becomes kind of mandit so which allows user to let the game begin
 


// first chheck whether you are eligibel to play game or not
if(playGame){ // if playGame true hai toh hi khelo, else nahi khelo
    // if eligible or true hai then see
    submit.addEventListener("click", function(e){ // as we kow iss function me hume event milta hai jisko humne e likha 
        e.preventDefault() // iska matlab roko form ko submit hone se we need the value
        let guess = parseInt(userInput.value) // take input
        console.log(guess);
        validateGuess(guess)
    })

}

// using validateGuess funnction w'll validate ki entered number is correct or not criteria jo set karenge woh sahi hai ki nahi
function validateGuess(guess){ // this is saying mujhe ek guess do mai validate kardunga(function args le rha hai and usko validate kardega)
    if(isNaN(guess)){
        alert("please enter a valid number")
    }
    else if(guess<1){
        alert("please enter a number greater than 1")
    }
    else if(guess>100){
        alert("please enter a number less than 100")
    }
    else{ // here we pushed the data in our array so it can be stored 
        prevGuess.push(guess)  
                // (or)
        // isNaN(guess) ? 
        // alert("Please enter a valid number") : 
        // (
        //     guess > 1 ? 
        //     alert("Please enter a number greater than 1") : 
        //     (
        //         guess > 100 ? 
        //         alert("Please enter a number less than 100") : 
        //         prevGuess.push(guess)
        //     )
        // );

                //Explanation 
                // First Condition: isNaN(guess)

                // If isNaN(guess) is true (i.e., guess is not a number), the first alert is triggered: "Please enter a valid number".
                // If isNaN(guess) is false, we move to the next part.
                // Second Condition: guess > 1

                // If guess > 1 is true, the second alert is triggered: "Please enter a number greater than 1".
                // If guess > 1 is false, we move to the next part.
                // Third Condition: guess > 100

                // If guess > 100 is true, the third alert is triggered: "Please enter a number less than 100".
                // If guess > 100 is false, we move to the final part.
                // Else (Default Case): prevGuess.push(guess)

                // If none of the previous conditions are true, we execute the code to push guess into the prevGuess array.

        // now will check ki user ka last attempt hai or game over toh nahi hua
        if(numGuess === 11){

            // here you will see that we re calling the function in this function
            displayGuess(guess)
            //now game over ho hi gya hai then user ko dikha hi dete hai
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            // also now end the game
            endGame() 
        }
        else{
            displayGuess(guess)
            checkguess(guess)
        }
    }
}


// using check guesses w'll print the message like jo value hai woh correct hai low hai ya fir high hai
function checkguess(guess){
    if(checkguess === randomNumber){
        displayMessage(`Correct! You guessed the number in ${numGuess} guesses`)
        endGame()
    }
    else if(guess < randomNumber){
        displayMessage("Number is too Low")
    }
    else if(guess > randomNumber){
        displayMessage("Number is too High")
    }
}


//  this will cleaan the value jo input me hai taaki next wala daal sake 
// 7 jo guess array hai unko bhi updte karega
function displayGuess(guess){

    userInput.value=""
    guessSlot.innerHTML+=`${guess}, ` 
    numGuess++
    remaining.innerHTML=`${11-numGuess}`

}



// this method will interact with DOM like user kki input value hai usse hum empty kar denge, because usee next guess bhi karna hai
//& ukse saath saath jo innerhtml hai uske andr guess ko add kardenge & number count remaining jo  hai kam kar denge
// so jo bhi DOM manipulation hai usko will write in this function 
function displayMessage(message){
    lowOrHi.innerHTML+=`<h2>${message}</h2>`
}
 // now we need method game start and end ke liye 

 
 function endGame(){
    userInput.value=" "
    userInput.setAttribute("disabled"," ")
    p.classList.add("button")
    p.innerHTML`<h2 id="newGame">Start New Game</h2>`
    startOver.appendChild(p)
    playGame=false // initially we kept it as true & when the game end so we made it false
    newgame()
 }

 function newgame(){
    const newgameButton = document.querySelector("#newgame")
    newgameButton.addEventListener("click", function(e){
        // now before making the playgame or allowing the user to playgame clear all the variable or reset it
        let randomNumber = parseInt(Math.random()*100+1);
        prevGuess=[] // we did reset
        numGuess =1
        guessSlot.innerHTML=""
        remaining.innerHTML=`${11-numGuess}`
        userInput.removeAttribute("disabled")
        startOver.removeChild(p)
        playGame=true
    })
 }









