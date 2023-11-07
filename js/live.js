// swiper 삽입할 HTML 형태
// <div class="swiper-slide">
//       <div class="live-slide-item">

//         기본정보
//         <a href="${live_1.live_info.url}">
//           <div>기본정보 출력</div>

//           <div>날짜정보</div>
//         </a>

//         <a>제품정보</a>

//       </div>
//     </div>

window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  numberWithCommas(69000);
  // console.log("티켓랭킹코딩")

  const fileName = "live.json";

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

      let tempTag = "";
      if (i !== _res.total - 1) {
        tempTag = `
      <li class="live-slide-box">
      <div class="live-slide-item">
        <a href="${obj.url}" class="live-link">
          <div class="live-img">
            <img src="${obj.image}" alt="${obj.title}" />
          </div>
          <div class="live-link-header">
            <i class="live-link-header-badge">${obj.badge}</i>
            <p class="live-link-header-title">
            ${obj.title}
            </p>
          </div>
          <div class="live-link-middle">
            <div class="live-link-middle-info">
              <p class="live-link-middle-date">
                ${obj.date}
              </p>
              <p class="live-link-middle-time">${obj.time}</p>
            </div>
          </div>
        </a>
        <div class="live-link-footer">
          <a
            href="https://events.interpark.com/exhibition?exhibitionCode=230327007"
          >
            <div class="live-link-footer-img">
              <img src="${
                obj.footer_img === "" ? "" : obj.footer_img
              }" alt="" />
            </div>
            <div class="live-link-footer-info">
              <p class="live-link-footer-info-desc">
                ${obj.desc}
              </p>
              <div class="live-link-footer-price">
                <span class="live-link-footer-price-percent">
                  <em></em><span>${
                    obj.benefit === "" ? "" : obj.benefit + "%"
                  }</span>
                </span>
                <span> <em>${numberWithCommas(obj.price)}</em><span>${
          obj.price === "" ? "" : "원"
        }</span> </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </li>
      `;
      } else {
        tempTag = `
        <div class="swiper-slide">
          <a>전체보기</a>
        </div>
      `;
      }
      htmlTicketTag += tempTag;
    }
    showHtmlTag(htmlTicketTag);

    // const badge = document.querySelectorAll(".ticket-good-info-badge i");

    // for (let i = 0; i < badge.length; i++) {
    //   if (badge[i].textContent === "단독판매") {
    //     badge[i].style.color = "red";
    //     badge[i].style.borderColor = "rgba(239,62,67,0.3)";
    //   }
    // }
  }

  function showHtmlTag(_html) {
    const liveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(liveSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    const swiperTicket = new Swiper(".live-slide-list", {
      slidesPerView: 4,
      spaceBetween: 27,
      navigation: {
        nextEl: ".live-slide-wrap .slide-next-bt",
        prevEl: ".live-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 4,
    });
  }
});
