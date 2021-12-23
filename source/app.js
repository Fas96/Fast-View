const app=new Vue({
    mode: 'history',
    el: '#user-goal',
    data(){
        return {
            courseGoal: 'Finish this course on time',
            goalOne: 'Fas is learning well\n',
            goalTwo: 'This could be a new break through\n',
            siteLink: 'http://fasgh.govt.kr/'
        }
    },
    methods:{
        outputGoal(){
            const randomNumber=Math.random();
            if(randomNumber<0.5){
                return this.goalOne+(new Date().toUTCString())
            }else{
                return this.goalTwo +(new Date().toUTCString())
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
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
    }
})