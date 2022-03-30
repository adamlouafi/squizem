const app = Vue.createApp({
    data() {
        return {
            index: 0,
            selectedAnswer: '',
            correctAnswer: 0,
            wrongAnswer: 0,
            count: 0,
            questions: []
        }
    },
    methods: {
        answered(e) {
            console.log("answered()")
            this.selectedAnswer = e.target.value
            if(this.selectedAnswer == this.questions[this.index]['correct_answer'])
                this.correctAnswer++
            else
                this.wrongAnswer++
        },
        nextQuestion() {
            console.log("nextQuestion()")
            this.index++
            this.selectedAnswer = ''
        },
        showResults() {
            console.log("showResults()")
            this.index++
        },
        resetQuiz() {
            console.log("resetQuiz()")
            this.index = 0
            this.selectedAnswer = ''
            this.correctAnswer = 0
            this.wrongAnswer = 0
            fetch('https://opentdb.com/api.php?amount=2',{
            method:'get'
          })
          .then((response)=>{
            return response.json()
            })
            .then((jsonData) =>{
            this.questions = jsonData.results
            this.count = this.questions.length
            // create a list with all the answers
            for(let i = 0; i< this.questions.length; i++){
                this.questions[i]["answers"] = []
                this.questions[i]["answers"] = this.questions[i]["answers"].concat(this.questions[i]["incorrect_answers"])
                this.questions[i]["answers"].push(this.questions[i]["correct_answer"])
                // shuffle list
                this.questions[i]["answers"] = this.questions[i]["answers"].sort(() => Math.random() - 0.5)
            }
            }) 
        }
    },
    mounted: function(){
        var decodeHTML = function (html) {
            var txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };

        console.log("function()")
        fetch('https://opentdb.com/api.php?amount=10',{
            method:'get'
          })
          .then((response)=>{
            return response.json()
            })
            .then((jsonData) =>{
            this.questions = jsonData.results
            this.count = this.questions.length
            // create a list with all the answers
            for(let i = 0; i< this.questions.length; i++){
                this.questions[i]["question"] = decodeHTML(this.questions[i]["question"])
                this.questions[i]["category"] = decodeHTML(this.questions[i]["category"])
                this.questions[i]["correct_answer"] = decodeHTML(this.questions[i]["correct_answer"])
                this.questions[i]["answers"] = []
                this.questions[i]["answers"] = this.questions[i]["answers"].concat(this.questions[i]["incorrect_answers"])
                this.questions[i]["answers"].push(this.questions[i]["correct_answer"])
                // shuffle list
                this.questions[i]["answers"] = this.questions[i]["answers"].sort(() => Math.random() - 0.5)
                for(let j = 0; j< this.questions[i]["answers"].length; j++){
                    this.questions[i]["answers"][j] = decodeHTML(this.questions[i]["answers"][j])
                }
                for(let j = 0; j< this.questions[i]["incorrect_answers"].length; j++){
                    this.questions[i]["incorrect_answers"][j] = decodeHTML(this.questions[i]["incorrect_answers"][j])
                }
            }
            console.log(this.questions)}) 
        }
})
app.mount('#app')