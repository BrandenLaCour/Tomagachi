class Tomagachi {
    constructor(name) {
        this.hunger = 0
        this.sleepiness = 0
        this.boredom = 0
        this.age = 1
        this.name = name

    }

}

let intervalSet;

const game = {
    pet: {},
    characterChoice: '',
    characterImages: [],
    time: 0,
    started: false,
    moveInterval: true,
    ageInterval: 2,
    atrophyInterval: 3,
    nightCount: 4,
    lightsOut: false,
    dead: false,
    rotated: false,
    setupGame(name) {

        this.pet = new Tomagachi(name)
        $('#yoda').attr('src', this.characterImages[0])
        $('#name').text(name)
        const timerText = $('#form').html('<strong id="mainTimer">Timer: <span id="time">0</span></strong>').css({ 'margin': '10px 7px 0px 5px' })
        this.startTimer()
        $('#yoda').css({ 'opacity': 1 })
        this.started = true
        this.startMove()
    },
    startTimer() {

        intervalSet = window.setInterval(() => {

            this.runGame()
        }, 1000)
    },
    runGame() {

    	if (this.dead === false) this.resetAnimation()
        this.incrementTimer()
        this.incrementAge()

        if (!this.lightsOut) {

            this.atrophy()

            if (this.moveInterval) {

                this.moveInterval = false;
            }
        } else if (this.lightsOut) {
            this.interact('sleepiness')
            this.nightCount--
            if (this.nightCount === 0) {
                this.toDay()

            }
        }
        this.endGame()
        



    },
    incrementTimer() {

        this.time++
        $('#time').text(this.time)
    },
    incrementAge() {
        this.ageInterval--
        if (this.ageInterval === 0) {

            this.pet.age++
            this.ageInterval = 2;
            const age = $('#age').text(this.pet.age)

        }
        if (this.pet.age > 7) this.getOld()


    },
    atrophy() {

        this.atrophyInterval--

        if (this.atrophyInterval === 0) {

            this.pet.hunger += this.getRandomNum()
            this.pet.sleepiness += this.getRandomNum()
            this.pet.boredom += this.getRandomNum()
            this.atrophyInterval = 3
            this.updateUi()
            this.startMove()
        }


    },
    getRandomNum() {

        return Math.ceil(Math.random() * 3)
    },
    updateUi() {
        $('#hunger').text(this.pet.hunger)
        $('#sleepiness').text(this.pet.sleepiness)
        $('#boredom').text(this.pet.boredom)
    },
    interact(stat) {

        const num = stat === 'sleepiness' ? 1 : this.getRandomNum() + 2
        stat === 'boredom' ? this.playAnimation(stat) : this.eatAnimation(stat)

        this.pet[stat] -= num
        this.pet[stat] < 0 ? this.pet[stat] = 0 : this.pet[stat]
        this.updateUi()


    },
    toNight() {
        this.lightsOut = true;
        $('#yoda').stop(true, true)
        $('#play-area').css({ 'filter': 'brightness(20%)' })



    },
    resetAnimation() {

        const yoda = $('#yoda')
        if (this.pet.age > 5) {
            yoda.attr('src', this.characterImages[1])

        } else {
            yoda.attr('src', this.characterImages[0])
        }




    },
    playAnimation() {

        const yoda = $('#yoda')
        if (this.pet.age > 5) {

        	if (this.characterChoice === 'Yoda'){
        		yoda.attr('src', 'images/yodaPlay.png')
        	}
        	else{
        		yoda.attr('src', 'images/yodaplay.png')
        	}

            
        } else {
            yoda.attr('src', 'images/yodaplay.png')
        }

    },
    startMove() {


       
            $('#yoda').animate({
                'margin-left': '+= 400'

            }, 2500, this.moveRight())

            if (this.rotated){
            	this.rotateRight()
            	this.rotated = false
            }else{
            	this.rotateLeft()
            	this.rotated = true
            }


    },
    rotateLeft() {

        

            $('#yoda-container').attr('class', 'yoda-rotate-left')


        

    },
    rotateRight(){

    	

            $('#yoda-container').attr('class','yoda-rotate-right')


        
    },
    moveRight() {


        
            $('#yoda').animate({
                'margin-right': '+=800'

            }, 3000, this.moveLeft())

        
    },
    moveLeft() {

        $('#yoda').animate({
            'margin-left': '+=600'

        }, 2500)


    },
    toDay() {
        $('#play-area').css({ 'filter': 'brightness(100%)' })
        this.nightCount = 3;
        this.lightsOut = false

    },
    endGame() {
        if (this.pet.boredom >= 10 || this.pet.sleepiness >= 10 || this.pet.hunger >= 10) {

            $('#yoda').attr('src', 'images/gravestone.png')
            $('#mainTimer').html('')
            $('#mainTimer').text('Oh No! The Darkside Has Taken Him!')

            clearInterval(intervalSet)
            $('#yoda').stop(true, true)
            this.dead = true;

        }


    },
    getOld() {

    	if (this.characterChoice === 'Yoda'){

    		$('#yoda').attr('src', this.characterImages[1])

    	}
    	else {
    		$('#yoda').attr('src', this.characterImages[0])

    	}

        
    },
    eatAnimation() {

        const yoda = $('#yoda')


    
            yoda.attr('src', 'images/food.png')



    },
    chooseCharacter(pet){

    	if (pet === 'Luke'){
    		this.characterChoice = 'Luke'
    		this.characterImages = ['images/youngluke.png','images/youngluke2.png']
    	}
    	else {
    		this.characterChoice = 'Yoda'
    		this.characterImages = ['images/babyyoda.png','images/oldyoda.png']
    	}
    	$('#choices').hide()
    	
    }

}








// interact with pet
$('#button-container').click((e) => {

    const interactionType = $(e.target).attr('id')

    if (game.dead === false && game.started === true) {

        switch (interactionType) {

            case 'feed':
                if (!game.lightsOut) {

                    game.interact('hunger')
                }

                break;

            case 'play':
                if (!game.lightsOut) {
                    game.interact('boredom')

                }

                break;

            case 'light':
                game.toNight()
                break;
            default:
                break;

        }

    }


})





// start game and name pet
$('form').submit((e) => {

    e.preventDefault()
    const name = $('#nameInput').val()
    game.setupGame(name)


})

$('.choose').click((e) => {

	const choice = $(e.target).text()
	game.chooseCharacter(choice)


})