function save_options() {

    var hashKey = document.getElementById('hashKey').value;

    chrome.storage.sync.set({
            hashKey: hashKey,
        }, function() {
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
}
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
            hashKey: ""
        },
        function(items) {
            document.getElementById('hashKey').value = items.hashKey;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);