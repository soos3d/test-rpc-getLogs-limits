// return the approximate sie of the stringified JSON object 
function getSizeMb(object) {

    const parsed = JSON.stringify(object, null, )
    const bytes = new TextEncoder().encode(parsed).length

    const kb = (bytes / 1024)
    const mb = (kb / 1024).toFixed(2);

    return mb
}

module.exports = {
    getSizeMb
}