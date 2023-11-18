const channelName = 'robottelevision'; // Replace with your Twitch channel name
const oauthToken = config.oauthToken;

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    channels: [channelName]
});

client.connect();

const characters = {};

client.on('message', (channel, tags, message, self) => {
    if (self || !message) return;

    if (!characters[tags.username]) {
        const character = createCharacter(tags);
        characters[tags.username] = { character, timer: null };
    }

    resetCharacterTimer(tags.username);

    const userCharacter = characters[tags.username].character;
    const newX = Math.random() * (window.innerWidth - userCharacter.offsetWidth);
    const newY = Math.random() * (window.innerHeight - userCharacter.offsetHeight);
    moveCharacter(userCharacter, newX, newY);
});

function createCharacter(tags) {
    const character = document.createElement('div');
    character.className = 'character character-idle';
    character.style.filter = `sepia(1) hue-rotate(${calculateHue(tags.color)}deg) saturate(3)`;
    document.body.appendChild(character);
    return character;
}

function moveCharacter(character, newX, newY) {
    character.className = 'character character-walk';
    const currentX = parseInt(character.style.left, 10) || 0;
    const currentY = parseInt(character.style.bottom, 10) || 0; // Added this line

    const scaleX = newX >= currentX ? 1 : -1;
    character.style.transform = `scaleX(${scaleX})`;

    const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));
    const speed = 0.1; // Pixels per millisecond
    const duration = distance / speed;

    character.style.transition = `left ${duration}ms ease, bottom ${duration}ms ease`;
    character.style.left = newX + 'px';
    character.style.bottom = newY + 'px';

    character.addEventListener('transitionend', () => {
        character.className = 'character character-idle';
    }, { once: true });
}

function resetCharacterTimer(username) {
    const userData = characters[username];
    if (userData.timer) {
        clearTimeout(userData.timer);
    }
    userData.timer = setTimeout(() => {
        userData.character.style.display = 'none';
    }, 3600000); // 1 hour in milliseconds
    userData.character.style.display = 'block';
}

function displayEmote(character, emotes) {
    Object.keys(emotes).forEach(emoteId => {
        const emoteImg = document.createElement('img');
        emoteImg.src = `https://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/1.0`;
        emoteImg.className = 'emote';
        emoteImg.style.position = 'absolute';
        emoteImg.style.left = character.style.left;
        emoteImg.style.bottom = (parseInt(character.style.bottom) + 30) + 'px';
        document.body.appendChild(emoteImg);
        setTimeout(() => {
            document.body.removeChild(emoteImg);
        }, 3000);
    });
}

function calculateHue(hexColor, hueOffset = 325) {
    if (!hexColor) return 0; // Default to 0 if no color provided

    // Convert hex to RGB
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    // Convert RGB to HSL and return the Hue with an offset
    const hue = (rgbToHue(r, g, b) + hueOffset) % 360;
    console.log(`Converted ${hexColor} to hue: ${hue} with offset: ${hueOffset}`);
    return hue;
}

function rgbToHue(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h;

    if (max === min) {
        h = 0;
    } else {
        const d = max - min;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return Math.round(h * 360); // Convert to degrees on the color circle
}

