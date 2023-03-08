const GuessTheNumber = {

  init: function(){
    this.cacheSelectors()
    this.bindEvents()
  },

  cacheSelectors: function(){

    this.$firstNumber = document.querySelector('#firstNumber')
    this.$secondNumber = document.querySelector('#secondNumber')
    this.$thirdNumber = document.querySelector('#thirdNumber')

    this.$randomNumbers = this.generateRandomIntNumbers()
    console.log(this.$randomNumbers)

    this.$checkButton = document.querySelector('#checkButton')
    this.$resetButton = document.querySelector('#resetButton')

    this.$attemptsLeftCounter = document.querySelector('#attemptsLeftCounter')

    this.$messageFields = document.querySelectorAll('.message-field')
    this.$formRows = document.querySelectorAll('.form-row')

  },

  bindEvents: function(){
    this.$checkButton.onclick = this.Events.checkHits.bind(this)
    this.$resetButton.onclick = this.Events.tryAgain.bind(this)
  },

  Events:{

    checkHits: function(e){

      e.preventDefault()

      const attempts = this.reduceAttempts(this.$attemptsLeftCounter.value)
      this.$attemptsLeftCounter.value = attempts

      const checkFirstGuess = this.equals(this.$randomNumbers[0], this.$firstNumber.value)
      const checkSecondGuess = this.equals(this.$randomNumbers[1], this.$secondNumber.value)
      const checkThirdGuess = this.equals(this.$randomNumbers[2], this.$thirdNumber.value)
      const checkWin = (checkFirstGuess && checkSecondGuess && checkThirdGuess)
      const checkLose = attempts === this.Parameters.minNumberOfChances

      
      this.$messageFields[1].innerHTML = checkFirstGuess ? this.Messages.correctNumber : this.Messages.incorrectNumber
      this.$messageFields[2].innerHTML = checkSecondGuess ? this.Messages.correctNumber : this.Messages.incorrectNumber
      this.$messageFields[3].innerHTML = checkThirdGuess ? this.Messages.correctNumber : this.Messages.incorrectNumber

      this.$formRows[4].classList.remove('success', 'warning', 'danger')
      this.$formRows[4].classList.add(this.attemptStatus(attempts))

      if(checkWin){

        this.$messageFields[0].innerHTML = this.Messages.youWon
        
        this.$firstNumber.readOnly = true
        this.$secondNumber.readOnly = true
        this.$thirdNumber.readOnly = true
        
        this.$checkButton.disabled = true

      } else {

        if(checkLose){

          this.$messageFields[0].innerHTML = this.Messages.youLose
          this.$messageFields[4].innerHTML += `<span class="danger">Correct numbers: ${this.$randomNumbers}</span>`

          this.$firstNumber.readOnly = true
          this.$secondNumber.readOnly = true
          this.$thirdNumber.readOnly = true

          this.$checkButton.disabled = true

        }

      }
      
    },

    tryAgain: function(e){

      e.preventDefault()

      this.$firstNumber.readOnly = false
      this.$secondNumber.readOnly = false
      this.$thirdNumber.readOnly = false
      
      this.$checkButton.disabled = false

      this.$attemptsLeftCounter.value = this.Parameters.maxNumberOfChances

      this.$messageFields.forEach(message => {
        message.innerHTML = ""        
      });

      this.$formRows[4].classList.remove('success', 'warning', 'danger')

      this.$randomNumbers = this.generateRandomIntNumbers()
      console.log(this.$randomNumbers)

      document.querySelector('#guessTheNumbers').reset()

    }

  },

  generateRandomIntNumbers: ()=>{
    return [
      Math.floor(Math.random()*10),
      Math.floor(Math.random()*10),
      Math.floor(Math.random()*10)
    ]
  },
  
  equals: (a, b) => {
    return a == b
  },

  reduceAttempts: (qtAttempts) => {
    return --qtAttempts
  },

  attemptStatus: function(attemptsLeft){

    if(attemptsLeft >= this.Parameters.highNumberOfChances && attemptsLeft < this.Parameters.maxNumberOfChances){
      return 'success'
    }
    else if(attemptsLeft >= this.Parameters.lowNumberOfChances && attemptsLeft < this.Parameters.highNumberOfChances){
      return 'warning'
    }
    else if(attemptsLeft >= this.Parameters.minNumberOfChances && attemptsLeft <= this.Parameters.lowNumberOfChances){
      return 'danger'
    }

  },

  Messages : {

    correctNumber: `
      <span class="success">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
        Correct
      </span>
    `,

    incorrectNumber: `
      <span class="danger">
        <ion-icon name="close-circle-outline"></ion-icon>
        Incorrect
      </span>
    `,

    youWon: `
      <span class="success">
        <ion-icon name="happy-outline"></ion-icon>
        You Won!
      </span>
    `,

    youLose: `
      <span class="danger">
        <ion-icon name="sad-outline"></ion-icon>
        Try again...
      </span>
    `,
  },
  
  Parameters:{
    maxNumberOfChances: 10,
    highNumberOfChances: 7,
    lowNumberOfChances: 4,
    minNumberOfChances: 0,
  },

}

GuessTheNumber.init()