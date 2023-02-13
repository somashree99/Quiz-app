
  $(document).ready(function() {
  
    var current = 0,
      score = 0;
    var answers = new Map();
    const prev = $(".previous");
    const next = $(".next");
    const length = Object.keys(all_questions["questions"]).length;
  
    const op1 = $("#op1");
    const op2 = $("#op2");
    const op3 = $("#op3");
    const op4 = $("#op4");
  
  
    function displayPane(){
      for(var i = 1; i <= length; i++)
      {
          var fieldset = $("fieldset");
          fieldset.append($(`<input type="button" class="question-navigation" name="q1" value= Q${i}>`));
      }
    }
  
  
    function iterate(id) {
      if (id == 0) prev.hide();
      else prev.show();
  
      if (id == length - 1) next.prop("value", "Submit");
  
      op1.text(all_questions["questions"][id]["options"][0]);
      op2.text(all_questions["questions"][id]["options"][1]);
      op3.text(all_questions["questions"][id]["options"][2]);
      op4.text(all_questions["questions"][id]["options"][3]);
  
      op1.css("background-color", "aliceblue");
      op2.css("background-color", "aliceblue");
      op3.css("background-color", "aliceblue");
      op4.css("background-color", "aliceblue");
  
      if (answers.has(id)) {
        if (op1.text() == answers.get(id)) op1.css("background-color", "lightgoldenrodyellow");
        else if (op2.text() == answers.get(id)) op2.css("background-color", "lightgoldenrodyellow");
        else if (op3.text() == answers.get(id)) op3.css("background-color", "lightgoldenrodyellow");
        else if (op4.text() == answers.get(id)) op4.css("background-color", "lightgoldenrodyellow");
      }
  
      const heading = $("h1");
      heading.text(`Question ${id + 1}`);
      const question = $("p");
      question.text(all_questions["questions"][id]["question"]);
    }
  
    if (current == 0)
    {
      iterate(0);
      displayPane();
    }
  
    op1.click(function() {
      op1.css("background-color", "lightgoldenrodyellow");
      op2.css("background-color", "aliceblue");
      op3.css("background-color", "aliceblue");
      op4.css("background-color", "aliceblue");
      answers.set(current, op1.text());
    });
  
    op2.click(function() {
      op1.css("background-color", "aliceblue");
      op2.css("background-color", "lightgoldenrodyellow");
      op3.css("background-color", "aliceblue");
      op4.css("background-color", "aliceblue");
      answers.set(current, op2.text());
    });
  
    op3.click(function() {
      op1.css("background-color", "aliceblue");
      op2.css("background-color", "aliceblue");
      op3.css("background-color", "lightgoldenrodyellow");
      op4.css("background-color", "aliceblue");
      answers.set(current, op3.text());
    });
  
    op4.click(function() {
      op1.css("background-color", "aliceblue");
      op2.css("background-color", "aliceblue");
      op3.css("background-color", "aliceblue");
      op4.css("background-color", "lightgoldenrodyellow");
      answers.set(current, op4.text());
    });
  
    $(".next").click(function() {
      if (current <= length - 2) iterate(++current);
      else {
        var score = 0;
        for (var i = 0; i < all_questions["questions"].length; i++) {
          if (answers.has(i) && answers.get(i) == all_questions["questions"][i]["correct_answer"])
            score++;
        }
        $(".container").hide();
        $(".buttons").hide();
        $(".result").show();
        $(".result h3").text(`Your Score is: ${score}`);
      }
    });
  
    $(".previous").click(function() {
      iterate(--current);
    });
  
    $(".question-navigation").click(function() {
      const button = $(this).val();
      if(button.length == 2) current = button[1] - 1;
      else if(button.length == 3)
      {
        const a = parseInt(button[1]);
        const b = parseInt(button[2]);
        current = (a * 10) + b - 1;
      }
  
      iterate(current);
    });
  });