//import pickMultiples from random
import {pickWeight, pick} from './generators.tools.js';

// ##################
// ###  LEARNING  ###
// ##################

/**
 * It takes a list of words and returns a list of words with the words in lowercase and a list of all
 * the letters in the words.
 * @param learningListRaw - a list of words that the user wants to learn
 * @returns An object with two properties: learningList and lettersInLearningList.
 */
export function preprocessData(learningListRaw)
{
    // Create a list where all the words are in the form '>>>wordinlowercase<<'
    var learningList = [];
    for (var i = 0; i < learningListRaw.length; i++)
    {
        var lowercaseWord = learningListRaw[i].toLowerCase();
        learningList[i] = ">>>" + lowercaseWord + "<<";
    }
    // Create a list of all the letters in the learning list
    var lettersInLearningList = [];
    learningListRaw.forEach(word => {
        //lower case the word
        word = word.toLowerCase();
        //for each letter in word, add to list if not already in list
        for (var i = 0; i < word.length; i++){
            var letter = word[i];
            //prevent spaces and duplicates
            if (letter != " " && !lettersInLearningList.includes(letter))
            {
                lettersInLearningList.push(word[i]);
            }
        }
    });

    return {learningList: learningList, lettersInLearningList: lettersInLearningList};
}


// #######################
// ###  MARKOV CHAINS  ###
// #######################


/**
 * For each word in the learning list, we take each group of n letters in the word, and we add the next
 * letter to the list of next letters for that group of n letters. 
 * 
 * For example, if we have the word "hello", and n=2, then we would have the following groups of n
 * letters: "he", "el", "ll", "lo". 
 * 
 * For each of these groups of n letters, we would add the next letter to the list of next letters for
 * that group of n letters. 
 * 
 * For example, for the group of n letters "he", we would add the letter "l" to the list of next
 * letters for "he". 
 * 
 * For the group of n letters "el", we would add the letter "l" to the list of next letters for "el". 
 * 
 * For the group of n letters "ll", we would add the letter "o" to the list
 * @param n - the number of letters to consider in the dico
 * @param learningList - a list of words that the model will learn from
 * @returns A dictionary with the key being a group of n letters and the value being a dictionary with
 * the key being the next letter and the value being the probability of that letter being the next
 * letter.
 */
export function dico(n,learningList)
{
    var dico = {};
    //for all words in learning_list 
    learningList.forEach(word => {
        //foreach group of n letter in word
        for (var i = 2; i < word.length - 1; i++)
        {
            //we pick a group of n letter
            var groupOfNLetter = word.substring(i - (n - 1), i + 1);

            //if group_of_n_letter not in dico
            if (dico[groupOfNLetter] == undefined)
            {
                
                var listeNextLetters;
                var proba={};
                //Dirichlet Prior (include randomness)
                listeNextLetters = "abcdefghijklmnopqrstuvwxyz".split("");
                //generate a dico with a key is a letter and value is 0.0001 by default
                for (var j = 0; j < listeNextLetters.length; j++)
                {
                    proba[listeNextLetters[j]] = 0.0001;
                }

                //increment the proba of the letter
                if(!listeNextLetters.includes(word[i + 1]))
                {
                    proba[word[i + 1]] = 1;
                }
                else{
                    proba[word[i + 1]] += 1;
                }
            }
            else{
                //we get the liste_next_letters and proba
                proba = dico[groupOfNLetter];
                //listeNextLetters is proba keys
                listeNextLetters = Object.keys(proba);
                //we add the letter/raise its proba
                if(!listeNextLetters.includes(word[i + 1]))
                {
                    proba[word[i + 1]] = 1;
                }
                else{
                    proba[word[i + 1]] += 1;
                }
            }
            dico[groupOfNLetter]=proba //on met à jour le dico

        }
    });
    return dico
}



// #########################
// ###  Ecriture du mot  ###
// #########################


/**
 * use markov chain to generate a word
 * @param mini - the minimum length of the word
 * @param learning_list - a list of words that the program will use to generate new words
 * @param lettres_in_learning_chaine - an array of letters in the learning string
 * @returns A string of letters.
 */
export function ecriture_mot(mini,learning_list,lettres_in_learning_chaine)
{
    var dico_1 = dico(1,learning_list);
    var dico_2 = dico(2,learning_list);
    var dico_3 = dico(3,learning_list);
    //pick a letter from the list of letters in the learning string to start the word
    var word = pick(lettres_in_learning_chaine);
    var wordCompleted = false;
    var possibleAdd = true;
    var i = 0;
    while (!wordCompleted && i < 200 && word.length <8) {
        var ajout = "";
        var options;
        //first letter case
        if (word.length==0) {
            options = dico_1[word]	
            //pick a random letter different from '<' and ""
            while(ajout == "" || ajout == "<") {
                ajout = pickWeight(options).item;
            }
        }else{
            
            //test if letter we are looking  are in dico_1
            if (word[i] in dico_1) {
                // ajout = "";
                options = dico_1[word[i]]	
                //pick a random letter different from '<' and "" if the word is too short
                if (word.length < mini)
                {
                    while(ajout == "" || ajout == "<") {
                        ajout = pickWeight(options).item;
                    }
                }
                else ajout = pickWeight(options).item;
            }
            //test if letter we are looking at and the previous letters are in dico_2
            if (word[i-1] + word[i] in dico_2) {
                // ajout = "";
                options = dico_2[word[i-1] + word[i]]
                //pick a random letter different from '<' and "" if the word is too short
                if (word.length < mini)
                {
                    while(ajout == "" || ajout == "<") {
                        ajout = pickWeight(options).item;
                    }
                }
                else ajout = pickWeight(options).item;
            }

            //test if letter we are looking at and the 2 previous letters are in dico_3
            if (word[i-2] + word[i-1] + word[i] in dico_3) {
                // ajout = "";
                options = dico_3[word[i-2] + word[i-1] + word[i]]
                //pick a random letter different from '<' and "" if the word is too short
                if (word.length < mini)
                {
                    while(ajout == "" || ajout == "<") {
                        ajout = pickWeight(options).item;
                    }
                }
                else ajout = pickWeight(options).item;
            }
        }

        if(ajout == "<") {
            wordCompleted = true;
            ajout = "";
        }
        else possibleAdd = true;

        //if it's possible to add a letter
        if (possibleAdd) {
            word += ajout
            possibleAdd = false
        }

        //add one to the counter
        i += 1
    }
    //return the final result of the word
    return word;
}

/**
 * It takes a list of words and returns a generated word based on that list that are at least as long as the minimum size
 * @param minimumSize - The minimum size of the generated string.
 * @param learningList - The list of words you want to learn from.
 * @returns A function that takes a minimumSize and a learningList.
 */
export function markov(minimumSize,learningList)
{
    var data = preprocessData(learningList)
    return ecriture_mot(minimumSize,data.learningList,data.lettersInLearningList)
}

/**
 * It takes a list of words and returns a generated a list of words based on that list that are at least as long as the minimum size
 * @param minimumSize - The minimum size of the generated string.
 * @param learningList - The list of words you want to learn from.
 * @param numberOfWords - The number of words you want to generate.
 * @returns A function that takes a minimumSize and a learningList.
 */
export function markovMultiple(minimumSize,learningList,numberOfWords)
{
    var data = preprocessData(learningList);
    var words = [];
    for (var i = 0; i < numberOfWords; i++) {
        words.push(ecriture_mot(minimumSize,data.learningList,data.lettersInLearningList));
    }
    return words;
}



// ##########			  ##########
// ##########    Liste   ##########
// ##########    Names   ##########
// ##########            ##########


/**
 * It takes a list of names, and returns a random name from that list or generates a random name with markov chain algorithm
 * @param names - an array or object of arrays of names
 * @param [number=1] - the number of name to generate
 * @param [markov=false] - If true, the name will be generated using a markov chain. If false, it will
 * be randomly selected from the list.
 * @param [minimumSize=3] - The minimum size of the name.
 * @returns A random name or list of names from the list of names.
 */
export function randomName(names,number=1,markov=false,minimumSize=3)
{
    if(markov)
    {
        return number>1 ? markovMultiple(minimumSize,names,number) : markov(minimumSize,names);
    }
    else
    {
        return randomExistingName(names,number);
    }
}


/**
 * It takes an object of arrays of names, and returns a random name from one of the arrays
 * @param [names] - an object containing the names.
 * @param [number] - number of names to pick
 * @returns A random name or list of names from the list.
 */
export function randomExistingName(names,number=1)
{
    var options;
    var namesList=[];
    for(var i=0;i<number;i++)
    {
        //pick a random categorie 
        var categorie = pick(Object.keys(names));
        //if names is an object
        if(!Array.isArray(names))
        {
            options = names[categorie];
            //while option is an object, pick a random categorie
            while(!Array.isArray(options))
            {
                categorie = pick(Object.keys(options));
                options = options[categorie];
            }
        }else{
            options = names;
        }
        
        //then pick a random name from the list
        namesList.push(pick(options));

        //reset categorie
        categorie =""
        
    }
    
    return namesList;

}

