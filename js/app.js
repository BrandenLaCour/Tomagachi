class Tomagachi {
    constructor(name) {
        this.hunger = 20
        this.sleepiness = 20
        this.boredom = 20
        this.age = 1
        this.name = name

    }

}

const game = {
    pet: {},
    time: 0,
    ageInterval: 5,
    atrophyInterval: 3,
    setupGame(name) {

        this.pet = new Tomagachi(name)
        $('#name').text(name)
        const timerText = $('#form').html('<strong>Timer: <span id="time">0</span></strong>').css({ 'margin': '10px 7px 0px 5px' })
        this.startTimer()
    },
    startTimer() {

        window.setInterval(() => {

            this.runGame()
        }, 1000)
    },
    runGame() {
        this.incrementTimer()
        this.incrementAge()
        this.atrophy()



    },
    incrementTimer() {

        this.time++
        $('#time').text(this.time)
    },
    incrementAge() {
        this.ageInterval--
        if (this.ageInterval === 0) {

            this.pet.age++
            this.ageInterval = 10;
            const age = $('#age').text(this.pet.age)

        }

    },
    atrophy() {

        this.atrophyInterval--

        if (this.atrophyInterval === 0) {

            this.pet.hunger -= this.getRandomNum()
            this.pet.sleepiness -= this.getRandomNum()
            this.pet.boredom -= this.getRandomNum()
            this.atrophyInterval = 3
            this.updateUi()
        }


    },
    getRandomNum() {

        return Math.floor(Math.random() * 6)
    },
    updateUi() {
        $('#hunger').text(this.pet.hunger)
        $('#sleepiness').text(this.pet.sleepiness)
        $('#boredom').text(this.pet.boredom)
    },
    feed() {

        const food = this.getRandomNum() + 2
        this.pet.hunger += food
        this.pet.hunger > 20 ? this.pet.hunger = 20 : this.pet.hunger
        this.updateUi()

    },
    play(stat){

    	const num = this.getRandomNum() + 2
        this.pet[stat] += num
        this.pet[stat] > 20 ? this.pet[stat] = 20 : this.pet[stat]
        this.updateUi()


    }





}
















$('#feed').click(() => {

	game.feed()

})







$('form').submit((e) => {

    e.preventDefault()
    const name = $('#nameInput').val()

    game.setupGame(name)


})