
    
$("body").css("background-image", "url('assets/images/trivia.jpg')", "height:900px", "width: 900px");
$(".container").css("background-image", "url('assets/images/tri2.jpg')");
$('#reset_button').hide();
var Trivia;

$("#start_button").on("click",function() {
    $(this).hide();
    $('.result').remove();
    $('#container').text('');//replace co instead of div
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        l = Trivia || $(window).trivia(),
        index = l.questions[l.current].correct,  //correct answer index
        correct = l.questions[l.current].choices[index]; //correct answer in choise is the same but oe ssays olace the other the number
if (userPick === index) {
        $('#choices_div').text(" Correct!!! The correct answer was: "+ correct);
        l.answer(true);
       
    } else {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        l.answer(false);
    }
    l.nextQ();
});


   $.fn.trivia = function() {
 //setting a variable in the global scope to reference to multiple elements with this chaning value but nebver l

    var l = this;
   
    l.userPick = false;
    //object
    l.answers = {
        correct: 0,
        incorrect: 0
    };
    l.images = false;
    l.count = 10;
    l.current = 0;
    console.log(l.current);
    //object with
    l.questions = [{
        question: "how many stars are in the U.S flag",
        choices: ["30", "20", "50", "10"],
        images: ["../images/Rajah.gif"],
        correct: 2
    }, {
        question: " whats the speed of light aprox?",
        choices: ["10 kmph", "100000 kmph", "only god knows", "350000 kmps"],
        correct: 3

    }, {
        question: "Who was the 5th U>S president?",
        choices: ["Abraham Lincoln", "Forrest Blanton", "Donald Reagan", "Obama"],
        correct: 0

    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
        choices: ["2 Dozen", "5 Dozen", "5000", "0"],
        correct: 1

    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        choices: ["Dinah", "Sammie", "Kat", "Luna"],
        correct: 0

    }, {
        question: "After being on earth, where did Hercules first meet his   father Zeus?",
        choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
        correct: 2

    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        choices: ["Yellow", "Blue", "Gold", "White"],
        correct: 2

    }, {
        question: "In Bambi, what word does the owl use to describe falling in love?",
        choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
        correct: 3
    }];
    l.ask = function() {
        //if object 1 and 2 show timer starting at 60 show question starting at incex 0 of questions
        if (l.questions[l.current]) {
            console.log("this  is" + l.questions[l.current]);
            $("#timer").text("Time remaining: " + "00:" + l.count + " secs");
            $("#question_div").text(l.questions[l.current].question);
            var choicesArr = l.questions[l.current].choices;
            var buttonsArr = [];
            console.log("what is this" + choicesArr);
///for each choise in current question show choices in buttoms
           for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
               button.text(choicesArr[i]);
               button.attr('data-id', i);
            $('#choices_div').append(button);
           }
          // set the speed of your timer
            window.triviaCounter = setInterval(l.timer, 1000);
            //if not answered then unsawered
        } else {
            $('.container').append($('<div />', {
                text: 'Unanswered: ' + (
                    l.questions.length - (l.answers.correct + l.answers.incorrect)),
                class: 'result'
            }));
            $('#reset_button').show();
            
            //$('#start_button').text('Restart').appendTo('.container').show();
        }
        $('#reset_button').on('click',function(restart) {
            window.location.reload();
            console.log(restart);
        });//replace cont ins of body
    };

//if get to 0 time out next question
    l.timer = function() {
        l.count--;
        if (l.count <= 0) {
            setTimeout(function() {
             l.nextQ();
            });
        } else {
            $("#timer").text("Time remaining: " + "00:" + l.count + " secs");
        }//
    };

    l.nextQ = function() {
        //moves cquestion on index 1 by one
        l.current++;
        clearInterval(window.triviaCounter);
        l.count = 10;
        $('#timer').text("");
        setTimeout(function() {
            l.cleanUp();
            l.ask();
        }, 3000)//changed time to view answer to 3secs
    };
    //cleans teh old total corrrect or incorrect answers.
    l.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).text('');
        });
        
        $('.correct').html('Correct answers:  ' + l.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + l.answers.incorrect);
    };
    console.log(l.cleanUp);
   // set a variabl = to either correct or incorrect the create an object
    l.answer = function(result) {
        var guess =  result ? 'correct' : 'incorrect';
        l.answers[guess]++;
        $('.' + guess).text(guess + ' answers: ' + l.answers[guess]);
    };
    return l;//
};





