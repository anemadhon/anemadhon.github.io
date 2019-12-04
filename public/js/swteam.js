if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Registrasi Sukses!");
        })
        .catch(function() {
            console.log("Registrasi Gagal!");
        });
    });
} else {
    console.log("SW tidak di dukung");
}

document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var myTeamFav = urlParams.get("saved");
    var add = document.getElementById("add");
    var dlt = document.getElementById("dlt");
    var match = document.getElementById("bodyTeamMatch");
    
    if (myTeamFav) {
        match.style.display = "none";
        add.style.display = "none";
        dlt.style.display = "block";
        var teamDeleted = getFavById();
    } else {
        match.style.display = "block";
        add.style.display = "block";
        dlt.style.display = "none";
        var teamAdded = getTeamById();
    }

    add.onclick = function() {
        console.log("Mencoba Tambah Club Favorit...");
        teamAdded.then(function(team) {
            addFavClub(team);
        });
    };

    dlt.onclick = function() {
        console.log("Mencoba Menghapus Club Favorit...");
        teamDeleted.then(function(team) {
            deleteFavClub(team.id);
        });
    };

});