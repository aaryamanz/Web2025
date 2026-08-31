(function(){
  "use strict";
  var MS = 864e5;
  var now = new Date(); now.setHours(0,0,0,0);
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  var stamp = document.getElementById("today-stamp");
  if (stamp) stamp.textContent = now.getDate() + " " + ABBR[now.getMonth()] + " " + now.getFullYear();

  /* --- graduation selects --- */
  var mSel = document.getElementById("gradMonth"), ySel = document.getElementById("gradYear");
  MONTHS.forEach(function(m,i){
    var o = document.createElement("option"); o.value = i; o.textContent = m; mSel.appendChild(o);
  });
  var thisYear = now.getFullYear();
  for (var y = thisYear; y <= thisYear + 7; y++){
    var o = document.createElement("option"); o.value = y; o.textContent = y; ySel.appendChild(o);
  }
  mSel.value = 4;                     // May, the common convocation month
  ySel.value = thisYear + 1;

  function updateClock(){
    var d = new Date(+ySel.value, +mSel.value + 1, 0);   // last day of chosen month
    var days = Math.round((d - now) / MS);
    var big = document.getElementById("daysLeft");
    var cap = document.getElementById("daysCap");
    var note = document.getElementById("clockNote");

    if (days < 0){
      big.textContent = "0";
      big.style.color = "var(--coral)";
      cap.textContent = "days of student email left";
      note.textContent = "That date has passed. If your address still works you are inside the grace window some institutions run — claim anything you still want today, because it can be cut without warning. A public library card replaces a surprising amount of the news and database access.";
      return;
    }
    big.textContent = days.toLocaleString();
    big.style.color = days <= 120 ? "var(--coral)" : "var(--gold)";
    cap.textContent = days === 1 ? "day of student email left" : "days of student email left";

    if (days <= 120){
      note.textContent = "Under four months. Work top to bottom and start with anything that needs document review — the GitHub pack and institutional software portals take days, not minutes. Then go straight to section 08 and back your files up.";
    } else if (days <= 400){
      note.textContent = "Roughly a year. Enough time to claim everything comfortably, but Google's offer must be redeemed by 31 December 2026 regardless of when you graduate, so that one is on its own clock.";
    } else {
      note.textContent = "Plenty of runway. Claim the renewable ones now — Autodesk, JetBrains, the Student Pack — because they re-verify annually and there is no advantage to waiting. Save the one-shot credits for when you have something to deploy.";
    }
  }
  mSel.addEventListener("change", updateClock);
  ySel.addEventListener("change", updateClock);
  updateClock();

  /* --- claim tracking (in-memory only) --- */
  var perks = Array.prototype.slice.call(document.querySelectorAll(".perk"));
  var countEl = document.getElementById("claimCount");
  var valueEl = document.getElementById("claimValue");
  var fillEl  = document.getElementById("meterFill");

  function refresh(){
    var n = 0, v = 0;
    perks.forEach(function(p){
      if (p.classList.contains("claimed")){ n++; v += parseInt(p.getAttribute("data-value"), 10) || 0; }
    });
    countEl.textContent = n;
    valueEl.textContent = "$" + v.toLocaleString();
    fillEl.style.width = (perks.length ? (n / perks.length) * 100 : 0) + "%";
  }

  perks.forEach(function(p){
    var btn = p.querySelector(".claimbtn");
    if (!btn) return;
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function(){
      var on = p.classList.toggle("claimed");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.lastChild.nodeValue = on ? "Claimed" : "Mark claimed";
      refresh();
    });
  });

  document.getElementById("resetBtn").addEventListener("click", function(){
    perks.forEach(function(p){
      p.classList.remove("claimed");
      var b = p.querySelector(".claimbtn");
      if (b){ b.setAttribute("aria-pressed","false"); b.lastChild.nodeValue = "Mark claimed"; }
    });
    refresh();
  });

  refresh();
})();
