const confirmDeletion = document.querySelector('#form-delete')

confirmDeletion.addEventListener('submit', function(event) {

    const confirmation = confirm('Delete profile?')

    if (!confirmation) {
        event.preventDefault()
    }
})