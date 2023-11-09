
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
    { name: "Person 1", PersonImage:"/images/01.jpg" , image: "/images/emo1.png" },
    { name: "Person 2",PersonImage:"/images/02.jpg", image: "/images/emo2.png" },
    { name: "Person 3", PersonImage:"/images/03.jpg", image: "/images/emo1.png" },
    { name: "Person 4", PersonImage:"/images/04.jpg", image: "/images/ic.png" },
    { name: "Person 5", PersonImage:"/images/05.jpg", image: "/images/emo1.png" },
    { name: "Person 6", PersonImage:"/images/08.jpg", image: "/images/emo2.png" }
  ];

  const comentData = [
    { name: "Person 1", PersonImage:"/images/01.jpg" , image: "/images/emo1.png" , txt:"اهلا وسهلا بكم جميعا" },
    { name: "Person 2",PersonImage:"/images/02.jpg", image: "/images/emo2.png", txt:"لا تنسي فهد حضور الاجتماع "  },
    { name: "Person 3", PersonImage:"/images/03.jpg", image: "/images/emo1.png", txt:"هذا النص للتجريب" },
    { name: "Person 4", PersonImage:"/images/04.jpg", image: "/images/ic.png" , txt:"هناك حقيقة مثبتة منذ زمن طويل وهي ان المحتوي المقروء لصفحة ما سيلهي القارئ عن التركيز عن الشكل الخارجي للنص" },
    { name: "Person 5", PersonImage:"/images/05.jpg", image: "/images/emo1.png" , txt:"لاتنسي تحجز لي هديه من الملفا يا فهد" },
    { name: "Person 6", PersonImage:"/images/08.jpg", image: "/images/emo2.png" , txt:"لا تؤجل عمل اليوم الي الغد" }
  ];
 
  
  document.getElementById("btn1").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  
  document.getElementById("btn2").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn3").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn4").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn5").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn6").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn7").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn8").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn9").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn10").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  document.getElementById("btn11").addEventListener("click", () => {
    displayModalData(button1Data);
  });
  
  // ...
  /* comments */
 
  function displayModalData(data) {
    console.log(data);
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
  document.getElementById("comentbtn1").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn2").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn3").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn4").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn5").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn6").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn7").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn8").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
  document.getElementById("comentbtn9").addEventListener("click", () => {
    displayCommentsData(comentData);
  });
