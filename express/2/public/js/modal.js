const modal = $('#modal')
const modalHeader = $('.modal-header>h2');
const modalBody = $('.modal-body');
const modalFooter = $('.modal-footer');

function modalOpen() {
    modal.fadeIn();
}

function modalClose() {
    resetModal();
    modal.fadeOut();
}

function resetModal() {
    modalHeader.text('DEFAULT');
    modalBody.html('');
    modalFooter.html('');
}

window.onclick = function (event) {
    if (event.target == modal) {
        modalClose()
    }
};
