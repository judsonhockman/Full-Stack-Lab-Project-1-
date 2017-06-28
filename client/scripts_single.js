var path = window.location.pathname;  // /chirps/12
var pieces = path.split('/');   // ['', 'chirps', '12']
var id = pieces[2]; // 12

$.ajax({
    method: 'GET',
    url: '/api/chirps'/ + id
}).then(function(chirp) {
addChirpDiv(chirp);
}, function(err) {
console.log(err);
});
function addChirpDiv(chirp) {
    var $chirpDiv = $('<div class="chirp"></div>');
    var $message = $('<p></p>');
    var $user = $('<h4></h4>');
    var $timestamp = $('<h5></h5>');
    var $buttonBlock = $('<div class="button-block"></div>');
    var $editButton = $('<button class="enhanced-button">Update</button>');
    $editButton.click(function() {
        window.location.pathname = '/chirps/' + id + '/update';
    });
    var $delButton = $('<button class="enhanced-button red">Delete</button>');
     $delButton.click(function () {
        if (confirm('Are you sure you want to delete this chirp?')) {
            $.ajax({
                method: 'DELETE',
                url: '/api/chirps/' + id
            }).then(function() {
                window.location.replace('/chirps');
            }, function(err) {
                console.log(err)
            });
        }
    });

    $message.text(chirp.message);
    $user.text(chirp.user);
    $timestamp.text(new Date(chirp.timestamp).toLocaleString());

$buttonBlock.append($editButton);
$buttonBlock.append($delButton);

    $message.appendTo($chirpDiv);
    $user.appendTo($chirpDiv);
    $timestamp.appendTo($chirpDiv);
    $buttonBlock.appendTo($chirpDiv);
   

    $chirpDiv.appendTo('#chirp-list');
 
}