import Quizlet from "dataset";
import Fun from "dataset/sets/Fun";
import Games from "dataset/sets/Games";
import Science from "dataset/sets/Science";
import { SerializedMediaImage, SerializedMediaText } from "dataset/types";
import { shuffle } from "./shuffle";

export type CondensedItem = {
    id: number;
    term: string;
    definition: string;
    imageURL?: string;
};

export const quizletQuestions = (() => {

    const quizletSet = Science.getAllSetsMap().cellBiology;
    //const quizletSet = Quizlet.getRandomSet();
    //const quizletSet = Fun.getAllSetsMap().disneyPrincessTrivia;
    //const quizletSet = Games.getAllSetsMap().videoGameTrivia;

    const condensedItemList = quizletSet.studiableItem.map<CondensedItem>(item => ({
        id: item.id,
        term: (item.cardSides[0].media[0] as SerializedMediaText).plainText,
        definition: (item.cardSides[1].media[0] as SerializedMediaText).plainText,
        imageURL: (item.cardSides[1]?.media[1] as SerializedMediaImage)?.url,
    }));

    const availableDefinitions: Set<CondensedItem> = new Set();
    const wrongTerms: Set<CondensedItem> = new Set();

    
    const randomIndicies = shuffle(condensedItemList.map((_, index) => index));
    let currDefIndex = 0;

    return {

        getNextTerm() {
            if (wrongTerms.size > 0) {
                const item = Array.from(wrongTerms)[0];
                wrongTerms.delete(item);
                return item;
            }

            const currDefList = Array.from(availableDefinitions);
            const randIndex = Math.floor(Math.random() * currDefList.length);
            availableDefinitions.delete(currDefList[randIndex]);
            return currDefList[randIndex];
        },

        getNextDefinition() {
            const lastIndex = currDefIndex;
            currDefIndex = (currDefIndex + 1) % randomIndicies.length;
            const item = condensedItemList[randomIndicies[lastIndex]];
            availableDefinitions.add(item);
            return item;
        },

        gotTermWrong(item: CondensedItem) {
            wrongTerms.add(item);
        },
    };
})();