function caclRandomValue(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

const app = Vue.createApp({
    data(){
        return { 
            playerLife:100,
            twojStaryHealth:100,
            currentRound:0,
            specialAttacks:0,
            winner:null,
            battlelog:[],
        }
    },
    computed:{
        yourHealthBar(){
            if(this.playerLife < 0){
                return {width: 0 + '%'}
            }
            return {width: this.playerLife + '%'}
        },

        twojStaryHealthBar(){
            if(this.twojStaryHealth < 0){
                return {width: 0 + '%'}
            }
            return {width: this.twojStaryHealth + '%'}
        },
        mayUseSpecialAttack(){
            return  this.currentRound < (3*this.specialAttacks)
        },

      
    },

    watch:{
        playerLife(val){
            if(val <= 0 && this.twojStaryHealth <= 0){
                this.winner = 'draw'
            }
            else if (val <= 0){
                this.winner = 'Twoj stary'
            }

        },
        twojStaryHealth(val){
            if(val <= 0 && this.playerLife <= 0){
                this.winner = 'draw'
            }
            else if(val <=0){
                this.winner = 'Player'
            }
        },
      


    },
    methods:{

        resetGame(){
            this.playerLife = 100;
            this.twojStaryHealth = 100;
            this.winner = null;

            this.battlelog = [];
        },

        attackOnTwojStart(){
            this.currentRound++;
            const attack = caclRandomValue(5,12);
            this.twojStaryHealth -= attack;
            this.addLog('Player','attack',attack);
            this.twojstartAttack();
            
            
            
        },
        twojstartAttack(){
            const attack =caclRandomValue(8,15);
            this.playerLife -= attack;
            this.addLog('Twoj stary','attack',attack);
        },

        specialAttay(){
            this.currentRound++;
            this.specialAttacks++;
            const attack = caclRandomValue(10,25);
            this.twojStaryHealth -= attack;
            this.twojstartAttack();
            this.addLog('player','attack',attack);

        },

        healPlayer(){
            const heal = caclRandomValue(8,16);
            if(this.playerLife+ heal > 100){
                this.playerLife = 100
            }
            else {this.playerLife += heal}
            this.twojstartAttack();
            this.currentRound++;
            this.addLog('player','heal',heal)

        },
        surrender(){
            this.winner = 'Twoj stary'
        },

        addLog(who,what,amount){

            this.battlelog.unshift({
               'who':who,
               'what':what,
               'amount':amount,
            })

        }


     }
})



app.mount('#game');