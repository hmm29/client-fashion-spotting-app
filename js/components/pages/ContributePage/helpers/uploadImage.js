var CryptoJS = require('crypto-js');

function uploadImage(uri, callback) {

  let timestamp = (Date.now() / 1000 | 0).toString();
  let api_key = '275677552221336'
  let api_secret = 'ulN81tirJ4Q-yKCWdtXO_ZlnXtI'
  let cloud = 'celena'
  let hash_string = 'timestamp=' + timestamp + api_secret
  let signature = CryptoJS.SHA1(hash_string).toString();
  let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

  let xhr = new XMLHttpRequest();
  xhr.open('POST', upload_url);
  xhr.onload = () => {
    callback(JSON.parse(xhr.responseText));
  };
  let formdata = new FormData();
  formdata.append('file', {uri: uri, type: 'image/png', name: 'testpic.png'});
  formdata.append('timestamp', timestamp);
  formdata.append('api_key', api_key);
  formdata.append('signature', signature);
  xhr.send(formdata);

}


module.exports = uploadImage;
