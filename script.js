const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled; // toggle between true or false
}


// Passing Joke to VoiceRSS Speech API
function tellMeAJoke(joke) {
    VoiceRSS.speech({
        key: 'API_KEY_FROM_/Dev_Extra',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.setup) { // twopart joke
            joke = `${data.setup} ... ${data.delivery}`;
        } else { // single joke
            joke = data.joke;
        }

        // Text-to-Speech
        tellMeAJoke(joke);

        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Error Here
        console.log('Whoops', error);
    }
}


// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);