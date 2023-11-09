
  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 3, // Number of items to display by default
        loop: true, // Infinite loop
        margin: 10, // Space between items
        responsive: {
            0: {
                items: 1, // 1 item in the carousel for small screens
            },
            576: {
                items: 2, // 2 items for screens wider than 576px
            },
            992: {
                items: 3, // 3 items for screens wider than 992px
            }
            
        }
    });
});
  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });
  ///////////////////////////

  // Button 1 Data
const button1Data = [
    { name: "Person 1", PersonImage:"images/01.jpg" , image: "images/emo1.png" },
    { name: "Person 2",PersonImage:"images/02.jpg", image: "images/emo2.png" },
    { name: "Person 3", PersonImage:"images/03.jpg", image: "images/emo1.png" },
    { name: "Person 4", PersonImage:"images/04.jpg", image: "images/ic.png" },
    { name: "Person 5", PersonImage:"images/05.jpg", image: "images/emo1.png" },
    { name: "Person 6", PersonImage:"images/08.jpg", image: "images/emo2.png" }
  ];

  const comentData = [
    { name: "Person 1", PersonImage:"images/01.jpg" , image: "images/emo1.png" , txt:"اهلا وسهلا بكم جميعا" },
    { name: "Person 2",PersonImage:"images/02.jpg", image: "images/emo2.png", txt:"لا تنسي فهد حضور الاجتماع "  },
    { name: "Person 3", PersonImage:"images/03.jpg", image: "images/emo1.png", txt:"هذا النص للتجريب" },
    { name: "Person 4", PersonImage:"images/04.jpg", image: "images/ic.png" , txt:"هناك حقيقة مثبتة منذ زمن طويل وهي ان المحتوي المقروء لصفحة ما سيلهي القارئ عن التركيز عن الشكل الخارجي للنص" },
    { name: "Person 5", PersonImage:"images/05.jpg", image: "images/emo1.png" , txt:"لاتنسي تحجز لي هديه من الملفا يا فهد" },
    { name: "Person 6", PersonImage:"images/08.jpg", image: "images/emo2.png" , txt:"لا تؤجل عمل اليوم الي الغد" }
  ];
 
  

  const buttons = document.querySelectorAll('.persons-react-count');

  function handleButtonClick() {
    console.log("Button clicked");
    displayModalData(button1Data);
   }


buttons.forEach(button => {
    console.log(button);
    button.addEventListener('click', handleButtonClick);
});

  function displayModalData(data) {
   
    const modal = document.getElementById("staticBackdrop");
    const modalContent = document.getElementById("modalContent");
    
    modalContent.innerHTML = `<ul>`;
  
    data.forEach(project => {
      modalContent.innerHTML += `
        <li>
        <img class="model-per-img" src="${project.PersonImage}" alt="${project.name}" />
          <p>${project.name}</p>
          <img class="model-per-react" src="${project.image}" alt="${project.name}" />
        </li>
      `;
    });
  }  

  
 
  function displayCommentsData(data) {
    const modal = document.getElementById("largeModal");
    const modalContent = document.getElementById("modalCommentContent");
  
    modalContent.innerHTML = ''; // Clear previous content
  
    data.forEach(comment => {
      const commentBox = document.createElement('div');
      commentBox.classList.add('d-flex', 'align-items-center','modelcomment-box');
  
      commentBox.innerHTML = `
        <div class="persons-react1">
          <img src="${comment.PersonImage}" class="persons-react" alt="${comment.name}">
        </div>
        <div class="bg-white">
          <div class="comment-info">
            <div class="d-flex justify-content-between">
              <p class="comment-person-name">${comment.name}</p>
              <span class="comment-time">منذ 12 دقيقة</span>
            </div>
            <div class="d-flex mt-2 comment-time">
              <span>${comment.txt}</span>
            </div>
          </div>
        </div>
      `;
  
      modalContent.appendChild(commentBox);
    });
  }
  
  // Example usage when the button is clicked
  const Commentbuttons = document.querySelectorAll('.readmore');
  function handlecommentButtonClick() {
    displayCommentsData(comentData);
  }
  
  Commentbuttons.forEach(button => {
      button.addEventListener('click', handlecommentButtonClick);
  });


  /* api */
  const apiUrl = "https://wisht7b-api.algorithms.ws/api/v1/posts"; 
const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MCIsImlzcyI6Ildhc2hUbzdiIiwiaWF0IjoxNjk4NzU1MjY4Mzk0LCJleHAiOjE2OTg3NTU4NzMxOTR9.ljgz2r-CV-crQZpXz1P7vo4owjkeHewCXtW4kk0jBMg"; 

const headers = new Headers({
  "Authorization": `Bearer ${apiToken}`,
});




  var posts = [] ;
  fetch(apiUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(res => {
        posts = res.data
    
     const filteredData = posts.filter(item => item.type === "MUSIC");
     filteredData.forEach(item => {
        createMusicCard(item);
     });
    })
    .catch(error => {

      console.error('Error:', error);
    });



    const selectElement = document.getElementById("product-filter");

    selectElement.addEventListener("change", () => {
      const selectedValue = selectElement.value;
    
      // Filter the data based on the selected value
      if (selectedValue === "all") {
        // Show all data
        displayAllData(posts);
      } else {
        // Filter and display data based on the selected value
        const filteredData = posts.filter(item => item.type === selectedValue);
        displayFilteredData(filteredData);
      }
    });
    
    function displayAllData(data) {
        console.log(data);
      }
      
      function displayFilteredData(filteredData) {
    
      }
      


function calculateTimeElapsed(specificDate) {
    // Convert the specific date to a JavaScript Date object
    specificDate = new Date(specificDate);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - specificDate;

    // Calculate the elapsed days, hours, and minutes
    const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursElapsed = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesElapsed = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // Create a string to display the elapsed time
    let elapsedTimeString = '';
    if (daysElapsed > 0) {
        elapsedTimeString = `منذ ${daysElapsed} يوم${daysElapsed > 1 ? 'ًا' : ''}`;
    } else if (hoursElapsed > 0) {
        elapsedTimeString = `منذ ${hoursElapsed} ساعة`;
    } else {
        elapsedTimeString = `منذ ${minutesElapsed} دقيقة`;
    }

    return elapsedTimeString;
}



// Function to create and populate a card
function createMusicCard(data) {
    const cardContainer = document.getElementById('seven');

    const card = document.createElement('div');
    card.className = 'col-lg-8 p-0 music-card';
    card.innerHTML = `
        <div class="card card-three" >
            <div class="head-div d-flex justify-content-between">
                <div class="family d-flex align-items-center gap-2">
                    <div class="persons-react1">
                        <img src="${data.owner.img}" class="persons-react" alt="">
                    </div>
                    <div class="falimy-data">
                        <p class="person-name">${data.owner.fullname}</p>
                        <div class="icons">
                            <span dir="rtl"> <i class="fa-solid fa-clapperboard" style="margin: 0 4px;"></i>${data.type}</span>
                            <span dir="rtl"> <i class="fa-solid fa-user-group" style="margin: 0 4px;"></i>شله
                            الفله</span>
                            </div>
                    </div>
                </div>
                <div class="d-flex align-items-end flex-column">
                    <div class="dropdown">
                        <div class="alarm btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">رؤية التفاصيل</a></li>
                            <li><a class="dropdown-item" href="#">حذف</a></li>
                        </ul>
                    </div>
                    <div class="time">
                        <span>${timeAgo(new Date(data.createdAt))}</span>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center resturant-data">
                <img class="card-img-top" src="${data.media.image}" alt="Card image cap">
                <div class="whereIAM">
                    <span>أستمع الي </span><br>
                    <span>${data.media.artist} - ${data.media.name}</span>
                </div>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span> أحلي ما غني</span>
                    </div>
                    <div>
                        <span><i class="fa-regular fa-eye"></i> ${data.totalViews}</span>
                    </div>
                </div>
                <div class="d-flex reacts" style="margin: 25px 0;">
                                <div class="persons-react1">
                                    <a href="#" target="_blank"> <img src="./images/01.jpg" class=" persons-react "
                                            alt=""></a>
                                    <img class="emoji" src="./images/emo1.png" alt="">
                                </div>
                                <div class="persons-react2">
                                    <a href="#" target="_blank"> <img src="./images/02.jpg" class="persons-react"
                                            alt=""></a>
                                    <img class="emoji" src="./images/emo2.png" alt="">
                                </div>
                                <div class="persons-react3">
                                    <a href="#" target="_blank"> <img src="./images/03.jpg" class="persons-react "
                                            alt=""></a>
                                    <img class="emoji" src="./images/ic.png" alt="">
                                </div>
                                <div class="persons-react4">
                                    <a href="#" target="_blank"> <img src="./images/04.jpg" class="persons-react"
                                            alt=""></a>
                                    <img class="emoji" src="./images/ic2.png" alt="">
                                </div>
                                <div class="persons-react-count" id="btn6" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop" style="cursor: pointer;">
                                    <span>+6</span>
                                </div>
                            </div>
            </div>
        </div>
    `;

    cardContainer.appendChild(card);
    const updatedButtons = document.querySelectorAll('.persons-react-count');

    updatedButtons.forEach(button => {
        console.log(button);
        button.addEventListener('click', handleButtonClick);
    });
}

// Helper function to calculate time ago
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) {
        return `${seconds} ثواني`;
    } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)} دقائق`;
    } else if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)} ساعات`;
    } else {
        return `${Math.floor(seconds / 86400)} أيام`;
    }
}






  asd = [
    {
        "status": "ACTIVE",
        "likesCount": 0,
        "type": "MUSIC",
        "commentsCount": 0,
        "privacy": "PUBLIC",
        "location": {
            "coordinates": []
        },
        "media": {
            "name": "أذان الفجر بصوت اعجوبة الزمان",
            "year": "2021-06-30T12:00:00Z",
            "artist": "الشيخ عبدالباسط عبدالصمد",
            "image": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/30/f1/da/30f1da6c-71c1-98ec-c31b-991012792bd7/196292016536.jpg/1024x1024bb.png",
            "type": "song"
        },
        "isLike": false,
        "totalViews": 0,
        "viewsCount": 0,
        "id": 105,
        "createdAt": "2023-11-02T14:22:27.714Z",
        "files": [],
        "owner": {
            "fullname": "",
            "id": 69,
            "img": "https://wisht7b-api.algorithms.ws/uploads/cf0c3159-e360-4178-9176-ad93e8c38dba.jpg"
        },
        "comments": [],
        "likes": []
    },
    {
        "content": "الفايكنقز قادمون ",
        "status": "ACTIVE",
        "likesCount": 0,
        "type": "MUSIC",
        "commentsCount": 0,
        "privacy": "PUBLIC",
        "location": {
            "coordinates": []
        },
        "media": {
            "name": "Reflections on a Hero",
            "year": "2019-12-06T12:00:00Z",
            "artist": "Trevor Morris",
            "image": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e6/68/de/e668de0d-6150-3d3a-dfe7-a522ddc97ac9/886448091431.jpg/1024x1024bb.png",
            "type": "song"
        },
        "isLike": false,
        "totalViews": 0,
        "viewsCount": 0,
        "id": 109,
        "createdAt": "2023-11-03T05:41:40.852Z",
        "files": [],
        "owner": {
            "fullname": "",
            "id": 69,
            "img": "https://wisht7b-api.algorithms.ws/uploads/cf0c3159-e360-4178-9176-ad93e8c38dba.jpg"
        },
        "comments": [],
        "likes": []
    }
  ]