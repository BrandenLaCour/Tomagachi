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
    time: 0,
    ageInterval: 2,
    atrophyInterval: 3,
    nightCount: 4,
    lightsOut: false,
    dead: false,
    setupGame(name) {

        this.pet = new Tomagachi(name)
        $('#name').text(name)
        const timerText = $('#form').html('<strong id="mainTimer">Timer: <span id="time">0</span></strong>').css({ 'margin': '10px 7px 0px 5px' })
        this.startTimer()
        $('#yoda').css({ 'opacity': 1 })
    },
    startTimer() {

        intervalSet = window.setInterval(() => {

            this.runGame()
        }, 1000)
    },
    runGame() {


        this.incrementTimer()
        this.incrementAge()

        if (!this.lightsOut) {

            this.atrophy()
            this.move()
        } else if (this.lightsOut) {
            this.interact('sleepiness')
            this.nightCount--
            if (this.nightCount === 0) {
                this.toDay()

            }
        }
        this.endGame()
        if (this.dead === false) this.resetAnimation()



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
        if (this.pet.age > 5) this.getOld()

    },
    atrophy() {

        this.atrophyInterval--

        if (this.atrophyInterval === 0) {

            this.pet.hunger += this.getRandomNum()
            this.pet.sleepiness += this.getRandomNum()
            this.pet.boredom += this.getRandomNum()
            this.atrophyInterval = 3
            this.updateUi()
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
        $('#play-area').css({ 'filter': 'brightness(20%)' })



    },
    resetAnimation() {

        const yoda = $('#yoda')
        if (this.pet.age > 5) {
            yoda.attr('src', 'images/oldyoda.png')

        } else {
            yoda.attr('src', 'images/babyyoda.png')
        }




    },
    playAnimation() {

        const yoda = $('#yoda')
        if (this.pet.age > 5) {

            yoda.attr('src', 'images/yodaPlay.png')

        } else {
            yoda.attr('src', 'images/yodaplay.png')
        }

    },
    move() {

        const positions = ['center', 'flex-end', 'flex-start']
        const rotations = [25, 0, -25]
        const num1 = Math.floor(Math.random() * 3)
        const num2 = Math.floor(Math.random() * 3)
        const dance = $('#yoda').css({ 'transform': `rotate(${rotations[num1]}deg)` })
        const move = $('#play-area').css({ 'justify-content': positions[num2] })


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
            this.dead = true;

        }


    },
    getOld() {

        $('#yoda').attr('src', 'images/oldyoda.png')

    },
    eatAnimation() {

        const yoda = $('#yoda')
        if (this.pet.age > 5) {
            yoda.attr('src', 'images/food.png')

        } else {
            yoda.attr('src', 'images/food.png')
        }


    }





}








// interact with pet
$('#button-container').click((e) => {

    const interactionType = $(e.target).attr('id')

    if (game.dead === false) {

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