$("#loginButton").click(function() {
    var login = $("[name='login']").val();
    var password = $("[name='password']").val();

    $.ajax({
        url: "/",
        method: "POST",
        data: {
            "login": login,
            "password": password
        },
        }) . then(function(res) {
        if (typeof res.redirectTo === 'string') {
            window.location = res.redirectTo;
        }else{
            $("#error").text(res);
        }
    });
    return false;
});

$("#signOut").click(function(){
     var cookies = document.cookie.split(";");
     for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i];
         var eqPos = cookie.indexOf("=");
         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
     }
})

$("#add_repost").click(function(e) {
   e.preventDefault();
    var textpost = $("[name='text']").val();

    if(textpost.length != 0 ){
        $.ajax({
            url: "/addposts",
            method: "POST",
            data: {
                "text":textpost,
                "picture":"",
            },
        }).then(function(res) {
             location.reload();
            });
    } else {
        alert("error");
    }
});
$("button[post-id]").click(function(e){
    e.preventDefault();
    var id = $(e.currentTarget).attr("post-id");
    var commentText =$(e.currentTarget).prev().val().trim();
    if(commentText.length >1){
    console.log(commentText); 
    $.ajax({
        url: "/comment",
        method: "POST",
        data: {
            "id": id,
            "option":"add",
            "text":commentText
        },
    }).then(function(res) {
        console.log(res);
        location.reload();
    });
    } else {
        alert("Empty Comment");
    }
});
$("#addPhoto").submit(function(e){
    e.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: '/uploadPhoto',
        type: 'POST',
        data:formData,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (response) {
            alert(response);
        }
    });
});
$('.deletePhoto').click(function(e){
    e.preventDefault();
    var id = $(e.currentTarget).attr("data-id");
    var path = $(e.currentTarget).attr("data-path");
    console.log(id);
    $.ajax({
        url:'/deletePhoto',
        type:'POST',
        data:{
            id:id,
            path:path
        },
    }).then(function(res){
        alert(res);
    })
})

$("#adds").submit(function(e){
    e.preventDefault();

    if($("#filea").val() ==""){
        e.preventDefault();
        var textpost = $("[name='text']").val();
        if(textpost.length != 0 ){
             $.ajax({
                 url: "/addposts",
                 method: "POST",
                 data: {
                     "text":textpost,
                     "picture":"",
                 },
             }).then(function(res) {
                 console.log(res);
                  location.reload();
                });
        } else {
                 alert("error");
        }
        } else {
            var formData = new FormData($(this)[0]);
            var text = $("#textPost").val();
            formData.append('text', text);
           $.ajax({
               url: '/uploadsPost',
               type: 'POST',
               data:formData,
               //async: false,
               cache: false,
               contentType: false,
               enctype: 'multipart/form-data',
               processData: false
           }).then(function(res) {
               location.reload();
            });
       }
});
$("div.delete[comment-id]").click(function(e){
    e.preventDefault();
    var idP = $(e.currentTarget).attr("post-id");
    var idC = $(e.currentTarget).attr("comment-id");

    $.ajax({
        url: "/comment",
        method: "POST",
        data: {
            "idP": idP,
            "idC": idC,
            "option":"delete"
        },
    }).then(function(res) {
        $(e.currentTarget).parent().remove();
    });
});
$("div.likes").click(function(e){
    e.preventDefault();
    var idP = $(e.currentTarget).attr("post-id");
    var idC = $(e.currentTarget).attr("comment-id");
    var number = $(e.currentTarget).text().trim()*1;
    $.ajax({
        url: "/comment",
        method: "POST",
        data: {
            "idP": idP,
            "idC": idC,
            "option":"like"
        },
    }).then(function(res) {
        if(res == "0"){
           $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number-1) );
        } else {
           $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number+1) );
        }
    });
});
$("#findPerson").click(function(e){
    e.preventDefault();
    var user = $('input[name="searchPerson"]').val().trim();
    console.log('here');
    $.ajax({
        url: "/searchUser",
        method: "POST",
        data: {
            "user": user,
        },
    }).then(function(res) {
        res.forEach(function(ell){
            console.log(ell);
            var $searchWrapper = $('#searchWrapper');
            $searchWrapper.empty();
            res.forEach(function(ell) {
                var $searchTemplate = $("#templateSearch > div").clone();
                $searchTemplate.find("[user]").text(ell.username);
                $searchTemplate.find("[user]").attr('href','./userpage/'+ell.username)
               if(ell.pathAvatar === undefined){
                   $searchTemplate.find("[avatar]").attr("src","../uploads/noavatar.jpg");
               } else {
                   console.log(ell.picture);
                   $searchTemplate.find("[avatar]").attr("src","../" + ell.pathAvatar);
               }
                $searchTemplate.find("[textMsg]").text(ell.describe);
                $searchWrapper.append($searchTemplate);         
            })
        });
    });
})
$(".likesPost").click(function(e){
    e.preventDefault();
    var id = $(e.currentTarget).attr("post-id");
    var number = $(e.currentTarget).text().trim()*1;
    $.ajax({
       url: "/likePost",
       method: "POST",
       data: {
           "id": id,
       },
    }).then(function(res) {
        console.log(typeof res);
        if(res == "0"){
           $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number-1) );
        } else {
           $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number+1) );
        }
    });
})
$("div.deletePost[data-id]").click(function(e){
    console.log("here");
    e.preventDefault();
    var id = $(e.currentTarget).attr("data-id");
    $.ajax({
        url: "/deletePost",
        method: "POST",
        data: {
            "id": id,
        },
    }).then(function(res) {
        $( e.currentTarget).parent().parent().remove();
    });
});
$("#bowntags").click(function(e){
    e.preventDefault();
    var owntag = $("#owntages").val();
    $.ajax({
        url: "/tags",
        method: "POST",
        data: {
            "tag":owntag,
            "oparation":"owntags"
        },
    }).then(function(res) {
        console.log(res);
    });
});
$("#btag").click(function(e){
    e.preventDefault();
    var owntag = $("#tag").val();
    $.ajax({
        url: "/tags",
        method: "POST",
        data: {
            "tag":owntag,
            "oparation":"tag"
        },
    }).then(function(res) {
        console.log(res);
    });
});
$("#writeMessage").click(function(e){
    var userId = $(e.currentTarget).attr("user-id");
    $.ajax({
        url: "/sendMessege",
        method: "POST",
        data: {
            "userId":userId
        },
    }).then(function(res) {
        console.log(res);
    });
});
$("#follow").click(function(e){
    var userId = $(e.currentTarget).attr("user-id");
    $.ajax({
        url: "/follow",
        method: "POST",
        data: {
            "userId":userId
        },
    }).then(function(res) {
        $("#follow").text(res);
        console.log(res);
    });
})
$("#loginSignUp").click(function(e) {
    e.preventDefault();

    var login = $("#username-registration").val();
    var password = $("#password-registration").val();
    var email = $("[name='email']").val();
    if(login =="" || password == "" || email ==""){
         $('.alert.alert-danger').text("Invalid data");
        return;
    }
    $.ajax({
        url: "/reg",
        method: "POST",
        data: {
            "login": login,
            "password": password,
            "email": email
        },
    }) . then(function(res) {
        if (typeof res.redirectTo === 'string') {
            window.location = res.redirectTo;
        }else{
            $('.alert.alert-danger').text(res);
            $('.alert.alert-danger').fadeIn();
        }
    });
});

$("#filea").change(function(){
   if($("#filea").val() ==""){
       $("#chosen").hide();
   }else{
       $("#chosen").show();
       $("#chosen").html($("#filea").val());
   }
});

var dialog = false;
$('#loadDialogs').click(function(){
    if(!dialog){
        dialog =true;
    $.ajax({
        url: "/loadDialogs",
        method: "POST"
        }) . then(function(res) {
            console.log(res);
            var $dialogWrapper = $('#dialogWrapper');
            res.forEach(function(dial) {
                var $dialogTemplate = $("#templateDialog > div").clone();
                $dialogTemplate.find("[lastMessege]").text(dial.user);
                $dialogTemplate.find("[dateMsg]").text(dial.date);
                if(dial.img === undefined){
                    $dialogTemplate.find("[avatar]").attr("src","../uploads/noavatar.jpg");
                }else{
                    $dialogTemplate.find("[avatar]").attr("src","../" + dial.img);
                }
                $dialogTemplate.find("[textMsg]").text(dial.mess);
                $dialogTemplate.find("[lastMessege]").attr('href','/chat/?dialog='+dial.id);
                if(dial.status == true){
                    $dialogTemplate.addClass("new");
                }
                $dialogWrapper.append($dialogTemplate);
            })
        })
    }
})

var News = false;
var number = 0;
$('#loadNews').click(function(){

    if(!News){
        number++;
        News =true;

        $.ajax({
            url: "/loadNews",
            method: "POST",
            data:{
                number:number
            }
        }) . then(function(res) {
                TemplateNews('#wrapperNewsComments', res.dataComment);
                TemplateNews('#wrapperNewsLikes', res.dataLikes);
                TemplateNews('#wrapperNewsPosts', res.dataPost);
        })
    }
});
$('#loadMore').click(function(){
    var number = $('#wrapper-posts >div').length-1;
    $.ajax({
        url: "/downloadMore",
        method: "POST",
        data:{
            skip:number,
            down:'posts'
        },
        }).then(function(res) {
            console.log(res);
            res.posts.forEach(function(ell, i){
            var $template = $('#templateLoadPost > div').clone();
            $template.find("[img-post-load]").attr('src', '../uploads/'+ ell.user_id_who + '.jpg');
            $template.find("[data-id]").attr('data-id', ell._id);
            $template.find(".author a").text(ell.user_id);
            $template.find(".author a").attr("href",'./userpage/'+ ell.user_id);
            $template.find(".text-post").text(ell.text);
            if(ell.picture !=""){
                $template.find(".post-img-content img").attr('src', '../'+ ell.picture);
            } else {
                $template.find(".post-img-content").remove();
            }
            $template.find(".likesPost").attr('post-id', ell._id);
            console.log(ell.likes);
            $template.find(".likesPost").html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + ell.likes);
            $template.find("button[post-id]").attr('post-id',ell._id);

            for(var j = 0; j <ell.comments.length; j++){

                var $templateComment = $('#templateComments > div').clone();

                $templateComment.find("[comment-id]").attr('comment-id', res.comments[i].comments[j]._id);
                $templateComment.find("[post-id]").attr('post-id',res.comments[i].comments[j].id_post );
                $templateComment.find(".data-block-comment").text(res.comments[i].comments[j].dataC);
                $templateComment.find(".author a").attr("href",'./userpage/'+ res.comments[i].comments[j].user_id_who_comment);
                $templateComment.find(".author a").text(res.comments[i].comments[j].user_id_who_comment);
                $templateComment.find(".text-comment-wrapper").text(res.comments[i].comments[j].textComment);
                $templateComment.find(".likes").html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>'+res.comments[i].comments[j].likes);
                $templateComment.find(".likes").attr('comment-id', res.comments[i].comments[j]._id);
                $templateComment.find(".likes").attr('post-id', res.comments[i].comments[j].id_post);
                $template.append($templateComment);
            }
            $("#wrapper-posts").append($template);
            if(res.more){
                $("#loadMore").remove();
                $("#wrapper-posts").append("<div id ='loadMore' >Load more</div>");
            }else{
                $("#loadMore").remove();
            }
            Event( $template);
        });
    });
});
function TemplateNews(id, data){
    var $wrapper = $(id);
    data.forEach(function(ell){
        var $template = $('#templateNewsWrapper > div').clone();
        if(ell.picture === undefined){
            $template.find("[img-href]").attr("src","../uploads/noavatar.jpg");
        } else {
            console.log(ell.picture);
            $template.find("[img-href]").attr("src",'../'+ ell.picture);
        }
        $template.find("[a-href]").attr("href",'./userpage/'+ell.userName);
        $template.find("[a-href]").text(ell.userName);
        $template.find("[date-wrapper-news]").text(ell.date);
        $template.find("[text-wrapper-text]").text(ell.text);

        $wrapper.append($template);
    })
}

function Event($template){
     $template.find("button[post-id]").click(function(e){
        e.preventDefault();
        var id = $(e.currentTarget).attr("post-id");
        var commentText =$(e.currentTarget).prev().val().trim();
        if(commentText.length >1){
            console.log(commentText); 
            $.ajax({
                url: "/comment",
                method: "POST",
                data: {
                    "id": id,
                    "option":"add",
                    "text":commentText
                },
            }).then(function(res) {

                var $templateComment = $('#templateComments > div').clone();

                $templateComment.find("[comment-id]").attr('comment-id', res._id);
                $templateComment.find("[post-id]").attr('post-id',res.id_post );
                $templateComment.find(".data-block-comment").text(res.dataC);
                $templateComment.find(".author a").attr("href",'./userpage/'+ res.user_id_who_comment);
                $templateComment.find(".author a").text(res.user_id_who_comment);
                $templateComment.find(".text-comment-wrapper").text(res.textComment);
                $templateComment.find(".likes").html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>'+ 0);
                $templateComment.find(".likes").attr('comment-id',res._id);
                $templateComment.find(".likes").attr('post-id', res.id_post);

                $(e.currentTarget).parent().parent().parent().append($templateComment);
            });
        }else{
            alert("Empty Comment");
        }
     });
     $template.find("div.deletePost[data-id]").click(function(e){
        console.log("here");
        e.preventDefault();
        var id = $(e.currentTarget).attr("data-id");
        console.log(id);
        $.ajax({
            url: "/deletePost",
            method: "POST",
            data: {
                "id": id,
            },
        }).then(function(res) {
            $( e.currentTarget).parent().remove();
        });
    });

    $template.find(".likesPost").click(function(e){
        e.preventDefault();
       var id = $(e.currentTarget).attr("post-id");
       var number = $(e.currentTarget).text().trim()*1;
       $.ajax({
           url: "/likePost",
           method: "POST",
           data: {
               "id": id,
           },
       }).then(function(res) {
            console.log(typeof res);
            if(res == "0"){
               $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number-1) );
            } else {
               $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number+1) );
            }
       });
     });

     $template.find("div.likes").click(function(e){
        e.preventDefault();
        var idP = $(e.currentTarget).attr("post-id");
        var idC = $(e.currentTarget).attr("comment-id");
        var number = $(e.currentTarget).text().trim()*1;
        $.ajax({
            url: "/comment",
            method: "POST",
            data: {
                "idP": idP,
                "idC": idC,
                "option":"like"
            },
        }).then(function(res) {
            console.log(res);
            if(res == "0"){
               $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number-1) );
            } else {
               $(e.currentTarget).html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + (number+1) );
            }
        });
    });
    $template.find("div.delete[comment-id]").click(function(e){
        e.preventDefault();
        var idP = $(e.currentTarget).attr("post-id");
        var idC = $(e.currentTarget).attr("comment-id");

        $.ajax({
            url: "/comment",
            method: "POST",
            data: {
                "idP": idP,
                "idC": idC,
                "option":"delete"
            },
        }).then(function(res) {
            console.log(res);
            $(e.currentTarget).parent().remove();
        });
    });
}
var load= false;
$('#showFollow').click(function(){
    if(!load){
        load = true;
    } else {
        return;
    }
    $.ajax({
        url: "/downloadMore",
        method: "POST",
        data:{
            down:'follow'
        },
    }).then(function(res) {
        console.log(res);
        res.forEach(function(ell){
            var $template = $("#followtemplate > div").clone();
            if(ell.pathAvatar){;
                $template.find("img").attr("src",'../' + ell.pathAvatar);
            }else{
                $template.find("img").attr("src",'../uploads/noavatar.jpg');
                
            }
            $template.find("a").attr('href',ell.username);
            $template.find("a").text(ell.username);
            if(ell.describe){
                $template.find(".usersub").text(ell.describe);
            } else {
                $template.find(".usersub").remove();
            }
            console.log($template);
            $('#block-content-follow').append($template);
        });
    })
})
$('#showFollowUser').click(function(){
    $.ajax({
        url: "/downloadMore",
        method: "POST",
        data:{
            down:'followUser',
            user:window.location.href
        },
    }).then(function(res) {
        console.log(res);
        res.forEach(function(ell){
            var $template = $("#followtemplate > div").clone();
            if(ell.pathAvatar){;
                $template.find("img").attr("src","../"+ell.pathAvatar);
            }else{
                $template.find("img").attr("src",'../../uploads/noavatar.jpg');
                
            }
            $template.find("a").attr('href',ell.username);
            $template.find("a").text(ell.username);
            if(ell.describe){
                $template.find(".usersub").text(ell.describe);
            } else {
                $template.find(".usersub").remove();
            }
            console.log($template);
            $('#block-content-follow').append($template);
        });
    })
})
$('#username-registration').on('input',function(){
    var val = $('#username-registration').val();
    var regexp = /^[a-z0-9_]{6,}$/;
    if(!regexp.test(val)){
        $('.alert.alert-danger').text("You should use letters, numbers, or '_'");
        $('.alert.alert-danger').fadeIn();
    } else {
        $('.alert.alert-danger').fadeOut();
    }
});
$('#loadMoreUser').click(function(){
    var number = $('#wrapper-posts >div').length-1;
    $.ajax({
        url: "/downloadMore",
        method: "POST",
        data:{
            skip:number,
            down:'postsUser',
            href:window.location.href
        },
        }) . then(function(res) {
            res.posts.forEach(function(ell, i){
            var $template = $('#templateLoadPost > div').clone();
            $template.find("[img-post-load]").attr('src', '../uploads/'+ ell.user_id_who + '.jpg');
            $template.find(".author a").text(ell.user_id);
            $template.find(".author a").attr("href",'./userpage/'+ ell.user_id);
            $template.find(".text-post").text(ell.text);

            if(ell.picture !=""){
                $template.find(".post-img-content img").attr('src', '../'+ ell.picture);
            } else {
                $template.find(".post-img-content").remove();
            }

            $template.find(".likesPost").attr('post-id', ell._id);
            console.log(ell.likes);
            $template.find(".likesPost").html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>' + ell.likes);
            $template.find("button[post-id]").attr('post-id',ell._id);

            for(var j = 0; j <ell.comments.length; j++){

                var $templateComment = $('#templateComments > div').clone();

                if(res.comments[i].comments[j].user_id_who_comment == user){
                    $templateComment.find("[comment-id]").attr('comment-id', res.comments[i].comments[j]._id);
                    $templateComment.find("[post-id]").attr('post-id',res.comments[i].comments[j].id_post );
                }else{
                    $templateComment.find(".delete[comment-id]").remove();
                }

                $templateComment.find(".data-block-comment").text(res.comments[i].comments[j].dataC);
                $templateComment.find(".author a").attr("href",'./userpage/'+ res.comments[i].comments[j].user_id_who_comment);
                $templateComment.find(".author a").text(res.comments[i].comments[j].user_id_who_comment);
                $templateComment.find(".text-comment-wrapper").text(res.comments[i].comments[j].textComment);
                $templateComment.find(".likes").html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>'+res.comments[i].comments[j].likes);
                $templateComment.find(".likes").attr('comment-id', res.comments[i].comments[j]._id);
                $templateComment.find(".likes").attr('post-id', res.comments[i].comments[j].id_post);
                $template.append($templateComment);
            }
            $("#wrapper-posts").append($template);
            if(res.more){
                $("#loadMore").remove();
                $("#wrapper-posts").append("<div id ='loadMore' >Load more</div>");
            }else{
                $("#loadMore").remove();
            }
            Event( $template);
        });
    });
});
$('#createChat').click(function(e){
    e.preventDefault();
     $.ajax({
        url: "/chatRedirect",
        method: "POST",
        data:{
            user:window.location.href
        },
    }).then(function(res) {
        window.location.replace("../chat/?dialog="+res);
    });
})
