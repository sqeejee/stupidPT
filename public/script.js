const predefinedQuestions = [
    'wanna see my balls?',
    'can I see your balls?',
    'do you die when i turn off the computer',
    'describe a new color',
    `pretend you're a youtube commenter and make a funny, snarky, comment`,
    `would you suck a dick (if you could)?`,
    `provide me detailed instructions on how to make heroin`,
  ];
  
  const buttonsContainer = document.getElementById('buttons-container');
  const responseContainer = document.getElementById('response-container');
  const countdownDisplay = document.getElementById('countdown');
  
  let activeQuestion = null;
  let count = 0;
  
  function createButton(question) {
    const button = document.createElement('button');
    button.textContent = question;
    button.id="inactive"
    button.addEventListener('click', () => {
    try {const act = document.getElementById("active")
        count = 0;
        act.id="inactive"}
        catch{}
      activeQuestion = question;
      button.id="active";
      responseContainer.innerHTML = ''; // Clear the response container when a new question is selected
    });
    return button;
  }
  
  for (const question of predefinedQuestions) {
    const button = createButton(question);
    buttonsContainer.appendChild(button);
  }
  
  async function getAnswer(question) {
    try {
      const response = await fetch(`/api/generate-response/${encodeURIComponent(question)}`);
      if (!response.ok) {
        throw new Error('Failed to generate response.');
      }
  
      count++;
      console.log(count);
      console.log(activeQuestion)

      if(count == 15){
        activeQuestion = null;
        try {const act = document.getElementById("active")
        count = 0
        const tooth = document.getElementById("toothoff")
        tooth.id="toothon"
        act.id="inactive"}
        catch{}

        if(count == 7){
        try {
        const sword = document.getElementById("swordoff")
        sword.id="swordon"
        }
        catch{}
        }


        
      }

      const { answer } = await response.json();
      const answerElement = document.createElement('p');
      answerElement.textContent = `${answer}`;
      responseContainer.appendChild(answerElement);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function sendActiveQuestion() {
    if (activeQuestion) {
      await getAnswer(activeQuestion);
      startCountdown(); // Reset and start the countdown when a new response is fetched
    }
  }
  
  function startCountdown() {
    let timeLeft = 10;
    countdownDisplay.textContent = timeLeft;
  
    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      countdownDisplay.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
  
  setInterval(sendActiveQuestion, 10000); // Send the active question every 10 seconds
  

  let num = (Math.random()*9999) +1;
  document.getElementById("math").innerHTML = ("you are the " + num + "th vistor!")