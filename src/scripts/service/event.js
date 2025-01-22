async function getEvents(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/events`);
    const eventsData = await response.json();
    return eventsData;
}

export{getEvents}