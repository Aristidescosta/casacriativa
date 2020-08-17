function OnOff(){
    document
        .querySelector('#modal')
        .classList
        .toggle('hide')

     document
        .querySelector('body')
        .classList
        .toggle('hidescrool')

    document
        .querySelector('#modal')
        .classList
        .toggle('addcrool')
}

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
    ]

    const isEmpty = valuesToCheck.find(function(value) {
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsEmpty && checkIfIsString){
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos campos")
    }

}