import Quizlet from "dataset";
import { SerializedMediaImage, SerializedMediaText } from "dataset/types";
import { shuffle } from "./shuffle";

/**
 * Condensed version of the StudiableItem type which removes the clutter.
 */
export type CondensedItem = {
    id: number;
    term: string;
    definition: string;
    imageURL?: string;
};

/**
 * IIFE which returns methods that help with the question distribution for the game components.
 */
export const quizletQuestions = (() => {

    const allSets = Quizlet.getAllSets();

    let condensedItemList: CondensedItem[];
    let randomIndicies: number[];

    /**
     * assigns an array to condensedItemList and randomIndicies.
     * @param index The index for allSets
     */
    const chooseSet = (index: number) => {
        condensedItemList = allSets[index].studiableItem.map<CondensedItem>(item => ({
            id: item.id,
            term: (item.cardSides[0].media[0] as SerializedMediaText).plainText,
            definition: (item.cardSides[1].media[0] as SerializedMediaText).plainText,
            imageURL: (item.cardSides[1]?.media[1] as SerializedMediaImage)?.url,
        }));
        randomIndicies = shuffle(condensedItemList.map((_, index) => index));
    };

    chooseSet(0);

    const availableDefinitions: Set<CondensedItem> = new Set();
    const wrongTerms: Set<CondensedItem> = new Set();
    
    let currDefIndex = 0;

    return {

        /**
         * @returns The titles of all the quizlet sets.
         */
        getSetTitles() {
            return allSets.map(({set}) => set.title);
        },

        /**
         * Changes the quizlet set to use for the game.
         * @param index The index of the set
         */
        changeSet(index: number) {
            chooseSet(index);
        },

        /**
         * Finds the next term in the form of a CondensedItem. If the user got terms wrong, 
         * it returns the first term the user got wrong.
         * @returns a CondensedItem to be used as the next term.
         */
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

        /**
         * Chooses a CondensedItem randomly from a set of available definitions.
         * @returns a CondensedItem to be used as a definition.
         */
        getNextDefinition() {
            const lastIndex = currDefIndex;
            currDefIndex = (currDefIndex + 1) % randomIndicies.length;
            const item = condensedItemList[randomIndicies[lastIndex]];
            availableDefinitions.add(item);
            return item;
        },

        /**
         * Stores a CondensedItem as a term the user got wrong for future use.
         * @param item the term that was wrong
         */
        gotTermWrong(item: CondensedItem) {
            wrongTerms.add(item);
        },
    };
})();