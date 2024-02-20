const ikkeOnline = (lan) => {
    const tekst = lan === 'Dk' ? 'Du skal være logget ind for at se denne side!!!' : 'You must be logged in to see this page!!!'
    return tekst;
}

export default ikkeOnline;