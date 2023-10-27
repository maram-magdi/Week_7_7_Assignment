window.addEventListener('load', () => {
    console.log("loaded");



    let submitBttn = document.getElementById('submit');
    let input = document.getElementById('input');
    let feedSection = document.getElementById('feed');

    submitBttn.addEventListener('click', () => {
        let message = input.value;
        console.log(message);

        let obj = { "message": message };
        let jsonData = JSON.stringify(obj);

        fetch('/messages', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                //Do something with data here - no need to fetch again since it can be done directly from here


                let feed = document.createElement('p');

                let message = data.message;
                let time = data.time;
                feed.innerHTML = time + ": " + message;

                feedSection.insertBefore(feed, feedSection.firstChild);

            })
            .catch(error => {
                console.log("Error: " + error);
            })
    })

    let maramSignIn = document.getElementById('maram-sign-in');
    let logging = document.getElementById('logging');
    let maramField = document.getElementById('maram-field');

    maramSignIn.addEventListener('click', () => {

        logging.innerHTML = '';

        let box = document.getElementById('box');
        box.className = "box2";
        let para = document.createElement('p');
        para.innerHTML = "Type password";
        para.style.color = "white";
        let inputP = document.createElement('input');
        inputP.type = "password";
        inputP.id = "input-p";
        let signInBttn = document.createElement('button');
        signInBttn.id = "sign-in";
        signInBttn.innerHTML = "Sign in";
    
        logging.appendChild(para);
        logging.appendChild(inputP);
        logging.appendChild(signInBttn);

        signInBttn.addEventListener('click', () => {
            let inputValue = inputP.value;

            if (inputValue === "maram") {
                maramField.innerHTML = '';

                let qInput = document.createElement('input');
                let qButton = document.createElement('button');
                qInput.type = "text";
                qButton.innerHTML = "Answer";

                maramField.appendChild(qInput);
                maramField.appendChild(qButton);

                qButton.addEventListener('click', () => {
                    let answer = qInput.value;
                    console.log(answer);

                    let obj = { "answer": answer };
                    let jsonData = JSON.stringify(obj);

                    fetch('/answers', {
                        method: 'POST',
                        headers: { "Content-type": "application/json" },
                        body: jsonData
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            let answerFeed = document.createElement('p');
                            answerFeed.style.color = "purple";


                            let answer = data.answer;
                            let time = data.time;

                            answerFeed.innerHTML = time + ": " + answer;

                            feedSection.insertBefore(answerFeed, feedSection.firstChild);
                        })
                })

            } else {
                maramField.innerHTML = '';
                let errorM = document.createElement('p');
                errorM.style.color = "white";
                errorM.innerHTML = "Incorrect password! Try again.";

                maramField.appendChild(errorM);
            }
        })

    })

    fetch('/messages-show')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        for (let i = 0; i < data.data.length; i++){
            let feed = document.createElement('p');

            let message = data.data[i].message;
            let time = data.data[i].time;
            let answer = data.data[i].answer;
            // console.log(message);

            if(message){
                feed.innerHTML = time + ": " + message;
            } else if (answer) {
                feed.innerHTML = time + ": " + answer;
                feed.style.color = "purple";
            }
            
            feedSection.insertBefore(feed, feedSection.firstChild);
        }
        
    })

})