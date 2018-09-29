function del(id){
    console.log(window.location)
    var xhr= new XMLHttpRequest();
    xhr.open("post","http://127.0.0.1:8888/del");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("id="+id);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            window.location = window.location;
        }
    }
}

function play(title){
    //获取audio标签
    var audio = document.getElementsByTagName("audio")[0];
    audio.src = "http://127.0.0.1:8888/music/"+title+".mp3";
}