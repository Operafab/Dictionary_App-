// DOM Elements
const form = document.getElementById('form');
const wordInput = document.getElementById('WordInput');
const mobileInput = document.getElementById('mobileInput');
const displayPlaceholder = document.getElementById('displayPlaceholder');
const result = document.getElementById('result');
const wordText = document.getElementById('WordText');
const phonetics = document.getElementById('phonetics');
const textToSpeech = document.getElementById('textToSpeech');
const meaningsContainer = document.getElementById('meanings');
const noun = document.getElementById('noun');
const verb = document.getElementById('verb');
const interjection = document.getElementById('interjection');
const emoji = document.getElementById('emoji');

// to hide result section 
result.style.display = 'none';

// adding event listener to form
form.addEventListener('submit', function (e) {
  e.preventDefault(); 

  // setting variable for wordInput
  const word = wordInput.value.trim() || mobileInput.value.trim();
  
  if (word) {
    getWordDefinition(word);
  }
});

// getDefintion function to fetch meaning from the API
async function getWordDefinition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if (!response.ok) {
      throw new Error('Word not found');
    }

    const data = await response.json();
    const wordData = data[0];

    // to display the searched word and meaning
    wordText.innerText = wordData.word;
    phonetics.innerText = wordData.phonetics[0]?.text || 'No phonetics available';
    
    
    

    // to clear previous meanings
    noun.innerText = '';
    verb.innerText = '';
    interjection.innerText = '';

    // using forEach method to get meanings
    wordData.meanings.forEach(meaning => {
      const partOfSpeech = meaning.partOfSpeech;
      const definition = meaning.definitions[0].definition;

      if (partOfSpeech === 'noun') {
        noun.innerText = `Noun: ${definition}`;
      } else if (partOfSpeech === 'verb') {
        verb.innerText = `Verb: ${definition}`;
      } else if (partOfSpeech === 'interjection') {
        interjection.innerText = `Interjection: ${definition}`;
      }
    });

    // Hide the placeholder and show the result
    displayPlaceholder.style.display = 'none';
    result.style.display = 'block';

  } catch (error) {
    console.error('Error fetching the word definition:', error);
    alert('Word not found, please try another word.');
  }
}