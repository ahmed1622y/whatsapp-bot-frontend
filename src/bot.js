import { useState, useEffect } from "react";
import url from "./url";
import { Link } from "react-router-dom";

import axios from "axios";
export const Bot = () => {
  const [img, setImg] = useState("");
  useEffect(() => {
    document.getElementById("restart").addEventListener("click", restart);
    function restart() {
      axios
        .get(url + "/start_bot")
        .then(startTimer(120, document.querySelector("#time")));
    }
    setTimeout(() => {
      window.location.reload();
    }, 120000);
    function startTimer(duration, display) {
      document.getElementsByClassName("none")[0].classList.add("notNone");
      document.getElementsByClassName("imgCont")[0].classList.add("point");
      var timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    }

    const token = localStorage.getItem("token");
    axios
      .get(url + "/qr", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setImg(res.data);
      });
  }, []);
  return (
    <div class="body">
      <h3>
        اهلا في بوت الواتساب <span>👋</span>
      </h3>
      <p>افحص الكود لكي تفعله علي اكونت الواتساب</p>
      <div class="imgCont">
        <img alt="QR Code Image" src={img} />
      </div>
      <button id="restart">تسجيل الخروج من جميع الاجهزه</button>
      <div class="none">
        سيكون الكود جاهز في<span id="time">02:00</span>
      </div>
      <Link to="/data">جميع المستخدمين</Link>
    </div>
  );
};
