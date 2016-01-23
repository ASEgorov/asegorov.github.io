var myTrelloapp = function(){
    var authenticationSuccess = function() {
        console.log("Successful authentication");
        var $node = $("#table-line");
        var $output = $("#output-container");
        Trello.get("members/me/boards", {limit: 3}, function(boards){
            //var lBoards = boards;
            var $ajax = null;
            for(var i = 0; i < boards.length; i++){
                $ajax = Trello.get("boards/"+boards[i].id+"/cards", {limit: 5}, function(cards){
                    for(var j = 0; j < cards.length; j++){
                        var $newNode = $node.clone();
                        $output.append($newNode);
                        //$("#board-name", $newNode).html(lBoards[i].name);
                        $("#card-name", $newNode).html(cards[j].name);
                        $("#card-descr", $newNode).html(cards[j].desc);
                        $("#card-due-date", $newNode).html(cards[j].due);
                    }
                })
            }
            if($ajax != null){
                $ajax.done(function(){
                    $("#loading").hide();
                    $node.hide();
                })
            }
        })

    };
    var authenticationFailure = function() { console.log("Failed authentication"); };

    $(document).ready(function(){
        Trello.authorize({
            type: "popup",
            name: "Trello demo app",
            scope: {
                read: true,
                write: false },
            expiration: "never",
            success: authenticationSuccess,
            error: authenticationFailure
        });
    });

}();

