/* Imports */
import { renderFriend, renderMushroom } from './render-utils.js';
import { getRandomItem } from './utils.js';

/* Get DOM Elements */
const messageSection = document.getElementById('message-section');
const mushroomContainer = document.getElementById('mushroom-container');
const huntMushroomsButton = document.getElementById('hunt-mushrooms-button');
const addFriendForm = document.getElementById('add-friend-form');
const sayGoodbyeButton = document.getElementById('say-goodbye-button');
const friendsSection = document.getElementById('friends-section');

/* State */
let message = '';
let mushrooms = [{ type: 'porcini' }, { type: 'chanterelle' }, { type: 'morel' }];

let friends = [
    { name: 'Wilbur', satisfied: 0 },
    { name: 'Miss Piggy', satisfied: 0 },
    { name: 'Pumbaa', satisfied: 0 },
];

// static types and probabilities
const porcini = {
    type: 'porcini',
};
const chanterelle = {
    type: 'chanterelle',
};
const morel = {
    type: 'morel',
};

const amountFound = [0, 0, 0, 0, 1, 1, 1, 2];
const mushroomTypeFound = [porcini, porcini, porcini, morel, morel, chanterelle];

/* Events */

const foundMessage = ['No mushrooms found!', 'You found 1 mushroom', 'You found 2 mushrooms'];

huntMushroomsButton.addEventListener('click', () => {
    // get a random number of mushrooms
    const found = getRandomItem(amountFound);
    // loop for each mushroom we need to create
    for (let i = 0; i < found; i++) {
        // get a random mushroom
        const mushroomType = getRandomItem(mushroomTypeFound);
        // create a mushroom object
        const mushroom = {
            type: mushroomType.type,
        };
        // > add the new mushroom to the mushrooms state
        mushrooms.push(mushroom);
    }

    message = foundMessage[found];

    displayMessage();
    displayMushrooms();
});

addFriendForm.addEventListener('submit', (e) => {
    // stop the form from re-posting to the same browser page
    e.preventDefault();
    // use a form data object
    const formData = new FormData(addFriendForm);

    // > create a new friend, with a "name" property that
    // is populated from `formData.get('name')` and a
    // "satisfied" property with an initial value of 0
    const friend = {
        name: formData.get('name'),
        satisfied: 0,
    };
    // > add the new friend to the friends array
    friends.push(friend);
    // > set the message state to let the user know
    // they invited a new friend to the festival, include the friend's
    // name in the message
    message = `${friend.name} has shown up at the festival, make sure they get some mushrooms!`;

    addFriendForm.reset();

    // > call the display functions that need to re-display
    displayFriends();
    displayMessage();
});

sayGoodbyeButton.addEventListener('click', () => {
    const stillHungry = [];
    for (const friend of friends) {
        // > if the friend is not fully satisfied, push
        // them into the stillHungry array
    }
    friends = stillHungry;
    displayFriends();
});

/* Display Functions */
function displayMessage() {
    messageSection.textContent = message;
}

function displayMushrooms() {
    mushroomContainer.innerHTML = '';

    // > loop the mushrooms
    for (let mushroom of mushrooms) {
        // create a mushroom element using the renderMushroom function
        const mushroomEl = renderMushroom(mushroom);
        // append it to the container
        mushroomContainer.append(mushroomEl);
    }
}

function displayFriends() {
    friendsSection.innerHTML = '';

    for (const friend of friends) {
        const friendEl = renderFriend(friend);

        friendEl.addEventListener('click', () => {
            // > handle the three possible outcomes:
            // 1. No mushrooms, set a message to go hunt for more
            // 2. Friend is already fully satisfied (3), set a message to pick another friend
            // 3. Feed friend mushroom:
            // a. "pop" a mushroom off the mushrooms array
            // b. increase friend.satisfied by 1
            // c. set a message that the friend enjoyed the mushroom,
            //    include the friend name and mushroom type in the message

            displayMessage();
            displayMushrooms();
            displayFriends();
        });

        friendsSection.append(friendEl);
    }
}

displayMessage();
displayMushrooms();
displayFriends();
