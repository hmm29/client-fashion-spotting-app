function upload_file(file, signed_request, url, callback){
    var xhr = new XMLHttpRequest();
    console.log('upload file')

    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(url);
            callback(url)
            // document.getElementById("preview").src = url;
            // document.getElementById("avatar_url").value = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}
function get_signed_request(file, newName, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
              console.log('code is 200')
                var response = JSON.parse(xhr.responseText);
                upload_file(file, response.signed_request, response.url, callback);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();
}
