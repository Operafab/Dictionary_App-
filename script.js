// DOM Elements

const form = document.getElementById("form");
const wordInput = document.getElementById("WordInput");
const mobileInput = document.getElementById("mobileInput");
const displayPlaceholder = document.getElementById("displayPlaceholder");
const result = document.getElementById("result");
const wordText = document.getElementById("WordText");
const phonetics = document.getElementById("phonetics");
const textToSpeech = document.getElementById("textToSpeech");
const meaningsContainer = document.getElementById("meanings");
const noun = document.getElementById("noun");
const verb = document.getElementById("verb");
const interjection = document.getElementById("interjection");
const emoji = document.getElementById("emoji");


// form.addEventListener(()=>e.preventDefault()
// )
// // set initial state

// to get defintiion

const getDefintion = async () => {
  
  const initialState = () => {
    wordText.innerText = "";
    phonetics.innerText = "";
    textToSpeech.innerText = "";
    meaningsContainer.innerHTML = "";
    noun.innerText = "";
    verb.innerText = "";
    interjection.innerText = "";
    emoji.innerText = "";
  };

  try {
    const word = wordInput.value.trim() || mobileInput.value.trim();

    if (!word) {
      initialState();
    }

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    console.log(response);
    if (!response || !response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const wordData = data[0];
    if (!word === wordData.word) {
      window.alert("Word not found");
    }

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



  } catch (error) {
    console.log(error);
  }
};

getDefintion()
// // to hide result section

// // adding event listener to form
// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   // setting variable for wordInput
//   const word = wordInput.value.trim() || mobileInput.value.trim();

//   if(!word || word.length == 0){
//     result.style.display = 'none';
//   }

//   if (word) {
//     getWordDefinition(word);
//   } else {
//     resetToInitialState(); // Reset to initial state if wordInput is empty
//   }
// });

// // getDefintion function to fetch meaning from the API
// async function getWordDefinition(word) {
//   try {
//     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

//     // Manually check for a 404 or unsuccessful response
//     if (!response.ok) {
//       throw new Error('Word not found');
//     }

//     const data = await response.json();
//     const wordData = data[0];

//     // to display the searched word and meaning
//     wordText.innerText = wordData.word;
//     phonetics.innerText = wordData.phonetics[0]?.text || 'No phonetics available';

//     // to clear previous meanings
//     noun.innerText = '';
//     verb.innerText = '';
//     interjection.innerText = '';

//     // using forEach method to get meanings
//     wordData.meanings.forEach(meaning => {
//       const partOfSpeech = meaning.partOfSpeech;
//       const definition = meaning.definitions[0].definition;

//       if (partOfSpeech === 'noun') {
//         noun.innerText = `Noun: ${definition}`;
//       } else if (partOfSpeech === 'verb') {
//         verb.innerText = `Verb: ${definition}`;
//       } else if (partOfSpeech === 'interjection') {
//         interjection.innerText = `Interjection: ${definition}`;
//       }
//     });

//     // Hide the placeholder and show the result
//     displayPlaceholder.style.display = 'none';
//     result.style.display = 'block';

//   } catch (error) {
//     console.error('Error fetching the word definition:', error);

//     // Show the alert message
//     alert('Word not found, please try another word.');

//     // Clear the input fields and reset the page
//     resetToInitialState();
//   }
// }

// // Function to reset the page to its original state (or reset the result div)
// function resetToInitialState() {
//   // Clear input fields
//   wordInput.value = '';
//   mobileInput.value = '';

//   // Hide the result section
//   result.style.display = 'none';

//   // Show the placeholder
//   displayPlaceholder.style.display = 'block';

//   // Reset the previously displayed word, phonetics, and meanings
//   wordText.innerText = 'Word will appear here';
//   phonetics.innerText = 'Phonetics will appear here';
//   noun.innerText = 'Noun definition will appear here';
//   verb.innerText = 'Verb definition will appear here';
//   interjection.innerText = 'Interjection definition will appear here';
// };
