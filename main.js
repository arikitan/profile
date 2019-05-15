var API_KEY ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwYmExMWNhNDEyOTk1ZjQ3NGJjYzdhZjlhZTA1MTg4MTRkMDljNjFmOGE3MGJlN2M5ZTJlYmVlYmNiMjViZTJjOGQ2OGM2OTZjNGZlOTZlIn0.eyJhdWQiOiIxMCIsImp0aSI6ImQwYmExMWNhNDEyOTk1ZjQ3NGJjYzdhZjlhZTA1MTg4MTRkMDljNjFmOGE3MGJlN2M5ZTJlYmVlYmNiMjViZTJjOGQ2OGM2OTZjNGZlOTZlIiwiaWF0IjoxNTU2NTU5ODE5LCJuYmYiOjE1NTY1NTk4MTksImV4cCI6MTg3MjE3OTAxOSwic3ViIjoiMTYwOCIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.E-y4A5KJp2KajQrHT1Pf39ZCzIbRQpcPRW1MwTgjh_xQpxGxlbJ7htMvZdpkyR-I5MTct84dRDPEH-CuDrM0iPv-AjAAyPVc2KyKpaMDfxoLY7QI6brkCloTwQkEHHHgkZfLJ2YOj3-n_2rBxCH4s4_oyGypRNdFKW92atDtTmGpAzYhS5sPwSyUdGQak0VqjTNSOVUoXyR8jcN3a59bF5OY3G75J5tRx4jrbvCNVLQmVIHQxdxZjiRWpxbPsJbAoF7mZuXHtu_zY_cFqOpQYOjg1r95x3wlOjhYWa30AxmrHqmoifdu85YtNAFEAczVTAXJX804uyK3xN7BJaukPr2joQd6TLQDAr8HuSyI0udUWzVxYyTbwBf3CZKGExgkk_cH7c-zUcuXfDGbj6M-Uf0XlCCYD7Txs2vcb6ed0p2-GLjlMxbzIGTEKM30LyACJkQde6oa7ER2Uludtr3krg8V8SqVCp4hYPOJr9bqS-mGzS0QLgaMzkW0-1EUfhWzmYyW3ylngkf_A3R8jTrtliQoutSvrvOUNoW71-3rV1J-_MsEsxKY7r8o_Iano8qSFeeoHmMF_YAHFYgnqUB6WVRaEi7guJNjRWr3ZXyTQtIrBJzBKyRamSqYdnuGTTMHvVdQr_VhgJ9gEv1-enuNWWx7kYW3D0P3wdqoL800fBI";
var client = new INTITAClient({
key: API_KEY,
});
var nameTarget = document.getElementById('name');
var information = document.getElementById("address");
var info = document.getElementById("phone");
var posht = document.getElementById("email");
var infoEd = document.getElementById("education");
var formEd = document.getElementById("educationForm");
var trener = document.getElementById("trainers");

client.getUserDetails(function(error, user) {
  	console.log(user.secondName + ' ' + user.firstName);
  	nameTarget.innerText = user.firstName+" ,"+user.secondName;
  	information.innerText= user.country + ", " + user.city + ", " + user.address; 
  	info.innerText = user.phone ;
  	posht.innerText = user.email;
  	infoEd.innerText = user.education;
  	formEd.innerText = user.educationForm;
  	trener.innerText = user.trainers["0"].firstName + " ," + user.trainers["0"].secondName + ", " + user.trainers["0"].email;
  	
});
client.getUserCoursesAndModules(function (error, user) {
  var courseId = user.courses["0"].id;
client.getCourseModules(courseId, function(error, user){
    var container = document.createElement('div');            //All modules, create elements, add class
  container.className='btn-group-vertical';
  user.forEach(function(element){
     var div = document.createElement('div');
  div.className='module-name';
  div.innerText = element.title;
  container.appendChild(div);
      var ul = document.createElement('ul');
      ul.className='list-group-item active my show';
      div.appendChild(ul);
      client.getModuleLectures(element.id, function(error, inf) {
        inf.forEach(function(lesson){  
          var lessons = document.createElement('li');      //All occupations, create elements, add class
          lessons.className='list-group-item li';
          //console.log(error, inf);
          lessons.innerText = lesson.title;
          ul.appendChild(lessons);
        });
      });
      div.onclick=function(){                             //Event click
        ul.classList.toggle('show');
      };
      document.getElementById("modules").appendChild(container);
    });
  });
});