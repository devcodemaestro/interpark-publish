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
      const objLiveInfo = obj["live-info"];
      const objLiveDay = obj["live-day"];
      const objLiveGood = obj["live-good"];

      let tempTag = "";

      if (i !== _res.total - 1) {
        tempTag = `
        <div class="swiper-slide">
          <div class="live-slide-item">
            <a href="${objLiveInfo.url}" class="live-link">
              <div class="live-img">
                <img src="${objLiveInfo.image}" alt="" />
              </div>
              <div class="live-info">
                <ul class="live-good-list">
                  <li class="live-link-header">
                    <i class="live-link-header-badge">${objLiveInfo.badge}</i>
                    <p class="live-link-header-title">
                    ${objLiveInfo.title}
                    </p>
                  </li>
                  <li class="live-link-middle">
                    <div class="live-link-middle-info">
                      <p class="live-link-middle-date">
                        ${objLiveDay.date}
                      </p>
                      <p class="live-link-middle-time">${objLiveDay.time}</p>
                    </div>
                  </li>
                  <li class="live-link-footer">

                    ${
                      objLiveGood["footer-img"] === ""
                        ? ``
                        : `
                        <a
                        href="https://events.interpark.com/exhibition?exhibitionCode=230327007"
                      >
                          <div class="live-link-footer-img"><img src="${
                            objLiveGood["footer-img"]
                          }" alt="" /></div>
                            <div class="live-link-footer-info">
                          <p class="live-link-footer-info-desc">
                            ${objLiveGood.desc}
                          </p>
                        <div>
                          <span
                            class="live-link-footer-price-percent"
                            >${
                              objLiveGood.benefit === ""
                                ? ""
                                : objLiveGood.benefit + "%"
                            }</span>
                          <span class="live-link-footer-price">${numberWithCommas(
                            objLiveGood.price
                          )}</span>
                          </div>
                        </div>
                      </a>
                          `
                    }
                      
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
      console.log(tempTag);
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
    const swiperLive = new Swiper(".live-slide", {
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
