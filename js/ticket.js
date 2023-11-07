window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  numberWithCommas(69000);
  // console.log("티켓랭킹코딩")

  const fileName = "ticket.json";

  const xhr = new XMLHttpRequest();

  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readyState);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);
      const res = event.target.response;

      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTicketTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];

      let tempTag = ``;
      if (i !== _res.total - 1) {
        tempTag = `
        <div class="swiper-slide">
          <div class="ticket-slide-item">
            <a href="${obj.url}" class="ticket-link">
              <div class="ticket-img">
                <img src="${obj.image}" alt="${obj.desc}" />
                <p class="ticket-count">${index}</p>
              </div>
              <div class="ticket-info">
                <ul class="ticket-good-list">
                  <li>
                    <em class="ticket-good-info-title">${obj.title}</em>
                  </li>
                  <li>
                    <p class="ticket-good-info-location">${obj.location}</p>
                    <span class="ticket-good-info-date">${obj.date}</span>
                  </li>
                  <li class="ticket-good-info-badge">
                    <i>${obj.badge}</i>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
        `;
      } else {
        tempTag = `
            <div class="swiper-slide">
              <div class="seeAll">
                <a href="#" class="seeAll-a">
                  <i></i>
                  <p>전체보기</p>
                </a>
              </div>            
            </div>
          `;
      }
      htmlTicketTag += tempTag;
    }
    showHtmlTag(htmlTicketTag);

    const badge = document.querySelectorAll(".ticket-good-info-badge i");

    for (let i = 0; i < badge.length; i++) {
      if (badge[i].textContent === "단독판매") {
        badge[i].style.color = "red";
        badge[i].style.borderColor = "rgba(239,62,67,0.3)";
      }
    }
  }

  function showHtmlTag(_html) {
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperTicket = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      navigation: {
        nextEl: ".ticket-slide-wrap .slide-next-bt",
        prevEl: ".ticket-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
