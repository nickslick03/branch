import Quizlet from "dataset";
import Fun from "dataset/sets/Fun";
import { StudiableItem } from "dataset/types";
import { shuffle } from "./shuffle";

export const quizletQuestions = (() => {

    //const quizletSet = Quizlet.getRandomSet();
    const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();
    const wrongTerms: StudiableItem[] = [];
    const wrongTermCycle = 3;
    let wrongTermCurrCycle = 0;
    
    const randomIndicies = shuffle(quizletSet.studiableItem.map((_, index) => index));
    let currIndex = 0;

    return {
        getNextItem() {
            const lastIndex = currIndex;
            currIndex = (currIndex + 1) % randomIndicies.length;
            return quizletSet.studiableItem[randomIndicies[lastIndex]];
        }
    };
})();