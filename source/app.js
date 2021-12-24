const app = new Vue({
    mode: 'history',
    el: '#user-goal',
    data() {
        return {
            courseGoal: 'Finish this course on time',
            goalOne: 'Basics of a framework js',
            goalTwo: 'This could be a new break through ',
            siteLink: 'http://fasgh.govt.kr/',

        }
    },
    methods: {

        outputGoal() {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                return this.goalOne + (calcTime('Seoul', '+9'))
            } else {
                return this.goalTwo + (calcTime('Seoul', '+9'))
            }
        }
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            {id: 0, text: 'Vegetables'},
            {id: 1, text: 'Cheese'},
            {id: 2, text: 'Whatever else humans are supposed to eat'}
        ]
    }
})


const events = new Vue({
    el: '#events',
    data() {
        return {
            counter: Math.ceil(Math.random() * 100),
            username: '',
            addValue: 0,
            fullname: ''
        }
    },
    watch: {
        username(latestVal){
            if(latestVal===''){
                this.fullname=''
            }else {this.fullname=latestVal+' '+'fas';}
        }
    },
    computed: {
        fullname() {
            return this.username;
        }
    },
    methods: {
        resetUserName() {
            this.username = ''
        },
        outputFULLname() {
            this.username = this.username + "firibu";
        },
        addNumber(event) {
            console.log("add number was callled")
            this.addValue = event.target.value;
        },

        addBtn() {
            this.counter += Number(this.addValue)
        },
        removeBtn() {
            this.counter -= Number(this.addValue)
        }
    }
})

function calcTime(city, offset) {

    // create Date object for current location
    d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in m-sec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000 * offset));

    // return time as a string
    return "  In " + city + " the time is: " + nd.toLocaleString();

}

const userDataForm = new Vue({
    el: '#userDataForm',
    data() {
        return {
            name: '',
            userpwd: ''
        }
    },
    methods: {
        submitUserData(event) {
            this.name = event.target.elements.name.value
            this.userpwd = event.target.elements.password.value
            alert(this.name + ':::::::::::' + this.userpwd)
        },
        submitOnShift(event) {
            alert("shit key called", event.key)
        }
    }
})