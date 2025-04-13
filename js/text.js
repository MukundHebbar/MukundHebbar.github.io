document.getElementById("submit-button").addEventListener("click", function () {
    // Retrieve the text from the textarea
    const text = document.getElementById("message-input").value;
  
    
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  
    // Count words by trimming the text and splitting on one or more whitespace characters.
    // If the trimmed text is empty, then word count is 0.
    const trimmedText = text.trim();
    const wordCount = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
  
   
    const spaceCount = (text.match(/ /g) || []).length;
  
   
    const newlineCount = (text.match(/\n/g) || []).length;
  
    // Count special symbols: here defined as any character that is not a letter, digit, or whitespace.
    const symbolCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  
    const pronouns = [
        "I", "me", "you", "he", "him", "she", "her", "it", "we", "us", "they", "them",
        "mine", "yours", "his", "hers", "its", "ours", "theirs",
        "my", "your", "our", "their",
        "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves",
        "this", "that", "these", "those",
        "who", "whom", "whose", "which", "what",
        "anyone", "anybody", "anything", "someone", "somebody", "something",
        "everyone", "everybody", "everything",
        "noone", "nobody", "nothing",
        "each", "either", "neither", "one", "none",
        "all", "any", "some", "several", "few", "many", "much", "more", "most", "other", "others", "such"
      ] ; 

      // Create dictionary to count pronoun occurrences
const pronounCounts = {};

// Initialize all pronouns with zero count
pronouns.forEach(pronoun => {
    pronounCounts[pronoun] = 0;
});

// Split text into words and normalize for comparison
const words = text.toLowerCase().match(/\b\w+\b/g) || [];

// Count pronouns
words.forEach(word => {
    const normalizedWord = word.toLowerCase();
    pronouns.forEach(pronoun => {
        if (normalizedWord === pronoun.toLowerCase()) {
            pronounCounts[pronoun]++;
        }
    });
});

// we will not be printing any pronouns whose freq is zero
const usedPronouns = {};
for (const pronoun in pronounCounts) {
  if (pronounCounts[pronoun] > 0) {
    usedPronouns[pronoun] = pronounCounts[pronoun];
  }
}

const prepositions = [
    "aboard", "about", "above", "across", "after", "against", "along", "amid", "among",
    "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides",
    "between", "beyond", "but", "by", "concerning", "despite", "down", "during",
    "except", "excluding", "following", "for", "from", "in", "inside", "into",
    "like", "minus", "near", "of", "off", "on", "onto", "opposite", "out",
    "outside", "over", "past", "per", "plus", "regarding", "round", "save",
    "since", "than", "through", "throughout", "till", "to", "toward", "towards",
    "under", "underneath", "unlike", "until", "up", "upon", "versus", "via",
    "with", "within", "without"
  ] ; 

  const prepositionCounts = {} ;

  prepositions.forEach(preposition=> {
    prepositionCounts[preposition] = 0;
});
      // we already have the words variable ready with all the words

words.forEach(word => {
    const normalizedWord = word.toLowerCase();
    prepositions.forEach(prepo => {
        if (normalizedWord === prepo.toLowerCase()) {
            prepositionCounts[prepo]++;
        }
    });
});

// we will not be printing any pronouns whose freq is zero
const usedPrepos = {};
for (const prepo in prepositionCounts) {
  if (prepositionCounts[prepo] > 0) {
    usedPrepos[prepo] = prepositionCounts[prepo];
  }
}



const indefinite = ["a","an"] ;
const indefcounts = {} ;
indefinite.forEach(indef=>{indefcounts[indef]=0;})

words.forEach(word => {
  const normalizedWord = word.toLowerCase();
  indefinite.forEach(indef => {
      if (normalizedWord === indef.toLowerCase()) {
          indefcounts[indef]++;
      }
  });
});
const usedindef = {};
for (const used in indefcounts) {
  if (indefcounts[used] > 0) {
    usedindef[used] = indefcounts[used];
  }
}




function printDictionary(dict) {
    return Object.entries(dict)
      .filter(([key, value]) => value !== 0)
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br>");
  }
    // Build the output string with the calculated values
    const output = `
      Letters: ${letterCount} <br>
      Words: ${wordCount} <br>
      Spaces: ${spaceCount} <br>
      Newlines: ${newlineCount} <br>
      Special Symbols: ${symbolCount} <br>
      Pronouns : ${printDictionary(usedPronouns)} <br>
      Propositions : ${printDictionary(usedPrepos)}<br>
      Indefinite Articles: ${printDictionary(usedindef)}
    `;
  
    // Display the results in the div with id "word-count"
    document.getElementById("word-count").innerHTML = output;
  });
  