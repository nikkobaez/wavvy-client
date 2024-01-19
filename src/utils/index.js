const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000)
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    return date.toLocaleDateString('en-US', options);
}

const scrollToBottom = () => {
    const containers = document.querySelectorAll('[name="container"]');

    const containersArray = Array.from(containers);

    if (containersArray) {
        containersArray.forEach((container) => {
            container.scrollTop = container.scrollHeight
        })
    }
}

export {
    formatTimestamp,
    scrollToBottom
}